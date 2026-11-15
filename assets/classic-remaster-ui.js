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

  let image, routeLabel, routeFigure, routeOutline, routePath, routeEdge, routeStart, routeDistance, metaMode, metaGear, metaDifficulty;
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
    routeOutline.append(routeEdge, routePath, routeStart);
    figure.append(routeOutline);
    routeLabel = add('figcaption', '', figure);
    routeLabel.id = 'remaster-route-label';
    routeLabel.textContent = 'COURSE ART';
    routeDistance = add('span', 'remaster-route-distance', figure);
    routeDistance.id = 'remaster-route-distance';
    routeDistance.hidden = true;
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
    injected.push(brief);
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

  const selectedLabel = select => select?.selectedOptions?.[0]?.textContent?.trim() || '—';
  const setText = (element, text) => { if (element && element.textContent !== text) element.textContent = text; };
  function refresh() {
    if (disposed) return;
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
      const validRoute = typeof path === 'string' && path.length < 60000 && /^M[-\d. ,]+(?:L[-\d. ,]+)+(?:Z)?$/.test(path);
      routeFigure.classList.toggle('has-route', validRoute);
      routeOutline.style.display = validRoute ? '' : 'none';
      routeDistance.hidden = !validRoute;
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
        }
        routeOutline.setAttribute('aria-label', `${name}のコース図`);
        const length = Number(route.length);
        setText(routeDistance, Number.isFinite(length) && length > 0 ? `${(length / 1000).toFixed(1)} km` : '');
        setText(routeLabel, 'COURSE MAP');
      } else {
        setText(routeLabel, 'COURSE ART / コースイメージ');
      }
    }
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
  for (const source of [transmission, difficulty]) source?.addEventListener('change', schedule, {signal});
  win.addEventListener('omoji:driving-preset-changed', schedule, {signal});
  win.addEventListener('hashchange', schedule, {signal});
  root.addEventListener('keydown', event => {
    if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey || !/^[1-8]$/.test(event.key)) return;
    if (event.target.closest?.('input,select,textarea,[contenteditable="true"]') || find('[data-overlay]:not([hidden])')) return;
    const links = nav ? [...nav.querySelectorAll('a[href^="#"]')] : [];
    const link = links[Number(event.key) - 1];
    if (!link) return;
    event.preventDefault();
    link.click();
  }, {signal});

  refresh();
  // This atlas contains paths sampled from the classic engine's real course geometry.
  // The image remains a useful fallback when the optional request is unavailable.
  if (typeof win.fetch === 'function') {
    win.fetch(new URL('./classic-route-atlas.json', import.meta.url), {signal})
      .then(response => response.ok ? response.json() : null)
      .then(atlas => {
        if (disposed || !atlas || typeof atlas !== 'object' || Array.isArray(atlas)) return;
        routeAtlas = atlas;
        refresh();
      })
      .catch(() => {});
  }
  const result = {refresh, destroy() {
    disposed = true;
    controller.abort();
    for (const observer of observers) observer.disconnect();
    if (frameId) win.cancelAnimationFrame(frameId);
    for (const node of injected) node.remove();
    mounted.delete(root);
  }};
  mounted.set(root, result);
  return result;
}

if (typeof document !== 'undefined') mountClassicRemaster(document);
