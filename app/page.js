"use client";

import { useState } from "react";
import Envelope from "@/components/Envelope";
import Countdown from "@/components/Countdown";
import Carousel from "@/components/Carousel";
import RsvpForm from "@/components/RsvpForm";

export default function Home() {
  const [mainVisible, setMainVisible] = useState(false);

  return (
    <>
      <Envelope onOpened={() => setMainVisible(true)} />

      <main id="main" className={mainVisible ? "visible" : ""}>
        <section id="hero">
          <div className="hero-frame">
            <p className="eyebrow-invite">
              TOGETHER WITH THEIR FAMILIES · YOU ARE WARMLY INVITED TO THE
              WEDDING OF
            </p>
            <h1 className="script hero-names">
              David Alexander
              <span className="hero-amp">and</span>
              Geraldine S.
            </h1>
            <div className="hero-rule"></div>
            <p className="hero-date">SUNDAY · MARCH 28, 2027</p>
            <p className="hero-place">
              Legaspi, Galimuyod, Ilocos Sur, Philippines
            </p>
          </div>
          <a className="scroll-cue" href="#countdown" aria-label="Scroll to countdown">
            ↓
          </a>
        </section>

        <section id="countdown">
          <div className="count-inner">
            <h2 className="section-title script">
              Two hearts, one love, one forever
            </h2>
            <p className="section-sub">
              Counting the days until we say &quot;I do&quot;
            </p>
            <Countdown />
          </div>
        </section>

        <section id="verse">
          <blockquote>
            &quot;And now these three remain: faith, hope and love. But the
            greatest of these is love.&quot;
            <cite>1 CORINTHIANS 13:13</cite>
          </blockquote>
        </section>

        <section id="details">
          <h2 className="section-title script">The Celebration</h2>
          <p className="section-sub">
            We joyfully invite you to witness and celebrate as we begin our
            new chapter together as husband and wife.
          </p>
          <div className="details-grid">
            <div className="detail-card">
              <h3>When</h3>
              <p>Sunday, March 28, 2027</p>
              <p className="fine">Ceremony time to be announced</p>
            </div>
            <div className="detail-card">
              <h3>Where</h3>
              <p>
                Legaspi, Galimuyod
                <br />
                Ilocos Sur, Philippines 2709
              </p>
              <a
                className="map-link"
                href="https://www.google.com/maps/search/?api=1&query=Legaspi%2C+Galimuyod%2C+Ilocos+Sur%2C+Philippines"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on map
              </a>
            </div>
            <div className="detail-card">
              <h3>Attire</h3>
              <p>Semi-formal in our wedding palette</p>
              <p className="fine">Blush pink, ivory &amp; gold</p>
            </div>
          </div>
        </section>

        <section id="gallery">
          <h2 className="section-title script">Our Journey</h2>
          <p className="section-sub">From Ilocos to forever</p>
          <Carousel />
        </section>

        <section id="rsvp">
          <h2 className="section-title script">Kindly Respond</h2>
          <p className="section-sub">
            Your presence will mean the world to us
          </p>
          <div className="rsvp-card">
            <RsvpForm />
          </div>
        </section>

        <footer>
          <p className="script">D &amp; G</p>
          <p>MARCH 28, 2027 · GALIMUYOD, ILOCOS SUR</p>
        </footer>
      </main>
    </>
  );
}
