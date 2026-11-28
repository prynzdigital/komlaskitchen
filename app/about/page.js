import AboutPage from "@/components/AboutPage";
import { getGoogleReviews } from "@/lib/googleReviews";

export const revalidate = 86400;

export const metadata = {
  title: "About Us | Komla's Kitchen - Chicago African Food",
  description:
    "The story of Komla's Kitchen — authentic Ghanaian family recipes, cooked fresh and delivered across Chicago.",
};

export default async function About() {
  const google = await getGoogleReviews();
  return <AboutPage google={google} />;
}
