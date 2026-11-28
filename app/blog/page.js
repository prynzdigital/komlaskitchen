import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { getPublishedPosts } from "@/lib/siteData";
import { formatPostDate } from "@/lib/siteDefaults";

export const metadata = {
  title: "Blog | Komla's Kitchen - Chicago African Food",
  description: "Stories, dish guides and ordering tips from Komla's Kitchen, Chicago's home of authentic Ghanaian food.",
};

const PostMeta = ({ post }) => (
  <div className="bl-meta">
    <span className="bl-cat">{post.category}</span>
    <time dateTime={post.date}>{formatPostDate(post.date)}</time>
    <span>{post.readTime}</span>
  </div>
);

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <FoodKingLayout>
      <PageBanner
        pageName="Blog"
        title={
          <>
            Stories from our <em>kitchen</em>
          </>
        }
        subtitle="Dish guides, Ghanaian food culture and everything you need to know about ordering from Komla's Kitchen."
        images={["/pictures/opt/waakye_platter.webp"]}
      />
      <div className="lx-light">
        <section className="lx-sec bl">
          <div className="container">
            {featured && (
              <Link href={`/blog/${featured.slug}`} className="bl-featured lx-glass lx-lift">
                <div className="bl-img">
                  <img src={featured.image} alt={featured.imageAlt} />
                </div>
                <div className="bl-featured-body">
                  <span className="lx-eyebrow">Latest story</span>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <PostMeta post={featured} />
                  <span className="bl-read">
                    Read the story <i className="fas fa-arrow-right" />
                  </span>
                </div>
              </Link>
            )}

            <div className="bl-grid">
              {rest.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="bl-card lx-glass lx-lift">
                  <div className="bl-img">
                    <img src={post.image} alt={post.imageAlt} loading="lazy" />
                  </div>
                  <div className="bl-card-body">
                    <PostMeta post={post} />
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <span className="bl-read">
                      Read more <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
}
