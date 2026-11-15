/** Old results remain readable, while new regulations keep their own best times. */
export function readLegacyRecords(storage, key='omojiz.raceRecords.v1') {
  try {
    const text=storage?.getItem(key);
    if(!text || text.length>2_000_000)return [];
    const data=JSON.parse(text);
    if(!data||typeof data!=='object'||Array.isArray(data))return [];
    return Object.entries(data).filter(([id,record])=>
      /^[a-z0-9-]+:[a-z0-9-]+:[a-z0-9-]+:[a-z0-9-]+(?::[2-7])?$/.test(id) &&
      record && Number.isFinite(record.time)&&record.time>0&&record.time<=86400&&Number.isFinite(record.score))
      .sort((a,b)=>(Number(b[1].updatedAt)||0)-(Number(a[1].updatedAt)||0)).slice(0,10);
  } catch {return [];}
}

export function mountLegacyRecords(container, api) {
  if(!container)return;
  let storage;
  try {storage=globalThis.localStorage;}catch{return;}
  const rows=readLegacyRecords(storage,api.key).map(([id,record])=>{
    const [mode,trackId,carId]=id.split(':');
    const track=api.trackById(trackId),car=api.carById(carId),label=api.modeLabel(mode);
    return track&&car&&label?{record,mode,track,car,label}:null;
  }).filter(Boolean);
  if(!rows.length)return;
  const document=container.ownerDocument;
  const panel=document.createElement('details');panel.className='legacy-records';
  const summary=document.createElement('summary');summary.textContent='旧レギュレーションの記録';
  const copy=document.createElement('p');copy.textContent='以前の記録は保管しています。車両性能と操作条件が異なるため、現在の自己ベストとは比較しません。';
  const list=document.createElement('ul');
  for(const {record,mode,track,car,label} of rows){
    const row=document.createElement('li'),name=document.createElement('span'),value=document.createElement('strong');
    name.textContent=track.name+' · '+label+' / '+car.name;
    value.textContent=mode==='drift'?Math.round(record.score).toLocaleString('ja-JP')+' PTS':api.formatTime(record.time);
    row.append(name,value);list.append(row);
  }
  panel.append(summary,copy,list);container.append(panel);
}
