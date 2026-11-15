#!/usr/bin/env python3
"""Rebuild the 128 original, sample-free circuit scores.

Authoring tools only: Python 3 + NumPy + ffmpeg (libmp3lame).
The shipped static game does not need Python, NumPy, or ffmpeg.
Run: python tools/compose-audio.py --jobs 4
Run a preview: python tools/compose-audio.py --track 0 --track 80
Every musical event is generated from the score seed. No recordings, model
weights, MIDI files, existing melodies, or third-party samples are used.
"""
from __future__ import annotations
import argparse
from concurrent.futures import ProcessPoolExecutor, as_completed
import hashlib
import json
import math
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / 'assets' / 'audio'
SR = 32000
VERSION = 'original-score-v1-20261115'
SCENE_NAMES = {
    'menu': ('Quiet Ignition', 112), 'curve': ('Scarlet Gradient', 148),
    'urban': ('Afterlight Circuit', 140), 'straight': ('Horizon Current', 154),
    'wet': ('Glass Rain', 132), 'snow': ('Polar Resonance', 138),
    'circuit': ('Vector Ceremony', 150), 'general': ('Open Frequency', 144),
}
SCALES = [[0,2,3,5,7,8,10], [0,2,4,5,7,9,11], [0,2,3,5,7,9,10],
          [0,2,4,6,7,9,11], [0,2,3,5,7,8,11]]
# Scale-degree progressions form harmonic scaffolding, not borrowed songs.
PROGRESSIONS = [[0,5,2,6], [0,3,5,4], [0,6,3,4], [0,2,5,3],
                [0,4,5,2], [0,5,3,6], [0,3,1,4], [0,6,4,3]]
TABLE_N = 4096
PHASE = np.arange(TABLE_N, dtype=np.float32) / TABLE_N
SAW = sum(np.sin(2*np.pi*h*PHASE)/h for h in range(1,13)).astype(np.float32) * .55
TRI = sum(((-1)**((h-1)//2))*np.sin(2*np.pi*h*PHASE)/(h*h)
          for h in range(1,14,2)).astype(np.float32)
SQUARE = sum(np.sin(2*np.pi*h*PHASE)/h for h in range(1,12,2)).astype(np.float32)*.7
SINE = np.sin(2*np.pi*PHASE).astype(np.float32)


def scene_for(i):
    if i == 0: return 'menu'
    if i < 16 or 96 <= i < 112: return 'curve'
    if i < 32: return 'urban'
    if i < 48: return 'straight'
    if i < 64: return 'wet'
    if i < 80: return 'snow'
    if i < 96: return 'circuit'
    return 'general'


def score_for(i):
    scene = scene_for(i)
    label, base = SCENE_NAMES[scene]
    seed = 0x6F6D6F00 + i*104729
    rng = np.random.default_rng(seed)
    bpm = base + (i % 5)*2 - 4 if i else base
    tonic = [45,47,48,50,52,53,55,57,58,60,46,49][i % 12]
    mode = 1 if scene == 'menu' else [0,2,0,1,4,2,3,0][(i//3) % 8]
    # The 32-bar arrangement: theme, expanded answer, reduced middle, full return.
    motif = [0]
    for k in range(1,16):
        step = int(rng.choice([-2,-1,1,1,2,3]))
        motif.append(int(np.clip(motif[-1]+step, -2, 9)))
    motif[-1] = int(rng.choice([0,2,4]))
    return {'id': f'parapara-{i:03}', 'file': f'parapara-{i:03}.mp3',
            'title': f'{label} {i:03}', 'bpm': bpm, 'scene': scene,
            'bars': 32, 'beatsPerBar': 4, 'seed': seed,
            'tonicMidi': tonic, 'scale': SCALES[mode],
            'progression': PROGRESSIONS[(i//2) % len(PROGRESSIONS)],
            'motif': motif, 'timbre': i % 8,
            'duration': round(32*4*60/bpm, 6), 'version': VERSION}


def hz(midi): return 440*2**((midi-69)/12)


def osc(freq, t, table, cents=0, phase=0):
    p = np.remainder(t*(freq*2**(cents/1200)) + phase, 1) * TABLE_N
    lo = p.astype(np.int32)
    a = p-lo
    return table[lo]*(1-a)+table[(lo+1) % TABLE_N]*a


def env(t, attack, decay, sustain, release, length):
    a = np.minimum(1, t/max(attack,.001))
    d = sustain+(1-sustain)*np.exp(-np.maximum(0,t-attack)/max(decay,.001))
    r = np.minimum(1,np.maximum(0,(length-t)/max(release,.001)))
    return a*d*r


def render(i):
    score = score_for(i)
    rng = np.random.default_rng(score['seed'])
    beat = 60/score['bpm']
    total = int(round(32*4*beat*SR))
    music = np.zeros((total,2),dtype=np.float32)
    drums = np.zeros_like(music)
    scale, tonic = score['scale'], score['tonicMidi']
    timbre = score['timbre']

    def degree(n, octave=0):
        return tonic + scale[n % 7] + 12*(n//7+octave)

    def add(bus, sound, at, gain=1, pan=0):
        start = int(round(at*SR)) % total
        samples = np.asarray(sound,dtype=np.float32)
        if len(samples)>total: samples=samples[:total]
        gains = gain*np.array([math.cos((pan+1)*math.pi/4),math.sin((pan+1)*math.pi/4)],dtype=np.float32)
        stop=min(total,start+len(samples))
        bus[start:stop] += samples[:stop-start,None]*gains
        left=len(samples)-(stop-start)
        if left: bus[:left] += samples[-left:,None]*gains

    def voice(kind, midi, at, length, gain, pan=0, velocity=1):
        dur = length + {'pad':.36,'lead':.08,'arp':.14,'bass':.03}.get(kind,.1)
        t=np.arange(int(dur*SR),dtype=np.float32)/SR
        f=hz(midi)
        if kind=='pad':
            sig=(osc(f,t,TRI,-4)+osc(f,t,TRI,4,.21)+osc(f*2,t,SINE,0,.41)*.22)/2.22
            envelope=env(t,.06,.4,.72,.36,dur)
            sig*=envelope*(.93+.07*np.sin(2*np.pi*.4*t+i))
        elif kind=='bass':
            sig=.55*osc(f,t,SINE)+.28*osc(f,t,TRI)+.17*osc(f*2,t,SINE)
            sig*=env(t,.003,.08,.45,.03,dur)
        elif kind=='arp':
            sig=.6*osc(f,t,TRI)+.24*osc(f*2,t,SINE)+.16*osc(f*3.002,t,SINE)
            sig*=np.exp(-t/(.055+.012*(timbre%3)))*np.minimum(1,t/.002)
        else:
            # Smooth, band-limited lead, three detuned voices and a clear fundamental.
            table=SAW if timbre<4 else SQUARE if timbre<6 else TRI
            sig=(osc(f,t,table,-5-.5*timbre)+osc(f,t,table,5+.5*timbre,.27)
                 +.7*osc(f,t,SINE))/2.7
            sig*=env(t,.009,.12,.6,.08,dur)*(1+.018*np.sin(2*np.pi*5.3*t))
        add(music,sig,at,gain*velocity,pan)

    def kick(at,level=1):
        t=np.arange(int(.38*SR),dtype=np.float32)/SR
        phase=2*np.pi*(47*t+(150-47)*.032*(1-np.exp(-t/.032)))
        sig=np.sin(phase)*np.exp(-t/ .095)+rng.standard_normal(len(t)).astype(np.float32)*np.exp(-t/.002)*.16
        add(drums,sig,at,.64*level)

    def snare(at,level=1):
        t=np.arange(int(.23*SR),dtype=np.float32)/SR
        noise=rng.standard_normal(len(t)).astype(np.float32)
        high=noise-np.roll(noise,1)*.79
        sig=high*np.exp(-t/.055)*.36+np.sin(2*np.pi*(183*t+9*(1-np.exp(-t/.009))))*np.exp(-t/.033)*.55
        add(drums,np.tanh(sig),at,.28*level, .04)

    def hat(at,open=False,level=1):
        dur=.19 if open else .06
        t=np.arange(int(dur*SR),dtype=np.float32)/SR
        n=rng.standard_normal(len(t)).astype(np.float32)
        metal=sum(np.sin(2*np.pi*f*t) for f in (3121,4583,6127,7949))/4
        sig=((n-np.roll(n,1))*.25+metal*.27)*np.exp(-t/(.045 if open else .013))
        add(drums,sig,at,.16*level, .4 if open else -.35)

    def crash(at,level=1):
        t=np.arange(int(1.1*SR),dtype=np.float32)/SR
        noise=rng.standard_normal(len(t)).astype(np.float32)
        sig=(noise-np.roll(noise,1)*.55)*np.exp(-t/.3)*np.minimum(1,t/.004)
        add(drums,sig,at,.105*level,.2)

    motif=score['motif']
    for bar in range(32):
        phrase=bar//8
        pos=bar%8
        # Two bars per harmony, with inverted voicings and 7th/9th extensions.
        root=score['progression'][(bar//2)%4]
        time=bar*4*beat
        breakdown=phrase==2
        intro=scene_for(i)=='menu'
        energy=.7 if breakdown else 1 if phrase in [1,3] else .87
        for chord_degree in [root+7,root+9,root+11,root+13]:
            voice('pad',degree(chord_degree),time,4*beat,.052*energy,
                  pan=(-.55 if chord_degree%2 else .55))
        bass_pattern=[0,.75,1.5,2,2.75,3.5] if i%2 else [0,.5,1.5,2,2.5,3.25,3.5]
        if not breakdown or pos>=4:
            for k,offset in enumerate(bass_pattern):
                note=root-7+(7 if k in [3,6] else 0)
                voice('bass',degree(note),time+offset*beat,.28*beat,.25*energy)
        for step in range(16):
            if breakdown and step%2: continue
            if intro and step%2: continue
            arpn=[root+7,root+11,root+9,root+13][(step+i+bar%2)%4]
            voice('arp',degree(arpn),time+step*beat/4,.22*beat,.075*energy,
                  pan=math.sin((step+bar)*1.7)*.55)
        # An original seed-derived theme answers itself, varies, and resolves.
        if not breakdown or pos in [3,5,7]:
            for k in range(8):
                if (k+bar+i)%7==0: continue
                note=motif[(k+(pos%2)*8)%16]+7
                if k in [0,4]: note=root+7+([0,2,4][(bar+k+i)%3])
                if phrase==1: note += (2 if k in [2,6] else 0)
                if phrase==3 and pos>=4: note += 7 if k in [3,7] else 0
                if pos==7 and k>=6: note=root+7+(2 if k==6 else 0)
                length=(.76 if k==7 else .42)*beat
                voice('lead',degree(note),time+(k*.5+.035*(k%2))*beat,length,
                      .155*energy*(.76 if intro else 1),pan=.08*math.sin(bar))
        # Drums build back into the return; sparse middle creates breathing room.
        drum_on=not breakdown or pos>=6
        if drum_on:
            for b in range(4):
                if intro and b%2: continue
                kick(time+b*beat,.72 if intro else .95)
            for b in [1,3]: snare(time+b*beat,.6 if intro else energy)
            for half in range(8):
                hat(time+(half*.5+.025*(half%2))*beat,
                    open=half%2==1 and not intro,level=.75 if half%2 else .52)
            if pos==7:
                for q in range(4):
                    snare(time+(3+q*.25)*beat,.27+.1*q)
                    hat(time+(3+q*.25)*beat,level=.4)
        elif pos%2==0:
            hat(time+beat,open=True,level=.7)
            snare(time+3*beat,.4)
        if pos==0: crash(time,.5 if breakdown else .8)

    # Periodic sidechain and circular ambience preserve the bar-length loop.
    t=np.arange(total,dtype=np.float32)/SR
    beat_phase=np.remainder(t,beat)
    pump=(.64+.36*(1-np.exp(-beat_phase/.065))).astype(np.float32)
    music*=pump[:,None]
    dry=music.copy()
    # Ping-pong dotted-eighth delay plus short stereo early reflections.
    for d,level in [(beat*.75,.14),(beat*1.5,.07),(beat*2.25,.035)]:
        music += np.roll(dry[:,::-1],int(d*SR),axis=0)*level
    for d,level in [(.043,.08),(.079,.065),(.113,.048),(.173,.035),(.241,.025)]:
        music += np.roll(dry[:,::-1],int(d*SR),axis=0)*level
    mix=music+drums
    # DC removal, soft bus saturation, conservative peak ceiling.
    mix -= mix.mean(axis=0)
    rms=float(np.sqrt(np.mean(mix**2)))
    mix*=.16/max(.001,rms)
    mix=np.tanh(mix*1.05)/1.05
    peak=float(np.max(np.abs(mix)))
    if peak>.86: mix*=.86/peak
    # 96 kb/s joint stereo keeps mobile downloads practical. Encoder delay/padding
    # metadata are retained by LAME; HTMLAudio loop precision is browser dependent.
    DEST.mkdir(parents=True,exist_ok=True)
    target=DEST/score['file']
    with tempfile.NamedTemporaryFile(suffix='.wav') as temporary:
        with wave.open(temporary.name,'wb') as wav:
            wav.setnchannels(2);wav.setsampwidth(2);wav.setframerate(SR)
            wav.writeframes((np.clip(mix,-1,1)*32767).astype('<i2').tobytes())
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',temporary.name,
            '-codec:a','libmp3lame','-b:a','96k','-ar',str(SR),
            '-metadata',f'title={score["title"]}',
            '-metadata','artist=OMOJI Z Original Score',
            '-metadata',f'comment={VERSION}; sample-free synthesis; seed={score["seed"]}',
            '-write_xing','1',str(target)],check=True)
    score.update({'sha256':hashlib.sha256(target.read_bytes()).hexdigest(),
        'bytes':target.stat().st_size,'sampleRate':SR,'channels':2,
        'peakDbFS':round(20*math.log10(float(np.max(np.abs(mix)))),2),
        'rmsDbFS':round(20*math.log10(float(np.sqrt(np.mean(mix**2)))) ,2)})
    return score


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--track',type=int,action='append',help='index 0 through 127')
    parser.add_argument('--jobs',type=int,default=2)
    args=parser.parse_args()
    indices=args.track or list(range(128))
    if any(not 0<=i<128 for i in indices): parser.error('track must be 0 through 127')
    manifest_path=DEST/'original-score.json'
    previous={}
    if manifest_path.exists():
        previous={x['id']:x for x in json.loads(manifest_path.read_text())['tracks']}
    results=[]
    with ProcessPoolExecutor(max_workers=max(1,min(8,args.jobs))) as pool:
        for task in as_completed([pool.submit(render,i) for i in indices]):
            item=task.result();results.append(item);print(f'{item["id"]}: {item["title"]}, {item["duration"]:.2f}s',flush=True)
    for result in results: previous[result['id']]=result
    tracks=sorted(previous.values(),key=lambda t:t['id'])
    manifest={'version':VERSION,'sampleSource':'None. All waveforms, percussion, melodies and arrangements are synthesized by tools/compose-audio.py.',
        'composition':'Seed-specific themes, voicings, keys, scale modes, progressions and percussion; 32 bars per track.',
        'loop':'Circular tails and beat-aligned source length. MP3 gapless looping depends on the browser.',
        'thirdPartyAudio':False,'tracks':tracks}
    manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(f'Saved {len(tracks)} score records; {sum(x["bytes"] for x in tracks)/1048576:.1f} MiB',flush=True)


if __name__=='__main__': main()
