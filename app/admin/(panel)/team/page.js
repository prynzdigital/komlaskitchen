import { publicUser, requirePageUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";
import TeamManager from "@/components/admin/TeamManager";

export const metadata = { title: "Team & Logins" };

export default async function TeamAdmin() {
  const me = await requirePageUser("team");
  const users = (await listDocs("users")).map(publicUser).sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1));
  return <TeamManager users={users} meId={me.id} />;
}
