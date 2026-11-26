import Link from "next/link";

const PageBanner = ({ pageName }) => {
  return (
    <div style={{ position: "relative", overflow: "hidden", marginTop: -94, padding: "170px 0 70px" }}>
      <img
        src="/pictures/dishes.jpeg"
        alt=""
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(20,15,10,0.82), rgba(20,15,10,0.7))" }} />
      <div className="container" style={{ position: "relative", textAlign: "center" }}>
        <ul
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            listStyle: "none",
            padding: 0,
            margin: "0 0 14px",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <li>
            <Link href="/" style={{ color: "rgba(255,255,255,0.75)", textDecoration: "none" }}>
              Home
            </Link>
          </li>
          <li style={{ color: "#e6cc8a" }}>✦</li>
          <li style={{ color: "#e6cc8a" }}>{pageName}</li>
        </ul>
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            fontWeight: 600,
            letterSpacing: 2,
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {pageName}
        </h1>
        <div style={{ width: 70, height: 2, margin: "18px auto 0", background: "linear-gradient(90deg, transparent, #c9a24d, transparent)" }} />
      </div>
    </div>
  );
};
export default PageBanner;
