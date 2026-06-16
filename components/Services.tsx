"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const SERVICES = [
  {
    name: "Design",
    desc: "Visual identities, art direction and interfaces with a strong typographic voice. Design systems that scale without losing character.",
    tags: ["Brand Identity", "UI/UX", "Editorial", "Type"],
  },
  {
    name: "Development",
    desc: "Fast, accessible, pixel-faithful builds. React, Next.js and creative front-end where the code serves the concept — never the other way around.",
    tags: ["React", "Next.js", "GSAP", "WebGL"],
  },
  {
    name: "Motion",
    desc: "Micro-interactions, scroll choreography and kinetic typography that give interfaces a pulse. Motion as meaning, not decoration.",
    tags: ["Interaction", "Scrollytelling", "Lottie", "3D"],
  },
];

export default function Services() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".service-row").forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="section services"
      id="services"
      data-cursor-theme="light"
    >
      <div className="section-tag mono">
        <span>(03) — Services</span>
        <span>What I do</span>
      </div>

      {SERVICES.map((service, i) => (
        <div key={service.name} className="service-row">
          <h3 className="service-name">
            <span className="service-num">0{i + 1}</span>
            {service.name}
          </h3>
          <div className="service-desc">
            {service.desc}
            <div className="service-tags mono">
              {service.tags.map((tag) => (
                <span key={tag} className="service-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
