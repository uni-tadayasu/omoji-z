#!/usr/bin/env python3
"""Inspect rendered audio without asserting that metrics establish musical quality.
Requires NumPy and ffmpeg. Optional --figure also uses matplotlib.
"""
import argparse,json,math,subprocess,os,tempfile
from pathlib import Path
import numpy as np


def inspect(path):
    raw=subprocess.run(['ffmpeg','-v','error','-i',str(path),'-f','f32le','-ac','2','-ar','44100','-'],capture_output=True,check=True).stdout
    pcm=np.frombuffer(raw,dtype='<f4').reshape(-1,2)
    assert len(pcm) and np.isfinite(pcm).all(),path
    peak=float(np.max(np.abs(pcm)));rms=float(np.sqrt(np.mean(pcm*pcm)))
    assert peak<1 and rms>.02,(path,peak,rms)
    loud=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',str(path),'-af','loudnorm=I=-18:TP=-1.8:LRA=10:print_format=json','-f','null','-'],capture_output=True,text=True,check=True).stderr
    measured=json.loads(loud[loud.rfind('{'):loud.rfind('}')+1])
    mono=pcm.mean(axis=1)
    n=8192;window=np.hanning(n);power=np.zeros(n//2+1)
    for start in np.linspace(0,len(mono)-n,96).astype(int):
        spectrum=np.fft.rfft(mono[start:start+n]*window);power+=np.abs(spectrum)**2
    freq=np.fft.rfftfreq(n,1/44100)
    bands={}
    for label,low,high in [('sub_20_60',20,60),('bass_60_180',60,180),('mid_180_3000',180,3000),('presence_3000_10000',3000,10000),('air_10000_20000',10000,20000)]:
        bands[label]=round(100*float(power[(freq>=low)&(freq<high)].sum()/power.sum()),3)
    block=round(.1*44100);keep=len(mono)//block
    envelope=np.sqrt(np.mean(mono[:keep*block].reshape(-1,block)**2,axis=1))
    report={'file':path.name,'duration':len(pcm)/44100,'channels':2,'sampleRate':44100,
      'integratedLufs':float(measured['input_i']),'truePeakDbTP':float(measured['input_tp']),
      'loudnessRangeLu':float(measured['input_lra']),
      'samplePeak':peak,'rmsDbFS':round(20*math.log10(rms),2),
      'crestFactorDb':round(20*math.log10(peak/rms),2),'spectralEnergyPercent':bands,
      'finite':True,'clippedSamples':int(np.sum(np.abs(pcm)>=1))}
    return report,mono,envelope,freq,power


def main():
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('files',nargs='+',type=Path)
    p.add_argument('--report',type=Path,required=True);p.add_argument('--figure',type=Path)
    args=p.parse_args();results=[inspect(x) for x in args.files]
    payload={'method':'Complete ffmpeg stereo decode, EBU R128 loudnorm analysis, 96-window averaged spectrum. Metrics validate technical condition, not musical taste.','tracks':[x[0] for x in results]}
    args.report.write_text(json.dumps(payload,ensure_ascii=False,indent=2)+'\n')
    if args.figure:
        os.environ.setdefault('MPLCONFIGDIR',str(Path(tempfile.gettempdir())/'omoji-matplotlib'))
        os.environ.setdefault('XDG_CACHE_HOME',str(Path(tempfile.gettempdir())/'omoji-analysis-cache'))
        import matplotlib
        matplotlib.use('Agg')
        import matplotlib.pyplot as plt
        fig,axes=plt.subplots(len(results),2,figsize=(12,len(results)*2.5),squeeze=False)
        for row,(data,mono,envelope,freq,power) in enumerate(results):
            times=np.arange(len(envelope))*.1
            axes[row,0].plot(times,20*np.log10(np.maximum(envelope,1e-5)),color='#187e91',lw=1)
            axes[row,0].set(title=data['file']+' | '+str(data['integratedLufs'])+' LUFS',xlabel='Time (s)',ylabel='100 ms RMS (dBFS)',ylim=(-50,-7))
            axes[row,1].semilogx(freq[1:],10*np.log10(np.maximum(power[1:]/power.max(),1e-10)),color='#b2603d',lw=1)
            axes[row,1].set(xlim=(25,18000),ylim=(-70,2),xlabel='Frequency (Hz)',ylabel='Relative power (dB)')
            for ax in axes[row]:ax.grid(alpha=.2)
        fig.tight_layout();fig.savefig(args.figure,dpi=150);plt.close(fig)
    print(json.dumps(payload,ensure_ascii=False,indent=2))


if __name__=='__main__':main()
