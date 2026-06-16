"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(".about-text", {
        type: "words",
        wordsClass: "word",
      });

      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-text",
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section" id="about">
      <div className="section-tag mono">
        <span>(01) — About</span>
        <span>The short version</span>
      </div>
      <p className="about-text">
        I&apos;m Nes — a multidisciplinary designer and developer turning brands
        into <em>living, breathing</em> digital experiences. Eight years of
        obsessing over grids, easing curves and letterforms, so every pixel
        earns its place and every interaction <em>feels inevitable</em>.
      </p>
    </section>
  );
}
