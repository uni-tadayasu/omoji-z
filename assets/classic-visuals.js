/** Classic rendering only. Never writes to driver, course, economy or save data. */
const profiles = Object.freeze({
    day: {key:'day', body:[1.035,1.015,.99], specular:[1.04,1,.96], environment:.46, exposure:1.07},
    wet: {key:'wet', body:[.80,.88,.94], specular:[.87,.97,1.12], environment:.72, exposure:1.08},
    snow: {key:'snow', body:[.98,1.025,1.07], specular:[.90,1.01,1.12], environment:.58, exposure:1.02},
    night: {key:'night', body:[.48,.57,.72], specular:[.78,.93,1.19], environment:.39, exposure:1.13},
});
for (const profile of Object.values(profiles)) {
    Object.freeze(profile.body); Object.freeze(profile.specular); Object.freeze(profile);
}
export function classicLightProfile(track = {}) {
    if (typeof track === 'string') return profiles[track] || profiles.day;
    return profiles[track.dark ? 'night' : track.snow ? 'snow' : track.wet || track.foggy || track.clouded ? 'wet' : 'day'];
}

/** Bound the render buffer, while the HUD and controls retain native resolution. */
export function classicResolutionLimit(quality, dpr, width, height, mode = 'webgl') {
    const cap = mode === 'software' ? 1 : quality === 'high' ? 1.8 : quality === 'low' ? 1 : 1.35;
    const pixels = quality === 'high' ? 2800000 : quality === 'low' ? 1100000 : 1850000;
    const safeWidth = Math.max(1, Number.isFinite(width) ? width : 1);
    const safeHeight = Math.max(1, Number.isFinite(height) ? height : 1);
    // A fixed lower DPR floor defeats the pixel budget on 4K/8K screens. The HUD
    // remains at CSS/native resolution; only the 3D render buffer is reduced.
    return Math.min(Number.isFinite(dpr) && dpr > 0 ? dpr : 1, cap,
        Math.sqrt(pixels / safeWidth / safeHeight));
}

function configureReceivers(group, strength) {
    group.traverse(object => {
        if (!object.isMesh) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        for (const material of materials) {
            if (!material) continue;
            // Road meshes are the only world receivers: no second scenery render pass.
            if (material.name === 'OMOJI Layered Asphalt') {
                object.receiveShadow = true;
                material.envMapIntensity = strength;
            }
        }
    });
}
function configureCar(car) {
    car?.traverse(object => {
        if (!object.isMesh) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        // Thin windows and optical beam planes must not cast opaque silhouettes.
        object.castShadow = materials.some(material => material && !material.transparent && material.opacity !== 0);
        object.receiveShadow = object.castShadow;
    });
}
function createState(game, reflectionFactory) {
    const scene = game.world?.scene;
    const profile = classicLightProfile(game.world?.track);
    const state = {world:game.world, mode:game.rendererMode, renderer:game.renderer, quality:game.classicQuality,
        seen:new WeakSet(), cars:new WeakSet(), frames:0,
        samples:0, cost:0, scale:1, maxRatio:1, viewport:'', profile};
    if (game.rendererMode !== 'webgl' || !scene) return state;
    // The engine owns this cached HDR texture. The renderer's world disposal must not dispose it.
    scene.environment = reflectionFactory(!!game.world.track.dark);
    game.renderer.toneMappingExposure = profile.exposure;
    const quality = game.classicQuality;
    if (quality !== 'low') {
        const sun = scene.children.find(object => object.isDirectionalLight);
        if (sun?.shadow) {
            state.sun = sun;
            state.sunDirection = sun.position.clone();
            // A reused light is already positioned around its player target. Initial
            // and streamed biome directions are short vectors relative to the origin.
            if (sun.position.lengthSq() >= 4) state.sunDirection.sub(sun.target.position);
            state.sunDirection.normalize();
            state.shadowRight = sun.position.clone();
            state.shadowUp = sun.position.clone();
            sun.castShadow = true;
            sun.shadow.mapSize.set(quality === 'high' ? 1536 : 1024, quality === 'high' ? 1536 : 1024);
            Object.assign(sun.shadow.camera, {left:-18,right:18,top:18,bottom:-18,near:.5,far:140});
            sun.shadow.camera.updateProjectionMatrix();
            sun.shadow.bias = -.00025;
            sun.shadow.normalBias = .025;
            sun.shadow.radius = 2;
            // PCFSoftShadowMap is the bundled engine's stable public constant value.
            game.renderer.shadowMap.enabled = true;
            game.renderer.shadowMap.type = 2;
            scene.add(sun.target);
        }
    } else if (game.renderer.shadowMap) game.renderer.shadowMap.enabled = false;
    return state;
}

/** Called from the real classic draw loop, after simulation and before rendering. */
export function classicReleaseFrame(game) {
    const state = game.classicVisuals;
    // Only this module owns the shadow render target; HDR environments stay engine-owned.
    if (state?.sun) {
        state.sun.shadow?.dispose?.();
        // Three.js dispose releases GPU resources but leaves the JS references.
        // Reusing this renderer/world must allocate fresh shadow targets.
        if (state.sun.shadow) {state.sun.shadow.map = null; state.sun.shadow.mapPass = null;}
        state.sun.castShadow = false;
    }
    game.classicVisuals = null;
}

export function classicBeginFrame(game, reflectionFactory, now = performance.now()) {
    let state = game.classicVisuals;
    if (!state || state.world !== game.world || state.mode !== game.rendererMode ||
        state.renderer !== game.renderer || state.quality !== game.classicQuality) {
        classicReleaseFrame(game);
        state = game.classicVisuals = createState(game, reflectionFactory);
    }
    const canvas = game.rendererMode === 'software' ? game.softwareCanvas : game.canvas;
    const width = Math.max(1, canvas?.clientWidth || game.size?.[0] || 1);
    const height = Math.max(1, canvas?.clientHeight || game.size?.[1] || 1);
    const viewport = `${width}:${height}:${game.classicDeviceRatio || 1}`;
    if (state.viewport !== viewport) {
        state.viewport = viewport;
        state.maxRatio = classicResolutionLimit(game.classicQuality, game.classicDeviceRatio || 1, width, height, game.rendererMode);
        const ratio = state.maxRatio * state.scale;
        game.renderer.setPixelRatio(ratio);
        game.pixelRatio = ratio;
        // Let the ordinary draw loop perform its one resize and update the projection.
        game.size = [];
    }
    if (game.rendererMode !== 'webgl') return now;
    const scene = game.world.scene;
    for (const object of scene.children) {
        if (!state.seen.has(object)) {
            state.seen.add(object);
            configureReceivers(object, state.profile.environment);
        }
    }
    const cars = [game.playerCar, game.rivalCar];
    for (const opponent of game.opponents?.values?.() || []) cars.push(opponent.car);
    for (const car of cars) if (car && !state.cars.has(car)) {state.cars.add(car);configureCar(car);}
    if (state.sun && game.playerCar) {
        const focus = game.playerCar.position;
        // Endurance streaming updates the directional light with a unit biome direction.
        if (state.sun.position.lengthSq() < 4) state.sunDirection.copy(state.sun.position).normalize();
        // Keep the small shadow volume with the player, including elevated and endurance roads.
        state.sun.target.position.copy(focus);
        state.sun.target.updateMatrixWorld();
        state.sun.position.copy(focus).addScaledVector(state.sunDirection, 65);
        stabilizeShadowProjection(state, focus);
    }
    return now;
}

/** Snap the light-space projection rather than the car/light target. Sub-pixel
 * camera motion then reuses the same shadow texels instead of shimmering. */
function stabilizeShadowProjection(state, focus) {
    const shadow = state.sun.shadow, camera = shadow.camera;
    const right = state.shadowRight.crossVectors(camera.up, state.sunDirection);
    if (right.lengthSq() < 1e-8) right.set(0, 0, -1);
    else right.normalize();
    const up = state.shadowUp.crossVectors(state.sunDirection, right).normalize();
    const stepX = 36 / shadow.mapSize.x, stepY = 36 / shadow.mapSize.y;
    const x = focus.dot(right), y = focus.dot(up);
    const offsetX = Math.round(x / stepX) * stepX - x;
    const offsetY = Math.round(y / stepY) * stepY - y;
    camera.left = -18 + offsetX; camera.right = 18 + offsetX;
    camera.bottom = -18 + offsetY; camera.top = 18 + offsetY;
    camera.updateProjectionMatrix();
}

/** Only the automatic graphics preset adapts; game time and input are untouched. */
export function classicEndFrame(game, started, now = performance.now()) {
    const state = game.classicVisuals;
    if (!state || (game.classicQuality && game.classicQuality !== 'auto')) return;
    state.frames++;
    const cost = now - started;
    // Ignore first-use geometry/raster compilation, tab changes and paused/countdown frames.
    if (state.frames < 45 || game.status !== 'running' || !(cost > 0 && cost < 160)) return;
    state.cost += cost; state.samples++;
    if (state.samples < 90) return;
    const average = state.cost / state.samples;
    state.cost = 0; state.samples = 0;
    const next = average > 23 ? Math.max(.68, state.scale - .10)
        : average < 12 ? Math.min(1, state.scale + .05) : state.scale;
    if (Math.abs(next - state.scale) < .001) return;
    state.scale = next;
    game.pixelRatio = state.maxRatio * next;
    game.renderer.setPixelRatio(game.pixelRatio);
    game.size = [];
}

/** A tight ground contact shadow uses the raster silhouette, not the vehicle centre. */
export function drawClassicContactShadow(context, sprite, x, y, scale, width, angle) {
    const contact = y + ((sprite.contactY ?? sprite.yOrigin) - sprite.yOrigin) * scale;
    context.save();
    try {
        context.translate(x, contact - width * .012);
        context.scale(1, .13);
        const radius = width * .57;
        const shade = context.createRadialGradient(0, 0, radius * .18, 0, 0, radius);
        shade.addColorStop(0, 'rgba(2,5,8,.69)');
        shade.addColorStop(.56, 'rgba(3,6,9,.39)');
        shade.addColorStop(1, 'rgba(3,6,9,0)');
        context.fillStyle = shade;
        context.fillRect(-radius, -radius, radius * 2, radius * 2);
    } finally {context.restore();}
}

/** Reflect the exact rasterized vehicle, with distance falloff and irregular wet-road bands. */
export function drawClassicReflection(context, sprite, x, y, scale, lighting = 'day') {
    if (!sprite?.canvas || !(scale > 0)) return;
    const contactY = sprite.contactY ?? sprite.yOrigin;
    const sourceBottom = Math.min(sprite.canvas.height, Math.ceil(contactY));
    const height = Math.min(sourceBottom, sprite.canvas.height * .88);
    const strips = 12;
    context.save();
    try {
        context.translate(x, y + (contactY - sprite.yOrigin) * scale + Math.max(1, scale * 1.6));
        context.scale(scale, -.34 * scale);
        context.imageSmoothingEnabled = true;
        for (let index = 0; index < strips; index++) {
            const fraction = index / strips;
            const stripHeight = height / strips;
            const sourceY = sourceBottom - (index + 1) * stripHeight;
            context.globalAlpha = (lighting === 'night' ? .34 : .25) * (1 - fraction) ** 1.5;
            const shimmer = Math.sin(index * 2.37) * (1 + fraction * 3);
            context.drawImage(sprite.canvas, 0, sourceY, sprite.canvas.width, stripHeight,
                -sprite.xOrigin + shimmer, sourceY - contactY, sprite.canvas.width, stripHeight + .35);
        }
    } finally {context.restore();}
}
