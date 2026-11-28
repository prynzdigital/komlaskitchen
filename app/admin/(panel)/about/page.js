import { requirePageUser } from "@/lib/auth";
import { loadContent } from "@/lib/adminData";
import AboutEditor from "@/components/admin/AboutEditor";

export const metadata = { title: "About Page" };

export default async function AboutAdmin() {
  await requirePageUser("content");
  return <AboutEditor about={await loadContent("about")} />;
}
