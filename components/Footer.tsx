"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { attachKineticType, splitChars } from "@/lib/kineticType";
import Magnetic from "./Magnetic";

export default function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const split = SplitText.create(".footer-cta", {
        type: "lines",
        mask: "lines",
      });

      gsap.from(split.lines, {
        yPercent: 115,
        duration: 1.3,
        stagger: 0.1,
        ease: "power4.out",
        scrollTrigger: { trigger: root, start: "top 70%" },
      });

      // kinetic weight: cta chars bulk up near the cursor, like the hero
      const ctaChars = (split.lines as HTMLElement[]).flatMap((line) =>
        splitChars(line),
      );
      const detachKinetic = attachKineticType(root, ctaChars);

      gsap.from(".footer-email, .footer-bottom", {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: root, start: "top 55%" },
      });
      return () => detachKinetic();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={rootRef} className="footer" id="contact">
      <div className="section-tag mono">
        <span>(04) — Contact</span>
        <span>Don&apos;t be shy</span>
      </div>

      <h2 className="footer-cta">
        Let&apos;s make <span className="serif-it">something</span> worth
        staring at
      </h2>

      <Magnetic strength={0.2}>
        <a
          href="mailto:hello@letsornot.design"
          className="footer-email"
          data-cursor="Say hi"
        >
          hello@letornot.design
        </a>
      </Magnetic>

      <div className="footer-bottom mono">
        <span>© 2026 /LETSORNOT — All rights reserved</span>
        <div className="footer-socials">
          <a href="#" data-cursor="Open">
            Instagram
          </a>
          <a href="#" data-cursor="Open">
            Dribbble
          </a>
          <a href="#" data-cursor="Open">
            GitHub
          </a>
          <a href="#" data-cursor="Open">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
