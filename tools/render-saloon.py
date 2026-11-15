#!/usr/bin/env python3
"""Render the supplied saloon without altering its geometry or textures.

Production artwork uses Blender 4.3 Cycles CPU, 24 perspective views, with no
reference illustration, geometry decimation, texture replacement or model export.

Reproduce from the repository root:
  blender -b -t 4 --python tools/render-saloon.py -- --source assets/models/grand-saloon.glb --frames /tmp/saloon-render
  python3 tools/render-saloon.py --compose /tmp/saloon-render --root .
Pillow is only needed for the second, development-time composition step.
"""
from pathlib import Path
import argparse
import hashlib
import json
import math
import sys

SOURCE_HASH = '730254e6e74205c927bb2da14abe97419406df5ea09bc4e284eabec71e3743cd'
LENGTH = 5.419
PHYSICS_WIDTH = 1.956
FRAMES = 24
CELL = (512, 384)
COLUMNS, ROWS = 4, 6
PIXELS_PER_METRE = 72
DISTANCE = 10
ELEVATION = .21


def render(args):
    import bpy
    from mathutils import Vector
    from bpy_extras.object_utils import world_to_camera_view
    source = Path(args.source).resolve()
    if hashlib.sha256(source.read_bytes()).hexdigest() != SOURCE_HASH:
        raise ValueError('This render recipe is for the exact user-provided saloon GLB.')
    destination = Path(args.frames).resolve()
    destination.mkdir(parents=True, exist_ok=True)
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=str(source))
    model = next(obj for obj in bpy.context.scene.objects if obj.type == 'MESH')
    if len([obj for obj in bpy.context.scene.objects if obj.type == 'MESH']) != 1:
        raise ValueError('Unexpected mesh count.')
    scale = LENGTH / model.dimensions.y
    model.scale *= scale
    bpy.context.view_layer.update()
    bounds = [model.matrix_world @ Vector(v) for v in model.bound_box]
    lo = [min(v[i] for v in bounds) for i in range(3)]
    hi = [max(v[i] for v in bounds) for i in range(3)]
    model.location.x -= (lo[0] + hi[0]) / 2
    model.location.y -= (lo[1] + hi[1]) / 2
    model.location.z -= lo[2]
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    scene.cycles.device = 'CPU'
    scene.cycles.samples = 64
    scene.cycles.use_denoising = False  # Portable: some Blender builds omit OIDN.
    scene.cycles.use_adaptive_sampling = True
    scene.cycles.adaptive_threshold = .025
    scene.cycles.max_bounces = 6
    scene.cycles.diffuse_bounces = 3
    scene.cycles.glossy_bounces = 4
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    scene.render.image_settings.color_depth = '8'
    scene.render.resolution_x, scene.render.resolution_y = CELL
    scene.render.resolution_percentage = 100
    scene.world = bpy.data.worlds.new('Neutral studio environment')
    scene.world.use_nodes = True
    background = scene.world.node_tree.nodes.get('Background')
    background.inputs[0].default_value = (.65, .69, .76, 1)
    background.inputs[1].default_value = .55
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.view_settings.exposure = 0
    scene.view_settings.gamma = 1
    for name, location, energy, size in [
        ('Key', (4, -5, 7), 1800, 5),
        ('Fill', (-5, -1, 5), 1400, 5),
        ('Rim', (2, 6, 5), 2000, 4),
    ]:
        data = bpy.data.lights.new(name, 'AREA')
        data.energy, data.shape, data.size = energy, 'DISK', size
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        obj.location = location
        obj.rotation_euler = (Vector((0, 0, .6)) - obj.location).to_track_quat('-Z', 'Y').to_euler()
    data = bpy.data.cameras.new('Saloon preview camera')
    camera = bpy.data.objects.new('Saloon preview camera', data)
    scene.collection.objects.link(camera)
    scene.camera = camera
    data.type = 'PERSP'
    data.sensor_fit = 'HORIZONTAL'
    data.sensor_width = 36
    data.lens = PIXELS_PER_METRE * DISTANCE * data.sensor_width / CELL[0]
    camera.location = (0, -DISTANCE * math.cos(ELEVATION), DISTANCE * math.sin(ELEVATION))
    camera.rotation_euler = (-camera.location).to_track_quat('-Z', 'Y').to_euler()
    def ground_pixel():
        bpy.context.view_layer.update()
        value = world_to_camera_view(scene, camera, Vector((0, 0, 0)))
        return [value.x * CELL[0], (1 - value.y) * CELL[1]]
    data.shift_y = 0
    y0 = ground_pixel()[1]
    data.shift_y = .1
    y1 = ground_pixel()[1]
    data.shift_y = (CELL[1] * .75 - y0) * .1 / (y1 - y0)
    origin = ground_pixel()
    records = []
    for index in range(FRAMES):
        angle = 2 * math.pi * index / FRAMES
        # glTF +Y maps to Blender +Z; glTF +Z maps to Blender -Y.
        camera.location = (math.sin(angle) * math.cos(ELEVATION) * DISTANCE,
                           -math.cos(angle) * math.cos(ELEVATION) * DISTANCE,
                           math.sin(ELEVATION) * DISTANCE)
        camera.rotation_euler = (-camera.location).to_track_quat('-Z', 'Y').to_euler()
        scene.render.filepath = str(destination / f'view-{index:02d}.png')
        bpy.ops.render.render(write_still=True)
        records.append({'index': index, 'angle': angle, 'file': f'view-{index:02d}.png'})
    bpy.context.view_layer.update()
    recipe = {
        'schemaVersion': 1,
        'vehicleId': 'rolls-royce-operator',
        'sourceSha256': SOURCE_HASH,
        'sourceFile': 'grand-saloon.glb',
        'sourcePreserved': True,
        'renderer': 'Blender 4.3 Cycles CPU / AgX',
        'dimensions': [LENGTH, model.dimensions.x, model.dimensions.z],
        'cellWidth': CELL[0], 'cellHeight': CELL[1], 'columns': COLUMNS, 'rows': ROWS,
        'frames': records, 'frameCount': FRAMES,
        'xOrigin': origin[0], 'yOrigin': origin[1],
        'nativeWidth': PHYSICS_WIDTH * PIXELS_PER_METRE,
        'physicsWidth': PHYSICS_WIDTH,
        'pixelsPerMetre': PIXELS_PER_METRE,
        'elevation': ELEVATION,
        'cameraDistance': DISTANCE,
        'angleConvention': 'camera=(sin(angle)*cos(elevation), sin(elevation), cos(angle)*cos(elevation)); 0=front+Z; pi=rear-Z',
        'usesOriginalMaterials': True,
        'geometryReduction': False,
    }
    (destination / 'recipe.json').write_text(json.dumps(recipe, indent=2) + '\n')
    # A larger actual-model showroom view, independent from the per-angle atlas.
    scene.render.resolution_x = 1200
    scene.render.resolution_y = 800
    scene.cycles.samples = 160
    data.type = 'ORTHO'
    data.shift_y = 0
    data.ortho_scale = 7.2
    camera.location = (6.5, -8.5, 4.0)
    camera.rotation_euler = (Vector((0, 0, .8)) - camera.location).to_track_quat('-Z', 'Y').to_euler()
    scene.render.filepath = str(destination / 'showroom.png')
    bpy.ops.render.render(write_still=True)


def compose(args):
    from PIL import Image
    source = Path(args.compose).resolve()
    root = Path(args.root).resolve()
    recipe = json.loads((source / 'recipe.json').read_text())
    canvas = Image.new('RGBA', (CELL[0] * COLUMNS, CELL[1] * ROWS), (0, 0, 0, 0))
    for item in recipe['frames']:
        image = Image.open(source / item['file']).convert('RGBA')
        if image.size != CELL:
            raise ValueError('Sprite cell size changed.')
        alpha = image.getchannel('A')
        bounds = alpha.getbbox()
        if not bounds or bounds[0] < 2 or bounds[1] < 2 or bounds[2] > CELL[0] - 2 or bounds[3] > CELL[1] - 2:
            raise ValueError(f"Sprite touches a cell edge: {item['index']} {bounds}")
        item.update({'x': item['index'] % COLUMNS * CELL[0], 'y': item['index'] // COLUMNS * CELL[1],
                     'width': CELL[0], 'height': CELL[1], 'bounds': bounds, 'contactY': bounds[3]})
        canvas.paste(image, (item['x'], item['y']))
        del item['file']
    asset = root / 'assets/models/saloon-sprites.webp'
    asset.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(asset, 'WEBP', quality=92, method=6, exact=True)
    recipe['image'] = 'saloon-sprites.webp'
    recipe['imageWidth'], recipe['imageHeight'] = canvas.size
    recipe['imageBytes'] = asset.stat().st_size
    recipe['imageSha256'] = hashlib.sha256(asset.read_bytes()).hexdigest()
    (asset.with_suffix('.json')).write_text(json.dumps(recipe, indent=2) + '\n')
    preview = Image.open(source / 'showroom.png').convert('RGBA')
    # Preserve alpha, exact silhouette and textured model; no replacement art.
    preview.save(root / 'assets/art/grand-saloon.webp', 'WEBP', quality=92, method=6, exact=True)
    print(json.dumps({'atlas': str(asset), 'bytes': asset.stat().st_size,
                      'previewBytes': (root / 'assets/art/grand-saloon.webp').stat().st_size,
                      'sourceSha256': SOURCE_HASH, 'frames': FRAMES}))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--source')
    parser.add_argument('--frames')
    parser.add_argument('--compose')
    parser.add_argument('--root', default='.')
    argv = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else sys.argv[1:]
    args = parser.parse_args(argv)
    if args.compose:
        compose(args)
    elif args.source and args.frames:
        render(args)
    else:
        parser.error('Use --source plus --frames inside Blender, or --compose plus --root in Python.')


if __name__ == '__main__':
    main()
