// Prepares public/images as *source* material for next/image.
//
// Policy: quality first. The gallery is what sells the carpentry, so originals are
// left untouched wherever possible — every re-encode of an already-lossy WebP loses
// detail permanently. Only genuinely oversized frames are capped, because next/image
// never serves wider than the largest entry in `deviceSizes` (3840), so pixels above
// that cost repo weight and buy nothing.
//
// Delivery quality is set per-component (`quality` prop) and in next.config.ts
// (`images.qualities`) — not here.
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');

/* Above this width a source is downscaled. Set slightly over the 3840 device size so
   4000px frames are left alone — trimming 4% is not worth a generational re-encode. */
const CAP_ABOVE = 4000;
const CAP_TO = 3840;
const CAP_QUALITY = 92;

const HERO_SOURCE = '3-1.webp';
const HERO_OUT = 'hero.webp';
const HERO_WIDTH = 2560;
/* The hero is the LCP element, but it is also the first thing a client judges. 85 on a
   2560 source leaves next/image room to serve a sharp frame at any breakpoint. */
const HERO_QUALITY = 85;

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

// Windows keeps a handle on files passed to sharp by path, so read to a buffer first.
async function capIfOversized(file) {
  const src = path.join(IMAGES_DIR, file);
  const input = await readFile(src);
  const { width } = await sharp(input).metadata();

  if (width <= CAP_ABOVE) {
    console.log(`${file}: kept at ${width}px (${kb(input.length)})`);
    return 0;
  }

  const output = await sharp(input)
    .rotate()
    .resize({ width: CAP_TO, withoutEnlargement: true })
    .webp({ quality: CAP_QUALITY, effort: 6 })
    .toBuffer();

  /* A modest downscale can still re-encode *larger* than the original. When that
     happens the trade is all cost — bigger file and a generation of lost detail — so
     keep the original. */
  if (output.length >= input.length) {
    console.log(`${file}: kept at ${width}px — re-encode was larger (${kb(output.length)})`);
    return 0;
  }

  await writeFile(src, output);
  console.log(`${file}: ${width}px ${kb(input.length)} -> ${CAP_TO}px ${kb(output.length)}`);
  return input.length - output.length;
}

async function buildHero() {
  const input = await readFile(path.join(IMAGES_DIR, HERO_SOURCE));
  const output = await sharp(input)
    .rotate()
    .resize({ width: HERO_WIDTH, withoutEnlargement: true })
    .webp({ quality: HERO_QUALITY, effort: 6 })
    .toBuffer();
  await writeFile(path.join(IMAGES_DIR, HERO_OUT), output);
  console.log(`${HERO_OUT}: ${kb(output.length)} at ${HERO_WIDTH}px`);
}

const files = (await readdir(IMAGES_DIR)).filter((f) => f.endsWith('.webp') && f !== HERO_OUT);
let saved = 0;
for (const file of files) saved += await capIfOversized(file);
await buildHero();
console.log(`\ntrimmed ${kb(saved)} across ${files.length} sources`);
