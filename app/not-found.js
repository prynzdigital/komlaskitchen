import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";

export const metadata = {
  title: "Page not found | Komla's Kitchen",
};

const NotFound = () => (
  <FoodKingLayout>
    <PageBanner
      pageName="404"
      title={
        <>
          Page not <em>found.</em>
        </>
      }
      subtitle="The page you're looking for has moved or no longer exists."
    />
    <div className="lx-light">
      <section className="lx-sec">
        <div className="container lx-center">
          <div className="lx-actions" style={{ justifyContent: "center" }}>
            <Link href="/" className="kw-btn kw-btn-fill">
              Back to Home <i className="fas fa-arrow-right" />
            </Link>
            <Link href="/food-menu" className="kw-btn kw-btn-glass" style={{ color: "var(--forest-800)", borderColor: "var(--gilt-500)" }}>
              View the Menu
            </Link>
          </div>
        </div>
      </section>
    </div>
  </FoodKingLayout>
);

export default NotFound;
