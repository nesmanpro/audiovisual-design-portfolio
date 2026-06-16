"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const ITEMS = [
  "Art Direction",
  "Web Development",
  "Brand Identity",
  "Motion",
  "Typography",
];

export default function Marquee() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tracks = gsap.utils.toArray<HTMLElement>(".marquee-track");
      const loop = gsap.to(tracks, {
        xPercent: -100,
        repeat: -1,
        duration: 22,
        ease: "none",
      });

      // scroll velocity nudges the marquee speed
      ScrollTrigger.create({
        onUpdate: (self) => {
          const velocity = Math.abs(self.getVelocity() / 1200);
          gsap.to(loop, {
            timeScale: 1 + Math.min(velocity, 4),
            duration: 0.4,
            overwrite: true,
          });
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const track = (
    <div className="marquee-track" aria-hidden="true">
      {ITEMS.map((item, i) => (
        <span key={item} className="marquee-item">
          {i % 2 === 0 ? item : <em>{item}</em>}{" "}
          <span className="marquee-star">+</span>
        </span>
      ))}
    </div>
  );

  return (
    <div ref={rootRef} className="marquee">
      {track}
      {track}
    </div>
  );
}
