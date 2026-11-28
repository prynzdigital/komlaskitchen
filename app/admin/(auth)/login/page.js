import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/AuthForms";
import NoDatabase from "@/components/admin/NoDatabase";
import { getSessionUser, hasAnyUser } from "@/lib/auth";
import { storeMode } from "@/lib/store";

export const metadata = { title: "Sign in" };

export default async function LoginPage() {
  if (storeMode === "none") return <NoDatabase />;
  if (!(await hasAnyUser())) redirect("/admin/setup");
  if (await getSessionUser()) redirect("/admin");
  return <LoginForm />;
}
