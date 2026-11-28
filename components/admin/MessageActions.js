"use client";
import { deleteMessageAction, setMessageStatusAction } from "@/app/admin/_actions/crm";
import { ConfirmButton, useAction } from "@/components/admin/ui";

export default function MessageActions({ id, status, email, name, canDelete }) {
  const { run, pending, toast } = useAction();
  const set = (s, msg) => run(() => setMessageStatusAction(id, s), msg);
  const reply = `mailto:${email}?subject=${encodeURIComponent("Re: your message to Komla's Kitchen")}&body=${encodeURIComponent(`Hi ${name.split(" ")[0]},\n\n`)}`;

  return (
    <div className="adm-row" style={{ marginTop: 12 }}>
      {toast}
      <a
        href={reply}
        className="adm-btn adm-btn-primary adm-btn-sm"
        onClick={() => status !== "replied" && setTimeout(() => set("replied", "Marked as replied"), 400)}
      >
        <i className="fas fa-reply" /> Reply by email
      </a>
      {status === "new" ? (
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={pending} onClick={() => set("read", "Marked as read")}>
          Mark read
        </button>
      ) : (
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={pending} onClick={() => set("new", "Marked as unread")}>
          Mark unread
        </button>
      )}
      {status !== "archived" ? (
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={pending} onClick={() => set("archived", "Archived")}>
          <i className="fas fa-archive" /> Archive
        </button>
      ) : (
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={pending} onClick={() => set("read", "Moved to inbox")}>
          Restore
        </button>
      )}
      {canDelete && (
        <ConfirmButton confirm="Delete this message permanently?" onConfirm={() => run(() => deleteMessageAction(id), "Message deleted")}>
          <i className="fas fa-trash-alt" />
        </ConfirmButton>
      )}
    </div>
  );
}
