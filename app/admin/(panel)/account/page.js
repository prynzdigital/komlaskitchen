import { publicUser, requirePageUser } from "@/lib/auth";
import AccountForms from "@/components/admin/AccountForms";

export const metadata = { title: "Your account" };

export default async function AccountPage() {
  const user = await requirePageUser("crm");
  return <AccountForms user={publicUser(user)} />;
}
