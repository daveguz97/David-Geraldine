"use client";

import { useEffect, useState } from "react";

const TARGET = new Date("2027-03-28T00:00:00+08:00").getTime(); // Philippine time

function pad(n) {
  return String(n).padStart(2, "0");
}

function getRemaining() {
  const diff = TARGET - Date.now();
  if (diff <= 0) return { d: "0", h: "00", m: "00", s: "00" };
  return {
    d: String(Math.floor(diff / 86400000)),
    h: pad(Math.floor(diff / 3600000) % 24),
    m: pad(Math.floor(diff / 60000) % 60),
    s: pad(Math.floor(diff / 1000) % 60),
  };
}

export default function Countdown() {
  // start with null so server and first client render match (no target date
  // math runs on the server, avoiding a hydration mismatch), then tick client-side
  const [time, setTime] = useState(null);

  useEffect(() => {
    setTime(getRemaining());
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const t = time || { d: "—", h: "—", m: "—", s: "—" };

  return (
    <div className="count-grid" aria-live="polite">
      <div className="count-cell">
        <div className="count-num">{t.d}</div>
        <div className="count-label">DAYS</div>
      </div>
      <div className="count-cell">
        <div className="count-num">{t.h}</div>
        <div className="count-label">HOURS</div>
      </div>
      <div className="count-cell">
        <div className="count-num">{t.m}</div>
        <div className="count-label">MINUTES</div>
      </div>
      <div className="count-cell">
        <div className="count-num">{t.s}</div>
        <div className="count-label">SECONDS</div>
      </div>
    </div>
  );
}
