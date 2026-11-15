#!/usr/bin/env python3
"""Render OMOJI Z's 9 original themes / 33 real mixes and 128 legacy IDs.

Authoring only: Python 3, NumPy, and ffmpeg with libmp3lame.
No samples, MIDI, recordings, existing songs, or model weights are consumed.
The hand-written musical score is in tools/soundtrack_score.py.

Full build: python tools/compose-audio.py --jobs 4
Preview:    python tools/compose-audio.py --preview --jobs 3
Catalog:    python tools/compose-audio.py --metadata-only
Verify:     python tools/compose-audio.py --verify
"""
from __future__ import annotations
import argparse
from concurrent.futures import ProcessPoolExecutor, as_completed
from functools import lru_cache
import hashlib
import json
import math
from pathlib import Path
import subprocess
import tempfile
import wave
import numpy as np
from soundtrack_score import THEMES, MIXES, VERSION

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT/'assets/audio'
SR = 44100
BARS = 32
ALIASES = 128
NOTES = {'C':0,'D':2,'E':4,'F':5,'G':7,'A':9,'B':11}


def midi(note):
    value=NOTES[note[0]]
    j=1
    while j<len(note) and note[j] in '#b':
        value += 1 if note[j]=='#' else -1;j+=1
    return (int(note[j:])+1)*12+value


def hz(note): return 440*2**((note-69)/12)


def actual_scores():
    result=[]
    for index,theme in enumerate(THEMES):
        mixset=[{'id':'menu','title':'Menu','description':'静かなメニューテーマ','energy':.52,'lead':.75,'space':.21}] if index==0 else MIXES
        for mix_index,mix in enumerate(mixset):
            song_id='parapara-000' if index==0 else f'parapara-{1+(index-1)+mix_index*8:03}'
            result.append({'id':song_id,'canonicalId':song_id,'title':theme['title']+' · '+mix['title'],
                'themeId':theme['id'],'themeTitle':theme['title'],'subtitle':theme['subtitle'],
                'mixId':mix['id'],'mixTitle':mix['title'],'mixDescription':mix['description'],
                'bpm':theme['bpm'],'duration':round(BARS*4*60/theme['bpm'],6),
                'scene':theme['scene'],'key':theme['key'],'bars':BARS,
                'file':'v3-'+theme['id']+'-'+mix['id']+'.mp3',
                'legacyAlias':False,'themeIndex':index,'mixIndex':mix_index})
    return result


def compatibility(scores):
    by_id={s['id']:s for s in scores}
    result=[]
    for i in range(ALIASES):
        canonical='parapara-000' if i==0 else f'parapara-{1+(i-1)%32:03}'
        item=dict(by_id[canonical]);item['id']=f'parapara-{i:03}';item['legacyAlias']=item['id']!=canonical
        result.append(item)
    return result


def arrangement(bar,mix_id):
    # 4-bar introduction -> A -> B -> 4-bar space -> A return; the turnaround
    # reconnects to the opening harmony rather than clipping a release tail.
    if bar<4: section='intro';phrase=bar;part='A'
    elif bar<12: section='A';phrase=bar-4;part='A'
    elif bar<20: section='B';phrase=bar-12;part='B'
    elif bar<24: section='space';phrase=bar-20;part='B'
    else: section='return';phrase=bar-24;part='A'
    activity={'intro':.50,'A':.85,'B':1.,'space':.42,'return':1.}[section]
    if mix_id=='night':activity*=.76
    if mix_id=='peak' and section in ['B','return']:activity*=1.08
    return section,phrase,part,activity


def make_instrument(kind,note,duration,seed=0):
    """Analytic, sample-free instrument. Dark partials and released envelopes."""
    tail={'pad':.55,'felt':.65,'glass':.38,'guitar':.26,'palm':.05,'silk':.20,'air':.28,'pluck':.22,'bass':.045}[kind]
    length=max(.035,duration)+tail
    t=np.arange(round(length*SR),dtype=np.float32)/SR
    frequency=hz(note)
    phase=2*np.pi*frequency*t
    release=np.clip((length-t)/max(.001,tail),0,1)
    if kind=='pad':
        # Rounded string/sine colour, no unfiltered saw/square stack.
        detune=2*np.pi*frequency*2**(2.2/1200)*t
        y=.67*np.sin(phase)+.23*np.sin(detune+.25)+.10*np.sin(2*phase)
        e=np.minimum(1,t/.15)*(.84+.16*np.exp(-t/.5))*release
        y*=e
    elif kind in ['felt','glass','pluck']:
        mod={'felt':.75,'glass':1.18,'pluck':.55}[kind]
        decay={'felt':1.0,'glass':.53,'pluck':.23}[kind]
        y=np.sin(phase+mod*np.exp(-t/.075)*np.sin(2*phase))
        y+=.12*np.sin(3*phase)*np.exp(-t/.1)
        y*=np.minimum(1,t/.003)*np.exp(-t/decay)*release
    elif kind in ['guitar','palm']:
        y=np.zeros_like(t)
        for h in range(1,min(18,int(13000/max(1,frequency)))+1):
            y+=np.sin(h*phase+.11*h)/(h**1.48)*np.exp(-t/(.82/(h**.42)))
        e=np.minimum(1,t/.0025)*release
        if kind=='palm':e*=np.exp(-t/.053)
        else:e*=np.exp(-t/.92)
        y=np.tanh(y*1.28)*e
        # Cabinet rounding: a short moving average suppresses brittle harmonics.
        y=(y+np.roll(y,1)+np.roll(y,2))*.3333333
    elif kind in ['silk','air']:
        y=np.sin(phase)+.12*np.sin(3*phase)/3+.045*np.sin(5*phase)/5
        y+=.16*np.sin(2*np.pi*frequency*2**(-2.8/1200)*t+.4)
        e=np.minimum(1,t/(.028 if kind=='air' else .014))
        e*=(.70+.30*np.exp(-t/.10))*release
        y*=e*.82
        y*=1+.012*np.sin(2*np.pi*4.9*t)
    else:
        y=np.sin(phase)+.20*np.sin(2*phase)+.075*np.sin(3*phase)
        y*=np.minimum(1,t/.005)*(.67+.33*np.exp(-t/.055))*release
    return y.astype(np.float32)


def percussion(rng):
    def clock(seconds):return np.arange(round(seconds*SR),dtype=np.float32)/SR
    t=clock(.45)
    kick=(np.sin(2*np.pi*(46*t+5.1*(1-np.exp(-t/.026))))*np.exp(-t/.105)
          +rng.standard_normal(len(t)).astype(np.float32)*np.exp(-t/.0017)*.10)
    t=clock(.25);n=rng.standard_normal(len(t)).astype(np.float32);n=n-np.roll(n,1)*.62
    snare=(n*.26*np.exp(-t/.055)+np.sin(2*np.pi*188*t)*np.exp(-t/.035)*.58)
    for offset in [.008,.016]:
        snare+=np.roll(n,round(offset*SR))*.10*np.exp(-np.maximum(0,t-offset)/.035)*(t>offset)
    t=clock(.08);n=rng.standard_normal(len(t)).astype(np.float32)
    hat=(n-np.roll(n,1))*.28*np.exp(-t/.013)
    t=clock(.21);n=rng.standard_normal(len(t)).astype(np.float32)
    openhat=(n-np.roll(n,1))*.22*np.exp(-t/.042)
    t=clock(.08)
    rim=(np.sin(2*np.pi*1230*t)+.35*np.sin(2*np.pi*2123*t))*np.exp(-t/.009)
    t=clock(1.15);n=rng.standard_normal(len(t)).astype(np.float32)
    crash=(n-np.roll(n,1)*.65)*np.exp(-t/.27)*np.minimum(1,t/.004)*.4
    return dict(kick=kick,snare=snare,hat=hat,openhat=openhat,rim=rim,crash=crash)


def render(score):
    theme=THEMES[score['themeIndex']]
    mix=({'id':'menu','energy':.52,'lead':.75,'space':.21} if score['scene']=='menu' else MIXES[score['mixIndex']])
    beat=60/theme['bpm'];total=round(BARS*4*beat*SR)
    music=np.zeros((total,2),dtype=np.float32)
    bass=np.zeros(total,dtype=np.float32)
    drums=np.zeros_like(music)
    duck=np.ones(total,dtype=np.float32)
    rng=np.random.default_rng(20261115+score['themeIndex']*997+score['mixIndex']*47)
    kit=percussion(rng)
    note_cache={}

    def put(bus,sound,time,gain,pan=0):
        start=round(time*SR)%total;sound=np.asarray(sound,dtype=np.float32)
        stop=min(total,start+len(sound));count=stop-start
        if bus.ndim==1:
            bus[start:stop]+=sound[:count]*gain
            if len(sound)>count:bus[:len(sound)-count]+=sound[count:]*gain
        else:
            gains=gain*np.array([math.cos((pan+1)*math.pi/4),math.sin((pan+1)*math.pi/4)],dtype=np.float32)
            bus[start:stop]+=sound[:count,None]*gains
            if len(sound)>count:bus[:len(sound)-count]+=sound[count:,None]*gains

    def note(kind,pitch,time,length,gain,pan=0):
        pitch=midi(pitch) if isinstance(pitch,str) else pitch
        cachekey=(kind,pitch,round(length,5))
        if cachekey not in note_cache:note_cache[cachekey]=make_instrument(kind,pitch,length)
        put(bass if kind=='bass' else music,note_cache[cachekey],time,gain,pan)

    def drum(kind,position,gain,pan=0):
        put(drums,kit[kind],position,gain,pan)
        if kind=='kick':
            start=round(position*SR)%total
            samples=1-.48*np.exp(-np.arange(round(.20*SR),dtype=np.float32)/(SR*.045))
            end=min(total,start+len(samples));duck[start:end]*=samples[:end-start]
            if end-start<len(samples):duck[:len(samples)-(end-start)]*=samples[end-start:]

    for bar in range(BARS):
        section,phrase,part,activity=arrangement(bar,mix['id'])
        time=bar*4*beat
        chord_index=(phrase//2)%4
        if section=='intro':chord_index=0 if bar<2 else 3
        if section=='space':chord_index=2 if bar<22 else 3
        chords=theme['chords'+part];roots=theme['bass'+part]
        chord=chords[chord_index];root=midi(roots[chord_index])
        menu=score['scene']=='menu'
        groove=theme['groove']
        # Close voiced chords enter on two-bar boundaries; Night leaves longer gaps.
        if bar%2==0:
            for v,pitch in enumerate(chord):
                note('pad',pitch,time,8*beat,.038*activity,pan=(-.46 if v%2 else .46))
        # A restrained off-beat companion is distinct from the main melody.
        if section not in ['intro','space'] or bar%2==1:
            offsets=([.75,2.5] if menu else [.5,1.75,2.5,3.5] if groove in ['breaks','broken'] else [.5,1.5,2.5,3.5])
            for k,offset in enumerate(offsets):
                if mix['id']=='night' and k%2:continue
                pitch=midi(chord[(k+bar)%len(chord)])
                note('felt' if menu else 'pluck',pitch,time+offset*beat,.32*beat,
                     .060*activity,pan=(-.32 if k%2 else .32))
        # Root/octave groove with deliberately directed approaches to the next root.
        if section not in ['intro','space'] or bar%2==0:
            offsets=([0,2.5] if menu else [0,.75,1.5,2.5,3.25] if groove in ['breaks','broken'] else [0,1,1.5,2.5,3.5] if groove in ['electro','minimal'] else [0,.5,1,1.5,2,2.5,3,3.5] if groove=='rock' else [.5,1.5,2.5,3.5])
            for k,offset in enumerate(offsets):
                if mix['id']=='night' and k in [1,4]:continue
                pitch=root+(12 if k==len(offsets)-2 and groove not in ['minimal','downtempo'] else 0)
                if bar%2==1 and k==len(offsets)-1:
                    next_root=midi(roots[(chord_index+1)%4]);pitch=next_root+(2 if root>next_root else -2)
                note('bass',pitch,time+offset*beat,(.62 if menu else .34)*beat,
                     (.165 if groove=='rock' else .22)*activity*(.9 if k%2 else 1))
        # Palm-muted guitar adds transient motion only to the rock families.
        if groove=='rock' and section not in ['intro','space']:
            for step in range(8):
                if mix['id']=='night' and step%2:continue
                for interval in [12,19]:
                    note('palm',root+interval,time+step*.5*beat,.22*beat,.075*activity,
                         pan=(-.54 if interval==12 else .54))
        # A and B are composed note-for-note, never chosen by a random walk.
        melody=theme[part][phrase%8]
        lead_active=section in ['A','B','return'] or section=='space' and bar in [21,23]
        if mix['id']=='focus':lead_active=lead_active and phrase%4==3
        if lead_active:
            cursor=0.
            for k,(pitch,length) in enumerate(melody):
                if pitch!='_':
                    p=midi(pitch)
                    if mix['id']=='night':p-=12
                    velocity=[.96,.84,.91,.81,1.0,.86][k%6]
                    note(theme['lead'],p,time+cursor*beat,length*beat*.87,
                         .16*mix['lead']*velocity*(.88 if menu else 1),pan=.03)
                    if mix['id']=='peak' and section=='return' and phrase>=4 and length>=.75:
                        note('silk',p-12,time+(cursor+.06)*beat,length*beat*.84,.032,pan=-.2)
                cursor+=length
        # Sparse introduction/space, then clear downbeats and human accents.
        full=section not in ['intro','space']
        if menu:
            kicks=[0,2.5] if full else [0] if bar%2==0 else []
        elif not full:
            kicks=[0] if bar%2==0 else []
        elif groove=='house':kicks=[0,1,2,3]
        elif groove=='breaks':kicks=[[0,1.5,2.75],[0,.75,2.5]][bar%2]
        elif groove=='broken':kicks=[[0,1.5,2.5,3.25],[0,.75,2.25]][bar%2]
        elif groove=='rock':kicks=[[0,.5,2,2.75],[0,1.5,2,3.5]][bar%2]
        elif groove=='electro':kicks=[0,1.75,2.5]
        else:kicks=[0,2.5]
        if mix['id']=='night' and len(kicks)>2:kicks=kicks[:2]
        for k,pos in enumerate(kicks):drum('kick',time+pos*beat,(.47 if groove=='rock' else .52)*mix['energy']*(1 if k==0 else .88))
        if full:
            for pos in [1,3]:
                drum('rim' if menu or mix['id']=='night' else 'snare',time+pos*beat,.19*mix['energy'],pan=.04)
            count=8 if mix['id']!='night' else 4
            for k in range(count):
                pos=k*(4/count)+(.035 if k%2 else 0)
                drum('openhat' if groove=='house' and k%2 else 'hat',time+pos*beat,
                     (.075 if k%2 else .050)*mix['energy'],pan=(-.32 if k%2 else .25))
            if groove=='broken' and mix['id'] in ['drive','peak']:
                for pos in [1.75,3.75]:drum('snare',time+pos*beat,.045,pan=-.1)
            if bar in [11,19,31] and mix['id']!='night':
                for k,pos in enumerate([3.25,3.5,3.75]):drum('snare',time+pos*beat,(.045+k*.018)*mix['energy'],pan=-.15+k*.12)
        if bar in [4,12,24] and mix['id'] not in ['night','focus']:
            drum('crash',time,.055*mix['energy'],pan=.2)

    music*=.86+.14*duck[:,None]
    bass*=duck
    dry=music.copy()
    # Musical dotted-eighth echo + progressively darkened room taps. Tails wrap
    # inside the exact bar-length buffer, retaining musical decay at the seam.
    for delay,gain in [(beat*.75,.075),(beat*1.5,.035)]:
        music+=np.roll(dry[:,::-1],round(delay*SR),axis=0)*gain
    for delay,gain in [(.031,.23),(.053,.17),(.089,.12),(.149,.085),(.233,.06),(.377,.035)]:
        music+=np.roll(dry[:,::-1],round(delay*SR),axis=0)*(gain*mix['space'])
    sound=music+drums+bass[:,None]*.70710678
    # Master EQ: subsonic removal, moderate air shelf, mono low end.
    spectrum=np.fft.rfft(sound,axis=0)
    frequencies=np.fft.rfftfreq(total,1/SR)
    highpass=frequencies**2/(frequencies**2+28**2)
    shelf=1-.30*(frequencies**2/(frequencies**2+6500**2))
    spectrum*=np.asarray(highpass*shelf,dtype=np.float32)[:,None]
    mono=spectrum.mean(axis=1)
    lowweight=np.clip((190-frequencies)/110,0,1)
    spectrum=spectrum*(1-lowweight[:,None])+mono[:,None]*lowweight[:,None]
    sound=np.fft.irfft(spectrum,n=total,axis=0).astype(np.float32)
    sound-=sound.mean(axis=0)
    rms=float(np.sqrt(np.mean(sound*sound)))
    sound*=.115/max(.001,rms)
    # Gentle bus saturation; final encoder uses measured two-pass loudness.
    sound=np.tanh(sound*1.08)/1.08
    maximum=float(np.max(np.abs(sound)))
    if maximum>.82:sound*=.82/maximum
    target=DEST/score['file'];DEST.mkdir(parents=True,exist_ok=True)
    target_i=-19.0 if mix['id'] in ['night','menu'] else -17.5
    with tempfile.TemporaryDirectory(prefix='omoji-score-') as temp:
        wavpath=Path(temp)/'master.wav'
        with wave.open(str(wavpath),'wb') as wav:
            wav.setnchannels(2);wav.setsampwidth(2);wav.setframerate(SR)
            wav.writeframes((np.clip(sound,-1,1)*32767).astype('<i2').tobytes())
        analysis=subprocess.run(['ffmpeg','-hide_banner','-nostats','-i',str(wavpath),
            '-af',f'loudnorm=I={target_i}:TP=-1.8:LRA=10:print_format=json','-f','null','-'],
            capture_output=True,text=True,check=True)
        info=json.loads(analysis.stderr[analysis.stderr.rfind('{'):analysis.stderr.rfind('}')+1])
        limiter=(f'loudnorm=I={target_i}:TP=-1.8:LRA=10:measured_I={info["input_i"]}'
            f':measured_TP={info["input_tp"]}:measured_LRA={info["input_lra"]}'
            f':measured_thresh={info["input_thresh"]}:offset={info["target_offset"]}:linear=true')
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y','-i',str(wavpath),
            '-af',limiter,'-ar',str(SR),'-codec:a','libmp3lame','-b:a','128k',
            '-metadata',f'title={score["title"]}','-metadata','artist=OMOJI Z Original Soundtrack',
            '-metadata',f'comment={VERSION}; original hand-written score; no third-party samples',
            '-write_xing','1',str(target)],check=True)
    audio=target.read_bytes()
    return {**score,'sha256':hashlib.sha256(audio).hexdigest(),'bytes':len(audio),
        'sampleRate':SR,'channels':2,'masterTargetLufs':target_i,
        'sourceIntegratedLufs':float(info['input_i']),'sourceLra':float(info['input_lra']),
        'sourceTruePeakDb':float(info['input_tp']),
        'sourcePcmSha256':hashlib.sha256((np.clip(sound,-1,1)*32767).astype('<i2').tobytes()).hexdigest()}


def write_catalog(scores):
    full=compatibility(scores)
    by_file={s['file']:s for s in scores}
    manifest={'version':VERSION,'themeCount':9,'raceThemeCount':8,'mixCount':33,
      'legacyIdCount':128,'description':'9 hand-written themes: 1 menu + 8 race themes with 4 deliberate mixes each. The 128 saved IDs resolve to these 33 real audio files; aliases are not separate songs.',
      'sampleSource':'None. All recordings are synthesized by compose-audio.py from the explicit original score in soundtrack_score.py.',
      'loop':'32-bar cyclic source buffers with wrapped effect tails. MP3 gapless playback remains browser dependent.',
      'themes':[{k:t[k] for k in ['id','title','subtitle','bpm','scene','key','groove','lead']} for t in THEMES],
      'mixes':MIXES,'files':scores,'tracks':full,'expectedAudioFiles':sorted(by_file)}
    (DEST/'original-score.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    public_keys=['id','canonicalId','title','themeId','themeTitle','subtitle','mixId','mixTitle','mixDescription','bpm','duration','scene','key','file','legacyAlias']
    public=[{k:s[k] for k in public_keys} for s in full]
    lines=['// Generated by tools/compose-audio.py. Do not edit this catalog by hand.',
        'export const soundtrackVersion = '+json.dumps(VERSION)+';',
        'export const soundtrackThemes = Object.freeze('+json.dumps(manifest['themes'],ensure_ascii=False,separators=(',',':'))+'.map(Object.freeze));',
        'export const soundtrack = Object.freeze('+json.dumps(public,ensure_ascii=False,separators=(',',':'))+'.map(Object.freeze));',
        'export const selectableSoundtrack = Object.freeze(soundtrack.filter(track => !track.legacyAlias));',
        'export const menuScore = selectableSoundtrack.find(track => track.scene === "menu");',
        'export const expectedAudioFiles = Object.freeze('+json.dumps(sorted(by_file),separators=(',',':'))+');',
        'const known = new Map(soundtrack.map(track => [track.id, track.canonicalId]));',
        'export function canonicalSongId(id) { return id === "auto" ? "auto" : known.get(id) ?? "auto"; }',
        'export function scoreForId(id) { const canonical = canonicalSongId(id); return selectableSoundtrack.find(track => track.id === canonical) ?? null; }','']
    (ROOT/'assets/soundtrack.js').write_text('\n'.join(lines))
    (ROOT/'tools/obsolete-audio-files.json').write_text(json.dumps({'version':VERSION,
        'policy':'Only MP3 files directly inside assets/audio that are absent from expectedAudioFiles are removed by a full build.',
        'expectedAudioFiles':sorted(by_file),
        'legacyFiles':[f'parapara-{i:03}.mp3' for i in range(128)]},indent=2)+'\n')
    return manifest


def verify():
    manifest=json.loads((DEST/'original-score.json').read_text())
    expected=set(manifest['expectedAudioFiles'])
    actual={f.name for f in DEST.glob('*.mp3')}
    assert expected==actual,{'missing':sorted(expected-actual),'obsolete':sorted(actual-expected)}
    assert len(expected)==33 and len(manifest['tracks'])==128
    assert len({t['canonicalId'] for t in manifest['tracks']})==33
    hashes=set()
    for item in manifest['files']:
        path=DEST/item['file'];data=path.read_bytes()
        assert hashlib.sha256(data).hexdigest()==item['sha256'],item['file']
        hashes.add(item['sha256'])
        probe=json.loads(subprocess.run(['ffprobe','-v','error','-show_entries','format=duration:stream=sample_rate,channels','-of','json',str(path)],capture_output=True,text=True,check=True).stdout)
        assert probe['streams'][0]['channels']==2 and int(probe['streams'][0]['sample_rate'])==SR
        assert abs(float(probe['format']['duration'])-item['duration'])<.10,(item['file'],probe)
        subprocess.run(['ffmpeg','-v','error','-xerror','-i',str(path),'-f','null','-'],capture_output=True,check=True)
    assert len(hashes)==33
    print('Verified: 9 themes / 33 distinct audio files / 128 resolving saved IDs; no obsolete MP3 files.',flush=True)


def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--jobs',type=int,default=2)
    parser.add_argument('--preview',action='store_true',help='render menu + Glass Vector Drive + Static Bloom Drive only; preserve other files')
    parser.add_argument('--theme',action='append',choices=[t['id'] for t in THEMES])
    parser.add_argument('--metadata-only',action='store_true',help='write catalog without rendering; preserve metadata for existing validated files')
    parser.add_argument('--verify',action='store_true')
    args=parser.parse_args()
    if args.verify:verify();return
    DEST.mkdir(parents=True,exist_ok=True)
    scores=actual_scores();expected={s['file'] for s in scores}
    old={}
    manifest_file=DEST/'original-score.json'
    if manifest_file.exists():
        prior=json.loads(manifest_file.read_text())
        if prior.get('version')==VERSION:old={x['file']:x for x in prior.get('files',[])}
    for i,score in enumerate(scores):
        if score['file'] in old:scores[i]={**score,**old[score['file']]}
    if args.metadata_only:
        write_catalog(scores);print('Wrote 128-ID compatibility catalog and 33-file expected list.');return
    chosen=scores
    if args.preview:chosen=[s for s in scores if s['id'] in ['parapara-000','parapara-001','parapara-002']]
    if args.theme:chosen=[s for s in scores if s['themeId'] in args.theme]
    results=[]
    with ProcessPoolExecutor(max_workers=max(1,min(4,args.jobs))) as pool:
        for future in as_completed([pool.submit(render,s) for s in chosen]):
            result=future.result();results.append(result)
            print(result['file']+f' {result["duration"]:.2f}s / {result["masterTargetLufs"]} LUFS target',flush=True)
    changed={s['file']:s for s in results}
    scores=[changed.get(s['file'],s) for s in scores]
    # A complete build retires every prior MP3, including the former 128 aliases.
    # Partial previews intentionally preserve other assets for comparison.
    if not args.preview and not args.theme:
        for path in DEST.glob('*.mp3'):
            if path.name not in expected:path.unlink()
    write_catalog(scores)
    print(f'Rendered {len(results)} real mixes; complete expected catalog is 33 files / 128 saved IDs.',flush=True)
    if not args.preview and not args.theme:verify()


if __name__=='__main__':main()
