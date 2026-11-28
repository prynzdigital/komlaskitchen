import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import NoDatabase from "@/components/admin/NoDatabase";
import { can, getSessionUser, hasAnyUser, publicUser } from "@/lib/auth";
import { getDoc, listDocs, storeMode } from "@/lib/store";
import { SITE_IMAGES } from "@/lib/siteDefaults";

export default async function PanelLayout({ children }) {
  if (storeMode === "none") return <NoDatabase />;
  const user = await getSessionUser();
  if (!user) redirect((await hasAnyUser()) ? "/admin/login" : "/admin/setup");

  const [orders, messages, media] = await Promise.all([listDocs("orders"), listDocs("messages"), getDoc("content", "media")]);
  const counts = {
    orders: orders.filter((o) => o.status === "new").length,
    messages: messages.filter((m) => m.status === "new").length,
  };
  const library = [...new Set([...(media?.items || []).map((m) => m.url), ...SITE_IMAGES])];
  const perms = { crm: can(user, "crm"), content: can(user, "content"), settings: can(user, "settings"), team: can(user, "team") };

  return (
    <AdminShell user={publicUser(user)} perms={perms} counts={counts} library={library}>
      {children}
    </AdminShell>
  );
}
