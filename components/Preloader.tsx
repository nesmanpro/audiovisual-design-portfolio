"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";

const WORDS = ["Design", "Code", "Motion", "Type®"];

export default function Preloader() {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  // plays once per session: skip when remounting via client-side navigation
  const [hidden, setHidden] = useState(() => isPreloaderDone());

  useEffect(() => {
    if (hidden) {
      document.body.classList.remove("is-loading");
      return;
    }
    const root = rootRef.current;
    const countEl = countRef.current;
    if (!root || !countEl) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>(".preloader-word");
      const counter = { value: 0 };

      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          document.body.classList.remove("is-loading");
          markPreloaderDone();
          setHidden(true);
        },
      });

      tl.to(
        counter,
        {
          value: 100,
          duration: 2.2,
          ease: "power2.inOut",
          onUpdate: () => {
            countEl.textContent = String(Math.round(counter.value)).padStart(
              3,
              "0"
            );
          },
        },
        0
      );

      words.forEach((word, i) => {
        tl.fromTo(
          word,
          { opacity: 0, yPercent: 30 },
          { opacity: 1, yPercent: 0, duration: 0.3 },
          i * 0.55
        ).to(word, { opacity: 0, yPercent: -30, duration: 0.3 }, i * 0.55 + 0.42);
      });

      tl.to(
        root,
        { yPercent: -100, duration: 1, ease: "power4.inOut" },
        2.35
      );
    }, root);

    return () => ctx.revert();
  }, [hidden]);

  if (hidden) return null;

  return (
    <div ref={rootRef} className="preloader" data-cursor-theme="light">
      {WORDS.map((word) => (
        <span key={word} className="preloader-word">
          {word.endsWith("®") ? (
            <>
              <em>{word.slice(0, -1)}</em>®
            </>
          ) : (
            word
          )}
        </span>
      ))}
      <span className="preloader-hint mono">NES® Portfolio — 2026</span>
      <span ref={countRef} className="preloader-count">
        000
      </span>
    </div>
  );
}
