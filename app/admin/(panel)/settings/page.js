import { can, requirePageUser } from "@/lib/auth";
import { loadContent } from "@/lib/adminData";
import SettingsEditor from "@/components/admin/SettingsEditor";

export const metadata = { title: "Settings" };

export default async function SettingsAdmin() {
  const user = await requirePageUser("settings");
  const settings = await loadContent("settings");
  const isOwner = can(user, "team");
  return (
    <SettingsEditor
      settings={isOwner ? settings : { ...settings, notifyEmails: "" }}
      isOwner={isOwner}
      envNotify={Boolean(process.env.ORDER_NOTIFICATION_EMAIL)}
      emailReady={Boolean(process.env.RESEND_API_KEY)}
    />
  );
}
