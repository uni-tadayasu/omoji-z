#!/usr/bin/env python3
"""Build original, deterministic SVG illustrations without external artwork.

The illustrated routes are independent scenic concepts, not race geometry or
real-world maps. The vehicle geometry is authored here and carries no badge.
Run: python3 tools/generate-art.py
"""
from pathlib import Path
import hashlib
import json
import math
import random
import sys
import struct
from html import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'art'
W, H = 1600, 900


def seed(key):
    return int.from_bytes(hashlib.sha256(key.encode()).digest()[:8], 'big')


def path(points, close=False):
    return 'M' + 'L'.join(f'{x:.2f},{y:.2f}' for x, y in points) + ('Z' if close else '')


def svg_start(title, *, night=False, color='#24404e'):
    sky = ('#081525', '#294458', '#d29976') if night else ('#123e62', '#8ab8cb', '#f0c799')
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" role="img" aria-labelledby="title">
<title id="title">{escape(title)}</title>
<defs>
<linearGradient id="sky" x2="0" y2="1"><stop stop-color="{sky[0]}"/><stop offset=".64" stop-color="{sky[1]}"/><stop offset="1" stop-color="{sky[2]}"/></linearGradient>
<linearGradient id="ground" x2="0" y2="1"><stop stop-color="{color}"/><stop offset="1" stop-color="#081515"/></linearGradient>
<linearGradient id="road" x1="0" y1="0" x2=".4" y2="1"><stop stop-color="#53616a"/><stop offset=".35" stop-color="#384650"/><stop offset="1" stop-color="#101b24"/></linearGradient>
<linearGradient id="metal" gradientUnits="userSpaceOnUse" x1="400" y1="300" x2="1050" y2="760"><stop stop-color="#e7fafc"/><stop offset=".15" stop-color="#9bbdc4"/><stop offset=".32" stop-color="#eef3e6"/><stop offset=".42" stop-color="#4a7786"/><stop offset=".64" stop-color="#1c424f"/><stop offset=".82" stop-color="#708e8d"/><stop offset="1" stop-color="#152830"/></linearGradient>
<linearGradient id="glass" gradientUnits="userSpaceOnUse" x1="0" y1="300" x2="160" y2="640"><stop stop-color="#bed1db"/><stop offset=".23" stop-color="#506f83"/><stop offset=".27" stop-color="#93acb6"/><stop offset=".32" stop-color="#273c50"/><stop offset="1" stop-color="#081522"/></linearGradient>
<linearGradient id="body" gradientUnits="userSpaceOnUse" x1="0" y1="350" x2="0" y2="780"><stop stop-color="#afc6c6"/><stop offset=".26" stop-color="#6e959d"/><stop offset=".44" stop-color="#1d4e60"/><stop offset=".49" stop-color="#69919a"/><stop offset=".57" stop-color="#244e5b"/><stop offset="1" stop-color="#102e3d"/></linearGradient>
<radialGradient id="sun"><stop stop-color="#fff3cb" stop-opacity=".8"/><stop offset=".12" stop-color="#ffd5a2" stop-opacity=".5"/><stop offset="1" stop-color="#edbe9c" stop-opacity="0"/></radialGradient>
<radialGradient id="shadow"><stop stop-color="#02090c" stop-opacity=".9"/><stop offset="1" stop-color="#02090c" stop-opacity="0"/></radialGradient>
<pattern id="grain" width="19" height="23" patternUnits="userSpaceOnUse"><path d="M2 4h1m10 12h1m-5 5h1m7-16h1" stroke="#dae6de" stroke-opacity=".12" stroke-width=".7"/></pattern>
<filter id="bloom"><feGaussianBlur stdDeviation="6"/></filter>
</defs>'''


def terrain(rng, biome, night=False):
    colors = {
        'snow': ['#bacbd1', '#819aa9', '#496675', '#2a444f'],
        'coast': ['#7694a0', '#527a88', '#315f70', '#244b50'],
        'rock': ['#b3907b', '#866e68', '#5e5357', '#3c3b42'],
        'forest': ['#79949c', '#527783', '#34595e', '#193c3e'],
        'city': ['#79909e', '#546879', '#354b5c', '#213442'],
    }[biome]
    chunks = ['<rect width="1600" height="900" fill="url(#sky)"/>',
              '<ellipse cx="1190" cy="292" rx="560" ry="320" fill="url(#sun)"/>']
    if night:
        for _ in range(42):
            x, y = rng.uniform(20, 1580), rng.uniform(20, 260)
            chunks.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{rng.uniform(.6,1.6):.1f}" fill="#e9f3fc" opacity="{rng.uniform(.15,.65):.2f}"/>')
        chunks.append('<circle cx="1280" cy="133" r="28" fill="#cdd9d6" opacity=".82"/>')
    for layer in range(4):
        points = [(-90, 920)]
        for x in range(-90, 1750, 95):
            base = 330 + layer * 78
            y = base - rng.uniform(20, 150 - layer * 16)
            points.append((x, y))
        points += [(1750, 920)]
        chunks.append(f'<path d="{path(points,True)}" fill="{colors[layer]}"/>')
        if biome == 'snow' and layer < 2:
            for j in range(2, len(points) - 2, 3):
                x, y = points[j]
                chunks.append(f'<path d="M{x-50:.1f},{y+55:.1f}L{x:.1f},{y:.1f}L{x+62:.1f},{y+65:.1f}L{x+7:.1f},{y+35:.1f}L{x-10:.1f},{y+47:.1f}Z" fill="#e2ebeb" opacity=".65"/>')
    chunks.append('<path d="M0 455Q750 350 1600 470V900H0Z" fill="url(#ground)"/>')
    if biome == 'coast':
        chunks += ['<path d="M820 364Q1300 341 1600 374V900H1020Z" fill="#548193"/>',
                   '<path d="M946 428Q1280 393 1600 413M1000 466Q1350 424 1600 441M1060 514Q1390 473 1600 485" fill="none" stroke="#a7cad0" opacity=".38"/>']
    if biome == 'city':
        for i in range(47):
            x = i * 38 - 70
            bw, bh = rng.uniform(22, 52), rng.uniform(30, 155)
            chunks.append(f'<path d="M{x:.1f} 480v{-bh:.1f}h{bw:.1f}V480Z" fill="#203846"/>')
            for yy in range(int(480 - bh + 10), 470, 14):
                if rng.random() > .2:
                    chunks.append(f'<path d="M{x+5:.1f},{yy}h{bw-10:.1f}" stroke="#c7ad7a" stroke-width="2" opacity=".45"/>')
    return ''.join(chunks)


def road_scene(key, title, number=0, *, hero=False, biome=None, night=None, with_map=True, wet=False):
    rng = random.Random(seed(key))
    if biome is None:
        biome = ['forest', 'coast', 'snow', 'rock', 'city'][seed(key) % 5]
    if night is None:
        night = seed(key + ':light') % 3 == 0
    color = {'snow':'#96aeb0','coast':'#35665e','rock':'#68534c','city':'#30414a','forest':'#31554a'}[biome]
    chunks = [svg_start(title, night=night, color=color), terrain(rng, biome, night)]
    # Analytic road: screen depth is perspective-compressed, horizontal radius
    # changes smoothly along this illustration's independent seeded alignment.
    phase, frequency = rng.uniform(-1, 1), rng.uniform(1.8, 3.7)
    bend = rng.uniform(-.95, .95)
    def center(t):
        return 800 + math.sin(t*frequency + phase) * 200*t + bend*380*t*t
    rows = []
    for j in range(83):
        t = j / 82
        p = t**1.55
        y = 387 + p * 575
        width = 8 + p * 630
        cx = center(t)
        rows.append((cx, y, width, t))
    chunks.append(f'<path d="{path([(c-w*1.15,y) for c,y,w,t in rows]+[(c+w*1.15,y) for c,y,w,t in reversed(rows)],True)}" fill="#6b6b5e"/>')
    chunks.append(f'<path d="{path([(c-w,y) for c,y,w,t in rows]+[(c+w,y) for c,y,w,t in reversed(rows)],True)}" fill="url(#road)"/>')
    chunks.append(f'<path d="{path([(c-w,y) for c,y,w,t in rows]+[(c+w,y) for c,y,w,t in reversed(rows)],True)}" fill="url(#grain)"/>')
    if wet:
        for j in range(18,82,3):
            c,y,w,t=rows[j]
            cx=c+rng.uniform(-.75,.75)*w
            chunks.append(f'<ellipse cx="{cx:.1f}" cy="{y:.1f}" rx="{w*rng.uniform(.05,.18):.1f}" ry="{.7+t*3:.1f}" fill="#97b0bb" opacity="{rng.uniform(.07,.19):.2f}"/>')
        chunks.append(f'<path d="{path([(c+w*.38,y) for c,y,w,t in rows[20:]])}" fill="none" stroke="#b5cbcd" stroke-width="18" opacity=".035"/>')
    for side in [-1, 1]:
        chunks.append(f'<path d="{path([(c+side*w*.94,y) for c,y,w,t in rows])}" fill="none" stroke="#e0ded2" stroke-width="2.2" opacity=".7"/>')
        # Guardrail spans read as continuous structure, with perspective posts.
        for factor, stroke, opacity in [(1.09, '#aebbbb', '.75'), (1.08,'#415760','.8')]:
            chunks.append(f'<path d="{path([(c+side*w*factor,y-4-t*46) for c,y,w,t in rows])}" fill="none" stroke="{stroke}" stroke-width="{3 if factor>1.08 else 7}" opacity="{opacity}"/>')
        for j in range(10, 83, 7):
            c,y,w,t=rows[j]
            chunks.append(f'<path d="M{c+side*w*1.09:.1f},{y-5-t*47:.1f}v{8+t*50:.1f}" stroke="#a1afb0" stroke-width="{1+t*3:.1f}"/>')
    for j in range(8, 81, 7):
        pts = rows[j:j+3]
        chunks.append(f'<path d="{path([(c,y) for c,y,w,t in pts])}" fill="none" stroke="#dcc694" stroke-width="{.6+pts[-1][3]*5:.1f}" opacity=".8"/>')
    # Original patching and subtle wheel tracks rather than a photo texture.
    for j in range(15, 80, 8):
        c,y,w,t=rows[j]
        side = -1 if j % 3 else 1
        chunks.append(f'<path d="M{c+side*w*.2:.1f},{y:.1f}q{w*.03:.1f},{2+t*7:.1f} {w*.25:.1f},{4+t*10:.1f}" stroke="#152935" stroke-width="{.3+t*1.8:.1f}" fill="none" opacity=".65"/>')
    for side in [-1,1]:
        for j in range(9,77,5):
            c,y,w,t=rows[j]
            spread = 1.3 + rng.random() * 1.6
            x = c + side*w*spread
            h = 10 + t*t*150
            tw = h*.35
            if biome == 'snow':
                foliage = '#728c89'
            elif biome == 'rock':
                foliage = '#395646'
            else:
                foliage = '#173d39' if not night else '#102c31'
            if biome != 'city' and biome != 'coast':
                chunks.append(f'<path d="M{x:.1f},{y-h:.1f}l{-tw:.1f},{h*.77:.1f}h{tw*.35:.1f}l{-tw*.53:.1f},{h*.2:.1f}h{tw*2.36:.1f}l{-tw*.53:.1f},{-h*.2:.1f}h{tw*.35:.1f}Z" fill="{foliage}"/>')
                chunks.append(f'<path d="M{x:.1f},{y-h*.4:.1f}v{h*.47:.1f}" stroke="#354b43" stroke-width="{1+t*3:.1f}"/>')
            elif j%10 == 9:
                chunks.append(f'<path d="M{x:.1f},{y:.1f}v{-h*1.5:.1f}l{-side*h*.3:.1f},{-h*.1:.1f}" fill="none" stroke="#6d818a" stroke-width="{1+t*5:.1f}"/>')
                chunks.append(f'<circle cx="{x-side*h*.3:.1f}" cy="{y-h*1.6:.1f}" r="{2+t*3:.1f}" fill="#fff0cd"/>')
    # Independent overview map. Kept off the left side of cover art for UI copy.
    if with_map:
        route=[]
        for i in range(81):
            t=i/80
            route.append((1308 + math.sin(t*frequency*2+phase)*54 + math.cos(t*3.1+phase)*20,
                          83+t*176))
        chunks.append('<rect x="1198" y="36" width="345" height="266" rx="14" fill="#06121b" fill-opacity=".65" stroke="#b7d0d3" stroke-opacity=".22"/>')
        chunks.append(f'<path d="{path(route)}" fill="none" stroke="#5c818a" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><path d="{path(route)}" fill="none" stroke="#e3e6d8" stroke-width="3" stroke-linecap="round"/>')
        chunks.append(f'<circle cx="{route[0][0]:.1f}" cy="{route[0][1]:.1f}" r="5" fill="#9ee5cc"/><circle cx="{route[-1][0]:.1f}" cy="{route[-1][1]:.1f}" r="5" fill="#f6bf84"/>')
        chunks.append(f'<text x="1220" y="68" fill="#bdcccf" font-size="15" font-family="system-ui,sans-serif" letter-spacing="2">ROUTE {number:03d}</text>')
        chunks.append('<text x="1220" y="282" fill="#93aaaf" font-size="12" font-family="system-ui,sans-serif">ORIGINAL SCENIC STUDY</text>')
    if hero:
        chunks.append('<ellipse cx="1080" cy="690" rx="490" ry="100" fill="url(#shadow)"/>')
        chunks.append(car_mesh('coupe', x=1080, y=620, scale=142))
        chunks.append('<path d="M0 0H740L930 900H0Z" fill="#061019" opacity=".33"/>')
    chunks += ['<rect width="1600" height="900" fill="url(#grain)" opacity=".24"/>','</svg>']
    return ''.join(chunks)


def car_mesh(kind='coupe', *, x=820,y=565,scale=164, paint='#345c6f'):
    """Project an authored rounded body, glazed cabin and alloy wheels."""
    rng=random.Random(seed('original-car:'+kind))
    camera=(.66,.32,.68)
    # Orthographic projection with a little perspective keeps vehicle proportions.
    def project(p):
        px,py,pz=p
        depth=px*camera[0]+py*camera[1]+pz*camera[2]
        factor=1+depth*.035
        return (x+scale*(px*.72-pz*.71)*factor,
                y+scale*(-py*.94+(px*.23+pz*.23))*factor)
    def depth(points):
        return sum(p[0]*camera[0]+p[1]*camera[1]+p[2]*camera[2] for p in points)/len(points)
    shapes=[]
    def face(points, fill, stroke=None, opacity=1):
        shapes.append((depth(points),f'<path d="{path([project(p) for p in points],True)}" fill="{fill}" stroke="{stroke or fill}" stroke-width=".7" stroke-linejoin="round" opacity="{opacity}"/>'))
    def line(points, color, width=1, opacity=1):
        shapes.append((depth(points)+.015,f'<path d="{path([project(p) for p in points])}" fill="none" stroke="{color}" stroke-width="{width}" opacity="{opacity}" stroke-linejoin="round" stroke-linecap="round"/>'))
    # Lengthwise shell, 14 perimeter points per ring; all proportions independent.
    length=2.53 if kind in ['saloon','grandtour'] else 2.27
    width=1.02 if kind=='grandtour' else .97
    roof=1.45 if kind=='saloon' else 1.28
    rings=[]
    for j in range(19):
        t=-1+2*j/18
        z=t*length
        w=width*(.78+.22*math.sin((t+1)*math.pi/2)**.45)
        deck=.76+(.08 if kind=='saloon' else .04)*math.cos(t*math.pi*.6)
        if t>.5: deck-=.1*(t-.5)
        ring=[(-w*.79,.33,z),(-w*.96,.46,z),(-w,.66,z),(-w*.91,deck,z),(-w*.68,deck+.05,z),(-w*.32,deck+.075,z),(w*.32,deck+.075,z),(w*.68,deck+.05,z),(w*.91,deck,z),(w,.66,z),(w*.96,.46,z),(w*.79,.33,z)]
        rings.append(ring)
    for j in range(len(rings)-1):
        for k in range(12):
            kk=(k+1)%12
            fill='url(#body)'
            if k in [0,10,11]: fill='#152e39'
            elif k in [3,4,5,6,7]: fill='url(#metal)'
            face([rings[j][k],rings[j+1][k],rings[j+1][kk],rings[j][kk]],fill)
    face(rings[-1],'url(#body)')
    face(rings[0],'#214352')
    # Windows: a six-sided roof transitions into panoramic front/rear glazing.
    zfront=.55 if kind=='saloon' else .73
    zback=-1.15
    roof_front=.16 if kind=='saloon' else .12
    roof_back=-.89
    cabin_base=.88
    for side in [-1,1]:
        p=[(side*.83,cabin_base,zback),(side*.65,roof-.04,roof_back),
           (side*.63,roof,roof_front),(side*.84,cabin_base,zfront)]
        face(p,'url(#glass)','#b0c6c5')
        line(p+[p[0]],'#9bb2b2',1.5)
        line([(side*.77,cabin_base,-.25),(side*.64,roof,-.34)],'#152a36',7)
        # Door crease and flush handle.
        line([(side*.975,.64,-1.08),(side*1.01,.62,-.7),(side*1.02,.61,.6)],'#b6c9c4',.8,.7)
        line([(side*.97,.72,-.62),(side*.98,.72,-.37)],'#a5c3c5',2)
        line([(side*.95,.76,-1.12),(side*.99,.47,-1.05),(side*.96,.35,.5),(side*.99,.75,.62)],'#132f3d',.9,.8)
        # Mirror body uses an original simple aeroplane section.
        face([(side*.87,.99,.55),(side*1.11,.96,.46),(side*1.15,.91,.6),(side*.92,.92,.66)],'url(#metal)')
    face([(-.65,roof-.04,roof_back),(.65,roof-.04,roof_back),(.63,roof,roof_front),(-.63,roof,roof_front)],'url(#metal)','#9ebdbf')
    face([(-.63,roof,roof_front),(.63,roof,roof_front),(.84,cabin_base,zfront),(-.84,cabin_base,zfront)],'url(#glass)','#9fb7b6')
    face([(-.83,cabin_base,zback),(.83,cabin_base,zback),(.65,roof-.04,roof_back),(-.65,roof-.04,roof_back)],'url(#glass)','#89a1a5')
    # Hood reflections and shut lines, split optics with no badge or brand grille.
    for side in [-1,1]:
        line([(side*.54,.87,.78),(side*.57,.85,1.35),(side*.54,.77,length-.07)],'#bdd2cd',1.3,.6)
        line([(side*.76,.7,length+.012),(side*.53,.71,length+.024),(side*.28,.69,length+.027)],'#effaff',4)
        line([(side*.76,.68,length+.015),(side*.52,.67,length+.028)],'#afc6d2',2)
        # Lower independent vent triangle.
        face([(side*.78,.54,length+.015),(side*.53,.53,length+.03),(side*.61,.39,length+.03),(side*.75,.4,length+.015)],'#0b1d29')
        line([(side*.7,.46,length+.036),(side*.58,.47,length+.04)],'#76a1ac',1)
        line([(side*.65,.64,-length-.012),(side*.31,.65,-length-.025)],'#de6b5e',4)
    face([(-.31,.56,length+.036),(.31,.56,length+.036),(.36,.39,length+.028),(-.36,.39,length+.028)],'#0b1a25')
    for j in range(6):
        zz=length+.039
        yy=.41+j*.023
        line([(-.3,yy,zz),(.3,yy,zz)],'#46626b',.6)
    # Wheels are projected cylinders with individually drawn spokes and brake discs.
    for side in [-1,1]:
        for axle in [-1.41,1.38]:
            wheel_start=len(shapes)
            radius=.39
            xx=side*(width+.025)
            ring=[]
            inner=[]
            for j in range(41):
                a=j/40*math.tau
                ring.append((xx,.4+math.sin(a)*radius,axle+math.cos(a)*radius))
                inner.append((xx+side*.018,.4+math.sin(a)*radius*.68,axle+math.cos(a)*radius*.68))
            face(ring,'#07131a','#31444a')
            face(inner,'#8ba2aa','#182c37')
            disc=[]
            for j in range(41):
                a=j/40*math.tau
                disc.append((xx+side*.02,.4+math.sin(a)*radius*.54,axle+math.cos(a)*radius*.54))
            face(disc,'#334c58','#a9b6b7')
            for j in range(7):
                a=j/7*math.tau+.18
                b=a+.1
                pts=[(xx+side*.035,.4+math.sin(a)*radius*.15,axle+math.cos(a)*radius*.15),
                     (xx+side*.035,.4+math.sin(a)*radius*.66,axle+math.cos(a)*radius*.66),
                     (xx+side*.035,.4+math.sin(b)*radius*.66,axle+math.cos(b)*radius*.66),
                     (xx+side*.035,.4+math.sin(b+.18)*radius*.15,axle+math.cos(b+.18)*radius*.15)]
                face(pts,'#b7c8ca','#e2e9e7')
            line([(xx,.4+math.sin(a)*radius*.92,axle+math.cos(a)*radius*.92) for a in [math.pi*.05+i*math.pi*.9/20 for i in range(21)]],'#54727b',1.2,.7)
            wheel_depth=depth([(xx,.4,axle)])+.08
            shapes[wheel_start:]=[(wheel_depth+i*.0001,s) for i,(_,s) in enumerate(shapes[wheel_start:])]
    return '<g>'+''.join(s for _,s in sorted(shapes,key=lambda s:s[0]))+'</g>'


def studio(title,kind='coupe',mode='garage'):
    rng=random.Random(seed(mode))
    chunks=[svg_start(title,night=True),'<rect width="1600" height="900" fill="#07141d"/>']
    if mode in ['garage','shop','operator-a','operator-b','operator-c']:
        chunks.append('<path d="M0 0H1600V610H0Z" fill="#10242e"/><path d="M0 610H1600V900H0Z" fill="#09171f"/>')
        for xx in range(80,1600,190):
            chunks.append(f'<path d="M{xx} 0v610" stroke="#273e47" stroke-width="8"/><path d="M{xx+5} 0v610" stroke="#06131c" stroke-width="2"/>')
        for xx in range(250,1600,340):
            chunks.append(f'<path d="M{xx} 115h210" stroke="#bde2e3" stroke-width="8"/><path d="M{xx} 115h210" stroke="#8cbac1" stroke-width="25" opacity=".12" filter="url(#bloom)"/>')
        chunks.append('<path d="M0 718H1600M0 850H1600M220 610L50 900M600 610L560 900M1000 610L1080 900M1370 610L1600 900" stroke="#42535b" opacity=".4"/>')
    else:
        chunks.append('<rect width="1600" height="900" fill="url(#sky)"/><path d="M0 400H1600V900H0Z" fill="url(#road)"/>')
    chunks.append('<ellipse cx="850" cy="730" rx="620" ry="150" fill="url(#shadow)"/>')
    chunks.append(car_mesh(kind,x=845,y=630,scale=183))
    chunks.append('<path d="M190 785H1430" stroke="#b0d1ce" stroke-width="1" opacity=".3"/>')
    if mode=='settings':
        chunks.append('<g transform="translate(1200 210)" fill="none" stroke="#bed2cd" stroke-width="4" opacity=".6"><circle r="105"/><circle r="72"/><path d="M0-122v38M0 84v38M-122 0h38M84 0h38M-88-88l27 27M61 61l27 27M88-88L61-61M-61 61l-27 27"/></g>')
    chunks.append('<rect width="1600" height="900" fill="url(#grain)" opacity=".3"/></svg>')
    return ''.join(chunks)


def texture(kind):
    rng=random.Random(seed('texture:'+kind))
    if kind=='forest':
        s=['<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#273c30"/>']
        for _ in range(850):
            x,y=rng.randrange(-20,532),rng.randrange(-20,532)
            s.append(f'<ellipse cx="{x}" cy="{y}" rx="{rng.randrange(2,14)}" ry="{rng.randrange(2,8)}" fill="{rng.choice(["#304b34","#456043","#213d2d","#536249","#384e32"])}" transform="rotate({rng.randrange(180)} {x} {y})"/>')
    else:
        s=['<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><rect width="512" height="512" fill="#7c776a"/>']
        for _ in range(480):
            x,y=rng.randrange(-20,532),rng.randrange(-20,532)
            r=rng.randrange(2,26)
            s.append(f'<path d="M{x} {y}l{r} {-r//3}l{r//2} {r}l{-r} {r//3}Z" fill="{rng.choice(["#969184","#65665e","#aaa08b","#7c7b6d","#585e59"])}" opacity=".55"/>')
    return ''.join(s)+'</svg>'


def brand():
    return '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" role="img" aria-labelledby="title">
<title id="title">尾文字Z — 道とメーターのオリジナルマーク</title>
<defs><linearGradient id="enamel" x2=".8" y2="1"><stop stop-color="#1e3c49"/><stop offset="1" stop-color="#06151f"/></linearGradient><linearGradient id="lane" x2="0" y2="1"><stop stop-color="#c8f4e7"/><stop offset="1" stop-color="#76c3b9"/></linearGradient></defs>
<rect x="3" y="3" width="122" height="122" rx="28" fill="url(#enamel)" stroke="#729c9e" stroke-width="2"/>
<path d="M30 89a44 44 0 1 1 68 0" fill="none" stroke="#294c59" stroke-width="9" stroke-linecap="round"/>
<path d="M30 89a44 44 0 1 1 70-3" fill="none" stroke="#9ed5c9" stroke-width="3" stroke-linecap="round"/>
<path d="M64 20v7M31 34l5 5M20 65h7M101 65h7M92 34l5-5" stroke="#b5d6d3" stroke-width="2.5" stroke-linecap="round"/>
<path d="M37 107c0-22 27-22 27-45V43M88 107c0-22-15-26-15-45V43" fill="none" stroke="url(#lane)" stroke-width="6" stroke-linecap="round"/>
<path d="M63 104v-9m3-11 4-10m-1-10v-8" stroke="#e8f4df" stroke-width="2.5" stroke-linecap="round"/>
<circle cx="69" cy="43" r="7" fill="#efa875" stroke="#132d3a" stroke-width="3"/>
</svg>'''


def main():
    (OUT/'routes').mkdir(parents=True,exist_ok=True)
    catalog=json.loads((ROOT/'tools'/'art-routes.json').read_text())
    for key,item in catalog.items():
        text=item['name']+' '+item.get('description','')
        biome=None
        for words,candidate in [(['雪','氷','凍','冬'],'snow'),(['工業','都心','市街','首都','港'],'city'),(['海','湾','潮','浜'],'coast'),(['岩','峡','砂'],'rock'),(['峠','森林','林','山岳'],'forest')]:
            if any(word in text for word in words):
                biome=candidate
                break
        night=False if any(word in text for word in ['夜明','黎明','快晴','朝']) else True if any(word in text for word in ['夜','月明','ネオン','夕暮']) else None
        wet=any(word in text for word in ['雨','濡れ','ウェット'])
        (OUT/'routes'/f'{key}.svg').write_text(road_scene(key,item['name']+' — 独自景観コンセプト',item['number'],biome=biome,night=night,wet=wet),encoding='utf-8')
    illustrations={
        'hero.svg':road_scene('omoji-original-hero','独自デザインのスポーツクーペと山岳道路',hero=True,biome='forest',night=False,with_map=False),
        'garage.svg':studio('独自車両のガレージ','coupe','garage'),
        'shop.svg':studio('独自車両のショールーム','grandtour','shop'),
        'settings.svg':studio('独自車両のセッティング','coupe','settings'),
        'operator-a.svg':studio('独自デザインのロングサルーン','saloon','operator-a'),
        'operator-b.svg':studio('独自デザインのグランドツアラー','grandtour','operator-b'),
        'operator-c.svg':studio('独自デザインのスポーツサルーン','saloon','operator-c'),
        'official.svg':road_scene('omoji-original-official','独自車両のスターティンググリッド',hero=True,biome='city',night=True,with_map=False),
        'routes.svg':road_scene('omoji-original-routes','独自ルートを走る山岳道路',hero=False,biome='rock',night=False),
        'technical.svg':road_scene('omoji-original-technical','独自のテクニカルコース',hero=False,biome='forest',night=False),
        'records.svg':road_scene('omoji-original-records','夕暮れの独自コース',hero=True,biome='coast',night=False,with_map=False),
        'sky-alpine.svg':road_scene('omoji-original-sky-alpine','独自の高原景観',biome='snow',night=False,with_map=False),
        'sky-coast.svg':road_scene('omoji-original-sky-coast','独自の海岸景観',biome='coast',night=False,with_map=False),
        'sky-forest.svg':road_scene('omoji-original-sky-forest','独自の森林景観',biome='forest',night=False,with_map=False),
        'sky-port.svg':road_scene('omoji-original-sky-port','独自の港湾景観',biome='city',night=True,with_map=False),
        'surface-forest.svg':texture('forest'),
        'surface-rock.svg':texture('rock'),
        'brand.svg':brand(),
    }
    for name,data in illustrations.items():
        (OUT/name).write_text(data,encoding='utf-8')
    if '--share-png' in sys.argv or '--raster' in sys.argv:
        import cairosvg
        cairosvg.svg2png(url=str(OUT/'hero.svg'),write_to=str(OUT/'share.png'),output_width=1200,output_height=630)
        for size in [192,512]:
            cairosvg.svg2png(url=str(OUT/'brand.svg'),write_to=str(OUT/f'icon-{size}.png'),output_width=size,output_height=size)
        icons=[cairosvg.svg2png(url=str(OUT/'brand.svg'),output_width=size,output_height=size) for size in [32,64]]
        ico=struct.pack('<HHH',0,1,len(icons))
        offset=6+16*len(icons)
        for size,data in zip([32,64],icons):
            ico+=struct.pack('<BBBBHHII',size,size,0,0,1,32,len(data),offset)
            offset+=len(data)
        (OUT/'favicon.ico').write_bytes(ico+b''.join(icons))
    manifest_path=OUT/'manifest.json'
    mapping=json.loads(manifest_path.read_text()).get('replacements',{}) if manifest_path.exists() else {}
    for file in (ROOT/'assets').rglob('*'):
        if file.suffix not in {'.webp','.jpg','.jpeg'} or OUT in file.parents:
            continue
        stem=file.stem
        if stem in {'ogp','ogp-share','grid-share','pit-share'}:
            target='share.png'
        elif stem in catalog:
            target=f'routes/{stem}.svg'
        elif 'maybach' in stem:
            target='operator-a.svg'
        elif 'rolls' in stem:
            target='operator-b.svg'
        elif 'century' in stem or 'crown' in stem:
            target='operator-c.svg'
        elif 'surface-forest' in stem:
            target='surface-forest.svg'
        elif 'surface-rock' in stem:
            target='surface-rock.svg'
        elif stem.startswith('reel-sky-'):
            target=stem.removeprefix('reel-')+'.svg'
        elif any(part in stem for part in ['garage','workshop']):
            target='garage.svg'
        elif 'shop' in stem or 'engine-bay' in stem:
            target='shop.svg'
        elif any(part in stem for part in ['settings','audio','dials']):
            target='settings.svg'
        elif any(part in stem for part in ['records','finish-line']):
            target='records.svg'
        elif 'official' in stem:
            target='official.svg'
        elif 'technical' in stem:
            target='technical.svg'
        elif 'routes' in stem or 'mountain-road' in stem:
            target='routes.svg'
        else:
            target='hero.svg'
        mapping[str(file.relative_to(ROOT/'assets'))]='art/'+target
    mapping.update({'omoji-mark.svg':'art/brand.svg','omoji-icon-192.png':'art/icon-192.png',
                    'omoji-icon-512.png':'art/icon-512.png','omoji-favicon.ico':'art/favicon.ico'})
    manifest={
        'schemaVersion':1,
        'generator':'tools/generate-art.py',
        'source':'Independent deterministic SVG paths, gradients and projected unbadged vehicle geometry authored for this revision. No old artwork is read by the generator.',
        'description':'Scenic concept illustrations; route diagram shapes are illustrative and do not promise to match the in-game road.',
        'routes':{key:f'art/routes/{key}.svg' for key in catalog},
        'replacements':mapping,
        'sha256':{str(f.relative_to(OUT)):hashlib.sha256(f.read_bytes()).hexdigest() for f in OUT.rglob('*') if f.suffix in {'.svg','.png','.ico'}},
    }
    (OUT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Generated {len(catalog)} route illustrations and {len(illustrations)} covers/textures; {len(mapping)} old artwork references mapped.')


if __name__=='__main__':
    main()
