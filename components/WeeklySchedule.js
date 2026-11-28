"use client";
import { useEffect, useState } from "react";
import { useSite } from "@/components/SiteDataProvider";
import { telHref } from "@/lib/siteDefaults";

const DAY_SHORT = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };

const WeeklySchedule = ({ className = "" }) => {
  const { settings, schedule } = useSite();
  const PHONE_DISPLAY = settings.phonePrimary;
  const PHONE_TEL = telHref(settings.phonePrimary);
  const weeklySchedule = schedule.blocks || [];
  // Resolved after mount so the server render never disagrees with the visitor's clock.
  const [today, setToday] = useState(null);
  useEffect(() => {
    setToday(new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Chicago" }).format(new Date()));
  }, []);

  return (
    <div className={`ws ${className}`}>
      <div className="ws-head">
        <div>
          <span className="ws-kicker">Weekly Menu</span>
          <h2>What&apos;s cooking this week</h2>
          <p>Our menu changes with the day — here&apos;s what&apos;s on, and when we deliver.</p>
        </div>
        <a href={PHONE_TEL} className="kw-btn kw-btn-fill">
          <i className="fas fa-phone" /> Call to Order
        </a>
      </div>

      <div className="ws-grid">
        {weeklySchedule.map((block) => {
          const isToday = today && block.days.includes(today);
          return (
            <section key={block.id} className={`ws-card${isToday ? " ws-today" : ""}`} aria-label={block.title}>
              <div className="ws-card-top">
                <h3>{block.title}</h3>
                {isToday && <span className="ws-badge">Today</span>}
              </div>
              <div className="ws-days">
                {block.days.map((d) => (
                  <span key={d} className={d === today ? "on" : ""} title={d}>
                    {DAY_SHORT[d]}
                  </span>
                ))}
              </div>
              <ul className="ws-dishes">
                {block.dishes.map((dish) => (
                  <li key={dish}>{dish}</li>
                ))}
              </ul>
              <div className="ws-delivery">
                <i className="fas fa-shipping-fast" aria-hidden="true" />
                <div>
                  {block.delivery.map((d) => (
                    <p key={d.label}>
                      {d.label} <b>{d.time}</b>
                    </p>
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <p className="ws-note">
        Prices for these dishes are given when you call — <a href={PHONE_TEL}>{PHONE_DISPLAY}</a>.
      </p>
    </div>
  );
};

export default WeeklySchedule;
