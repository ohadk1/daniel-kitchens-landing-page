import sharp from 'sharp';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

/* Photographic finishing pass. Everything here is global tone/colour work — the kind a
   retoucher does in Lightroom. Nothing is invented or repainted, so the carpentry in
   frame is byte-for-byte the same geometry it was shot at. */

const pct = (hist, total, p) => {
  let acc = 0, target = total * p;
  for (let i = 0; i < 256; i++) { acc += hist[i]; if (acc >= target) return i; }
  return 255;
};

// Filmic S-curve: deepens midtone contrast without clipping either end.
const scurve = (x, amount) => {
  const t = x / 255;
  const s = t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2;
  return (t + (s - t) * amount) * 255;
};

export async function retouch(src, out, opts = {}) {
  const {
    rotate = 0,          // manual straightening, degrees
    shadowLift = 0.10,   // keep detail in dark cabinetry
    contrast = 0.30,     // S-curve strength
    warmthFix = 1.0,     // 1 = full auto white balance, 0 = leave cast alone
    saturation = 1.06,
    sharpen = true,
  } = opts;

  let img = sharp(readFileSync(src)).rotate();           // EXIF first
  if (rotate) img = img.rotate(rotate, { background: '#000' });

  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  const px = width * height;

  // Per-channel histograms
  const hist = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)];
  for (let i = 0; i < data.length; i += channels)
    for (let c = 0; c < 3; c++) hist[c][data[i + c]]++;

  /* White balance from the bright end: in an interior the top decile is ceiling, walls
     and worktop — surfaces that should read neutral. Matching R and B to G there pulls
     the tungsten cast out without touching hue elsewhere. */
  const hi = [0,1,2].map(c => pct(hist[c], px, 0.90));
  const gain = [0,1,2].map(c => 1 + ((hi[1] / Math.max(hi[c], 1)) - 1) * warmthFix);

  // Levels from the same stats, with headroom so nothing clips to pure black/white.
  const lo = [0,1,2].map(c => pct(hist[c], px, 0.004));
  const wh = [0,1,2].map(c => pct(hist[c], px, 0.998));

  // Precompute one LUT per channel — 768 entries instead of millions of pow() calls.
  const lut = [0,1,2].map(c => {
    const t = new Uint8Array(256);
    for (let v = 0; v < 256; v++) {
      let x = (v - lo[c]) * (255 / Math.max(wh[c] - lo[c], 1));  // levels
      x = Math.max(0, Math.min(255, x * gain[c]));               // white balance
      x = scurve(x, contrast);                                    // contrast
      x = x + (255 - x) * shadowLift * Math.pow(1 - x/255, 2.2);  // lift shadows only
      t[v] = Math.max(0, Math.min(255, Math.round(x)));
    }
    return t;
  });

  for (let i = 0; i < data.length; i += channels)
    for (let c = 0; c < 3; c++) data[i + c] = lut[c][data[i + c]];

  let pipe = sharp(data, { raw: { width, height, channels } })
    .modulate({ saturation });
  if (sharpen) pipe = pipe.sharpen({ sigma: 0.8, m1: 0.5, m2: 0.7 });

  await pipe.jpeg({ quality: 94, chromaSubsampling: '4:4:4' }).toFile(out);
  return { width, height, gain: gain.map(g => g.toFixed(3)), black: lo, white: wh };
}
