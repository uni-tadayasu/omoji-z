import {WORKSHOP_PARTS, DEFAULT_SETTINGS, CLASS_LIMITS, normalizeWorkshop, quoteWorkshopUpgrade,
    performancePoints, classForPP, workshopTier} from './balance.js';
const number=new Intl.NumberFormat('ja-JP',{maximumFractionDigits:1});
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=value=>number.format(value)+' Z';

/** The host supplies locked save transactions; this module never edits storage directly. */
export function mountWorkshop(container,api) {
    if(!container)return {render(){},refresh(){}};
    let car,preview,review=null,pending=false,status='';
    const heading=api.headingId||'workshop-heading';
    container.classList.add('workshop-host');
    const statRows=(base,next)=>[
        ['PP / クラス',base.pp??performancePoints(base),next.pp??performancePoints(next)],
        ['最高速 km/h',base.topSpeed,next.topSpeed],['出力 PS',base.power,next.power],['車重 kg',base.mass,next.mass],
        ['加速指数',base.accel,next.accel],['基本グリップ',base.grip,next.grip],
        ['制動力',base.brakeForce??1,next.brakeForce??1],['雨天グリップ補正 %',(base.wetGrip??0)*100,(next.wetGrip??0)*100]
    ].map(([label,from,to])=>`<tr><th scope="row">${label}</th><td>${number.format(from)}</td><td>${number.format(to)}</td></tr>`).join('');
    function currentSetup(){return normalizeWorkshop(api.getSetup(car.id));}
    function collect(){
        const f=container.querySelector('[data-workshop-settings]');if(!f)return preview?.settings||DEFAULT_SETTINGS;
        return Object.fromEntries([...f.querySelectorAll('[data-setting]')].map(input=>[input.dataset.setting,['compound','classCap'].includes(input.dataset.setting)?input.value:Number(input.value)]));
    }
    function show() {
        if(!car)return;
        const setup=currentSetup(),season=api.getSeason(),tier=workshopTier(season),stats=api.statsFor(car,setup);
        preview=normalizeWorkshop({...setup,settings:preview?.settings??setup.settings});
        const proposed=api.statsFor(car,preview),owned=api.canUse(car),busy=pending||api.isBusy();
        const className=classForPP(proposed.pp??performancePoints(proposed));
        const classOK=(proposed.pp??performancePoints(proposed))<=CLASS_LIMITS[preview.settings.classCap];
        const select=(key,values)=>`<select data-setting="${key}"${busy||!owned?' disabled':''}>${values.map(([value,label])=>`<option value="${value}"${preview.settings[key]===value?' selected':''}>${label}</option>`).join('')}</select>`;
        const range=(key,min,max,left,right,level)=>`<span class="workshop-range-label"><span>${left}</span><b>${preview.settings[key]}</b><span>${right}</span></span><input type="range" data-setting="${key}" min="${min}" max="${max}" step="1" value="${preview.settings[key]}"${busy||!owned||!setup.levels[level]?' disabled':''}>`;
        container.innerHTML=`<section class="workshop" aria-labelledby="${heading}">
          <header class="workshop-heading"><div><p class="workshop-eyebrow">VEHICLE WORKSHOP</p><h3 id="${heading}">セッティングとアップグレード</h3><p>${escape(car.name)} · ${escape(car.code)}</p></div><strong>${money(api.getBalance())}</strong></header>
          <div class="workshop-summary"><span>現在 <strong>${stats.pp??performancePoints(stats)} PP · ${classForPP(stats.pp??performancePoints(stats))}</strong></span><span>プレビュー <strong>${proposed.pp??performancePoints(proposed)} PP · ${className}</strong></span><span>開発段階 <strong>${tier} / 3</strong></span></div>
          <p class="workshop-mastery">マスタリー ${season.races??0}走 / ${number.format(season.validKm??0)} km。第2段階は12走・36 km、第3段階は30走・90 km。2 km以上・50秒以上の完走だけが対象です。</p>
          ${!owned?'<p class="workshop-notice">購入済みの車で装着できます。プレビューは自由に確認できます。</p>':''}
          <div class="workshop-layout"><section aria-label="開発パーツ"><h4>9つの機能を、目的に合わせて開発</h4><div class="workshop-parts">${WORKSHOP_PARTS.map(part=>{
            const q=quoteWorkshopUpgrade(setup,part.id,season),max=q.reason==='max';
            return `<article><div><h5>${part.name}</h5><p>${part.description}</p><span>Lv.${setup.levels[part.id]} / 3</span></div><button type="button" data-part="${part.id}"${!owned||busy||!q.available?' disabled':''}>${max?'開発済み':q.reason==='mastery'?'マスタリーで解放':money(q.price)+' · 効果を見る'}</button></article>`;
          }).join('')}</div></section>
          <section class="workshop-settings" aria-label="セッティング"><h4>走る場所に合わせる</h4><div data-workshop-settings>
            <label>タイヤコンパウンド ${select('compound',[['road','ロード · 万能'],...(setup.levels.tires>=1?[['sport','スポーツ · ドライ重視'],['wet','ウェット · 雨重視']]:[]),...(setup.levels.tires>=2?[['track','トラック · 雨に弱い']]:[])])}</label>
            <label>足回り ${range('ride',-2,2,'しなやか','応答重視','suspension')}</label>
            <label>ファイナル ${range('finalDrive',-2,2,'最高速','加速重視','transmission')}</label>
            <label>LSD ${range('lsd',0,3,'旋回重視','駆動重視','differential')}</label>
            <label>ダウンフォース ${range('downforce',0,3,'抵抗低減','接地重視','aero')}</label>
            <label>目標クラス ${select('classCap',[['open','上限を指定しない'],['D','D · 450 PP'],['C','C · 550 PP'],['B','B · 650 PP'],['A','A · 750 PP'],['S','S · 850 PP']])}</label>
          </div><p class="workshop-tradeoff">短いギヤは加速と引換えに最高速が低下。ウェットタイヤは雨に強くドライで不利。空力を増すと抵抗も増えます。</p>
          ${!classOK?'<p class="workshop-notice">プレビューが目標クラスの上限を超えています。設定か目標クラスを見直してください。</p>':''}
          <div class="workshop-actions"><button type="button" class="primary" data-apply${busy||!owned||!classOK?' disabled':''}>この設定を適用</button><button type="button" data-reset${busy||!owned?' disabled':''}>標準セッティング</button></div>
          <div class="workshop-presets"><label>保存枠 <select data-preset-slot><option value="0">セット1</option><option value="1">セット2</option><option value="2">セット3</option></select></label><button type="button" data-preset-save${busy||!owned?' disabled':''}>現在を保存</button><button type="button" data-preset-load${busy||!owned?' disabled':''}>読み込む</button></div>
          </section></div>
          <details class="workshop-comparison"><summary>現在とプレビューの性能を比較</summary><table><thead><tr><th>性能</th><th>現在</th><th>プレビュー</th></tr></thead><tbody>${statRows(stats,proposed)}</tbody></table></details>
          <section class="workshop-review" ${review?'':'hidden'} aria-label="購入前の確認">${review?`<h4>${escape(review.part.name)} · Lv.${review.quote.to} の見積</h4><p>費用 <strong>${money(review.quote.price)}</strong> · 購入後 ${money(Math.max(0,api.getBalance()-review.quote.price))}</p><p>${review.next.pp} PP · ${classForPP(review.next.pp)} / 出力 ${number.format(review.next.power)} PS / 最高速 ${number.format(review.next.topSpeed)} km/h</p><p>購入するパーツの機能は恒久解放です。調整値は後から無料で変更できます。</p><button type="button" class="primary" data-confirm${busy||api.getBalance()<review.quote.price||review.next.pp>CLASS_LIMITS[setup.settings.classCap]?' disabled':''}>${money(review.quote.price)} で開発する</button><button type="button" data-cancel>戻る</button>`:''}</section>
          <p role="status" aria-live="polite" class="workshop-status">${escape(status)}</p>
          <p class="workshop-legacy">以前の所持金・所有車・強化履歴は保持。旧強化は穏やかな基礎補正として反映されます。最高速の加算を繰り返す強化は終了しました。</p>
        </section>`;
    }
    async function transaction(fn,success) {
        if(pending)return;pending=true;show();
        try {const result=await fn();status=result?.status==='done'?success:({funds:'所持Zが不足しています。',mastery:'マスタリーが必要です。',changed:'状態が変わりました。見積をもう一度確認してください。',class:'目標クラスを超えています。',error:'保存できませんでした。変更は取り消しました。',empty:'この保存枠は空です。'})[result?.status]||'現在は変更できません。';if(result?.status==='done'){review=null;preview=null;api.onChange?.();}}
        catch {status='処理に失敗しました。変更は保存されていません。';}
        pending=false;show();
    }
    container.addEventListener('change',event=>{
        if(!event.target.matches('[data-setting]'))return;
        preview=normalizeWorkshop({...currentSetup(),settings:collect()});review=null;show();
    });
    container.addEventListener('click',event=>{
        const button=event.target.closest('button');if(!button||button.disabled||!car)return;
        if(button.dataset.part){const setup=currentSetup(),quote=quoteWorkshopUpgrade(setup,button.dataset.part,api.getSeason());const upgraded=normalizeWorkshop({...setup,levels:{...setup.levels,[quote.partId]:quote.to}});review={quote,part:WORKSHOP_PARTS.find(p=>p.id===quote.partId),next:api.statsFor(car,upgraded)};show();container.querySelector('.workshop-review')?.scrollIntoView({block:'nearest',behavior:'smooth'});}
        else if(button.hasAttribute('data-cancel')){review=null;show();}
        else if(button.hasAttribute('data-confirm')&&review){const quote=review.quote;transaction(()=>api.upgrade(car.id,quote),'パーツを開発・装着しました。');}
        else if(button.hasAttribute('data-apply')){const settings=collect();transaction(()=>api.apply(car.id,settings),'セッティングを適用しました。');}
        else if(button.hasAttribute('data-reset'))transaction(()=>api.apply(car.id,DEFAULT_SETTINGS),'標準のセッティングに戻しました。開発パーツは保持しています。');
        else if(button.hasAttribute('data-preset-save')){const slot=Number(container.querySelector('[data-preset-slot]').value);transaction(()=>api.preset(car.id,slot,false),'現在のセッティングを保存しました。');}
        else if(button.hasAttribute('data-preset-load')){const slot=Number(container.querySelector('[data-preset-slot]').value);transaction(()=>api.preset(car.id,slot,true),'保存したセッティングを適用しました。');}
    });
    return {render(next){if(!next)return;const id=car?.id;car=next;if(id!==car.id){preview=null;review=null;status='';}show();},refresh(){show();}};
}
