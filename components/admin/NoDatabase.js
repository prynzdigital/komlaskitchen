// Shown in production until a database is connected.
export default function NoDatabase() {
  return (
    <div className="adm-auth">
      <div className="adm-auth-card" style={{ width: "min(560px, 100%)" }}>
        <div className="adm-brand">
          <img src="/pictures/logo.png" alt="" />
          <span>
            <b>Komla&apos;s Kitchen</b>
            <small>Admin setup</small>
          </span>
        </div>
        <h2 style={{ fontSize: "1.2rem", margin: "12px 0 8px" }}>Connect the database to start</h2>
        <p style={{ marginBottom: 14 }}>The admin stores the menu, orders and customers in a free Neon database. One-time setup in Vercel:</p>
        <ol style={{ paddingLeft: 20, display: "grid", gap: 8, color: "var(--ink-2)" }}>
          <li>Open the project in Vercel → <b>Storage</b> → <b>Create</b> → <b>Neon (Postgres)</b> → connect it to this project.</li>
          <li>Also create <b>Blob</b> storage (for photo uploads) and connect it.</li>
          <li>In <b>Settings → Environment Variables</b>, add <code>ADMIN_SETUP_CODE</code> with a secret word of your choice.</li>
          <li>Redeploy, come back to <b>/admin</b> and create the owner account using that setup code.</li>
        </ol>
      </div>
    </div>
  );
}
