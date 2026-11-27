import Link from "next/link";

const PageBanner = ({ pageName, title, subtitle, images, children }) => (
  <section className="lx-banner">
    {images?.[0] && <img className="lx-banner-bg" src={images[0]} alt="" aria-hidden="true" />}
    <div className="container">
      <span className="lx-crumb">
        <Link href="/">Home</Link>
        <i className="fas fa-circle" aria-hidden="true" />
        <b>{pageName}</b>
      </span>
      <h1 className="lx-title">{title || pageName}</h1>
      {subtitle && <p className="lx-sub">{subtitle}</p>}
      {children && <div className="lx-actions">{children}</div>}
    </div>
  </section>
);

export default PageBanner;
