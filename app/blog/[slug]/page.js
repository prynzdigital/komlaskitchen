import Link from "next/link";
import { notFound } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { formatPostDate, getPost, posts } from "@/data/blog";
import { PHONE_DISPLAY, PHONE_TEL } from "@/data/schedule";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Komla's Kitchen Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.image], type: "article" },
  };
}

const Block = ({ block }) => {
  if (block.h2) return <h2>{block.h2}</h2>;
  if (block.quote) return <blockquote>{block.quote}</blockquote>;
  if (block.list)
    return (
      <ul>
        {block.list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  return <p>{block.p}</p>;
};

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <FoodKingLayout>
      <PageBanner pageName="Blog" title={post.title} images={[post.image]}>
        <div className="bl-meta bl-meta-banner">
          <span className="bl-cat">{post.category}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span>{post.readTime}</span>
        </div>
      </PageBanner>
      <div className="lx-light">
        <section className="lx-sec bl">
          <div className="container">
            <article className="bl-article">
              <Link href="/blog" className="bl-back">
                <i className="fas fa-arrow-left" /> All stories
              </Link>
              <figure className="bl-hero">
                <img src={post.image} alt={post.imageAlt} />
              </figure>
              <p className="bl-lead">{post.excerpt}</p>
              <div className="bl-body">
                {post.body.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
              <div className="bl-cta">
                <div>
                  <h3>Hungry yet?</h3>
                  <p>Order online for pickup or delivery across Chicago, or give us a call.</p>
                </div>
                <div className="bl-cta-actions">
                  <Link href={post.cta?.href || "/food-menu"} className="kw-btn kw-btn-fill">
                    {post.cta?.label || "Order Now"} <i className="fas fa-arrow-right" />
                  </Link>
                  <a href={PHONE_TEL} className="bl-call">
                    <i className="fas fa-phone" /> {PHONE_DISPLAY}
                  </a>
                </div>
              </div>
            </article>

            {more.length > 0 && (
              <div className="bl-more">
                <h2 className="lx-h2">
                  More <em>stories</em>
                </h2>
                <div className="bl-grid">
                  {more.map((p) => (
                    <Link key={p.slug} href={`/blog/${p.slug}`} className="bl-card lx-glass lx-lift">
                      <div className="bl-img">
                        <img src={p.image} alt={p.imageAlt} loading="lazy" />
                      </div>
                      <div className="bl-card-body">
                        <div className="bl-meta">
                          <span className="bl-cat">{p.category}</span>
                          <span>{p.readTime}</span>
                        </div>
                        <h3>{p.title}</h3>
                        <span className="bl-read">
                          Read more <i className="fas fa-arrow-right" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
}
