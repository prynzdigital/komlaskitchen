import { redirect } from "next/navigation";
import { SetupForm } from "@/components/admin/AuthForms";
import NoDatabase from "@/components/admin/NoDatabase";
import { hasAnyUser } from "@/lib/auth";
import { storeMode } from "@/lib/store";

export const metadata = { title: "Set up" };

export default async function SetupPage() {
  if (storeMode === "none") return <NoDatabase />;
  if (await hasAnyUser()) redirect("/admin/login");
  const needsCode = process.env.NODE_ENV === "production" || Boolean(process.env.ADMIN_SETUP_CODE);
  return <SetupForm needsCode={needsCode} />;
}
