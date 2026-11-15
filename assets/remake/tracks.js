/** Original closed circuits. Coordinates and distances use metres. */
const TAU = Math.PI * 2;
const wrapAngle = value => ((value + Math.PI) % TAU + TAU) % TAU - Math.PI;
const lerp = (a, b, t) => a + (b - a) * t;

export const TRACKS = Object.freeze([
  {
    id: 'neon-bay', name: '月光ベイサイド', subtitle: 'MOONLIGHT BAYSIDE',
    environment: 'city', difficulty: '初級', width: 18,
    description: '高層街の灯りを背に、港へ伸びる直線を駆ける。広い道幅でラインをつかもう。',
    points: [[-220, 2, -120], [-220, 2, 80], [-210, 5, 240], [-100, 9, 300], [130, 9, 300], [230, 6, 230], [230, 2, 20], [170, 2, -60], [190, 2, -230], [100, 2, -320], [-80, 2, -300], [-200, 2, -230]],
  },
  {
    id: 'azure-coast', name: '蒼海コーストライン', subtitle: 'AZURE COASTLINE',
    environment: 'coast', difficulty: '初級', width: 17,
    description: '光る海、白い防波堤、ゆるやかな上り坂。長いコーナーを一定のアクセルでつなぐ。',
    points: [[-230, 8, -120], [-230, 8, 70], [-200, 13, 240], [-80, 20, 320], [100, 26, 270], [160, 24, 140], [280, 15, 50], [300, 8, -100], [210, 5, -260], [20, 5, -330], [-170, 8, -260]],
  },
  {
    id: 'shirogane-pass', name: '白銀スカイライン', subtitle: 'SHIROGANE SKYLINE',
    environment: 'mountain', difficulty: '上級', width: 15,
    description: '稜線を結ぶ高低差と連続する複合コーナー。登りの先の進入速度が勝負を分ける。',
    points: [[-250, 8, -90], [-250, 10, 80], [-210, 26, 220], [-110, 42, 310], [40, 58, 290], [85, 60, 160], [200, 50, 200], [300, 42, 110], [260, 30, -30], [130, 26, -75], [200, 20, -220], [90, 12, -310], [-90, 5, -300], [-210, 5, -220]],
  },
  {
    id: 'emerald-forest', name: '翠影フォレスト', subtitle: 'EMERALD FOREST',
    environment: 'forest', difficulty: '中級', width: 16,
    description: '深い森の木漏れ日と流れるS字。早めの減速で、切り返しのリズムを整える。',
    points: [[-200, 4, -110], [-200, 7, 60], [-230, 13, 230], [-130, 18, 330], [30, 16, 300], [90, 9, 180], [210, 12, 100], [240, 18, -50], [170, 16, -200], [20, 8, -240], [-80, 3, -330], [-200, 3, -270]],
  },
  {
    id: 'frost-ring', name: '霧氷ホワイトリング', subtitle: 'FROST WHITE RING',
    environment: 'snow', difficulty: '上級', width: 18,
    description: '雪山の空気と淡い朝日。低い路面グリップを読み、強い操作を控えて立ち上がる。',
    points: [[-250, 8, -140], [-250, 8, 70], [-200, 15, 270], [-40, 23, 320], [120, 24, 260], [250, 20, 270], [330, 14, 120], [260, 9, -40], [230, 6, -240], [80, 7, -330], [-100, 8, -320], [-220, 8, -250]],
  },
  {
    id: 'amber-express', name: '黄昏アンバーウェイ', subtitle: 'AMBER EXPRESSWAY',
    environment: 'sunset', difficulty: '中級', width: 19,
    description: '夕陽に染まる高架線。高速区間の先に待つ大きな旋回で、ブレーキの精度を磨く。',
    points: [[-230, 15, -160], [-230, 15, 70], [-230, 15, 280], [-120, 19, 380], [90, 22, 370], [240, 19, 270], [250, 15, 40], [180, 15, -100], [240, 15, -260], [120, 15, -390], [-80, 15, -390], [-220, 15, -290]],
  },
].map(track => Object.freeze({...track, points: Object.freeze(track.points.map(point => Object.freeze(point)))})));

function catmull(a, b, c, d, t) {
  const t2 = t * t, t3 = t2 * t;
  return .5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
}

const cache = new Map();

/** Arc-length parameterisation keeps travel speed independent of control-point spacing. */
export function createTrack(id = TRACKS[0].id) {
  const definition = typeof id === 'object' ? id : TRACKS.find(track => track.id === id) || TRACKS[0];
  if (cache.has(definition)) return cache.get(definition);
  const controls = definition.points, count = controls.length;
  const nodes = [];
  for (let segment = 0; segment < count; segment++) {
    const p0 = controls[(segment + count - 1) % count], p1 = controls[segment];
    const p2 = controls[(segment + 1) % count], p3 = controls[(segment + 2) % count];
    for (let j = 0; j < 64; j++) {
      const t = j / 64;
      nodes.push({x: catmull(p0[0], p1[0], p2[0], p3[0], t), y: catmull(p0[1], p1[1], p2[1], p3[1], t), z: catmull(p0[2], p1[2], p2[2], p3[2], t)});
    }
  }
  const distances = [0];
  for (let i = 1; i <= nodes.length; i++) {
    const a = nodes[i - 1], b = nodes[i % nodes.length];
    distances.push(distances[i - 1] + Math.hypot(b.x - a.x, b.z - a.z));
  }
  const length = distances.at(-1);
  for (let i = 0; i < nodes.length; i++) {
    const previous = nodes[(i + nodes.length - 1) % nodes.length], next = nodes[(i + 1) % nodes.length];
    const span = Math.hypot(next.x - previous.x, next.z - previous.z);
    nodes[i].heading = Math.atan2(next.x - previous.x, next.z - previous.z);
    nodes[i].grade = (next.y - previous.y) / Math.max(.001, span);
  }
  for (let i = 0; i < nodes.length; i++) {
    const previous = nodes[(i + nodes.length - 1) % nodes.length], next = nodes[(i + 1) % nodes.length];
    const span = Math.hypot(next.x - previous.x, next.z - previous.z);
    nodes[i].curvature = wrapAngle(next.heading - previous.heading) / Math.max(.001, span);
  }
  const sample = distance => {
    const safe = Number.isFinite(distance) ? distance : 0;
    const wrapped = ((safe % length) + length) % length;
    let low = 0, high = nodes.length;
    while (low + 1 < high) {
      const middle = (low + high) >> 1;
      if (distances[middle] <= wrapped) low = middle; else high = middle;
    }
    const a = nodes[low], b = nodes[(low + 1) % nodes.length];
    const t = (wrapped - distances[low]) / (distances[low + 1] - distances[low]);
    const grade = lerp(a.grade, b.grade, t);
    return {x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t), z: lerp(a.z, b.z, t), heading: a.heading + wrapAngle(b.heading - a.heading) * t, curvature: lerp(a.curvature, b.curvature, t), grade, pitch: Math.atan(grade), width: definition.width};
  };
  const mapPoints = Array.from({length: 180}, (_, i) => {
    const {x, z} = sample(i * length / 180);
    return {x, z};
  });
  const track = Object.freeze({...definition, length, sample, mapPoints: Object.freeze(mapPoints), nodes: Object.freeze(nodes)});
  cache.set(definition, track);
  return track;
}
