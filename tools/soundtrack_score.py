"""Hand-written original melodic and harmonic score for OMOJI Z, November 2026.

Each theme has two deliberately composed eight-bar melodies, two harmonic
sections with close-position chord voicings, a bass route, and its own groove.
No existing songs, MIDI files, recordings, or third-party samples are used.
"""
VERSION = 'omoji-score-v3-20261115'
MIXES = [
    {'id':'drive','title':'Drive','description':'主旋律とリズムを軸にした標準ミックス','energy':.88,'lead':1.0,'space':.16},
    {'id':'night','title':'Night','description':'低い音域の主旋律と控えめなドラム、広い余白','energy':.65,'lead':.78,'space':.23},
    {'id':'focus','title':'Focus','description':'主旋律を減らし、ベースと伴奏の推進力を残す','energy':.75,'lead':.36,'space':.13},
    {'id':'peak','title':'Peak','description':'後半の応答フレーズとフィルを増やした展開','energy':1.0,'lead':1.0,'space':.15},
]

def melody(*bars):
    out=[]
    for text in bars:
        notes=[]
        for token in text.split():
            note,length=token.split('/');notes.append((note,float(length)))
        assert abs(sum(n[1] for n in notes)-4)<1e-7,(text,sum(n[1] for n in notes))
        out.append(notes)
    assert len(out)==8
    return out


def theme(id,title,subtitle,bpm,scene,key,groove,lead,chordsA,bassA,chordsB,bassB,A,B):
    return dict(id=id,title=title,subtitle=subtitle,bpm=bpm,scene=scene,key=key,
                groove=groove,lead=lead,chordsA=[x.split() for x in chordsA],
                bassA=bassA.split(),chordsB=[x.split() for x in chordsB],bassB=bassB.split(),A=A,B=B)

THEMES = [
 theme('blue-hour','Blue Hour','静かな点火',92,'menu','D major','downtempo','felt',
  ['D4 F#4 A4 E5','B3 D4 F#4 A4','G3 B3 D4 A4','A3 C#4 E4 B4'],'D2 B1 G1 A1',
  ['G3 B3 D4 F#4','F#3 A3 C#4 E4','E3 G3 B3 F#4','A3 C#4 E4 G4'],'G1 F#1 E2 A1',
  melody('F#4/.75 A4/.25 B4/.5 A4/.5 F#4/1 E4/1','D4/1 F#4/.5 A4/.5 E5/.75 D5/.25 A4/1',
   'F#4/1 A4/.5 D5/.5 C#5/.5 B4/.5 A4/1','F#4/.75 E4/.25 D4/1 _/1 F#4/1',
   'G4/1 B4/.5 D5/.5 F#5/.75 E5/.25 D5/1','B4/1 A4/.5 G4/.5 F#4/1 E4/1',
   'E4/.75 A4/.25 B4/1 C#5/.5 B4/.5 A4/1','G4/1 E4/1 C#4/.5 E4/.5 A4/1'),
  melody('B4/1 D5/.5 F#5/.5 E5/1 D5/1','B4/.75 A4/.25 G4/1 D5/1 B4/1',
   'C#5/1 E5/.5 F#5/.5 A5/1 G5/.5 F#5/.5','E5/.75 C#5/.25 A4/1 C#5/1 E5/1',
   'B4/1 G4/.5 F#4/.5 E4/1 F#4/1','G4/.75 B4/.25 D5/1 F#5/1 E5/1',
   'C#5/1 B4/.5 A4/.5 E4/1 G4/1','F#4/1 E4/1 C#4/.5 E4/.5 D4/1')),
 theme('glass-vector','Glass Vector','曲線の先へ',130,'curve','D minor','breaks','glass',
  ['D4 F4 A4 E5','Bb3 D4 F4 A4','F4 A4 C5 G5','C4 E4 G4 D5'],'D2 Bb1 F2 C2',
  ['G3 Bb3 D4 A4','Bb3 D4 F4 C5','D4 F4 A4 E5','A3 C#4 E4 G4'],'G1 Bb1 D2 A1',
  melody('D5/.75 F5/.25 A5/.5 G5/.5 F5/1 E5/1','D5/.5 _/.5 A4/.5 C5/.5 D5/1 F5/1',
   'D5/.75 F5/.25 A5/1 F5/.5 D5/.5 C5/1','Bb4/.5 D5/.5 F5/.75 E5/.25 D5/1 _/1',
   'A4/.5 C5/.5 F5/1 G5/.75 A5/.25 C6/1','A5/.5 G5/.5 F5/1 E5/.5 C5/.5 A4/1',
   'G4/.5 C5/.5 E5/.75 G5/.25 A5/1 G5/1','E5/.5 D5/.5 C5/1 E5/.75 D5/.25 C5/1'),
  melody('Bb4/.5 D5/.5 G5/.75 A5/.25 Bb5/1 A5/1','G5/.5 F5/.5 D5/1 Bb4/.5 D5/.5 F5/1',
   'F5/.75 A5/.25 C6/1 A5/.5 F5/.5 D5/1','C5/.5 D5/.5 F5/.75 A5/.25 F5/1 _/1',
   'A5/1 G5/.5 F5/.5 E5/.75 D5/.25 F5/1','E5/.5 D5/.5 A4/1 D5/.75 F5/.25 A5/1',
   'G5/.75 E5/.25 C#5/1 E5/.5 G5/.5 A5/1','E5/.5 C#5/.5 A4/1 C#5/.75 E5/.25 D5/1')),
 theme('static-bloom','Static Bloom','鼓動を重ねて',136,'straight','E minor','rock','guitar',
  ['E4 G4 B4 F#5','C4 E4 G4 B4','G3 B3 D4 A4','D4 F#4 A4 E5'],'E2 C2 G1 D2',
  ['A3 C4 E4 B4','C4 E4 G4 D5','E4 G4 B4 F#5','B3 D#4 F#4 A4'],'A1 C2 E2 B1',
  melody('E5/1 G5/.5 B5/.5 A5/.5 G5/.5 F#5/1','E5/.5 B4/.5 D5/.5 E5/.5 G5/1 F#5/1',
   'E5/.75 G5/.25 B5/1 G5/.5 E5/.5 D5/1','C5/.5 D5/.5 E5/1 G5/.5 E5/.5 C5/1',
   'D5/.5 G5/.5 A5/1 B5/.75 A5/.25 G5/1','D5/1 B4/.5 D5/.5 G5/1 A5/1',
   'A5/.75 F#5/.25 E5/.5 D5/.5 F#5/1 A5/1','G5/.5 F#5/.5 E5/1 D5/.5 B4/.5 D5/1'),
  melody('A5/1 C6/.5 B5/.5 A5/.75 G5/.25 E5/1','G5/.5 A5/.5 B5/1 C6/.5 B5/.5 A5/1',
   'G5/1 E5/.5 D5/.5 C5/.5 E5/.5 G5/1','B5/.75 G5/.25 E5/1 D5/.5 E5/.5 G5/1',
   'B5/1 A5/.5 G5/.5 F#5/.5 G5/.5 E5/1','D5/.5 E5/.5 G5/1 B5/.5 A5/.5 G5/1',
   'F#5/.75 D#5/.25 B4/1 D#5/.5 F#5/.5 A5/1','F#5/.5 D#5/.5 B4/1 F#5/.75 D#5/.25 E5/1')),
 theme('night-relay','Night Relay','夜景のリズム',118,'urban','F# minor','electro','silk',
  ['F#3 A3 C#4 G#4','D4 F#4 A4 C#5','A3 C#4 E4 B4','E4 G#4 B4 F#5'],'F#1 D2 A1 E2',
  ['B3 D4 F#4 A4','E4 G#4 B4 D5','A3 C#4 E4 G#4','C#4 E#4 G#4 B4'],'B1 E2 A1 C#2',
  melody('C#5/.5 _/.5 A4/.5 C#5/.5 E5/.75 F#5/.25 E5/1','C#5/1 A4/.5 G#4/.5 F#4/1 _/1',
   'A4/.5 C#5/.5 D5/1 F#5/.5 E5/.5 D5/1','C#5/.75 A4/.25 F#4/1 A4/.5 C#5/.5 D5/1',
   'E5/.5 C#5/.5 B4/.5 A4/.5 C#5/1 E5/1','G#5/.75 E5/.25 C#5/1 B4/.5 A4/.5 C#5/1',
   'B4/.5 E5/.5 F#5/.75 G#5/.25 F#5/1 E5/1','D5/.5 B4/.5 G#4/1 B4/.75 C#5/.25 B4/1'),
  melody('D5/1 F#5/.5 A5/.5 G#5/.5 F#5/.5 E5/1','D5/.5 C#5/.5 B4/1 D5/.5 F#5/.5 A5/1',
   'G#5/.75 F#5/.25 E5/1 D5/.5 B4/.5 E5/1','F#5/.5 E5/.5 B4/.5 G#4/.5 B4/1 D5/1',
   'E5/.5 G#5/.5 A5/1 G#5/.75 E5/.25 C#5/1','B4/.5 C#5/.5 E5/1 G#5/.5 F#5/.5 E5/1',
   'G#5/1 E#5/.5 C#5/.5 B4/1 G#4/1','B4/.75 C#5/.25 E#5/.5 G#5/.5 E#5/1 F#5/1')),
 theme('aerial-current','Aerial Current','空に沿うライン',128,'circuit','G dorian','house','air',
  ['G3 Bb3 D4 A4','C4 E4 G4 D5','Eb4 G4 Bb4 F5','F4 A4 C5 G5'],'G1 C2 Eb2 F2',
  ['Bb3 D4 F4 A4','C4 E4 G4 Bb4','G3 Bb3 D4 F4','F3 A3 C4 E4'],'Bb1 C2 G1 F2',
  melody('D5/.5 G5/.5 A5/1 Bb5/.75 A5/.25 G5/1','F5/.5 D5/.5 Bb4/1 D5/.75 F5/.25 G5/1',
   'G5/1 E5/.5 D5/.5 C5/.5 D5/.5 E5/1','G5/.75 A5/.25 G5/1 E5/.5 D5/.5 C5/1',
   'Bb4/.5 Eb5/.5 F5/1 G5/.75 Bb5/.25 G5/1','F5/.5 Eb5/.5 Bb4/1 Eb5/1 G5/1',
   'A5/.75 G5/.25 F5/1 E5/.5 C5/.5 D5/1','F5/.5 A5/.5 C6/1 A5/.75 G5/.25 F5/1'),
  melody('F5/.5 A5/.5 Bb5/1 D6/1 C6/.5 A5/.5','F5/.75 D5/.25 Bb4/1 D5/.5 F5/.5 A5/1',
   'G5/.5 E5/.5 C5/1 D5/.75 E5/.25 G5/1','Bb5/1 A5/.5 G5/.5 E5/1 D5/1',
   'D5/.5 F5/.5 G5/1 Bb5/.75 A5/.25 G5/1','F5/.5 D5/.5 Bb4/1 D5/.5 F5/.5 A5/1',
   'A5/1 G5/.5 E5/.5 C5/1 D5/1','E5/.75 G5/.25 A5/.5 G5/.5 F5/1 G5/1')),
 theme('copper-run','Copper Run','鋭い足取り',144,'straight','B minor','broken','pluck',
  ['B3 D4 F#4 C#5','G3 B3 D4 A4','D4 F#4 A4 E5','A3 C#4 E4 B4'],'B1 G1 D2 A1',
  ['E4 G4 B4 F#5','G3 B3 D4 F#4','B3 D4 F#4 A4','F#3 A#3 C#4 E4'],'E2 G1 B1 F#1',
  melody('B4/.5 D5/.5 F#5/.75 E5/.25 D5/.5 B4/.5 C#5/1','F#4/.5 B4/.5 D5/1 F#5/.5 E5/.5 D5/1',
   'B4/.75 D5/.25 G5/1 F#5/.5 D5/.5 B4/1','A4/.5 B4/.5 D5/1 F#5/.75 D5/.25 B4/1',
   'F#5/.5 A5/.5 E5/1 D5/.75 C#5/.25 D5/1','F#5/.5 E5/.5 D5/1 A4/.5 D5/.5 F#5/1',
   'E5/.5 A5/.5 B5/.75 A5/.25 G5/.5 E5/.5 C#5/1','B4/.5 C#5/.5 E5/1 G5/.75 E5/.25 C#5/1'),
  melody('E5/.5 G5/.5 B5/1 A5/.75 G5/.25 F#5/1','E5/.5 B4/.5 D5/1 E5/.5 G5/.5 A5/1',
   'B5/.75 A5/.25 G5/1 F#5/.5 D5/.5 B4/1','D5/.5 F#5/.5 G5/1 B5/.5 A5/.5 G5/1',
   'F#5/1 D5/.5 B4/.5 A4/.5 B4/.5 D5/1','F#5/.5 A5/.5 B5/1 A5/.75 F#5/.25 D5/1',
   'C#5/.5 F#5/.5 A#5/.75 G#5/.25 F#5/1 E5/1','C#5/.5 A#4/.5 F#4/1 A#4/.75 C#5/.25 B4/1')),
 theme('rain-geometry','Rain Geometry','雨音の余白',122,'wet','C# minor','minimal','felt',
  ['C#4 E4 G#4 D#5','A3 C#4 E4 G#4','E4 G#4 B4 F#5','B3 D#4 F#4 C#5'],'C#2 A1 E2 B1',
  ['F#3 A3 C#4 E4','A3 C#4 E4 B4','G#3 B3 D#4 F#4','G#3 B#3 D#4 F#4'],'F#1 A1 G#1 G#1',
  melody('G#4/.75 E4/.25 C#4/1 D#4/.5 E4/.5 G#4/1','B4/1 G#4/.5 E4/.5 D#4/1 _/1',
   'E4/.5 A4/.5 B4/1 C#5/.75 B4/.25 A4/1','G#4/.5 E4/.5 C#4/1 E4/.75 G#4/.25 A4/1',
   'B4/1 G#4/.5 F#4/.5 E4/.5 G#4/.5 B4/1','D#5/.75 B4/.25 G#4/1 F#4/.5 E4/.5 G#4/1',
   'F#4/.5 B4/.5 C#5/1 D#5/.75 C#5/.25 B4/1','A4/.5 F#4/.5 D#4/1 F#4/.75 G#4/.25 F#4/1'),
  melody('A4/1 C#5/.5 E5/.5 F#5/1 E5/1','C#5/.75 A4/.25 F#4/1 A4/.5 C#5/.5 E5/1',
   'E5/1 C#5/.5 B4/.5 A4/1 G#4/1','E4/.5 A4/.5 C#5/1 E5/.75 D#5/.25 C#5/1',
   'B4/.5 D#5/.5 F#5/1 G#5/.75 F#5/.25 D#5/1','B4/1 G#4/.5 F#4/.5 D#4/1 _/1',
   'D#5/.75 B#4/.25 G#4/1 B#4/.5 D#5/.5 F#5/1','D#5/.5 B#4/.5 G#4/1 B#4/.75 D#5/.25 C#5/1')),
 theme('northern-lights','Northern Lights','白夜の道標',126,'snow','A major','rock','silk',
  ['A3 C#4 E4 B4','F#3 A3 C#4 E4','D4 F#4 A4 E5','E4 G#4 B4 F#5'],'A1 F#1 D2 E2',
  ['D4 F#4 A4 C#5','C#4 E4 G#4 B4','B3 D4 F#4 A4','E4 G#4 B4 D5'],'D2 C#2 B1 E2',
  melody('E5/.5 A5/.5 B5/1 C#6/.75 B5/.25 A5/1','G#5/.5 E5/.5 C#5/1 E5/.75 G#5/.25 A5/1',
   'C#5/.5 F#5/.5 A5/1 G#5/.5 F#5/.5 E5/1','C#5/.75 E5/.25 F#5/1 A5/1 G#5/.5 F#5/.5',
   'F#5/.5 A5/.5 E5/1 D5/.75 C#5/.25 D5/1','F#5/.5 E5/.5 D5/1 A4/.5 D5/.5 F#5/1',
   'B5/.75 G#5/.25 F#5/1 E5/.5 F#5/.5 G#5/1','B5/.5 A5/.5 G#5/1 F#5/.75 E5/.25 B4/1'),
  melody('A5/1 F#5/.5 E5/.5 D5/.75 F#5/.25 A5/1','C#6/.5 B5/.5 A5/1 F#5/.5 E5/.5 D5/1',
   'G#5/.5 E5/.5 C#5/1 E5/.75 G#5/.25 B5/1','A5/1 G#5/.5 E5/.5 C#5/1 B4/1',
   'F#5/.75 D5/.25 B4/1 D5/.5 F#5/.5 A5/1','G#5/.5 F#5/.5 E5/1 D5/.75 C#5/.25 B4/1',
   'B5/1 G#5/.5 F#5/.5 E5/.75 D5/.25 B4/1','G#4/.5 B4/.5 E5/1 G#5/.75 B5/.25 A5/1')),
 theme('red-meridian','Red Meridian','明日への加速',138,'general','A minor','rock','guitar',
  ['A3 C4 E4 B4','F3 A3 C4 E4','C4 E4 G4 D5','G3 B3 D4 A4'],'A1 F1 C2 G1',
  ['D4 F4 A4 E5','F3 A3 C4 G4','A3 C4 E4 G4','E3 G#3 B3 D4'],'D2 F1 A1 E2',
  melody('A4/1 C5/.5 E5/.5 G5/.75 E5/.25 D5/1','C5/.5 A4/.5 B4/.5 C5/.5 E5/1 D5/1',
   'C5/.75 F5/.25 A5/1 G5/.5 E5/.5 C5/1','A4/.5 C5/.5 F5/1 E5/.75 D5/.25 C5/1',
   'E5/.5 G5/.5 B5/1 G5/.75 E5/.25 D5/1','C5/.5 E5/.5 G5/1 B5/.5 G5/.5 E5/1',
   'D5/.5 G5/.5 A5/.75 B5/.25 A5/1 G5/1','F5/.5 D5/.5 B4/1 D5/.75 E5/.25 G5/1'),
  melody('A5/1 F5/.5 E5/.5 D5/.75 E5/.25 F5/1','A5/.5 G5/.5 F5/1 E5/.5 D5/.5 A4/1',
   'C5/.5 F5/.5 G5/1 A5/.75 C6/.25 A5/1','G5/.5 E5/.5 C5/1 F5/.5 A5/.5 C6/1',
   'E5/1 A5/.5 G5/.5 E5/.75 C5/.25 A4/1','B4/.5 C5/.5 E5/1 G5/.5 E5/.5 C5/1',
   'B4/.5 E5/.5 G#5/.75 B5/.25 G#5/1 E5/1','D5/.5 B4/.5 G#4/1 B4/.75 E5/.25 A4/1')),
]
