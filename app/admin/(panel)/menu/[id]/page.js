import { notFound } from "next/navigation";
import { requirePageUser } from "@/lib/auth";
import { loadMenu } from "@/lib/adminData";
import MenuItemEditor from "@/components/admin/MenuItemEditor";

export const metadata = { title: "Edit dish" };

export default async function MenuItemPage({ params }) {
  await requirePageUser("content");
  const { id } = await params;
  const menu = await loadMenu();
  const item = id === "new" ? null : menu.items.find((m) => String(m.id) === id);
  if (id !== "new" && !item) notFound();
  return <MenuItemEditor key={item?.updatedKey || id} item={item} categories={menu.categories} />;
}
