/** Presentation enhancements for the full classic engine. No save or gameplay writes. */
const mounted = new WeakMap();

export function mountClassicRemaster(root = document) {
  const body = root.body;
  if (!body?.classList.contains('classic-remastered')) return null;
  if (mounted.has(root)) return mounted.get(root);
  const win = root.defaultView || window;
  const controller = new win.AbortController();
  const {signal} = controller;
  const injected = [];
  const observers = [];
  let scheduled = false;
  let frameId = 0;
  let disposed = false;
  let routeAtlas = null;
  let atlasState = 'loading';
  let atlasRequest = null;
  let atlasTimer = null;
  let currentRoute = null;
  const focusFrames = new Set();
  const alteredAttributes = [];
  const setManagedAttribute = (node, name, value) => {
    alteredAttributes.push([node, name, node.getAttribute(name)]);
    node.setAttribute(name, value);
  };
  const find = selector => root.querySelector(selector);
  const add = (tag, className, parent) => {
    const element = root.createElement(tag);
    element.className = className;
    parent?.append(element);
    return element;
  };
  const nav = find('.simple-nav');
  const consolePanel = find('.session-console');
  const sourceTrack = find('#track-list');
  const sourceMode = find('#mode-list');
  const transmission = find('#transmission');
  const difficulty = find('#difficulty');

  let image, routeLabel, routeFigure, routeOutline, routePath, routeEdge, routeStart, routeEnd, routeDistance, metaMode, metaGear, metaDifficulty;
  let mapButton, mapStatus, retryButton, routeDialog, dialogName, dialogDistance, dialogDetail, dialogLegend, dialogSVG;
  const raceIsVisible = () => { const race = find('#race'); return race && (!race.hidden || race.hasAttribute('open')); };
  const otherDialogIsOpen = () => Boolean(find('[data-overlay]:not([hidden]), dialog[open]'));
  const closeMap = () => {
    if (!routeDialog?.open) return;
    if (typeof routeDialog.close === 'function') routeDialog.close();
    else routeDialog.removeAttribute('open');
    if (!disposed && !raceIsVisible()) mapButton?.focus({preventScroll:true});
  };
  function updateDialog() {
    if (!routeDialog || !currentRoute) return;
    dialogName.textContent = currentRoute.name;
    dialogDistance.textContent = `${(currentRoute.length / 1000).toFixed(1)} km`;
    dialogLegend.textContent = currentRoute.closed ? '緑 ● スタート／フィニッシュ兼用' : '緑 ● スタート ／ 白 ■ 終点';
    dialogDetail.textContent = currentRoute.detail || (currentRoute.closed ? 'スタートとフィニッシュが同じ地点の周回コースです。' : '緑の丸がスタート、白い四角がコース図の終点です。');
    dialogSVG.replaceChildren(...[...routeOutline.children].map(node => {
      const clone = node.cloneNode(true);
      clone.removeAttribute('id');
      return clone;
    }));
    dialogSVG.setAttribute('aria-label', `${currentRoute.name}の拡大コース図`);
  }
  if (consolePanel) {
    const brief = add('div', 'remaster-selected-brief');
    brief.setAttribute('aria-label', '選択中のセッション');
    const figure = add('figure', 'remaster-course-preview', brief);
    routeFigure = figure;
    image = add('img', '', figure);
    image.id = 'remaster-route-image';
    image.alt = '';
    image.decoding = 'async';
    image.width = 160;
    image.height = 90;
    image.hidden = true;
    image.addEventListener('error', () => { image.hidden = true; }, {signal});
    const svg = tag => root.createElementNS('http://www.w3.org/2000/svg', tag);
    routeOutline = svg('svg');
    routeOutline.id = 'remaster-route-outline';
    routeOutline.setAttribute('viewBox', '0 0 240 140');
    routeOutline.setAttribute('role', 'img');
    routeOutline.setAttribute('aria-label', '選択コースのコース図');
    routeOutline.setAttribute('class', 'remaster-route-outline');
    routeOutline.style.display = 'none';
    routeEdge = svg('path');
    routeEdge.setAttribute('class', 'remaster-route-edge');
    routePath = svg('path');
    routePath.id = 'remaster-route-path';
    routeStart = svg('circle');
    routeStart.setAttribute('r', '3.2');
    routeStart.setAttribute('class', 'remaster-route-start');
    routeEnd = svg('rect');
    routeEnd.setAttribute('width', '5');
    routeEnd.setAttribute('height', '5');
    routeEnd.setAttribute('class', 'remaster-route-end');
    routeOutline.append(routeEdge, routePath, routeStart, routeEnd);
    figure.append(routeOutline);
    routeLabel = add('figcaption', '', figure);
    routeLabel.id = 'remaster-route-label';
    routeLabel.textContent = 'コース図を準備中';
    routeDistance = add('span', 'remaster-route-distance', figure);
    routeDistance.id = 'remaster-route-distance';
    routeDistance.hidden = true;
    mapButton = add('button', 'remaster-map-open', figure);
    mapButton.type = 'button';
    mapButton.textContent = '拡大';
    mapButton.setAttribute('aria-haspopup', 'dialog');
    mapButton.setAttribute('aria-controls', 'remaster-route-dialog');
    mapButton.setAttribute('aria-label', '選択コースのコース図を拡大');
    mapButton.hidden = true;
    const meta = add('dl', 'remaster-session-meta', brief);
    for (const [label, id] of [['MODE', 'mode'], ['GEARBOX', 'gear'], ['RIVALS', 'difficulty']]) {
      const row = add('div', '', meta);
      const term = add('dt', '', row);
      term.textContent = label;
      const value = add('dd', '', row);
      value.id = `remaster-session-${id}`;
      value.textContent = '—';
      if (id === 'mode') metaMode = value;
      if (id === 'gear') metaGear = value;
      if (id === 'difficulty') metaDifficulty = value;
    }
    const summary = consolePanel.querySelector('.selection-summary');
    if (summary) summary.after(brief); else consolePanel.append(brief);
    mapStatus = add('p', 'remaster-map-status', brief);
    mapStatus.id = 'remaster-map-status';
    mapStatus.setAttribute('role', 'status');
    mapStatus.textContent = 'コース図を読み込んでいます';
    retryButton = add('button', 'remaster-map-retry', brief);
    retryButton.type = 'button';
    retryButton.textContent = 'コース図を再読込';
    retryButton.hidden = true;
    retryButton.addEventListener('click', loadAtlas, {signal});
    routeDialog = add('dialog', 'remaster-route-dialog', body);
    routeDialog.id = 'remaster-route-dialog';
    routeDialog.setAttribute('aria-labelledby', 'remaster-map-title');
    const dialogHeader = add('div', 'remaster-map-header', routeDialog);
    const heading = add('div', '', dialogHeader);
    add('p', 'kicker', heading).textContent = 'COURSE BRIEFING';
    dialogName = add('h2', '', heading);
    dialogName.id = 'remaster-map-title';
    const closeButton = add('button', 'quiet remaster-map-close', dialogHeader);
    closeButton.type = 'button';
    closeButton.textContent = '閉じる';
    closeButton.setAttribute('aria-label', 'コース図を閉じる');
    closeButton.addEventListener('click', closeMap, {signal});
    const stats = add('p', 'remaster-map-caption', routeDialog);
    dialogDistance = add('strong', '', stats);
    dialogLegend = add('span', '', stats);
    dialogLegend.textContent = '緑 ● スタート ／ 白 ■ 終点';
    dialogSVG = svg('svg');
    dialogSVG.setAttribute('viewBox', '0 0 240 140');
    dialogSVG.setAttribute('class', 'remaster-route-outline remaster-route-large');
    dialogSVG.setAttribute('role', 'img');
    routeDialog.append(dialogSVG);
    dialogDetail = add('p', 'remaster-map-detail', routeDialog);
    const note = add('p', 'remaster-map-note', routeDialog);
    note.textContent = '実際の走行座標から作成したコース図です。縮尺はコースごとに調整しています。';
    mapButton.addEventListener('click', () => {
      if (!currentRoute || raceIsVisible() || otherDialogIsOpen()) return;
      updateDialog();
      if (typeof routeDialog.showModal === 'function') routeDialog.showModal();
      else routeDialog.setAttribute('open', '');
      closeButton.focus({preventScroll:true});
    }, {signal});
    routeDialog.addEventListener('cancel', event => {event.preventDefault(); closeMap();}, {signal});
    routeDialog.addEventListener('keydown', event => {
      if (event.key === 'Escape') {event.preventDefault(); closeMap();}
      // Only one interactive element is in the map; keep fallback dialog focus contained.
      if (event.key === 'Tab') {event.preventDefault(); closeButton.focus();}
    }, {signal});
    routeDialog.addEventListener('click', event => {if (event.target === routeDialog) closeMap();}, {signal});
    injected.push(brief, routeDialog);
  }

  let navCaption;
  if (nav) {
    navCaption = add('div', 'remaster-nav-caption', nav);
    navCaption.setAttribute('aria-hidden', 'true');
    const badge = add('span', '', navCaption);
    badge.textContent = 'CLASSIC REMASTER';
    const stats = add('small', '', navCaption);
    stats.id = 'remaster-library-counts';
    stats.textContent = '512 MACHINES / 256 ROUTES';
    injected.push(navCaption);
  }

  if (nav) {
    [...nav.querySelectorAll('a[href^="#"]')].forEach((link, index) => {
      if (index < 8) setManagedAttribute(link, 'aria-keyshortcuts', `Alt+${index + 1}`);
    });
    nav.addEventListener('click', event => {
      const link = event.target.closest('a[href^="#"]');
      if (!link || event.detail !== 0 || raceIsVisible() || otherDialogIsOpen()) return;
      const id = link.getAttribute('href').slice(1);
      const frame = win.requestAnimationFrame(() => {
        focusFrames.delete(frame);
        if (disposed) return;
        const section = root.getElementById(id);
        const heading = section?.querySelector('h2,h1');
        if (!heading || section.hidden) return;
        if (!heading.hasAttribute('tabindex')) setManagedAttribute(heading, 'tabindex', '-1');
        heading.focus({preventScroll:true});
      });
      focusFrames.add(frame);
    }, {signal});
  }

  const selectedLabel = select => select?.selectedOptions?.[0]?.textContent?.trim() || '—';
  const setText = (element, text) => { if (element && element.textContent !== text) element.textContent = text; };
  function refresh() {
    if (disposed) return;
    if (raceIsVisible()) closeMap();
    const card = sourceTrack?.querySelector('[data-track][aria-pressed="true"]');
    const id = card?.dataset.track;
    if (image && id && /^[a-z0-9_-]{1,100}$/i.test(id)) {
      const url = new URL(`./art/routes/${encodeURIComponent(id)}.svg`, import.meta.url).href;
      if (image.getAttribute('src') !== url) { image.src = url; image.hidden = false; }
      const name = card.querySelector('.track-name')?.textContent?.trim() || find('#launch-track')?.textContent?.trim() || '選択コース';
      image.alt = `${name}のコースイメージ`;
      figureTitle(image.parentElement, name);
      const route = routeAtlas?.[id];
      const path = route?.path;
      const points = typeof path === 'string' ? [...path.matchAll(/[ML](-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/g)] : [];
      const first = points[0], last = points.at(-1);
      const closed = typeof path === 'string' && (path.endsWith('Z') || Boolean(first && last && first[1] === last[1] && first[2] === last[2]));
      const validRoute = Number.isFinite(Number(route?.length)) && Number(route.length) > 0 && Number(route.length) <= 1000000 && typeof path === 'string' && path.length < 60000 && /^M[-\d. ,]+(?:L[-\d. ,]+)+(?:Z)?$/.test(path);
      routeFigure.classList.toggle('has-route', validRoute);
      routeOutline.style.display = validRoute ? '' : 'none';
      routeDistance.hidden = !validRoute;
      mapButton.hidden = !validRoute;
      if (validRoute) {
        if (routePath.getAttribute('d') !== path) {
          routePath.setAttribute('d', path);
          routeEdge.setAttribute('d', path);
          const start = path.match(/^M(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)/);
          if (start) {
            routeStart.setAttribute('cx', start[1]);
            routeStart.setAttribute('cy', start[2]);
          }
          routeStart.style.display = start ? '' : 'none';
          const end = closed ? first : last;
          if (end) {
            routeEnd.setAttribute('x', String(Number(end[1]) - 2.5));
            routeEnd.setAttribute('y', String(Number(end[2]) - 2.5));
          }
          routeEnd.style.display = end && !closed ? '' : 'none';
        }
        routeOutline.setAttribute('aria-label', `${name}のコース図`);
        const length = Number(route.length);
        setText(routeDistance, Number.isFinite(length) && length > 0 ? `${(length / 1000).toFixed(1)} km` : '');
        setText(routeLabel, 'COURSE MAP');
        currentRoute = {name, length, closed, detail:card.querySelector('.track-detail')?.textContent?.trim() || ''};
        mapButton.setAttribute('aria-label', `${name}のコース図を拡大`);
        setText(mapStatus, '実走行座標のコース図 · 拡大して確認できます');
        if (routeDialog.open) updateDialog();
      } else {
        currentRoute = null;
        closeMap();
        setText(routeLabel, 'COURSE ART / コースイメージ');
        setText(mapStatus, atlasState === 'loading' ? 'コース図を読み込んでいます' : 'コース図を取得できません。走行は開始できます。');
      }
    }
    if (retryButton) retryButton.hidden = atlasState !== 'failed';
    if (mapStatus) mapStatus.dataset.state = atlasState;
    const modeCard = sourceMode?.querySelector('[data-mode][aria-pressed="true"]');
    setText(metaMode, sourceMode?.hidden ? 'テクニック走行' : modeCard?.querySelector('.mode-name')?.textContent?.trim() || modeCard?.textContent?.trim() || '準備中');
    setText(metaGear, selectedLabel(transmission));
    const difficultyVisible = difficulty && !difficulty.closest('[hidden]');
    setText(metaDifficulty, difficultyVisible ? selectedLabel(difficulty) : 'SOLO');
    if (navCaption) {
      const carCount = find('#car-count')?.textContent?.trim() || '512';
      const trackCount = find('#track-count')?.textContent?.trim() || '256';
      setText(navCaption.querySelector('small'), `${carCount} MACHINES / ${trackCount} ROUTES`);
    }
  }
  function figureTitle(figure, name) { if (figure && figure.getAttribute('title') !== name) figure.title = name; }
  function schedule() {
    if (scheduled || disposed) return;
    scheduled = true;
    frameId = win.requestAnimationFrame(() => { scheduled = false; refresh(); });
  }
  for (const source of [sourceTrack, sourceMode, find('#difficulty-field'), find('#car-count'), find('#track-count')]) {
    if (!source) continue;
    const observer = new win.MutationObserver(schedule);
    observer.observe(source, {subtree:true, childList:true, characterData:true, attributes:true, attributeFilter:['aria-pressed', 'hidden']});
    observers.push(observer);
  }
  // HUD text changes every frame; only watch race visibility, never its descendants.
  const race = find('#race');
  if (race) {
    const observer = new win.MutationObserver(schedule);
    observer.observe(race, {attributes:true, attributeFilter:['open', 'hidden']});
    observers.push(observer);
  }
  for (const source of [transmission, difficulty]) source?.addEventListener('change', schedule, {signal});
  win.addEventListener('omoji:driving-preset-changed', schedule, {signal});
  win.addEventListener('hashchange', schedule, {signal});
  root.addEventListener('keydown', event => {
    if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !/^[1-8]$/.test(event.key)) return;
    if (event.target.closest?.('input,select,textarea,[contenteditable="true"]') || raceIsVisible() || otherDialogIsOpen()) return;
    const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
    const link = links[Number(event.key) - 1];
    if (!link) return;
    event.preventDefault();
    link.click();
  }, {signal});

  function loadAtlas() {
    if (disposed || typeof win.fetch !== 'function') {atlasState = 'failed'; refresh(); return;}
    atlasRequest?.abort();
    if (atlasTimer !== null) win.clearTimeout(atlasTimer);
    const request = new win.AbortController();
    atlasRequest = request;
    atlasState = 'loading';
    refresh();
    const timeout = win.setTimeout(() => {
      if (disposed || atlasRequest !== request) return;
      request.abort();
      atlasState = 'failed';
      refresh();
    }, 8000);
    atlasTimer = timeout;
    win.fetch(new URL('./classic-route-atlas.json', import.meta.url), {signal:request.signal})
      .then(response => {
        if (!response.ok) throw new Error('Course atlas unavailable');
        return response.json();
      })
      .then(atlas => {
        if (disposed || atlasRequest !== request || request.signal.aborted) return;
        if (!atlas || typeof atlas !== 'object' || Array.isArray(atlas) || !Object.keys(atlas).length) throw new Error('Invalid course atlas');
        routeAtlas = atlas;
        atlasState = 'ready';
        refresh();
      })
      .catch(() => {
        if (disposed || atlasRequest !== request || atlasState === 'ready') return;
        atlasState = 'failed';
        refresh();
      })
      .finally(() => {
        win.clearTimeout(timeout);
        if (atlasRequest === request) atlasTimer = null;
      });
  }
  refresh();
  loadAtlas();
  const result = {refresh, destroy() {
    disposed = true;
    controller.abort();
    atlasRequest?.abort();
    if (atlasTimer !== null) win.clearTimeout(atlasTimer);
    if (routeDialog?.open && typeof routeDialog.close === 'function') routeDialog.close();
    for (const frame of focusFrames) win.cancelAnimationFrame(frame);
    for (const [node, name, previous] of alteredAttributes.reverse()) {
      if (previous === null) node.removeAttribute(name); else node.setAttribute(name, previous);
    }
    for (const observer of observers) observer.disconnect();
    if (frameId) win.cancelAnimationFrame(frameId);
    for (const node of injected) node.remove();
    mounted.delete(root);
  }};
  mounted.set(root, result);
  return result;
}

if (typeof document !== 'undefined') mountClassicRemaster(document);
