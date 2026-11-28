import HomePage from "@/components/HomePage";
import { getGoogleReviews } from "@/lib/googleReviews";

// Re-render at most once a day so new Google reviews appear without a redeploy.
export const revalidate = 86400;

export default async function Home() {
  const google = await getGoogleReviews();
  return <HomePage google={google} />;
}
