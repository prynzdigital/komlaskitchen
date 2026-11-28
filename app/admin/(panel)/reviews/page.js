import { requirePageUser } from "@/lib/auth";
import { loadContent } from "@/lib/adminData";
import ReviewsEditor from "@/components/admin/ReviewsEditor";

export const metadata = { title: "Reviews" };

export default async function ReviewsAdmin() {
  await requirePageUser("content");
  return <ReviewsEditor reviews={await loadContent("reviews")} liveFeed={Boolean(process.env.GOOGLE_PLACES_API_KEY)} />;
}
