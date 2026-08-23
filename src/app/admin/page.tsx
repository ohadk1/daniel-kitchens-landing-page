import content from '../../../content/projects.json';
import AdminApp from '@/components/admin/AdminApp';
import type { StoredContent } from '@/lib/admin/content';

export default function AdminPage() {
  /* The bundled JSON is the state of the last deployment. After a save the panel keeps
     working from its own copy until the rebuild lands. */
  return <AdminApp initial={content as StoredContent} />;
}
