/**
 * Decode the one fixed LZMA1 profile used by the Rolls-Royce asset.
 * The packed file also carries a standard GLB fallback for lower-memory devices.
 */
const MAX_ASSET = 25_000_000;
const MAX_GEOMETRY = 61_000_000;
const DICTIONARY_LIMIT = 8_388_608;
const MAGIC = 0x315a4d4f;

function modelRanges(packed) {
    if (packed.byteLength < 20 || packed.byteLength > MAX_ASSET) throw Error('Invalid Rolls-Royce asset size');
    const header = new DataView(packed);
    if (header.getUint32(0, true) !== MAGIC) throw Error('Invalid Rolls-Royce asset');
    const jsonSize = header.getUint32(4, true);
    const compressedSize = header.getUint32(8, true);
    const geometrySize = header.getUint32(12, true);
    const fallbackSize = header.getUint32(16, true);
    const geometryStart = 20 + jsonSize + fallbackSize;
    if (!jsonSize || jsonSize > 16384 || geometrySize > MAX_GEOMETRY ||
        geometrySize < 1 || fallbackSize > 14_000_000 || fallbackSize < 1 ||
        compressedSize < 5 || geometryStart + compressedSize !== packed.byteLength) {
        throw Error('Invalid Rolls-Royce blocks');
    }
    return {jsonSize, geometryStart, geometrySize, fallbackSize, compressedSize};
}

function decodeGeometry(source, data) {
    const size = data.length;
    if (source[0] !== 0) throw Error('Invalid Rolls-Royce compression header');
    let range = 0xffffffff, code = 0, cursor = 1, position = 0, state = 0;
    let repeat = 0, previous = 0, second = 0, third = 0;
    for (let i = 0; i < 4; i++) code = ((code << 8) | source[cursor++]) >>> 0;
    const probabilities = size => new Uint16Array(size).fill(1024);
    const matchTable = probabilities(48);
    const repeatTable = probabilities(12);
    const firstRepeat = probabilities(12);
    const secondRepeat = probabilities(12);
    const thirdRepeat = probabilities(12);
    const shortRepeat = probabilities(48);
    const literals = probabilities(6144);
    const positionSlots = probabilities(256);
    const positionSpecial = probabilities(114);
    const alignment = probabilities(16);
    const states = () => [probabilities(2), probabilities(32), probabilities(32), probabilities(256)];
    const matchLen = states();
    const repeatLen = states();

    function normalize() {
        if (range >= 0x1000000) return;
        if (cursor >= source.length) throw Error('Truncated Rolls-Royce geometry');
        range = (range << 8) >>> 0;
        code = ((code << 8) | source[cursor++]) >>> 0;
    }
    function bit(table, index) {
        const prob = table[index];
        const bound = ((range >>> 11) * prob) >>> 0;
        if (code < bound) {
            range = bound;
            table[index] = prob + ((2048 - prob) >>> 5);
            normalize();
            return 0;
        }
        range = (range - bound) >>> 0;
        code = (code - bound) >>> 0;
        table[index] = prob - (prob >>> 5);
        normalize();
        return 1;
    }
    function bits(table, base, count) {
        let node = 1;
        for (let step = 0; step < count; step++) node = node * 2 + bit(table, base + node);
        return node - (1 << count);
    }
    function reversed(table, base, count) {
        let node = 1, value = 0;
        for (let step = 0; step < count; step++) {
            const digit = bit(table, base + node);
            node = node * 2 + digit;
            value |= digit << step;
        }
        return value;
    }
    function direct(count) {
        let value = 0;
        for (let step = 0; step < count; step++) {
            range >>>= 1;
            const digit = Number(code >= range);
            if (digit) code = (code - range) >>> 0;
            value = value * 2 + digit;
            normalize();
        }
        return value;
    }
    function length([choice, low, middle, high], positionState) {
        if (!bit(choice, 0)) return bits(low, positionState * 8, 3) + 2;
        if (!bit(choice, 1)) return bits(middle, positionState * 8, 3) + 10;
        return bits(high, 0, 8) + 18;
    }
    function copy(count) {
        if (repeat >= Math.min(position, DICTIONARY_LIMIT) || count > size - position) throw Error('Invalid Rolls-Royce match');
        while (count-- > 0) {
            data[position] = data[position - repeat - 1];
            position++;
        }
    }

    while (position < size) {
        const positionState = position & 3;
        if (!bit(matchTable, state * 4 + positionState)) {
            const table = (data[position - 1] >>> 5) * 768;
            let node = 1;
            if (state >= 7) {
                if (repeat >= position) throw Error('Invalid Rolls-Royce literal');
                let match = data[position - repeat - 1];
                while (node < 256) {
                    const matchBit = match >>> 7;
                    match = (match << 1) & 255;
                    const digit = bit(literals, table + (1 + matchBit) * 256 + node);
                    node = node * 2 + digit;
                    if (matchBit !== digit) break;
                }
            }
            while (node < 256) node = node * 2 + bit(literals, table + node);
            data[position++] = node - 256;
            state = state < 4 ? 0 : state < 10 ? state - 3 : state - 6;
            continue;
        }
        if (bit(repeatTable, state)) {
            if (!bit(firstRepeat, state)) {
                if (!bit(shortRepeat, state * 4 + positionState)) {
                    state = state < 7 ? 9 : 11;
                    copy(1);
                    continue;
                }
            } else {
                let distance;
                if (!bit(secondRepeat, state)) distance = previous;
                else {
                    if (!bit(thirdRepeat, state)) distance = second;
                    else {
                        distance = third;
                        third = second;
                    }
                    second = previous;
                }
                previous = repeat;
                repeat = distance;
            }
            const count = length(repeatLen, positionState);
            state = state < 7 ? 8 : 11;
            copy(count);
            continue;
        }
        third = second;
        second = previous;
        previous = repeat;
        const count = length(matchLen, positionState);
        state = state < 7 ? 7 : 10;
        const slot = bits(positionSlots, Math.min(count - 2, 3) * 64, 6);
        if (slot < 4) repeat = slot;
        else {
            const extra = (slot >>> 1) - 1;
            repeat = ((2 + (slot & 1)) << extra) >>> 0;
            if (slot < 14) repeat += reversed(positionSpecial, repeat - slot - 1, extra);
            else repeat += direct(extra - 4) * 16 + reversed(alignment, 0, 4);
        }
        copy(count);
    }
}

export function decodeRollsAsset(packed, {lite = false} = {}) {
    const {jsonSize, geometryStart, geometrySize, fallbackSize} = modelRanges(packed);
    if (lite) return packed.slice(20 + jsonSize, geometryStart);
    const metadata = new Uint8Array(packed, 20, jsonSize);
    const fallback = new DataView(packed, 20 + jsonSize, fallbackSize);
    const src = new Uint8Array(packed, geometryStart);
    const description = JSON.parse(new TextDecoder().decode(metadata));
    const textureSize = description.bufferViews[3].byteOffset;
    const fallbackJsonSize = fallback.getUint32(12, true);
    const fallbackDataStart = 28 + fallbackJsonSize;
    if (textureSize < 1 || fallbackDataStart + textureSize > fallbackSize) throw Error('Invalid Rolls-Royce texture offsets');
    const textures = new Uint8Array(packed, 20 + jsonSize + fallbackDataStart, textureSize);
    const total = 28 + jsonSize + textureSize + geometrySize;
    const result = new ArrayBuffer(total);
    const header = new DataView(result);
    header.setUint32(0, 0x46546c67, true);
    header.setUint32(4, 2, true);
    header.setUint32(8, total, true);
    header.setUint32(12, jsonSize, true);
    header.setUint32(16, 0x4e4f534a, true);
    header.setUint32(20 + jsonSize, textureSize + geometrySize, true);
    header.setUint32(24 + jsonSize, 0x004e4942, true);
    const output = new Uint8Array(result);
    output.set(metadata, 20);
    output.set(textures, 28 + jsonSize);
    decodeGeometry(src, output.subarray(28 + jsonSize + textureSize));
    return result;
}

if (typeof WorkerGlobalScope === 'function' && globalThis instanceof WorkerGlobalScope) {
    globalThis.addEventListener('message', event => {
        try {
            const buffer = decodeRollsAsset(event.data.buffer, {lite: event.data.lite === true});
            globalThis.postMessage({buffer}, [buffer]);
        } catch (error) {
            globalThis.postMessage({error: error?.message || 'Rolls-Royce decoder failed'});
        }
    });
}
