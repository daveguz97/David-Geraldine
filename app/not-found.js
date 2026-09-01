"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function NotFound() {
  const [petals, setPetals] = useState([]);
  const petalId = useRef(0);
  const timer = useRef(null);

  useEffect(() => {
    let reduced = false;
    try {
      reduced = !!(
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      reduced = false;
    }
    if (reduced) return;

    function spawnPetal() {
      const id = petalId.current++;
      const gold = Math.random() < 0.28;
      const left = Math.random() * 100;
      const drift = Math.random() * 160 - 80;
      const spin = Math.random() * 720 - 360;
      const dur = 6 + Math.random() * 6;
      const scale = 0.7 + Math.random() * 0.8;
      setPetals((p) => [...p, { id, gold, left, drift, spin, dur, scale }]);
      setTimeout(() => {
        setPetals((p) => p.filter((pt) => pt.id !== id));
      }, dur * 1000 + 200);
    }

    spawnPetal();
    timer.current = setInterval(() => {
      setPetals((p) => {
        if (p.length < 9) spawnPetal();
        return p;
      });
    }, 1400);

    return () => clearInterval(timer.current);
  }, []);

  return (
    <div className="notfound-wrap">
      <div id="petals" aria-hidden="true">
        {petals.map((p) => (
          <div
            key={p.id}
            className={"petal" + (p.gold ? " gold" : "")}
            style={{
              left: p.left + "vw",
              "--drift": p.drift + "px",
              "--spin": p.spin + "deg",
              animationDuration: p.dur + "s",
              transform: `scale(${p.scale})`,
            }}
          />
        ))}
      </div>
      <div className="notfound-card">
        <span className="notfound-icon" aria-hidden="true">
          💐
        </span>
        <p className="notfound-code">404</p>
        <p className="script notfound-title">Wrong turn at the aisle</p>
        <div className="thankyou-rule"></div>
        <p>
          This page wandered off before the ceremony started. Let&apos;s get
          you back to your seat.
        </p>
        <Link className="back-link" href="/">
          ← Back to the invitation
        </Link>
      </div>
    </div>
  );
}
