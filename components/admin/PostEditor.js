"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deletePostAction, savePostAction } from "@/app/admin/_actions/content";
import ImageField from "@/components/admin/ImageField";
import { Area, Card, ConfirmButton, SaveBar, Text, Toggle, useAction, useDraft } from "@/components/admin/ui";
import { textToBlocks } from "@/lib/siteDefaults";

const slugify = (v) =>
  String(v || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const readTime = (text) => `${Math.max(1, Math.round(String(text).split(/\s+/).filter(Boolean).length / 200))} min read`;

export default function PostEditor({ post, categories }) {
  const router = useRouter();
  const { run, pending, toast } = useAction();
  const { draft: d, set, dirty, markSaved, reset } = useDraft({
    id: post?.id || null,
    title: post?.title || "",
    slug: post?.slug || "",
    excerpt: post?.excerpt || "",
    category: post?.category || categories[0] || "News",
    date: post?.date || new Date().toISOString().slice(0, 10),
    readTime: post?.readTime || "",
    image: post?.image || "",
    imageAlt: post?.imageAlt || "",
    ctaLabel: post?.ctaLabel || "Order Now",
    ctaHref: post?.ctaHref || "/food-menu",
    content: post?.content || "",
    published: post ? post.published !== false : false,
  });
  const slugTouched = Boolean(post?.slug);

  const save = () =>
    run(() => savePostAction({ ...d, slug: d.slug || slugify(d.title), readTime: d.readTime || readTime(d.content) }), d.published ? "Post published" : "Draft saved", {
      onOk: (res) => {
        markSaved();
        if (!post && res?.id) router.replace(`/admin/blog/${res.id}`);
      },
    });

  const blocks = textToBlocks(d.content);

  return (
    <div className="adm-stack">
      {toast}
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <Link href="/admin/blog" className="adm-muted">
          ← All posts
        </Link>
        <div className="adm-row">
          {post && post.published !== false && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="adm-btn adm-btn-ghost adm-btn-sm">
              <i className="fas fa-external-link-alt" /> View live
            </a>
          )}
          {post && (
            <ConfirmButton
              confirm={`Delete “${post.title}”? This can't be undone.`}
              onConfirm={() => run(() => deletePostAction(post.id), "Post deleted", { refresh: false, onOk: () => router.push("/admin/blog") })}
            >
              <i className="fas fa-trash-alt" /> Delete
            </ConfirmButton>
          )}
        </div>
      </div>

      <div className="adm-split">
        <div className="adm-stack">
          <Card title="Post">
            <div className="adm-stack" style={{ gap: 14 }}>
              <Text
                label="Title"
                value={d.title}
                onChange={(v) => {
                  set("title", v);
                  if (!slugTouched && !post) set("slug", slugify(v));
                }}
              />
              <Area label="Short summary" hint="Shown on the blog list and in Google results" value={d.excerpt} onChange={(v) => set("excerpt", v)} rows={2} />
              <Area
                label="Article"
                hint="Blank line = new paragraph · “## ” starts a heading · “- ” makes a bullet list · “> ” makes a quote"
                value={d.content}
                onChange={(v) => set("content", v)}
                rows={18}
              />
            </div>
          </Card>

          <Card title="Preview">
            <div className="adm-stack" style={{ gap: 10 }}>
              {blocks.length ? (
                blocks.map((b, i) =>
                  b.h2 ? (
                    <h3 key={i} style={{ fontSize: "1.1rem", marginTop: 8 }}>
                      {b.h2}
                    </h3>
                  ) : b.quote ? (
                    <blockquote key={i} style={{ margin: 0, paddingLeft: 14, borderLeft: "3px solid var(--gold)", fontStyle: "italic" }}>
                      {b.quote}
                    </blockquote>
                  ) : b.list ? (
                    <ul key={i} style={{ margin: 0, paddingLeft: 20 }}>
                      {b.list.map((li, k) => (
                        <li key={k}>{li}</li>
                      ))}
                    </ul>
                  ) : (
                    <p key={i}>{b.p}</p>
                  )
                )
              ) : (
                <p className="adm-muted">Start writing to see the preview.</p>
              )}
            </div>
          </Card>
        </div>

        <div className="adm-stack">
          <Card title="Publishing">
            <div className="adm-stack" style={{ gap: 14 }}>
              <Toggle checked={d.published} onChange={(v) => set("published", v)} label={d.published ? "Published on the website" : "Draft — only visible here"} />
              <Text label="Date" type="date" value={d.date} onChange={(v) => set("date", v)} />
              <Text label="Category" value={d.category} onChange={(v) => set("category", v)} list="post-cats" />
              <datalist id="post-cats">
                {categories.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
              <Text label="Web address" hint={`komlaskitchen.com/blog/${d.slug || "…"}`} value={d.slug} onChange={(v) => set("slug", slugify(v))} />
              <Text label="Read time" placeholder={readTime(d.content)} value={d.readTime} onChange={(v) => set("readTime", v)} />
            </div>
          </Card>
          <Card title="Cover photo">
            <div className="adm-stack" style={{ gap: 12 }}>
              <ImageField label="" value={d.image} onChange={(v) => set("image", v)} large />
              <Text label="Photo description" value={d.imageAlt} onChange={(v) => set("imageAlt", v)} />
            </div>
          </Card>
          <Card title="Button at the end">
            <div className="adm-stack" style={{ gap: 12 }}>
              <Text label="Button text" value={d.ctaLabel} onChange={(v) => set("ctaLabel", v)} />
              <Text label="Button link" value={d.ctaHref} onChange={(v) => set("ctaHref", v)} hint="e.g. /food-menu or /contact" />
            </div>
          </Card>
        </div>
      </div>

      <SaveBar dirty={dirty || !post} pending={pending} onSave={save} onReset={post ? reset : undefined} />
    </div>
  );
}
