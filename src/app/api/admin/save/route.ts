import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  CONTENT_PATH,
  IMAGE_DIR,
  IMAGE_FILE,
  isInvalidContent,
  parseContent,
  serializeContent,
} from '@/lib/admin/content';
import { commitFiles, type FileWrite } from '@/lib/admin/github';
import { isSignedIn } from '@/lib/admin/guard';

interface SaveBody {
  content?: unknown;
  /** Blobs created by /api/admin/image that this save should add to the tree. */
  added?: { file?: unknown; sha?: unknown }[];
  /** Files whose last reference was removed in the editor. */
  removed?: unknown[];
  message?: unknown;
}

const SHA = /^[0-9a-f]{40}$/;

export async function POST(request: NextRequest) {
  if (!(await isSignedIn())) {
    return NextResponse.json({ error: 'לא מחובר' }, { status: 401 });
  }

  let body: SaveBody;
  try {
    body = (await request.json()) as SaveBody;
  } catch {
    return NextResponse.json({ error: 'בקשה לא תקינה' }, { status: 400 });
  }

  let content;
  try {
    content = parseContent(body.content);
  } catch (error) {
    if (isInvalidContent(error)) {
      return NextResponse.json({ error: (error as Error).message }, { status: 422 });
    }
    throw error;
  }

  const files: FileWrite[] = [{ path: CONTENT_PATH, content: serializeContent(content) }];

  for (const entry of body.added ?? []) {
    const file = String(entry?.file ?? '');
    const sha = String(entry?.sha ?? '');
    if (!IMAGE_FILE.test(file) || !SHA.test(sha)) {
      return NextResponse.json({ error: 'תמונה שהועלתה אינה תקינה' }, { status: 400 });
    }
    files.push({ path: `${IMAGE_DIR}/${file}`, sha });
  }

  /* Only delete a file that nothing references any more — an image can sit in two
     galleries, and the editor sends removals per gallery. */
  const referenced = new Set([
    ...content.projects.flatMap((project) => project.images.map((image) => image.file)),
    ...content.heroSlides.map((slide) => slide.file),
  ]);

  const deleted: string[] = [];
  for (const raw of body.removed ?? []) {
    const file = String(raw ?? '');
    if (!IMAGE_FILE.test(file) || referenced.has(file)) continue;
    files.push({ path: `${IMAGE_DIR}/${file}`, sha: null });
    deleted.push(file);
  }

  const summary = String(body.message ?? '').trim().slice(0, 120) || 'עדכון גלריה';

  try {
    const sha = await commitFiles(
      files,
      `${summary}\n\nנשמר מממשק הניהול של האתר.`,
    );
    return NextResponse.json({ ok: true, sha: sha.slice(0, 7), deleted: deleted.length });
  } catch (error) {
    console.error('[admin] commit failed', error);
    return NextResponse.json({ error: 'השמירה נכשלה. נסה שוב.' }, { status: 502 });
  }
}
