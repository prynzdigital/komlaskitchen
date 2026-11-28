import { can, requirePageUser } from "@/lib/auth";
import { loadMenu } from "@/lib/adminData";
import MenuManager from "@/components/admin/MenuManager";

export const metadata = { title: "Menu" };

export default async function MenuAdminPage() {
  const user = await requirePageUser("crm");
  const menu = await loadMenu();
  return <MenuManager menu={menu} canEdit={can(user, "content")} />;
}
