#!/usr/bin/env python3
"""Generate factual, crawlable v3 catalogs/details from the playable game data.

Run after editing balance, vehicle geometry or road geometry:
  python3 tools/generate-pages.py
Requires Node >=20 and Python standard library. No network or browser is used.
"""
from __future__ import annotations
from pathlib import Path
import html
import json
import math
import re
import subprocess
import sys
from urllib.parse import quote

ROOT = Path(__file__).resolve().parents[1]
DOMAIN = 'https://omoji-z.com'
NAME = '尾文字Z'
E = lambda value: html.escape(str(value), quote=True)
FAMILY = {'compact':'コンパクト','fastback':'ファストバック','tourer':'ツーリングセダン','executive':'グランドサルーン','sport':'スポーツクーペ','estate':'エステート','utility':'ユーティリティ','van':'バン'}
DRIVE = {'FF':('前輪駆動','前輪が加速と旋回を受け持ちます。コーナー手前で減速を終え、前輪が外へ逃げるときはアクセルを少し戻して進路を整えます。'), 'FR':('フロントエンジン・後輪駆動','前輪を曲げる仕事と後輪で加速する仕事を分けやすい構成です。出口で急に踏み込まず、舵を戻す量に合わせて加速すると後輪の滑りを抑えられます。'), 'MR':('ミッドシップ・後輪駆動','車体中央寄りの重量を生かした旋回を楽しめます。旋回中の急なブレーキやアクセルオフを避け、小さな修正で姿勢を保ちます。'), 'RR':('リアエンジン・後輪駆動','後輪荷重を加速に使える構成です。進入で一気に荷重を前へ移す操作を避け、ブレーキを緩めながら丁寧に向きを変えます。'), '4WD':('四輪駆動','四輪へ駆動力を配分する構成です。滑りやすい路面でも段階的に加速しやすい一方、曲がる前の減速は必要です。')}
ENGINE = {'inline3':'直列3気筒','inline4':'直列4気筒','inline5':'直列5気筒','inline6':'直列6気筒','flat4':'水平対向4気筒','flat6':'水平対向6気筒','v6':'V型6気筒','v8':'V型8気筒','v10':'V型10気筒','v12':'V型12気筒','w16':'多気筒エンジン','rotary':'ロータリー','electric':'電動モーター'}

def number(value, digits=0):
    return f'{float(value):,.{digits}f}'

def text(value):
    return re.sub(r'\s+', ' ', str(value or '')).strip()

def json_script(value):
    return json.dumps(value, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c')

def brand(prefix):
    return f'<a class="brand" href="{prefix}" aria-label="尾文字Z トップ"><img src="{prefix}assets/art/brand.svg" width="42" height="42" alt=""><span>尾文字<span class="brand-z">Z</span><small>OMOJI Z</small></span></a>'

def nav(prefix):
    return f'<header class="site-header catalog-header"><div class="header-inner site-row wrap">{brand(prefix)}<nav class="simple-nav tabs" aria-label="メインナビゲーション"><a href="{prefix}#setup">レース</a><a href="{prefix}cars.html">車両図鑑</a><a href="{prefix}courses.html">コース図鑑</a><a href="{prefix}guide.html">操作ガイド</a></nav></div></header>'

def footer(prefix):
    return f'<footer class="site-footer"><div class="wrap footer-layout"><p>© KASAI SOLUTIONS INC.<br><small>架空の車両・道路を使ったブラウザレースゲーム。</small></p><nav aria-label="フッターナビゲーション"><a href="{prefix}cars.html">512台の車両</a><a href="{prefix}courses.html">256コース</a><a href="{prefix}guide.html">遊び方</a><a href="{prefix}RIGHTS.txt">素材と権利表記</a><a href="{prefix}THIRD_PARTY_NOTICES.txt">ライセンス</a></nav></div></footer>'

def breadcrumb(items, prefix):
    links=[f'<li><a href="{prefix}">尾文字Z</a></li>']
    links += [f'<li><a href="{E(url)}">{E(label)}</a></li>' if url else f'<li aria-current="page">{E(label)}</li>' for label,url in items]
    return '<nav class="crumb" aria-label="パンくずリスト"><ol>'+''.join(links)+'</ol></nav>'

def common_graph(canonical, title, description, crumbs):
    return [
        {'@id':DOMAIN+'/#publisher','@type':'Organization','name':'KASAI SOLUTIONS INC.'},
        {'@id':DOMAIN+'/#website','@type':'WebSite','url':DOMAIN+'/','name':NAME,'inLanguage':'ja','publisher':{'@id':DOMAIN+'/#publisher'}},
        {'@id':canonical+'#page','@type':'WebPage','url':canonical,'name':title,'description':description,'inLanguage':'ja','isPartOf':{'@id':DOMAIN+'/#website'},'breadcrumb':{'@id':canonical+'#breadcrumb'}},
        {'@id':canonical+'#breadcrumb','@type':'BreadcrumbList','itemListElement':[{'@type':'ListItem','position':i+1,'name':label,'item':url} for i,(label,url) in enumerate([(NAME,DOMAIN+'/')]+crumbs)]},
    ]

def document(relative, title, description, body, *, classes='', graph=None, script=False):
    depth=len(Path(relative).parts)-1;prefix='../'*depth or './';canonical=DOMAIN+'/'+relative
    graph=graph or common_graph(canonical,title,description,[(title,canonical)])
    head=f'''<!doctype html>
<html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#101214">
<title>{E(title)}</title><meta name="description" content="{E(description)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="{canonical}">
<meta property="og:type" content="website"><meta property="og:locale" content="ja_JP"><meta property="og:site_name" content="尾文字Z"><meta property="og:title" content="{E(title)}"><meta property="og:description" content="{E(description)}"><meta property="og:url" content="{canonical}"><meta property="og:image" content="{DOMAIN}/assets/art/share.png"><meta property="og:image:type" content="image/png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="尾文字Zの独自車両と架空サーキット">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="{E(title)}"><meta name="twitter:description" content="{E(description)}"><meta name="twitter:image" content="{DOMAIN}/assets/art/share.png"><meta name="twitter:image:alt" content="尾文字Zの独自車両と架空サーキット">
<link rel="icon" href="{prefix}assets/art/brand.svg" type="image/svg+xml"><link rel="stylesheet" href="{prefix}assets/site.css?v=3"><link rel="stylesheet" href="{prefix}assets/catalog.css?v=3"><script type="application/ld+json">{json_script({'@context':'https://schema.org','@graph':graph})}</script>'''
    if script:head+=f'<script defer src="{prefix}assets/catalog.js?v=3"></script>'
    return head+f'</head><body class="motorsport catalog-page {classes}"><a class="skip" href="#content">本文へ</a>'+nav(prefix)+f'<main id="content" class="wrap list-page" tabindex="-1">'+body+'</main>'+footer(prefix)+'</body></html>\n'

def write(relative, value):
    destination=ROOT/relative;destination.parent.mkdir(parents=True,exist_ok=True);destination.write_text(value,encoding='utf-8')

def vehicle_svg(car, *, decorative=False):
    visual=car['visual'];length,width,height=visual['dimensions'];half=length/2
    scale=72;left=55+(6-length)*scale/2
    xy=lambda z,y:(left+(z+1)*half*scale,215-y*scale)
    fmt=lambda point:','.join(f'{v:.2f}' for v in point)
    profile=visual['profile'];cab=visual['cab'];rear,roof_rear,roof_front,front=cab[:4]
    def shoulder(z):
        before=profile[0]
        for point in profile[1:]:
            if point[0]>=z:
                ratio=(z-before[0])/max(.00001,point[0]-before[0]);return before[2]+(point[2]-before[2])*ratio
            before=point
        return profile[-1][2]
    upper=[xy(p[0],p[2]) for p in profile if p[0]<rear]+[xy(rear,shoulder(rear)),xy(roof_rear,height-.018),xy(roof_front,height-.018),xy(front,shoulder(front))]+[xy(p[0],p[2]) for p in profile if p[0]>front]
    shell=upper+[xy(1,.23),xy(-1,.23)]
    glass=[xy(rear+.07,shoulder(rear)+.035),xy(roof_rear+.04,height-.09),xy(roof_front-.04,height-.09),xy(front-.07,shoulder(front)+.035)]
    color=visual.get('paint',car.get('paint','#a8b5c2'))
    if not re.fullmatch(r'#[0-9a-fA-F]{6}',color):color='#8a9aa7'
    radius=visual['wheel'][0];r=radius*scale;wheel=''
    for axle in visual['axle']:
        cx,cy=xy(axle,radius+.035)
        wheel+=f'<circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r+2:.2f}" fill="#111416" stroke="#60676b" stroke-width="2"/><circle cx="{cx:.2f}" cy="{cy:.2f}" r="{r*.64:.2f}" fill="#a4aeb2" stroke="#384149" stroke-width="2"/>'
        spokes=visual['wheel'][2]
        for spoke in range(max(4,min(12,int(spokes)))):
            angle=spoke*math.tau/spokes;x=cx+math.sin(angle)*r*.54;y=cy+math.cos(angle)*r*.54
            wheel+=f'<path d="M{cx:.2f},{cy:.2f}L{x:.2f},{y:.2f}" stroke="#e3e7e9" stroke-width="1.8"/>'
    label=' aria-hidden="true"' if decorative else f' role="img" aria-label="{E(car["name"])}のゲーム内形状から作成した側面図"'
    return f'<svg class="catalog-car-profile detail-art" viewBox="0 0 550 270"{label} data-model-code="{E(car["code"])}" data-design-sha256="{car["visualFingerprint"]}"><rect width="550" height="270" fill="#151b20"/><path d="M25 240H525M25 100H525" stroke="#2a333a"/><ellipse cx="275" cy="224" rx="220" ry="10" fill="#080b0d"/><polygon points="{" ".join(map(fmt,shell))}" fill="{color}" stroke="#aebac0" stroke-width="1.4"/><polygon points="{" ".join(map(fmt,glass))}" fill="#213c49" stroke="#8da7b4" stroke-width="1.3"/>{wheel}<text x="25" y="35" fill="#d9e1e4" font-family="sans-serif" font-size="13">{E(car["code"])} · {number(length,3)} × {number(width,3)} × {number(height,3)} m</text></svg>'

def route_svg(track, *, decorative=False, elevation=False):
    data=track['measured'];points=data['points'];ys=data['elevations'];margin=30
    if elevation:
        low,high=min(ys),max(ys);span=max(10,high-low)
        coords=[(margin+i*(540-2*margin)/(len(ys)-1),210-(y-low)*160/span) for i,y in enumerate(ys)]
        label=track['name']+'の標高プロフィール'
    else:
        xs=[p[0] for p in points];zs=[p[1] for p in points];cx=(min(xs)+max(xs))/2;cz=(min(zs)+max(zs))/2
        scale=min(480/max(1,max(xs)-min(xs)),180/max(1,max(zs)-min(zs)))
        coords=[(270+(x-cx)*scale,130+(z-cz)*scale) for x,z in points]
        label=track['name']+'のゲーム内ルート図'
    poly=' '.join(f'{x:.2f},{y:.2f}' for x,y in coords);start=coords[0];finish=coords[-1]
    attr=' aria-hidden="true"' if decorative else f' role="img" aria-label="{E(label)}"'
    return f'<svg class="catalog-route-art detail-art" viewBox="0 0 540 260"{attr} data-road-sha256="{data["geometryFingerprint"]}"><rect width="540" height="260" fill="#141b20"/><path d="M30 50H510M30 130H510M30 210H510M110 30V230M270 30V230M430 30V230" stroke="#263039"/><polyline points="{poly}" fill="none" stroke="#33414d" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/><polyline points="{poly}" fill="none" stroke="#e77959" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="{start[0]:.2f}" cy="{start[1]:.2f}" r="6" fill="#99d7b4" stroke="#141b20" stroke-width="2"/><circle cx="{finish[0]:.2f}" cy="{finish[1]:.2f}" r="5" fill="#f3e9d4" stroke="#141b20" stroke-width="2"/><text x="30" y="246" fill="#a8bbc6" font-family="sans-serif" font-size="12">{"ELEVATION" if elevation else "GAME ROUTE"} · {number(data["length"]/1000,3)} km</text></svg>'

def statlist(values):
    return '<dl class="detail-specs">'+''.join(f'<div><dt>{E(k)}</dt><dd>{E(v)}</dd></div>' for k,v in values)+'</dl>'

def facts(values):
    return '<p class="facts">'+''.join(f'<span class="catalog-fact">{E(v)}</span>' for v in values)+'</p>'

def pp_label(car):
    value=car.get('ppClass','')
    if isinstance(value,dict):return text(value.get('label') or value.get('name') or value.get('id') or '')
    return str(value)

def main():
    output=subprocess.run(['node',str(ROOT/'tools/export-catalog.mjs')],check=True,stdout=subprocess.PIPE,stderr=subprocess.PIPE,text=True)
    data=json.loads(output.stdout);cars=data['cars'];tracks=data['tracks']
    # Old route prose must not imply a repeatable course payout in v3.
    for track in tracks:
        track['description']=str(track.get('description','')).replace('完走でボーナスZを獲得。','初回完走で探索ボーナスを獲得できます。')
    if max(c['topSpeed'] for c in cars)>400 or max(c['power'] for c in cars)>1200:
        raise ValueError('Unbalanced legacy performance values cannot be published in v3 SEO pages.')
    old_courses=(ROOT/'courses.html').read_text(encoding='utf-8')
    serials={m[1]:int(m[2]) for m in re.finditer(r'<li id="course-([^"]+)"[^>]*data-serial="(\d+)"',old_courses)}
    if len(serials)!=256:raise ValueError('Missing stable stage serials in course catalog.')
    car_paths={car['id']:f'cars/{car["code"].lower()}.html' for car in cars}
    course_paths={track['id']:f'courses/stage-{serials[track["id"]]:03d}.html' for track in tracks}
    if len(set(car_paths.values()))!=512 or len(set(course_paths.values()))!=256:raise ValueError('Canonical paths must be unique.')
    mapping={'version':3,'cars':car_paths,'courses':course_paths,'vehicleGeometry':{car['id']:car['visualFingerprint'] for car in cars},'roadGeometry':{track['id']:track['measured']['geometryFingerprint'] for track in tracks}}
    write('assets/catalog-routes.json',json.dumps(mapping,ensure_ascii=False,indent=2)+'\n')
    starters={'hachi','leopard','yukitsuba'}
    groups=[('starter-cars','初期選択の3台',[]),('classic-cars','クラシック・ベーシック',[]),('modern-japan','モダンツアラー',[]),('supercars','パフォーマンスモデル',[]),('omoji-z-original','コンセプト',[])]
    groupmap={key:items for key,label,items in groups}
    for car in sorted(cars,key=lambda c:c['code']):
        group='starter-cars' if car['id'] in starters else 'omoji-z-original' if car.get('specialEdition') or car.get('segment')=='original' else 'supercars' if car.get('segment')=='supercar' else 'modern-japan' if car.get('segment')=='modern-jp' else 'classic-cars'
        groupmap[group].append(car)
    car_intro='独自設計の512台を、駆動方式・PP・出力・ゲーム内価格で比較。各車の寸法、出力重量比、走行のポイントを詳しく確認できます。実在メーカーの車両カタログではありません。'
    catalog_body=breadcrumb([('車両図鑑',None)],'./')+f'<section class="catalog-hero"><div><p class="eyebrow">CAR COLLECTION</p><h1>512台の架空車両図鑑</h1><p class="lede">{car_intro}</p><div class="detail-actions"><a class="primary" href="#catalog-start">車を比較する</a><a href="./#garage">ガレージへ</a><a href="./guide.html#choosing-a-car">車の選び方</a></div></div></section>'
    catalog_body+='<ul class="catalog-overview"><li><strong>512</strong><span>独自車両</span></li><li><strong>5</strong><span>駆動方式</span></li><li><strong>3</strong><span>初期選択</span></li></ul><section class="catalog-explainer"><h2>最初の1台は、速さと扱いやすさで選ぶ</h2><p>PPは標準仕様の総合性能を比べる目安です。最高速度だけで選ばず、駆動方式と車重も確認しましょう。短い峠では軽さと減速、雨のコースでは滑らかな操作が走りやすさにつながります。</p><p>3台まで比較できます。「車両詳細」では、実際のゲーム内形状から作った側面図、寸法、相性の近い車を表示します。Zはゲーム内通貨です。</p></section>'
    catalog_body+=filter_markup('car',[(key,f'{label}（{len(items)}）') for key,label,items in groups])
    catalog_body+='<nav aria-label="車両カテゴリ"><ul class="jumps">'+''.join(f'<li><a href="#{key}">{E(label)}（{len(items)}）</a></li>' for key,label,items in groups)+'</ul></nav>'
    for key,label,items in groups:
        catalog_body+=f'<section data-catalog-group id="{key}" class="catalog-group"><h2 class="section-heading">{E(label)} <small>{len(items)}台</small></h2><ul class="row-list catalog-list">'
        for car in items:
            price=car.get('shopPrice') or 0
            attrs={'title':car['name'],'serial':int(car['code'].split('-')[-1]),'drive':car['drive'],'year':car['year'],'power':car['power'],'speed':car['topSpeed'],'price':price,'pp':car['pp'],'mass':car['mass']}
            attr=' '.join(f'data-{key}="{E(value)}"' for key,value in attrs.items())
            relative=car_paths[car['id']]
            brief=f'{FAMILY.get(car["visual"]["originalDesignFamily"],car["visual"].get("bodyType","独自車両"))}。{car["drive"]}、出力重量比 {number(car["mass"]/car["power"],2)} kg/PS。'
            catalog_body+=f'<li id="car-{E(car["id"])}" {attr} class="catalog-card">{vehicle_svg(car,decorative=True)}<h3><a class="catalog-detail-title" href="./{relative}">{E(car["name"])}</a></h3>{facts([car["drive"],f"PP {number(car['pp'])} · {pp_label(car)}",f"{number(car['power'])} PS",f"{number(car['topSpeed'])} km/h"])}<p>{E(brief)}</p><p class="catalog-reward">{"初期選択車" if car["id"] in starters else number(price)+" Z"}</p><a class="catalog-detail-link" href="./{relative}">車両詳細・走り方を見る</a><a class="catalog-game-link" href="./?car={quote(car["id"])}#garage">ゲームで確認</a></li>'
        catalog_body+='</ul></section>'
    title='車両図鑑・512台の性能と走り方｜尾文字Z';description='尾文字Zの独自車両512台を駆動方式・PP・最高速度・ゲーム内価格で比較。各車の寸法、出力重量比、運転のコツ、関連モデルまで確認できます。'
    graph=common_graph(DOMAIN+'/cars.html',title,description,[('車両図鑑',DOMAIN+'/cars.html')]);graph[2]['mainEntity']={'@id':DOMAIN+'/cars.html#collection'}
    graph.append({'@id':DOMAIN+'/cars.html#collection','@type':'ItemList','name':'尾文字Zの架空車両512台','numberOfItems':512,'itemListElement':[{'@type':'ListItem','position':i+1,'name':car['name'],'url':DOMAIN+'/'+car_paths[car['id']]} for i,car in enumerate(cars)]})
    write('cars.html',document('cars.html',title,description,catalog_body,classes='catalog-index cinema-cars',graph=graph,script=True))
    course_categories=[('technique','テクニック・練習',[]),('endurance','耐久・長距離',[]),('tuning-tests','チューニング試験',[]),('scenic-routes','峠・景観ルート',[]),('experience-routes','区間練習ルート',[])]
    course_groupmap={key:items for key,label,items in course_categories}
    for track in sorted(tracks,key=lambda t:serials[t['id']]):
        key='technique' if track['id']=='mugen-apex-loop' else 'tuning-tests' if track['id'].startswith('tune-') else 'endurance' if track['length']>=20000 else 'experience-routes' if track['id'].startswith(('xp-','bonus-')) else 'scenic-routes'
        course_groupmap[key].append(track)
    course_body=breadcrumb([('コース図鑑',None)],'./')+'<section class="catalog-hero"><div><p class="eyebrow">ROUTE ATLAS</p><h1>256の架空コースを選ぶ</h1><p class="lede">峠、海岸、試験路、サーキット。走行距離と路面で絞り込み、ゲーム内の道路形状から作ったルート図・標高図で次の走行を準備できます。</p><div class="detail-actions"><a class="primary" href="#catalog-start">コースを比較する</a><a href="./#race-options">ゲームで選ぶ</a><a href="./guide.html#reading-a-course">路面の読み方</a></div></div></section><section class="catalog-explainer"><h2>コースの違いを、ルート図と路面で見る</h2><p>すべてゲーム専用に構成した架空の道路です。詳細ページの図と勾配・標高は、実際にゲームが走行へ使う道路データから計算しています。実在道路の測量データではありません。</p><p>初めてのコースは練習走行で減速点を確認し、雨や雪では入力を滑らかにしましょう。図鑑から3コースまで比較できます。</p></section>'
    course_body+=filter_markup('course',[(key,f'{label}（{len(items)}）') for key,label,items in course_categories])
    course_body+='<nav aria-label="コースカテゴリ"><ul class="jumps">'+''.join(f'<li><a href="#{key}">{E(label)}（{len(items)}）</a></li>' for key,label,items in course_categories)+'</ul></nav>'
    for key,label,items in course_categories:
        course_body+=f'<section data-catalog-group id="{key}" class="catalog-group"><h2 class="section-heading">{E(label)} <small>{len(items)}コース</small></h2><ul class="row-list catalog-list">'
        for track in items:
            surface=surface_key(track);measured=track['measured'];values=[f'{number(track["length"]/1000,3)} km',track.get('weather',''),track.get('surface',''),track.get('tier','')]
            values=[value for value in values if value]
            attrs={'title':track['name'],'serial':serials[track['id']],'distance':track['length']/1000,'surface':surface,'facts':' · '.join(map(str,values))}
            attr=' '.join(f'data-{key}="{E(value)}"' for key,value in attrs.items())
            course_body+=f'<li id="course-{E(track["id"])}" {attr} class="catalog-card">{route_svg(track,decorative=True)}<h3><a class="catalog-detail-title" href="./{course_paths[track["id"]]}">{E(track["name"])}</a></h3>{facts(values)}<p>{E(track.get("description","ゲーム用に構成した独自コース。"))}</p><p class="catalog-reward">標高差 {number(max(measured["elevations"])-min(measured["elevations"]))} m · 走行帯幅 {number(measured["width"],1)} m</p><a class="catalog-detail-link" href="./{course_paths[track["id"]]}">ルート図・走行ポイントを見る</a><a class="catalog-game-link" href="./?course={quote(track["id"])}#race-options">ゲームで選ぶ</a></li>'
        course_body+='</ul></section>'
    title='コース図鑑・256ステージのルートと路面｜尾文字Z';description='尾文字Zの架空コース256ステージを距離・路面で比較。実ゲームの道路データに基づくルート図、標高、勾配、走行ポイントから次のコースを選べます。'
    graph=common_graph(DOMAIN+'/courses.html',title,description,[('コース図鑑',DOMAIN+'/courses.html')]);graph[2]['mainEntity']={'@id':DOMAIN+'/courses.html#collection'}
    graph.append({'@id':DOMAIN+'/courses.html#collection','@type':'ItemList','name':'尾文字Zの架空コース256ステージ','numberOfItems':256,'itemListElement':[{'@type':'ListItem','position':i+1,'name':t['name'],'url':DOMAIN+'/'+course_paths[t['id']]} for i,t in enumerate(sorted(tracks,key=lambda t:serials[t['id']]))]})
    write('courses.html',document('courses.html',title,description,course_body,classes='catalog-index cinema-courses',graph=graph,script=True))
    for car in cars:generate_car(car,cars,tracks,car_paths,course_paths)
    for track in tracks:generate_course(track,tracks,cars,car_paths,course_paths,serials)
    generate_guide(cars,car_paths,tracks,course_paths)
    urls=['', 'cars.html','courses.html','guide.html']+list(car_paths.values())+list(course_paths.values())
    write('sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(f'  <url><loc>{DOMAIN}/{relative}</loc></url>\n' for relative in urls)+'</urlset>\n')
    write('robots.txt',f'User-agent: *\nAllow: /\nDisallow: /tools/\nDisallow: /.github/\nDisallow: /_update/\nDisallow: /.omoji-backups/\n\nSitemap: {DOMAIN}/sitemap.xml\n')
    print(json.dumps({'vehicleDetails':len(cars),'courseDetails':len(tracks),'canonicalURLs':len(urls),'version':3},ensure_ascii=False))


def filter_markup(kind, groups):
    title='車両を探す' if kind=='car' else 'コースを探す';placeholder='車名・駆動方式・PP・ボディタイプ' if kind=='car' else 'コース名・天候・路面'
    options=[('default','掲載順'),('speed','最高速度順'),('power','出力順'),('price','価格が安い順'),('pp','PPが低い順')] if kind=='car' else [('default','掲載順'),('distance','距離が短い順'),('distance-desc','距離が長い順')]
    return f'<h2 id="catalog-start" class="section-heading">{title}</h2><div class="filter catalog-tools" id="catalog-filter" role="search" aria-labelledby="catalog-start" hidden><div class="catalog-filter-fields"><label class="catalog-search" for="catalog-query"><span>キーワード</span><input type="search" id="catalog-query" placeholder="{placeholder}" autocomplete="off"></label><label for="catalog-category"><span>カテゴリ</span><select id="catalog-category"><option value="">すべて</option>'+''.join(f'<option value="{key}">{E(label)}</option>' for key,label in groups)+'</select></label><label for="catalog-sort"><span>並べ替え</span><select id="catalog-sort">'+''.join(f'<option value="{key}">{label}</option>' for key,label in options)+'</select></label></div><div class="catalog-result-line"><output id="catalog-count" role="status" aria-live="polite"></output><button type="button" id="catalog-reset" hidden>絞り込みを解除</button></div></div><noscript><p>絞り込みと比較にはJavaScriptを使います。全項目と詳細ページはこのまま読めます。</p></noscript>'

def surface_key(track):
    value=' '.join(str(track.get(key,'')) for key in ['surface','weather','description'])
    return 'snow' if any(word in value for word in ['圧雪','雪道','凍結','氷']) else 'wet' if track.get('wet') or any(word in value for word in ['ウェット','雨','湿']) else 'dry'

def generate_car(car,cars,tracks,car_paths,course_paths):
    relative=car_paths[car['id']];prefix='../';canonical=DOMAIN+'/'+relative;visual=car['visual'];family=FAMILY.get(visual['originalDesignFamily'],visual.get('bodyType','独自車両'))
    length,width,height=visual['dimensions'];powerweight=car['mass']/car['power'];wheelbase=(visual['axle'][1]-visual['axle'][0])*length/2;drive_label,drive_tip=DRIVE[car['drive']]
    title=f'{car["name"]}の性能・PP・走り方｜尾文字Z 車両詳細'
    description=f'{car["name"]}は尾文字Zの架空{family}。{car["drive"]}、{number(car["power"])} PS、{number(car["topSpeed"])} km/h、PP {number(car["pp"])}。寸法・出力重量比・運転のポイントと近い性能の車を確認できます。'
    body=breadcrumb([('車両図鑑','../cars.html'),(car['name'],None)],prefix)+f'<section class="detail-hero"><p class="eyebrow">ORIGINAL VEHICLE · {E(car["code"])}</p><h1>{E(car["name"])}</h1><p class="lede">{E(family)} · {E(drive_label)} · PP {number(car["pp"])} / {E(pp_label(car))}</p><p>尾文字Zのために設計した架空車両です。実在メーカーの認定モデルではありません。</p><div class="detail-actions"><a class="primary" href="../?car={quote(car["id"])}#garage">ゲームでこの車を確認</a><a href="../cars.html?drive={car["drive"]}#catalog-start">同じ駆動方式を比較</a></div></section>'
    body+=f'<section class="detail-grid"><figure>{vehicle_svg(car)}<figcaption>ゲーム内の寸法・車体断面・キャビン・車軸位置に基づく側面図。実在車の写真ではありません。</figcaption></figure><div><h2 class="section-heading">標準仕様の性能</h2>'+statlist([('PP / クラス',f'{number(car["pp"])} / {pp_label(car)}'),('駆動方式',f'{car["drive"]} · {drive_label}'),('パワートレイン',ENGINE.get(car.get('engineType'),'独自パワーユニット')+(' / 過給' if car.get('turbo') and car.get('engineType')!='electric' else '')),('ゲーム内出力',f'{number(car["power"])} PS'),('公称最高速度',f'{number(car["topSpeed"])} km/h'),('車重',f'{number(car["mass"])} kg'),('出力重量比',f'{number(powerweight,2)} kg/PS'),('ゲーム内価格','初期選択車' if car['id'] in {'hachi','leopard','yukitsuba'} else f'{number(car.get("shopPrice") or 0)} Z')])+f'<p class="detail-note">標準仕様のゲーム設定値です。実測加速タイムや実車の仕様を示すものではありません。Zはゲーム内通貨です。</p></div></section>'
    body+=f'<section class="detail-copy"><h2 class="section-heading">車体の特徴と使いどころ</h2><p>{E(car["name"])}は、全長{number(length,3)} m・全幅{number(width,3)} m・全高{number(height,3)} mの{E(family)}です。ゲーム内の車軸間隔は約{number(wheelbase,3)} m。{number(car["mass"])} kgの車体に{number(car["power"])} PSを組み合わせ、出力重量比は{number(powerweight,2)} kg/PSです。</p><p>最高速度は{number(car["topSpeed"])} km/h、標準PPは{number(car["pp"])}。直線での伸びだけでなく、ブレーキを掛ける余裕とコーナーの出口を意識して性能を使います。車両の強化やセットアップを変えた場合は、ガレージで更新後のPPと性能を確認してください。</p><h2 class="section-heading">{E(car["drive"])}で走らせるポイント</h2><p>{drive_tip}</p><ol><li>まず練習走行で標準状態を確認し、同じコース・同じ操作で比較します。</li><li>進入で十分に減速し、旋回中のタイヤに加速と制動を同時に要求しすぎないようにします。</li><li>ウェットや圧雪路では操作を早めに準備し、アクセルと舵を段階的に動かします。</li></ol><p><a href="../guide.html#choosing-a-car">PP・駆動方式・強化の読み方</a> / <a href="../guide.html#controls">PC・スマホの操作</a></p></section>'
    related=sorted((c for c in cars if c['id']!=car['id']),key=lambda c:((c['drive']!=car['drive'])*150+abs(c['pp']-car['pp'])+abs(c['mass']-car['mass'])*.015,c['code']))[:3]
    body+='<section><h2 class="section-heading">近い性能の車と比較する</h2><p>駆動方式とPPが近い車を優先して掲載しています。出力だけでなく車重の差も比べてください。</p><ul class="related-list">'+''.join(f'<li><a href="../{car_paths[c["id"]]}"><strong>{E(c["name"])}</strong><span>{E(c["drive"])} · PP {number(c["pp"])} · {number(c["mass"])} kg</span></a></li>' for c in related)+'</ul></section>'
    practice_ids=['shiosai-straight','tune-brake-first-marker','tune-handling-esses'];practice=[t for ident in practice_ids for t in tracks if t['id']==ident]
    body+='<section><h2 class="section-heading">この車を確かめる試験コース</h2><ul class="related-list">'+''.join(f'<li><a href="../{course_paths[t["id"]]}"><strong>{E(t["name"])}</strong><span>{number(t["length"]/1000,3)} km · {E(t.get("surface",""))}</span></a></li>' for t in practice)+'</ul></section>'
    graph=common_graph(canonical,title,description,[('車両図鑑',DOMAIN+'/cars.html'),(car['name'],canonical)]);graph[2]['mainEntity']={'@id':canonical+'#vehicle'};graph.append({'@id':canonical+'#vehicle','@type':'Thing','name':car['name'],'description':description,'subjectOf':{'@id':canonical+'#page'}})
    write(relative,document(relative,title,description,body,classes='vehicle-detail',graph=graph))


def generate_course(track,tracks,cars,car_paths,course_paths,serials):
    relative=course_paths[track['id']];canonical=DOMAIN+'/'+relative;data=track['measured'];length=track['length']/1000;surface=surface_key(track);altitude=max(data['elevations'])-min(data['elevations'])
    title=f'{track["name"]}のルート図・路面・走行ポイント｜尾文字Z'
    description=f'尾文字Zの架空コース「{track["name"]}」は{number(length,3)} km。{text(track.get("weather",""))}、{text(track.get("surface",""))}。ゲーム内形状に基づくルート図・標高図・勾配と走り方を確認できます。'
    body=breadcrumb([('コース図鑑','../courses.html'),(track['name'],None)],'../')+f'<section class="detail-hero"><p class="eyebrow">FICTIONAL ROUTE · STAGE {serials[track["id"]]:03d}</p><h1>{E(track["name"])}</h1><p class="lede">{number(length,3)} km · {E(track.get("weather",""))} · {E(track.get("surface",""))}</p><p>{E(track.get("description","独自に構成したゲーム用コース。"))}</p><div class="detail-actions"><a class="primary" href="../?course={quote(track["id"])}#race-options">ゲームでこのコースを選ぶ</a><a href="../courses.html?surface={surface}#catalog-start">同じ路面のコースを探す</a></div></section>'
    body+=f'<section class="detail-grid"><figure>{route_svg(track)}<figcaption>実ゲームの道路を等間隔にサンプリングした平面図。緑が開始点、白が終了点です。架空コースの図であり、実在道路の地図ではありません。</figcaption></figure><div><h2 class="section-heading">コースの基本情報</h2>'+statlist([('全長',f'{number(length,3)} km'),('走行帯の幅',f'{number(data["width"],1)} m'),('路面',track.get('surface','舗装路')),('天候・時間帯',track.get('weather','ゲーム内設定')),('設計難度',track.get('tier','設定なし')),('標高差の概算',f'{number(altitude)} m'),('最大勾配の概算',f'{number(data["maxGrade"]*100,1)} %')])+f'</div></section><section class="detail-grid"><figure>{route_svg(track,elevation=True)}<figcaption>横軸が進行距離、縦軸がゲーム内標高です。縦方向は起伏を見やすくするため拡大しています。</figcaption></figure><div><h2 class="section-heading">起伏と路面を読む</h2><p>スタートからゴールまでの概算の上りは{number(data["totalUp"])} m、下りは{number(data["totalDown"])} m。標高の変化は走行中の荷重や減速の準備に影響します。</p><p>{course_tip(track)}</p><p class="detail-note">ルート図・標高・勾配は257地点の道路サンプルから計算しています。看板・景観の説明画ではなく走行形状に対応しますが、細かな起伏は概算です。</p></div></section>'
    body+=f'<section class="detail-copy"><h2 class="section-heading">{E(track["name"])}を走るポイント</h2><ol><li>{"長距離では序盤から全力を使い切らず、一定の操作と減速点を保って走ります。" if length>=10 else "最初は練習走行でルートと減速点を確認し、出口が見える位置まで速度を落とします。"}</li><li>{"下りでは減速を早めに始め、旋回中に強くブレーキを残しすぎないようにします。" if data['totalDown']>data['totalUp']+10 else "上りの出口では舵を戻しながら加速し、直線へ向けてタイヤの力を使います。" if data['totalUp']>data['totalDown']+10 else "起伏の少ない区間でも、直線と旋回でアクセルを使う場所を分けます。"}</li><li>{"滑りやすい区間ではアクセル、ブレーキ、操舵のどれも段階的に入力します。" if surface!='dry' or data['lowGripShare']>.2 else "乾いた路面でも急な操作を避け、進入・旋回・立ち上がりの順に荷重をつなぎます。"}</li></ol><p>報酬は距離・実走時間・順位・難度などのレース条件で変わります。初回完走には探索ボーナスが加わります。レース終了画面で獲得Z・XPを確認できます。</p><p><a href="../guide.html#reading-a-course">路面と荷重の基礎</a> / <a href="../guide.html#modes">レースモードの選び方</a></p></section>'
    related=sorted((t for t in tracks if t['id']!=track['id']),key=lambda t:((surface_key(t)!=surface)*30+abs(t['length']-track['length'])/1000+abs((max(t['measured']['elevations'])-min(t['measured']['elevations']))-altitude)/60,serials[t['id']]))[:3]
    body+='<section><h2 class="section-heading">近い路面・距離のコース</h2><ul class="related-list">'+''.join(f'<li><a href="../{course_paths[t["id"]]}"><strong>{E(t["name"])}</strong><span>{number(t["length"]/1000,3)} km · {E(t.get("surface","舗装路"))}</span></a></li>' for t in related)+'</ul></section>'
    chosen=sorted((c for c in cars if c['id'] in {'hachi','leopard','yukitsuba'}),key=lambda c:(surface!='dry' and c['drive']!='4WD',c['pp']))
    body+='<section><h2 class="section-heading">基礎操作を確かめる初期選択車</h2><p>最高速度を競う前に、駆動方式の違いを同じ道路で比べられます。</p><ul class="related-list">'+''.join(f'<li><a href="../{car_paths[c["id"]]}"><strong>{E(c["name"])}</strong><span>{E(c["drive"])} · PP {number(c["pp"])}</span></a></li>' for c in chosen)+'</ul></section>'
    graph=common_graph(canonical,title,description,[('コース図鑑',DOMAIN+'/courses.html'),(track['name'],canonical)]);graph[2]['mainEntity']={'@id':canonical+'#route'};graph.append({'@id':canonical+'#route','@type':'Thing','name':track['name'],'description':description,'subjectOf':{'@id':canonical+'#page'}})
    write(relative,document(relative,title,description,body,classes='course-detail',graph=graph))


def course_tip(track):
    data=track['measured'];surface=surface_key(track)
    if surface=='snow':return '雪や凍結を含む路面では、乾燥路と同じ速度で進入しないようにします。早めに減速して舵を小さく当て、出口で急にアクセルを開けないことが大切です。'
    if surface=='wet':return 'ウェットではタイヤの余裕が小さくなります。ブレーキを早めに掛け、舵を切ったまま強く加速する操作を避けて、直線的な姿勢から次の入力へつなぎます。'
    if data['maxGrade']>.08:return '起伏が大きいコースです。下りの進入ではブレーキを早め、坂の頂上や谷で急に舵を増やさないようにします。勾配図を使って荷重が変わる場所を予習できます。'
    if track['length']>=10000:return '長いコースは一定のリズムを保ちやすい設定から始めます。最高速度よりも、直線で加速し、曲がる前に減速する場所を繰り返しそろえると比較しやすくなります。'
    return '乾いた路面では基本の制動・旋回・再加速を練習できます。図の曲がり方を見て、減速を始める場所と出口で舵を戻す場所を分けて走りましょう。'


def generate_guide(cars,car_paths,tracks,course_paths):
    starters=[c for c in cars if c['id'] in {'hachi','leopard','yukitsuba'}]
    faq=[('無料で遊べますか？','ソロレースは会員登録せず無料で遊べます。車両購入や強化に使うZはゲーム内通貨です。'),('PCとスマホで操作できますか？','PCはキーボードや対応ゲームパッド、スマホは画面のタッチ操作を使います。横画面では先の道路と操作パネルを広く見渡せます。'),('実在の車やコースが登場しますか？','収録する512台と256ステージはゲーム用の独自設計です。実在メーカーの認定車両や実在道路の測量再現ではありません。'),('セーブデータはどこに保存されますか？','進行は利用中のブラウザに保存します。ブラウザのデータ削除や端末変更に備え、ゲーム内のセーブ同期からバックアップを保存してください。'),('音が出ないときはどうすればよいですか？','ブラウザの自動再生制限により、最初の操作まで音が出ない場合があります。設定でBGMと音量を確認し、画面のボタンを一度押してください。')]
    title='遊び方と操作ガイド｜PC・スマホで無料レース 尾文字Z';description='尾文字Zの始め方、PC・スマホ・ゲームパッド操作、PPでの車選び、ウェット路面、チューニング、セーブ引き継ぎを解説。架空車512台・256コースを走る前のガイド。'
    body=breadcrumb([('操作ガイド',None)],'./')+'<section class="catalog-hero"><p class="eyebrow">DRIVER HANDBOOK</p><h1>尾文字Zの遊び方と走行ガイド</h1><p class="lede">最初の1台を選び、練習走行で減速・旋回・再加速を確かめる。PCでもスマホでも、同じ車と道路で操作の違いを比べられます。</p><div class="detail-actions"><a class="primary" href="./#setup">レースを始める</a><a href="./cars.html">車両図鑑</a><a href="./courses.html">コース図鑑</a></div></section>'
    headings=[('first','初めて走る'),('controls','PC・スマホの操作'),('choosing-a-car','PPと車の選び方'),('reading-a-course','路面・荷重と減速'),('modes','モードと報酬'),('workshop','強化とセットアップ'),('music','BGMと音量'),('save','対戦とセーブ'),('faq','よくある質問')]
    body+='<nav class="guide-toc" aria-label="操作ガイドの目次"><ul>'+''.join(f'<li><a href="#{key}">{label}</a></li>' for key,label in headings)+'</ul></nav><div class="guide-content">'
    body+='<section id="first" class="guide-section"><h2 class="section-heading">初めて走る</h2><ol><li>トップのガレージで初期選択車を確認します。最初は駆動方式の違う3台から選べます。</li><li>レース設定で短めの乾いたコース、練習走行、ATを選びます。</li><li>直線で加速・制動を試し、コーナー手前で減速する場所を少しずつ調整します。</li></ol><ul class="related-list">'+''.join(f'<li><a href="./{car_paths[c["id"]]}"><strong>{E(c["name"])}</strong><span>{c["drive"]} · PP {number(c["pp"])}</span></a></li>' for c in starters)+'</ul><p>旧バージョンで所有していた車両はセーブ移行で保持します。新規プレイの初期選択と、引き継いだガレージの内容は異なります。</p></section>'
    body+='''<section id="controls" class="guide-section"><h2 class="section-heading">PC・スマホ・ゲームパッドの操作</h2><div class="controls"><details open><summary>キーボード</summary><dl><div><dt>操舵</dt><dd><kbd>A</kbd> / <kbd>D</kbd> または <kbd>←</kbd> / <kbd>→</kbd></dd></div><div><dt>アクセル・ブレーキ</dt><dd><kbd>W</kbd> / <kbd>S</kbd> または <kbd>↑</kbd> / <kbd>↓</kbd></dd></div><div><dt>ハンドブレーキ・ニトロ</dt><dd><kbd>Space</kbd> / 加速中の <kbd>Shift</kbd></dd></div><div><dt>MT・カメラ・復帰</dt><dd><kbd>Q</kbd> / <kbd>E</kbd> で変速、<kbd>C</kbd> でカメラ、<kbd>R</kbd> でコース復帰、<kbd>Esc</kbd> で一時停止</dd></div></dl></details><details><summary>スマートフォン</summary><p>横へ指を滑らせる連続ハンドルか、左右の操舵ボタンを選べます。GAS / BRAKEと操舵は複数の指で同時に操作できます。DRIFTはハンドブレーキ、NITROは短時間の加速補助です。基本ニトロは標準最高速度を増やさず、旧ニトロレベルの引き継ぎ分だけ上限内の速度補助が反映されます。MTでは− / ＋で変速します。</p><p>横向きにすると道路の先と操作パネルを広く見渡せます。縦向きでも設定やガレージを操作できます。</p></details><details><summary>ゲームパッド</summary><p>左スティックまたは十字キーで操舵、RT / R2で加速、LT / L2でブレーキ・後退。変速とニトロの割り当てはゲーム内設定で確認できます。</p></details></div><p>最初は小さな入力から試し、高速では舵を急に増やさないようにします。停止後にブレーキを約0.8秒押し続けると後退します。復帰キーRは車を停止させて道路中央へ戻します。画面が重い場合は描画設定を下げ、端末に合った品質を選んでください。</p></section>'''
    body+='''<section id="driving-presets" class="guide-section"><h2 class="section-heading">運転アシストと基礎練習</h2><p>初めて向けの設定はATと減速・トラクション補助を使います。バランス設定では補助を控えめに、スポーツ設定では補助を切って操作を確かめられます。アシストは進路を自動で操舵するものではなく、曲率・路面・制動力に合わせて減速を助けます。</p><p>基礎練習では発進、手動ブレーキ、低中速での滑らかな旋回を実際に操作して確認します。完了状態は端末に保存され、あとから再練習できます。アシストを使用した記録は使用ありとして区別します。</p></section><section id="choosing-a-car" class="guide-section"><h2 class="section-heading">PPと駆動方式で車を選ぶ</h2><p>PPは出力・最高速度・車重・グリップなどをまとめたゲーム内の比較指標です。高いPPは常に扱いやすいことを意味しません。同じコースで駆動方式や車重の違いを試すと、自分の操作に合う車を選びやすくなります。</p><ul><li>FF：前輪の余裕を残すため、曲がりながら強く加速しすぎない。</li><li>FR：出口で舵を戻しながらアクセルを開け、後輪の滑りを管理する。</li><li>MR / RR：進入中に急に荷重を動かさず、小さな修正で姿勢を整える。</li><li>4WD：駆動力を生かしながら、曲がる前の減速を忘れない。</li></ul><p><a href="./cars.html#catalog-start">車両図鑑で最大3台を比較する</a></p></section>
<section id="reading-a-course" class="guide-section"><h2 class="section-heading">路面と荷重を読んで減速する</h2><p>タイヤが使える力は有限です。強く減速しながら大きく曲がろうとすると、思ったほど向きが変わらないことがあります。直線で減速し、ブレーキを緩めながら旋回し、出口で舵を戻す順序を意識します。</p><p>雨や圧雪を含む路面は早めに減速し、アクセルも段階的に開けます。下りは減速に余裕を持ち、坂の頂上や谷で急な操舵を避けましょう。</p><p><a href="./courses.html">コース詳細</a>のルート図・標高図は、ゲームが実際に使う道路形状から計算しています。走行前に、長い直線、連続する曲がり、起伏の位置を確認できます。</p></section>
<section id="modes" class="guide-section"><h2 class="section-heading">モードと報酬の違い</h2><ul><li>練習走行：車両・操作・コースを確かめる。</li><li>タイムアタック：同じ条件で自分の走りを比較し、自己記録に挑戦する。</li><li>CPUレース：難度や台数を選び、減速・追い越し・順位を競う。</li><li>ドリフト：滑りを維持しながら車の向きを整える。</li><li>グランプリ・公式戦：複数のレースや順位ポイントで競う。</li></ul><p>Z・XPは距離、実走時間、順位、難度などの条件で決まります。初回完走には探索ボーナスが加わります。結果画面で獲得額の内訳を確認できます。Zは実通貨への交換を目的としないゲーム内通貨です。</p></section>
<section id="workshop" class="guide-section"><h2 class="section-heading">強化とセットアップを比べる</h2><p>ガレージでは部位別のアップグレードとセットアップを選びます。確定前に費用とPPの変化を確認し、一度に全項目を変えず、同じ試験コースで効果を比較すると違いをつかみやすくなります。</p><p>出力を増やした場合も、制動やタイヤとの釣り合いが大切です。速度の数字だけを追わず、減速距離、旋回のしやすさ、出口の安定を確認してください。旧版の強化は新しい段階へ移行します。</p><p><a href="./courses.html?category=tuning-tests#catalog-start">加速・制動・旋回の試験コース</a></p></section>
<section id="music" class="guide-section"><h2 class="section-heading">BGMと音量を整える</h2><p>メニュー用1曲と、8テーマそれぞれに4つのミックスを用意した33音源を収録しています。ゲーム用に合成した独自の楽曲です。レースの雰囲気に合わせて設定から選べます。</p><p>音が出ない場合はBGMのオン・オフと音量を確認し、画面を一度操作してください。別のタブやアプリへ移ったときは音を停止します。</p></section>
<section id="save" class="guide-section"><h2 class="section-heading">対戦とセーブの扱い</h2><p>進行はこのブラウザに保存します。端末を変える前やブラウザのデータを削除する前に、「セーブデータ同期」からバックアップしてください。旧版で所有していた車・進行は、新しい強化ルールへ引き継ぎます。</p><p>フリールームでは部屋コードを共有して接続します。接続には外部のシグナリングサービスと参加者間通信を使うため、回線やサービスの状態で接続できない場合があります。対戦中はゲーム画面を開いたままにしてください。</p><p>v3の自己記録・共有チャレンジと、旧版の記録・共有順位表は別に扱います。旧版分は閲覧用に残し、新しい走行の比較には混ぜません。手動同期・自動同期・バックアップでも区別して引き継ぎます。</p><p>自己記録の共有リンクは、同じコースへの挑戦に使えます。本人の身元やタイムの正当性を自動検証する世界ランキングではありません。</p></section>'''
    body+='<section id="faq" class="guide-section"><h2 class="section-heading">よくある質問</h2>'+''.join(f'<details><summary>{E(q)}</summary><p>{E(a)}</p></details>' for q,a in faq)+'</section></div>'
    graph=common_graph(DOMAIN+'/guide.html',title,description,[('操作ガイド',DOMAIN+'/guide.html')]);graph[2]['@type']=['WebPage','FAQPage'];graph[2]['mainEntity']=[{'@type':'Question','name':q,'acceptedAnswer':{'@type':'Answer','text':a}} for q,a in faq]
    write('guide.html',document('guide.html',title,description,body,classes='catalog-guide',graph=graph))

if __name__=='__main__':
    try:main()
    except (OSError,ValueError,KeyError,subprocess.CalledProcessError) as error:
        if isinstance(error,subprocess.CalledProcessError) and error.stderr:print(error.stderr,file=sys.stderr)
        print(f'Page generation failed: {error}',file=sys.stderr);sys.exit(1)
