"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const PHOTOS = [
  { src: "/images/vigan.jpg", alt: "David and Geraldine in Vigan City" },
  { src: "/images/garden.jpg", alt: "Hidden Garden, Lovers' Corner" },
  { src: "/images/proposal.jpg", alt: "The proposal" },
  { src: "/images/baguio-viewpoint.jpg", alt: "Overlooking the hills in Baguio" },
  { src: "/images/rocks.jpg", alt: "Perched on the rocks together" },
  { src: "/images/breathe-baguio.jpg", alt: "At the #breatheBaguio sign" },
];

export default function Carousel() {
  const [idx, setIdx] = useState(0);
  const [reduced, setReduced] = useState(false);
  const trackRef = useRef(null);
  const dragStart = useRef(null);
  const dragX = useRef(0);
  const autoRef = useRef(null);

  useEffect(() => {
    try {
      setReduced(
        !!(
          window.matchMedia &&
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
        )
      );
    } catch {
      setReduced(false);
    }
  }, []);

  function go(n, userInitiated) {
    const next = (n + PHOTOS.length) % PHOTOS.length;
    setIdx(next);
    if (userInitiated) stopAuto();
  }

  function stopAuto() {
    if (autoRef.current) {
      clearInterval(autoRef.current);
      autoRef.current = null;
    }
  }

  useEffect(() => {
    if (reduced) return;
    autoRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % PHOTOS.length);
    }, 5000);
    return () => stopAuto();
  }, [reduced]);

  function onPointerDown(e) {
    dragStart.current = e.clientX;
    dragX.current = e.clientX;
    if (trackRef.current) trackRef.current.style.transition = "none";
  }
  function onPointerMove(e) {
    if (dragStart.current === null || !trackRef.current) return;
    dragX.current = e.clientX;
    const width = trackRef.current.parentElement.offsetWidth;
    const pct = ((dragX.current - dragStart.current) / width) * 100;
    trackRef.current.style.transform = `translateX(calc(-${
      idx * 100
    }% + ${pct}%))`;
  }
  function endSwipe() {
    if (dragStart.current === null || !trackRef.current) return;
    trackRef.current.style.transition = "";
    const dx = dragX.current - dragStart.current;
    dragStart.current = null;
    if (dx < -45) go(idx + 1, true);
    else if (dx > 45) go(idx - 1, true);
  }

  return (
    <div
      className="carousel"
      id="carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Our journey photos"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(idx - 1, true);
        if (e.key === "ArrowRight") go(idx + 1, true);
      }}
    >
      <button
        className="car-btn prev"
        aria-label="Previous photo"
        type="button"
        onClick={() => go(idx - 1, true)}
      >
        ‹
      </button>
      <button
        className="car-btn next"
        aria-label="Next photo"
        type="button"
        onClick={() => go(idx + 1, true)}
      >
        ›
      </button>
      <div className="car-viewport">
        <div
          className="car-track"
          ref={trackRef}
          style={{ transform: `translateX(-${idx * 100}%)` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endSwipe}
          onPointerCancel={endSwipe}
          onPointerLeave={endSwipe}
        >
          {PHOTOS.map((p) => (
            <figure key={p.src}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 600px) 100vw, 520px"
                style={{ objectFit: "cover" }}
              />
              <figcaption>{p.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      <div className="car-dots">
        {PHOTOS.map((p, i) => (
          <button
            key={p.src}
            className="car-dot"
            type="button"
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === idx}
            onClick={() => go(i, true)}
          />
        ))}
      </div>
    </div>
  );
}
