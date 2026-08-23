import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createBlob } from '@/lib/admin/github';
import { IMAGE_FILE } from '@/lib/admin/content';
import { isSignedIn } from '@/lib/admin/guard';

/** The browser has already resized and re-encoded the photo to WebP, so this only
 *  checks the bytes and parks them as a loose blob. The commit happens on save. */
const MAX_BYTES = 3 * 1024 * 1024;

const isWebp = (bytes: Buffer) =>
  bytes.length > 12 &&
  bytes.toString('ascii', 0, 4) === 'RIFF' &&
  bytes.toString('ascii', 8, 12) === 'WEBP';

export async function POST(request: NextRequest) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: 'לא מחובר' }, { status: 401 });
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }

  const file = form.get('file');
  const name = String(form.get('name') ?? '');

  if (!(file instanceof Blob)) {
    return NextResponse.json({ error: 'לא צורף קובץ' }, { status: 400 });
  }
  if (!IMAGE_FILE.test(name)) {
    return NextResponse.json({ error: 'שם קובץ לא תקין' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'הקובץ גדול מדי' }, { status: 413 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  if (!isWebp(bytes)) {
    return NextResponse.json({ error: 'הקובץ אינו WebP' }, { status: 400 });
  }

  try {
    return NextResponse.json({ file: name, sha: await createBlob(bytes) });
  } catch (error) {
    console.error('[admin] blob upload failed', error);
    return NextResponse.json({ error: 'העלאת הקובץ נכשלה' }, { status: 502 });
  }
}
