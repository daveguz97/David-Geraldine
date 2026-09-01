"use client";

import { useEffect, useRef, useState } from "react";

export default function Envelope({ onOpened }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [skipTransition, setSkipTransition] = useState(false);
  const [petals, setPetals] = useState([]);
  const openedRef = useRef(false);
  const reducedRef = useRef(false);
  const petalTimer = useRef(null);
  const petalId = useRef(0);

  useEffect(() => {
    try {
      reducedRef.current = !!(
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    } catch {
      reducedRef.current = false;
    }
  }, []);

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

  function burst(n) {
    for (let i = 0; i < n; i++) {
      setTimeout(spawnPetal, i * 90);
    }
  }

  function openInvite(skip) {
    if (openedRef.current) return;
    openedRef.current = true;

    if (skip || reducedRef.current) {
      setSkipTransition(true);
      setVisible(false);
      onOpened && onOpened();
      return;
    }

    setOpen(true);
    setTimeout(() => {
      setVisible(false);
      onOpened && onOpened();
      burst(26);
    }, 1550);
  }

  // gentle ambient petals once open, matching the original's cadence
  useEffect(() => {
    if (!openedRef.current) return;
    if (reducedRef.current) return;
    petalTimer.current = setInterval(() => {
      setPetals((p) => (p.length < 10 ? p : p));
      if (petals.length < 10) spawnPetal();
    }, 1400);
    return () => clearInterval(petalTimer.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!visible) {
    return (
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
    );
  }

  return (
    <>
      <div
        id="envelope-scene"
        aria-label="Wedding invitation envelope. Activate to open."
        style={
          skipTransition ? { transition: "opacity .3s ease" } : undefined
        }
      >
        <div
          className={"envelope" + (open ? " open" : "")}
          id="envelope"
          role="button"
          tabIndex={0}
          aria-label="Open the invitation"
          onClick={() => openInvite(false)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openInvite(false);
            }
          }}
        >
          <div className="env-back"></div>
          <div className="env-letter">
            <div className="letter-text">
              <span className="script">David &amp; Geraldine</span>
              <p>MARCH 28, 2027 · ILOCOS SUR</p>
            </div>
          </div>
          <div className="env-flap"></div>
          <div className="env-front"></div>
          <div className="seal">
            <span>DG</span>
          </div>
          <div className="tap-hint">TAP THE SEAL TO OPEN</div>
        </div>
        <button
          id="skip-intro"
          onClick={() => openInvite(true)}
          type="button"
        >
          skip
        </button>
      </div>
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
    </>
  );
}
