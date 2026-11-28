import { requirePageUser } from "@/lib/auth";
import { loadContent, loadMenu } from "@/lib/adminData";
import HomeEditor from "@/components/admin/HomeEditor";

export const metadata = { title: "Homepage" };

export default async function HomepageAdmin() {
  await requirePageUser("content");
  const [home, menu] = await Promise.all([loadContent("home"), loadMenu()]);
  const dishes = menu.items.filter((m) => !m.callOnly).map((m) => ({ value: String(m.id), label: m.name }));
  return <HomeEditor home={home} dishes={dishes} />;
}
