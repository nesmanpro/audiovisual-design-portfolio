"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;
    const tag = tagRef.current!;

    gsap.set([dot, ring, tag], { xPercent: 0, yPercent: 0, opacity: 0 });

    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3" });
    const tagX = gsap.quickTo(tag, "x", { duration: 0.5, ease: "power3" });
    const tagY = gsap.quickTo(tag, "y", { duration: 0.5, ease: "power3" });

    let visible = false;

    const onMove = (e: MouseEvent) => {
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        gsap.set([dot, ring, tag], { x: e.clientX, y: e.clientY });
      }
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
      tagX(e.clientX);
      tagY(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const overLightZone = !!(e.target as HTMLElement).closest(
        '[data-cursor-theme="light"]'
      );
      dot.classList.toggle("is-light", overLightZone);
      ring.classList.toggle("is-light", overLightZone);

      // project name tag next to the cursor (hero floating media)
      const tagSource = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor-tag]"
      );
      if (tagSource) {
        tag.textContent = tagSource.dataset.cursorTag ?? "";
        gsap.to(tag, { opacity: 1, duration: 0.25 });
      } else {
        gsap.to(tag, { opacity: 0, duration: 0.2 });
      }

      const target = (e.target as HTMLElement).closest<HTMLElement>(
        "[data-cursor]"
      );
      let ringScale = 1;
      let dotScale = 1;
      if (target) {
        label.textContent = target.dataset.cursor || "";
        ring.classList.add("is-active");
        ringScale = 1.8;
        dotScale = 0;
      } else {
        ring.classList.remove("is-active");
        if (tagSource) {
          ringScale = 0.6;
        } else if ((e.target as HTMLElement).closest("a, button, .nav-link")) {
          ringScale = 1.4;
        }
      }
      gsap.to(ring, { scale: ringScale, duration: 0.35, ease: "power3.out" });
      gsap.to(dot, { scale: dotScale, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
      <div ref={tagRef} className="cursor-tag" />
    </>
  );
}
