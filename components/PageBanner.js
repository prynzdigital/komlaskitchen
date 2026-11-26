import Link from "next/link";

const PageBanner = ({ pageName, title, subtitle, images, chip, children }) => {
  const heading = title || pageName;
  const crumb = (
    <span className="lx-crumb">
      <Link href="/">Home</Link>
      <i className="fas fa-circle" />
      <b>{pageName}</b>
    </span>
  );

  if (!images) {
    return (
      <section className="lx-banner lx-banner-compact">
        <div className="container">
          {crumb}
          <h1 className="lx-title">{heading}</h1>
          {subtitle && <p className="lx-sub">{subtitle}</p>}
        </div>
      </section>
    );
  }

  const [arch, circle, square] = images;
  return (
    <section className="lx-banner">
      <div className="container">
        <div className="lx-banner-grid">
          <div>
            {crumb}
            <h1 className="lx-title">{heading}</h1>
            {subtitle && <p className="lx-sub">{subtitle}</p>}
            {children && <div className="lx-actions">{children}</div>}
          </div>
          <div className="lx-collage" aria-hidden="true">
            <div className="lx-col-frame" />
            <div className="lx-col-arch">
              <img src={arch} alt="" />
            </div>
            {square && (
              <div className="lx-col-square">
                <img src={square} alt="" />
              </div>
            )}
            {circle && (
              <div className="lx-col-circle">
                <img src={circle} alt="" />
              </div>
            )}
            {chip && (
              <div className="lx-col-chip">
                <i className={chip.icon} />
                <div>
                  {chip.title}
                  <small>{chip.sub}</small>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageBanner;
