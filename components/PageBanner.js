import Link from "next/link";

const PageBanner = ({ pageName }) => {
  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at top, var(--ink-800) 0%, var(--ink-950) 70%)",
        padding: "88px 0 56px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/pictures/dishes.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.14,
        }}
      />
      <div className="container" style={{ position: "relative" }}>
        <div style={{ textAlign: "center" }}>
          <ul
            className="breadcrumb-items"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              listStyle: "none",
              padding: 0,
              margin: "0 0 14px",
              fontSize: "0.85rem",
              fontWeight: 600,
            }}
          >
            <li>
              <Link href="/" style={{ color: "var(--paper-dim)", textDecoration: "none" }}>
                Home
              </Link>
            </li>
            <li style={{ color: "var(--red-400)" }}>
              <i className="far fa-chevron-right" />
            </li>
            <li style={{ color: "var(--gold-400)" }}>{pageName}</li>
          </ul>
          <h1
            style={{
              color: "var(--paper)",
              fontSize: "clamp(2rem, 5vw, 3.25rem)",
              fontWeight: 700,
              margin: 0,
            }}
          >
            {pageName}
          </h1>
          <div className="tricolor-stripe" style={{ margin: "18px auto 0" }} />
        </div>
      </div>
    </div>
  );
};
export default PageBanner;
