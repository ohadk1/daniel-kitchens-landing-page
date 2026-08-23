/** Photos are resized and re-encoded in the browser before they are sent anywhere.
 *  Two reasons: a phone photo is several megabytes and would hit the request limit,
 *  and the site only ever serves WebP. */

const MAX_EDGE = 2400;
const QUALITY = 0.9;

export interface PreparedImage {
  /** Content-addressed, so replacing a photo can never collide with the cached copy of
   *  the previous one — /images is served immutable. */
  file: string;
  blob: Blob;
  previewUrl: string;
  width: number;
  height: number;
}

/** Halving repeatedly keeps detail that a single large downscale throws away. */
function downscale(source: CanvasImageSource, from: { width: number; height: number }, scale: number) {
  let canvas = document.createElement('canvas');
  let width = from.width;
  let height = from.height;
  let current: CanvasImageSource = source;

  const target = { width: Math.round(from.width * scale), height: Math.round(from.height * scale) };

  while (width * 0.5 > target.width) {
    width = Math.round(width * 0.5);
    height = Math.round(height * 0.5);
    const step = document.createElement('canvas');
    step.width = width;
    step.height = height;
    step.getContext('2d')!.drawImage(current, 0, 0, width, height);
    current = step;
  }

  canvas = document.createElement('canvas');
  canvas.width = target.width;
  canvas.height = target.height;
  const context = canvas.getContext('2d')!;
  context.imageSmoothingQuality = 'high';
  context.drawImage(current, 0, 0, target.width, target.height);
  return canvas;
}

const hex = (buffer: ArrayBuffer, bytes: number) =>
  Array.from(new Uint8Array(buffer).slice(0, bytes))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');

export async function prepareImage(file: File, slug: string): Promise<PreparedImage> {
  // `from-image` applies the EXIF rotation phones write instead of rotating pixels.
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));

  const canvas =
    scale === 1
      ? (() => {
          const full = document.createElement('canvas');
          full.width = bitmap.width;
          full.height = bitmap.height;
          full.getContext('2d')!.drawImage(bitmap, 0, 0);
          return full;
        })()
      : downscale(bitmap, bitmap, scale);
  bitmap.close();

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, 'image/webp', QUALITY),
  );
  if (!blob) throw new Error('הדפדפן לא הצליח להמיר את התמונה');

  const buffer = await blob.arrayBuffer();
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  const prefix = slug.replace(/[^a-z0-9-]/g, '') || 'image';

  return {
    file: `${prefix}-${hex(digest, 5)}.webp`,
    blob,
    previewUrl: URL.createObjectURL(blob),
    width: canvas.width,
    height: canvas.height,
  };
}
