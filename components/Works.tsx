"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { PROJECTS } from "@/lib/projects";
import { usePageTransition } from "./PageTransition";

export default function Works() {
  const rootRef = useRef<HTMLElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);
  const letterRef = useRef<HTMLSpanElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const root = rootRef.current;
    const preview = previewRef.current;
    const previewImg = previewImgRef.current;
    const letter = letterRef.current;
    if (!root || !preview || !previewImg || !letter) return;

    const ctx = gsap.context(() => {
      // rows slide in on scroll
      gsap.utils.toArray<HTMLElement>(".work-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%" },
        });
      });

      // floating preview follows the cursor between rows
      const xTo = gsap.quickTo(preview, "x", { duration: 0.55, ease: "power3" });
      const yTo = gsap.quickTo(preview, "y", { duration: 0.55, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      const show = (project: (typeof PROJECTS)[number]) => {
        previewImg.src = project.cover;
        letter.textContent = project.title.charAt(0);
        gsap.to(preview, {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        });
      };

      const hide = () => {
        gsap.to(preview, {
          opacity: 0,
          scale: 0.85,
          duration: 0.35,
          ease: "power3.out",
        });
      };

      gsap.set(preview, { xPercent: -50, yPercent: -50, scale: 0.85 });

      const rows = gsap.utils.toArray<HTMLElement>(".work-row");
      rows.forEach((row, i) => {
        row.onmouseenter = () => show(PROJECTS[i]);
      });
      root.addEventListener("mousemove", onMove);
      root.addEventListener("mouseleave", hide);

      return () => {
        root.removeEventListener("mousemove", onMove);
        root.removeEventListener("mouseleave", hide);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="section" id="works">
      <div className="section-tag mono">
        <span>(02) — Selected works</span>
        <span>2024 → 2026</span>
      </div>

      <div className="works-list">
        {PROJECTS.map((project, i) => (
          <a
            key={project.slug}
            href={`/work/${project.slug}`}
            className="work-row"
            data-cursor="View"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/work/${project.slug}`, project.title);
            }}
          >
            <span className="work-index mono">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="work-title">{project.title}</h3>
            <div className="work-meta mono">
              <span>{project.category}</span>
              <span>{project.year}</span>
            </div>
          </a>
        ))}
      </div>

      <div ref={previewRef} className="work-preview">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={previewImgRef} alt="" />
        <span ref={letterRef} className="work-preview-letter" />
      </div>
    </section>
  );
}
