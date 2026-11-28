import { requirePageUser } from "@/lib/auth";
import { loadContent } from "@/lib/adminData";
import ScheduleEditor from "@/components/admin/ScheduleEditor";

export const metadata = { title: "Weekly Schedule" };

export default async function ScheduleAdmin() {
  await requirePageUser("content");
  return <ScheduleEditor schedule={await loadContent("schedule")} />;
}
