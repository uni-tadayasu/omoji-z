#!/usr/bin/env python3
"""Write the game's independently authored 24px SVG symbol set.

All paths below are purpose-built geometric drawings; no third-party icon
package or previous sprite geometry is used. Symbol IDs preserve the UI API.
Run: python3 tools/generate-icons.py
"""
from pathlib import Path
from html import escape
import hashlib
import json

ROOT=Path(__file__).resolve().parents[1]

def p(d):
    return f'<path d="{d}"/>'

def c(x,y,r):
    return f'<circle cx="{x}" cy="{y}" r="{r}"/>'

def rect(x,y,w,h,r=0):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/>'

ICONS={
 'flag':('レース',p('M5 21V3m1 2c4-4 8 3 13-1v9c-5 4-9-3-13 1M3 21h5')),
 'garage':('ガレージ',p('M2.5 10 12 3l9.5 7M4 9v12h16V9M7 21V11h10v10M8 14h8M8 17h8')),
 'road':('道路',p('M3 21c4-6 2-12 5-18m13 18c-4-6-2-12-5-18M12 3v3m0 4v3m0 4v4')),
 'hills':('山岳',p('M2 20 8 7l5 8 3-5 6 10ZM6.2 11 8 12l1.8-1M13 15l2 3')+c(18,5,2)),
 'coast':('海岸',p('M2 15q2-3 5 0t5 0t5 0t5 0M2 20q2-3 5 0t5 0t5 0t5 0M3 10h18M6 10a5 5 0 0 1 10 0M11 2v2')),
 'gorge':('峡谷',p('M3 3l4 4-3 4 4 5-2 5M21 3l-4 4 3 4-4 5 2 5M11 3c4 4-3 6 0 10s-2 5 1 8')),
 'tree':('森林',p('M12 2 5 11h3l-5 7h8v4h2v-4h8l-5-7h3ZM12 8v6')),
 'town':('市街地',p('M2 21h20M4 21V9h7v12m2 0V3h7v18M6.5 12v1m0 3v1M16 6v1m0 3v1m0 3v1m0 3v1')),
 'winter':('雪道',p('M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3.8 10l4-1-1-4m10.4 14-1-4 4-1M3.8 14l4 1-1 4M17.2 5l-1 4 4 1')),
 'timer':('タイム',c(12,13,8)+p('M9 2h6M12 2v3m6 1 2-2M12 9v5l3 2')),
 'trophy':('トロフィー',p('M7 3h10v6a5 5 0 0 1-10 0ZM7 5H3v3c0 3 2 4 5 4m9-7h4v3c0 3-2 4-5 4M12 14v5m-4 2h8M9 19h6')),
 'duel':('対戦',p('M3 7h16m-4-4 4 4-4 4M21 17H5m4-4-4 4 4 4')),
 'drift':('ドリフト',p('M3 19c3-1 1-4 4-5m-1 7c3-1 1-4 4-5')+'<g transform="rotate(18 15 9)">'+rect(10,3,10,12,2)+p('M12 3v4h6V3M10 11h10M12 15v2m6-2v2')+'</g>'),
 'wheel':('ステアリング',c(12,12,9)+c(12,12,2.5)+p('M3.3 10h5.8m5.8 0h5.8M10.8 14.3 8 20m5.2-5.7L16 20')),
 'car':('車両',p('M4 18v3m16-3v3M3 18v-6l3-7h12l3 7v6ZM3 12h18M6 15h2m8 0h2M7 5l-2 7m12-7 2 7')),
 'music':('音楽',p('M10 17V5l10-2v12M10 9l10-2')+c(7,18,3)+c(17,16,3)),
 'radio':('お知らせ',rect(3,8,18,13,2)+p('M6 8 17 3M14 12h4m-4 4h4m-4 3h2')+c(8,14.5,2.5)),
 'volume':('音量',p('M3 9h4l5-5v16l-5-5H3ZM16 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14')),
 'settings':('設定',p('M4 5h16M4 12h16M4 19h16')+c(8,5,2)+c(16,12,2)+c(10,19,2)),
 'controller':('ゲームパッド',p('M7 7h10c2 0 3 2 3.5 5l1 6c.4 3-3 4-5 1l-1-2h-7l-1 2c-2 3-5.4 2-5-1l1-6C4 9 5 7 7 7ZM12 7V3M6 12h4m-2-2v4')+c(16,11,1)+c(18,14,1)),
 'keyboard':('キーボード',rect(2,5,20,14,2)+p('M5 9h1m3 0h1m3 0h1m3 0h2M5 12h1m3 0h1m3 0h1m3 0h2M6 15h2m3 0h7')),
 'display':('画面',rect(2,3,20,14,2)+p('M8 21h8M12 17v4M5 14h14')),
 'search':('検索',c(10,10,7)+p('M15 15l6 6')),
 'filter':('絞り込み',p('M3 4h18l-7 8v7l-4 2v-9Z')),
 'globe':('ネットワーク',c(12,12,9)+p('M3 12h18M5 6h14M5 18h14M12 3c-6 5-6 13 0 18m0-18c6 5 6 13 0 18')),
 'pin':('場所',p('M19 9c0 5-7 12-7 12S5 14 5 9a7 7 0 0 1 14 0Z')+c(12,9,2.5)),
 'link':('リンク',p('M9 7l2-2a5 5 0 0 1 7 7l-2 2M8 10l-2 2a5 5 0 0 0 7 7l2-2M8 16l8-8')),
 'speed':('速度',p('M4 20a10 10 0 1 1 16 0ZM12 14l5-7M5 14H3m4-7L5 5m7 0V2m7 12h2')+c(12,14,1.5)),
 'paint':('塗装',p('M3 3h14v6H3ZM17 6h4v6H12v3M10 15h4v7h-4Z')),
 'tuning':('チューニング',p('M14 4a6 6 0 0 0-7 7L3 17a2.8 2.8 0 0 0 4 4l6-6a6 6 0 0 0 7-7l-4 4-4-4 4-4Z')+c(5.5,18.5,.8)),
 'wallet':('所持Z',p('M20 7V4H5a3 3 0 0 0 0 6h15v11H5a3 3 0 0 1-3-3V7m18 6h-5v5h5')+c(17,15.5,.8)),
 'stage':('ステージ',p('M3 21h18M4 21v-6h5v6m0 0V9h6v12m0 0V4h5v17M5 5l4-2 2 2 4-3')),
 'engine':('エンジン',p('M5 8h4l2-3h6v3h3v12H7l-3-4H2v-5h3ZM9 3h8M13 3v2M20 11h2v6h-2M10 12h6m-3-3v6')),
 'transmission':('トランスミッション',p('M6 3v18M18 3v18M6 12h12M12 12v9')+c(6,3,1)+c(18,3,1)+c(6,21,1)+c(12,21,1)+c(18,21,1)),
 'tires':('タイヤ',rect(5,2,14,20,5)+p('M9 3v18m6-18v18M5 7l4 2m6-4 4 2M5 13l4 2m6-4 4 2M5 19l4 2m6-4 4 2')),
 'suspension':('サスペンション',p('M12 2v3m0 14v3M8 5h8l-8 3 8 3-8 3 8 3-8 2h8M9 2h6m-6 20h6')),
 'brakes':('ブレーキ',c(12,12,9)+c(12,12,3)+p('M18 4v6h4M18 4h-4v6h4M8 6l1 1M6 11h1m1 6 1-1m5 3v-1m4-3-1-1')),
 'camera':('カメラ',p('M3 7h5l2-3h5l2 3h4v14H3Z')+c(12,13.5,4)+c(18.5,9.5,.6)),
 'reset':('車両を戻す',p('M3 10a9 9 0 1 1 2 9M3 10V4m0 6h6M8 16v-4l2-3h5l2 3v4ZM8 12h9')),
 'pause':('一時停止',rect(5,3,4,18,1)+rect(15,3,4,18,1)),
 'play':('再生・開始',p('M7 3l14 9-14 9Z')),
 'stop':('停止',rect(4,4,16,16,2)),
 'exit':('退出',p('M10 3H4v18h6M8 12h13m-4-4 4 4-4 4')),
 'close':('閉じる',p('M5 5l14 14M19 5 5 19')),
 'left':('左',p('M15 3 6 12l9 9M6 12h15')),
 'right':('右',p('M9 3l9 9-9 9M3 12h15')),
 'up':('シフトアップ',p('M3 15l9-9 9 9M12 6v15')),
 'down':('シフトダウン',p('M3 9l9 9 9-9M12 3v15')),
 'forward':('前進',p('M4 5l9 7-9 7ZM13 5l9 7-9 7Z')),
 'warning':('注意',p('M12 3 2 21h20ZM12 9v5')+c(12,18,.65)),
 'copy':('コピー',rect(8,8,13,13,2)+p('M16 8V3H3v13h5')),
 'people':('プレイヤー',c(9,7,3.5)+p('M2 21v-3a7 7 0 0 1 14 0v3M16 4a3.5 3.5 0 0 1 0 7m2 3a5 5 0 0 1 4 5v2')),
 'medals':('級・段位',c(12,16,6)+p('M8 11 5 2h5l3 8M16 11l3-9h-5l-2 6M12 13l1 2 2 .5-1.5 1.5.2 2-1.7-1-1.7 1 .2-2L9 15.5l2-.5Z')),
 'bolt':('ニトロ',p('M14 2 4 13h7l-1 9 10-12h-7Z')),
 'pedal':('アクセル',p('M8 3h9l3 18H5ZM10 6l-1 11m5-11 1 11M6 21v1m12-1v1')),
 'brand':('尾文字Z',p('M5 19a10 10 0 1 1 14 0M8 22c0-6 5-7 5-13m6 13c0-6-3-7-3-13M6 7l2 2m10-2-2 2M12 2v3')+c(14.5,8,1.5)),
 'shop':('ショップ',p('M3 8l2-5h14l2 5M3 8v3a3 3 0 0 0 6 0m0-3v3a3 3 0 0 0 6 0m0-3v3a3 3 0 0 0 6 0V8ZM4 14v7h16v-7M9 21v-6h6v6')),
 'book':('操作ガイド',p('M12 6C9 3 5 3 2 4v16c4-1 7-1 10 2m0-16c3-3 7-3 10-2v16c-4-1-7-1-10 2ZM5 8h4M5 12h4m6-4h4m-4 4h4')),
 'records':('走行記録',rect(5,4,15,18,2)+rect(8,2,8,4,1)+p('M8 11h8M8 15h8M8 19h4')),
 'turbine':('タービン',p('M13 3a9 9 0 1 0 8 13h-5l-2-3M13 3h8v5h-5M9 10l5 1-3 4Z')+c(11,12,4.5)),
 'home':('ホーム',p('M2 11 12 2l10 9M5 9v13h14V9M9 22v-8h6v8')),
 'sound-off':('ミュート',p('M3 9h4l5-5v16l-5-5H3ZM16 9l6 6m0-6-6 6')),
 'menu':('メニュー',p('M3 5h18M3 12h18M3 19h18')),
 'chevron':('展開',p('M4 8l8 8 8-8')),
 'check':('完了',p('M3 12l6 6L21 5')),
 'help':('ヘルプ',c(12,12,9)+p('M9 8a3 3 0 0 1 6 0c0 3-3 3-3 6')+c(12,18,.6)),
 'lock':('ロック',rect(4,10,16,12,2)+p('M7 10V7a5 5 0 0 1 10 0v3M12 15v3')),
 'refresh':('更新',p('M3 10a9 9 0 0 1 16-5l2 3m0 0V2m0 6h-6M21 14A9 9 0 0 1 5 19l-2-3m0 0v6m0-6h6')),
 'protect':('保護',p('M12 2 3 6v6c0 5 5 8 9 10 4-2 9-5 9-10V6ZM7 12l3 3 7-7')),
 'phone':('スマートフォン',rect(6,2,12,20,2)+p('M9 5h6M10 19h4')),
 'arrow-right':('次へ',p('M2 12h19m-7-7 7 7-7 7')),
}

def main():
    symbols=[]
    for name,(label,geometry) in ICONS.items():
        symbols.append(f'<symbol id="i-{name}" viewBox="0 0 24 24"><title>{escape(label)}</title><g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">{geometry}</g></symbol>')
    sprite='<svg xmlns="http://www.w3.org/2000/svg">\n<!-- Independently authored geometric icon set. Generated by tools/generate-icons.py. -->\n'+'\n'.join(symbols)+'\n</svg>\n'
    dest=ROOT/'assets'/'ui-icons.svg'
    dest.write_text(sprite,encoding='utf-8')
    provenance={
      'path':'assets/ui-icons.svg',
      'generator':'tools/generate-icons.py',
      'source':'71 independently authored geometric icons; no old sprite paths or third-party icon package used.',
      'symbolCount':len(ICONS),
      'ids':['i-'+name for name in ICONS],
      'sha256':hashlib.sha256(dest.read_bytes()).hexdigest(),
    }
    (ROOT/'assets'/'ui-icons.provenance.json').write_text(json.dumps(provenance,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    manifest_path=ROOT/'assets'/'art'/'manifest.json'
    if manifest_path.exists():
        manifest=json.loads(manifest_path.read_text())
        manifest['relatedAssets']={**manifest.get('relatedAssets',{}),'uiIcons':provenance}
        manifest_path.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Generated {len(ICONS)} original UI symbols.')

if __name__=='__main__':
    main()
