// One-time pass over public/images: cap the longest edge, re-encode to WebP,
// and emit a dedicated lightweight hero asset for LCP.
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const IMAGES_DIR = path.join(process.cwd(), 'public', 'images');
const MAX_EDGE = 2000;
const QUALITY = 78;

const HERO_SOURCE = '3-1.webp';
const HERO_OUT = 'hero.webp';
const HERO_WIDTH = 1920;
const HERO_QUALITY = 68;

const kb = (bytes) => `${Math.round(bytes / 1024)}KB`;

// Windows keeps a handle on files passed to sharp by path, so read to a buffer first.
async function reencode(file) {
  const src = path.join(IMAGES_DIR, file);
  const input = await readFile(src);

  const output = await sharp(input)
    .rotate()
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toBuffer();

  if (output.length < input.length) {
    await writeFile(src, output);
    console.log(`${file}: ${kb(input.length)} -> ${kb(output.length)}`);
    return input.length - output.length;
  }
  console.log(`${file}: kept (${kb(input.length)})`);
  return 0;
}

async function buildHero() {
  const input = await readFile(path.join(IMAGES_DIR, HERO_SOURCE));
  const output = await sharp(input)
    .rotate()
    .resize({ width: HERO_WIDTH, withoutEnlargement: true })
    .webp({ quality: HERO_QUALITY, effort: 6 })
    .toBuffer();
  await writeFile(path.join(IMAGES_DIR, HERO_OUT), output);
  console.log(`${HERO_OUT}: ${kb(output.length)}`);
}

const files = (await readdir(IMAGES_DIR)).filter((f) => f.endsWith('.webp') && f !== HERO_OUT);
let saved = 0;
for (const file of files) saved += await reencode(file);
await buildHero();
console.log(`\nsaved ${kb(saved)} across ${files.length} images`);
