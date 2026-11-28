import Link from "next/link";
import { requirePageUser } from "@/lib/auth";
import { loadPosts } from "@/lib/adminData";
import { formatPostDate } from "@/lib/siteDefaults";

export const metadata = { title: "Blog" };

export default async function BlogAdmin() {
  await requirePageUser("content");
  const posts = await loadPosts();

  return (
    <div className="adm-stack">
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <p>
          {posts.filter((p) => p.published !== false).length} published · {posts.filter((p) => p.published === false).length} drafts
        </p>
        <Link href="/admin/blog/new" className="adm-btn adm-btn-primary adm-btn-sm">
          <i className="fas fa-plus" /> New post
        </Link>
      </div>
      <section className="adm-card">
        {posts.length ? (
          posts.map((p) => (
            <div key={p.id} className="adm-dish" style={{ gridTemplateColumns: "84px minmax(0,1fr) auto auto" }}>
              <div className="adm-thumb lg" style={{ width: 84, height: 60 }}>
                {p.image ? <img src={p.image} alt="" /> : <i className="fas fa-image" />}
              </div>
              <div style={{ minWidth: 0 }}>
                <b>{p.title}</b>
                <small>
                  {p.category} · {formatPostDate(p.date)} · /blog/{p.slug}
                </small>
              </div>
              <span className={`adm-pill ${p.published === false ? "muted" : "green"}`}>{p.published === false ? "Draft" : "Published"}</span>
              <div className="adm-row">
                {p.published !== false && (
                  <a href={`/blog/${p.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost adm-btn-sm" aria-label="View on website">
                    <i className="fas fa-external-link-alt" />
                  </a>
                )}
                <Link href={`/admin/blog/${p.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                  <i className="fas fa-pen" /> Edit
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="adm-empty">
            <i className="fas fa-book-open" />
            No posts yet.
          </div>
        )}
      </section>
    </div>
  );
}
