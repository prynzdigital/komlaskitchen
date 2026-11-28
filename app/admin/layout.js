import "./admin.css";

export const metadata = {
  title: { default: "Admin", template: "%s · Komla's Kitchen Admin" },
  robots: { index: false, follow: false },
};

// The admin is always rendered fresh — never cached.
export const dynamic = "force-dynamic";

export default function AdminRootLayout({ children }) {
  return <div className="adm">{children}</div>;
}
