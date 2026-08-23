/** Writes to the repository through the Git Data API. Saving from the admin panel is a
 *  commit on `main`, which is what makes Vercel rebuild — there is no other database. */

const API = 'https://api.github.com';

export interface FileWrite {
  path: string;
  /** UTF-8 text to commit. Mutually exclusive with `sha`. */
  content?: string;
  /** An already-created blob (images are uploaded one by one, then referenced here). */
  sha?: string | null;
}

interface Repo {
  owner: string;
  name: string;
  branch: string;
  token: string;
}

function repo(): Repo {
  const slug = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  if (!slug || !token) throw new Error('GITHUB_REPO and GITHUB_TOKEN must be set');

  const [owner, name] = slug.split('/');
  if (!owner || !name) throw new Error('GITHUB_REPO must look like owner/repo');

  return { owner, name, branch: process.env.GITHUB_BRANCH || 'main', token };
}

async function gh<T>(path: string, init?: RequestInit): Promise<T> {
  const { token } = repo();
  const res = await fetch(`${API}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const body = await res.text();
    // Never surface the body verbatim to the client — it can echo request contents.
    throw new Error(`GitHub ${init?.method ?? 'GET'} ${path} failed: ${res.status} ${body.slice(0, 200)}`);
  }
  return res.json() as Promise<T>;
}

/** Uploads bytes as a loose blob. Blobs are not reachable until a tree references them,
 *  so images can be sent one request at a time and still land in a single commit. */
export async function createBlob(bytes: Buffer): Promise<string> {
  const { owner, name } = repo();
  const blob = await gh<{ sha: string }>(`/repos/${owner}/${name}/git/blobs`, {
    method: 'POST',
    body: JSON.stringify({ content: bytes.toString('base64'), encoding: 'base64' }),
  });
  return blob.sha;
}

/** One commit for the whole save. `sha: null` on an entry deletes that path. */
export async function commitFiles(files: FileWrite[], message: string): Promise<string> {
  const { owner, name, branch } = repo();
  const base = `/repos/${owner}/${name}`;

  const ref = await gh<{ object: { sha: string } }>(`${base}/git/ref/heads/${branch}`);
  const parent = ref.object.sha;
  const head = await gh<{ tree: { sha: string } }>(`${base}/git/commits/${parent}`);

  const tree = await gh<{ sha: string }>(`${base}/git/trees`, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: head.tree.sha,
      tree: files.map((file) =>
        file.content === undefined
          ? { path: file.path, mode: '100644', type: 'blob', sha: file.sha ?? null }
          : { path: file.path, mode: '100644', type: 'blob', content: file.content },
      ),
    }),
  });

  const commit = await gh<{ sha: string }>(`${base}/git/commits`, {
    method: 'POST',
    body: JSON.stringify({ message, tree: tree.sha, parents: [parent] }),
  });

  await gh(`${base}/git/refs/heads/${branch}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });

  return commit.sha;
}
