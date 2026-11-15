/* OMOJI Z original catalog tools. Browser-local only, no external requests. */
(() => {
  'use strict';
  const filter = document.getElementById('catalog-filter');
  if (!filter) return;
  const input = document.getElementById('catalog-query');
  const category = document.getElementById('catalog-category');
  const sort = document.getElementById('catalog-sort');
  const reset = document.getElementById('catalog-reset');
  const count = document.getElementById('catalog-count');
  const isCars = document.body.classList.contains('cinema-cars');
  const normalize = text => String(text).normalize('NFKC').toLocaleLowerCase('ja');
  const asNumber = value => value !== undefined && value !== '' && Number.isFinite(Number(value)) ? Number(value) : null;
  const groups = [...document.querySelectorAll('[data-catalog-group]')].map(group => {
    const list = group.querySelector('.row-list');
    const jump = [...document.querySelectorAll('.jumps a')].find(a => a.getAttribute('href') === '#' + group.id)?.parentElement;
    const rows = [...list.children].map((element, index) => ({
      element, index, title: element.dataset.title || element.querySelector('h3').textContent,
      text: normalize(element.textContent), facts: element.querySelector('.facts').textContent.trim(),
      speed: asNumber(element.dataset.speed), power: asNumber(element.dataset.power),
      price: asNumber(element.dataset.price), distance: asNumber(element.dataset.distance),
      drive: element.dataset.drive, surface: element.dataset.surface,
      link: element.querySelector('a[href*="?car="], a[href*="?course="]')
    }));
    return {group, list, jump, rows};
  });
  const rows = groups.flatMap(group => group.rows);
  const byID = new Map(rows.map(row => [row.element.id, row]));
  const total = rows.length;
  const formats = new Intl.NumberFormat('ja-JP', {maximumFractionDigits: 3});
  const storageKey = 'omoji-original-catalog-compare-' + (isCars ? 'cars' : 'courses');
  const selected = new Set();
  try {
    const saved = JSON.parse(sessionStorage.getItem(storageKey) || '[]');
    if (Array.isArray(saved)) for (const id of saved) if (byID.has(id) && selected.size < 3) selected.add(id);
  } catch { /* Storage is optional in private/restricted browser modes. */ }

  const facetLabel = document.createElement('label');
  facetLabel.innerHTML = '<span>' + (isCars ? '駆動方式' : '路面') + '</span><select id="catalog-facet"><option value="">すべて</option></select>';
  const facet = facetLabel.querySelector('select');
  const options = isCars ? [['FF','FF · 前輪駆動'],['FR','FR · 後輪駆動'],['MR','MR · ミッドシップ'],['RR','RR · リアエンジン'],['4WD','4WD · 四輪駆動']] : [['dry','ドライ舗装'],['wet','ウェット'],['snow','雪・凍結区間']];
  for (const [value, label] of options) facet.add(new Option(label, value));
  document.querySelector('.catalog-filter-fields').append(facetLabel);
  const resultActions = document.createElement('span');
  resultActions.className = 'catalog-share-actions';
  const share = document.createElement('button');
  share.type = 'button'; share.textContent = '検索リンクをコピー';
  const shareStatus = document.createElement('span');
  shareStatus.className = 'catalog-copy-status'; shareStatus.role = 'status';
  resultActions.append(share, shareStatus);
  document.querySelector('.catalog-result-line').append(resultActions);

  const params = new URLSearchParams(location.search);
  input.value = (params.get('q') || '').slice(0, 120);
  for (const [element, key] of [[category, 'category'], [sort, 'sort'], [facet, isCars ? 'drive' : 'surface']]) {
    const value = params.get(key) || '';
    if ([...element.options].some(option => option.value === value)) element.value = value;
  }
  const modes = {speed: ['speed', -1], power: ['power', -1], price: ['price', 1], distance: ['distance', 1], 'distance-desc': ['distance', -1]};
  function orderRows() {
    const mode = modes[sort.value];
    for (const {list, rows} of groups) {
      const ranked = mode ? rows.slice().sort((a, b) => {
        const [key, direction] = mode;
        if (a[key] === null || b[key] === null) return Number(a[key] === null) - Number(b[key] === null) || a.index - b.index;
        return (a[key] - b[key]) * direction || a.index - b.index;
      }) : rows;
      list.append(...ranked.map(row => row.element));
    }
  }
  function saveURL() {
    const url = new URL(location.href);
    for (const [key, value] of [['q', input.value.trim()], ['category', category.value], ['sort', sort.value === 'default' ? '' : sort.value], [isCars ? 'drive' : 'surface', facet.value]]) {
      if (value) url.searchParams.set(key, value); else url.searchParams.delete(key);
    }
    try { history.replaceState(null, '', url); } catch { /* file:// previews may restrict history. */ }
  }
  function update(save = true) {
    const terms = normalize(input.value).trim().split(/\s+/).filter(Boolean);
    let shown = 0;
    for (const {group, jump, rows} of groups) {
      const available = !category.value || category.value === group.id;
      let matching = 0;
      for (const row of rows) {
        const matchesFacet = !facet.value || (isCars ? row.drive : row.surface) === facet.value;
        row.element.hidden = !available || !matchesFacet || !terms.every(term => row.text.includes(term));
        if (!row.element.hidden) matching++;
      }
      group.hidden = !matching;
      if (jump) jump.hidden = group.hidden;
      shown += matching;
    }
    count.textContent = shown ? formats.format(shown) + '件 / 全' + formats.format(total) + '件' : '条件に一致する項目がありません。絞り込みを解除するとすべて表示できます。';
    reset.hidden = !terms.length && !category.value && !facet.value && sort.value === 'default';
    if (save) saveURL();
  }
  input.addEventListener('input', () => update());
  category.addEventListener('change', () => update());
  facet.addEventListener('change', () => update());
  sort.addEventListener('change', () => {orderRows(); update();});
  reset.addEventListener('click', () => {
    input.value = ''; category.value = ''; facet.value = ''; sort.value = 'default';
    orderRows(); update(); input.focus();
  });
  share.addEventListener('click', async () => {
    saveURL();
    try {
      await navigator.clipboard.writeText(location.href);
      shareStatus.textContent = 'コピーしました';
    } catch {
      const url = document.createElement('input');
      url.className = 'catalog-link-fallback'; url.readOnly = true; url.value = location.href;
      resultActions.append(url); url.focus(); url.select();
      shareStatus.textContent = '選択したリンクをコピーしてください';
      url.addEventListener('blur', () => url.remove(), {once: true});
    }
  });

  const bar = document.createElement('aside');
  bar.className = 'catalog-compare-bar'; bar.hidden = true; bar.setAttribute('aria-label', '比較リスト');
  const selectedText = document.createElement('p'); selectedText.setAttribute('aria-live','polite');
  const showComparison = document.createElement('button'); showComparison.type = 'button'; showComparison.className = 'catalog-compare-primary'; showComparison.textContent = '比較する';
  const clear = document.createElement('button'); clear.type = 'button'; clear.textContent = 'すべて解除';
  const barActions = document.createElement('div'); barActions.append(showComparison, clear);
  bar.append(selectedText, barActions); document.body.append(bar);
  const dialog = document.createElement('dialog');
  dialog.className = 'catalog-comparison'; dialog.setAttribute('aria-labelledby', 'catalog-comparison-title');
  const dialogHeader = document.createElement('div'); dialogHeader.className = 'catalog-comparison-heading';
  const heading = document.createElement('h2'); heading.id = 'catalog-comparison-title'; heading.textContent = isCars ? '車両を比較する' : 'コースを比較する';
  const close = document.createElement('button'); close.type = 'button'; close.textContent = '閉じる';
  dialogHeader.append(heading, close); dialog.append(dialogHeader);
  const tableWrap = document.createElement('div'); tableWrap.className = 'catalog-comparison-scroll'; tableWrap.tabIndex = 0; tableWrap.setAttribute('role', 'region'); tableWrap.setAttribute('aria-label', '比較表。左右にスクロールできます');
  dialog.append(tableWrap); document.body.append(dialog);
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  });
  function updateSelection() {
    try { sessionStorage.setItem(storageKey, JSON.stringify([...selected])); } catch { /* Optional storage. */ }
    bar.hidden = selected.size === 0;
    document.body.classList.toggle('has-catalog-comparison', selected.size > 0);
    selectedText.textContent = selected.size + ' / 3件 · ' + [...selected].map(id => byID.get(id).title).join(' / ');
    showComparison.disabled = selected.size < 2;
    showComparison.textContent = selected.size < 2 ? 'あと1件選んで比較' : selected.size + '件を比較する';
    for (const row of rows) {
      const included = selected.has(row.element.id);
      row.compareButton.setAttribute('aria-pressed', String(included));
      row.compareButton.textContent = included ? '比較から外す' : '比較に追加';
      row.compareButton.disabled = !included && selected.size >= 3;
      row.element.classList.toggle('catalog-selected', included);
    }
  }
  for (const row of rows) {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'catalog-compare-add';
    button.setAttribute('aria-label', row.title + 'を比較リストに追加・解除');
    row.compareButton = button;
    button.addEventListener('click', () => {
      if (selected.has(row.element.id)) selected.delete(row.element.id);
      else if (selected.size < 3) selected.add(row.element.id);
      updateSelection();
    });
    row.element.append(button);
  }
  clear.addEventListener('click', () => {selected.clear(); updateSelection();});
  showComparison.addEventListener('click', () => {
    const chosen = [...selected].map(id => byID.get(id));
    if (chosen.length < 2) return;
    const table = document.createElement('table');
    const caption = document.createElement('caption'); caption.textContent = isCars ? 'チューニング前のゲーム内設定値' : '架空コースの距離・路面と走行条件'; table.append(caption);
    const thead = document.createElement('thead');
    const header = document.createElement('tr');
    for (const title of ['比較項目', ...chosen.map(row => row.title)]) {
      const th = document.createElement('th'); th.scope = 'col'; th.textContent = title; header.append(th);
    }
    thead.append(header); table.append(thead);
    const tbody = document.createElement('tbody');
    const fields = isCars ? [
      ['駆動方式', row => row.drive],
      ['最高速度', row => row.speed === null ? '—' : formats.format(row.speed) + ' km/h'],
      ['最高出力', row => row.power === null ? '—' : formats.format(row.power) + ' PS'],
      ['価格', row => row.price === 0 ? '初期車両' : row.price === null ? '—' : formats.format(row.price) + ' Z'],
      ['設計年', row => row.element.dataset.year],
      ['特徴', row => row.element.querySelector('.facts + p')?.textContent || '']
    ] : [
      ['走行距離', row => row.distance === null ? '—' : formats.format(row.distance) + ' km'],
      ['走行条件', row => row.facts],
      ['コースの特徴', row => row.element.querySelector('.facts + p')?.textContent || ''],
      ['追加報酬', row => row.element.querySelector('.catalog-reward')?.textContent || '通常報酬']
    ];
    for (const [label, value] of fields) {
      const tr = document.createElement('tr'); const th = document.createElement('th'); th.scope = 'row'; th.textContent = label; tr.append(th);
      for (const row of chosen) { const td = document.createElement('td'); td.textContent = value(row); tr.append(td); }
      tbody.append(tr);
    }
    const actions = document.createElement('tr'); const th = document.createElement('th'); th.scope = 'row'; th.textContent = 'ゲームで確認'; actions.append(th);
    for (const row of chosen) {
      const td = document.createElement('td');
      if (row.link) {const link = document.createElement('a'); link.href = row.link.href; link.textContent = isCars ? '外観・性能を見る' : 'このコースを選ぶ'; td.append(link);}
      actions.append(td);
    }
    tbody.append(actions); table.append(tbody); tableWrap.replaceChildren(table); dialog.showModal(); close.focus();
  });
  filter.hidden = false;
  orderRows(); update(false); updateSelection();
})();
