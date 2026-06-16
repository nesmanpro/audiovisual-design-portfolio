"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { attachKineticType, splitChars } from "@/lib/kineticType";
import { onPreloaderDone } from "@/lib/preloader";
import { PROJECTS } from "@/lib/projects";
import { usePageTransition } from "./PageTransition";

/** Layout for the floating project media behind the type (one per project,
 *  zipped with PROJECTS by index). Static grayscale image by default; on
 *  hover the stock video plays and the cursor tag shows the project name.
 *  `depth` drives the mouse parallax amplitude. Click opens the case page. */
const FIGURES = [
  { top: "4%", left: "10%", width: "clamp(7rem, 11vw, 11rem)", depth: 0.6 },
  { top: "8%", left: "63%", width: "clamp(8rem, 13vw, 13rem)", depth: 1 },
  { top: "38%", left: "82%", width: "clamp(6.5rem, 10vw, 10rem)", depth: 0.75 },
  { top: "30%", left: "40%", width: "clamp(7.5rem, 12vw, 12rem)", depth: 1.25 },
  { top: "58%", left: "20%", width: "clamp(6rem, 9vw, 9rem)", depth: 0.9 },
];

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const kineticLines = gsap.utils.toArray<HTMLElement>("[data-kinetic]");
      const chars = kineticLines.flatMap(splitChars);

      // --- intro reveal once the preloader curtain lifts ---
      // Element refs (not string selectors): the callback may run inside
      // another gsap context, where selector text resolves against its scope.
      const maskedLines = gsap.utils.toArray<HTMLElement>(".mask > *", root);
      const metaEls = gsap.utils.toArray<HTMLElement>(
        ".hero-top, .hero-meta",
        root
      );
      const figures = gsap.utils.toArray<HTMLElement>(".hero-figure", root);

      gsap.set(maskedLines, { yPercent: 115 });
      gsap.set(metaEls, { opacity: 0, y: 20 });
      gsap.set(figures, { autoAlpha: 0, scale: 0.9 });

      const offDone = onPreloaderDone(() => {
        gsap
          .timeline({ defaults: { ease: "power4.out" } })
          .to(maskedLines, { yPercent: 0, duration: 1.4, stagger: 0.09 }, 0.1)
          .to(
            figures,
            {
              autoAlpha: 1,
              scale: 1,
              duration: 1.2,
              stagger: 0.08,
              ease: "power3.out",
            },
            0.5
          )
          .to(
            metaEls,
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            0.8
          );
      });

      // --- figure parallax + hover video playback ---
      const figXs = figures.map((figure, i) =>
        gsap.quickTo(figure, "x", { duration: 0.9 + i * 0.15, ease: "power3" })
      );
      const figYs = figures.map((figure, i) =>
        gsap.quickTo(figure, "y", { duration: 0.9 + i * 0.15, ease: "power3" })
      );

      figures.forEach((figure, i) => {
        const video = figure.querySelector("video");
        if (!video) return;
        // property assignment (not addEventListener) so a re-run of this
        // effect replaces the handlers instead of stacking them
        figure.onmouseenter = () => {
          video.play().catch(() => {});
          gsap.to(video, { autoAlpha: 1, duration: 0.35 });
          gsap.to(figure, { scale: 1.06, duration: 0.5, ease: "power3.out" });
        };
        figure.onmouseleave = () => {
          gsap.to(video, {
            autoAlpha: 0,
            duration: 0.3,
            onComplete: () => {
              video.pause();
              video.currentTime = 0;
            },
          });
          gsap.to(figure, { scale: 1, duration: 0.5, ease: "power3.out" });
        };
      });

      // --- kinetic weight: chars bulk up near the cursor ---
      const detachKinetic = attachKineticType(root, chars);

      // --- figure parallax: drift opposite the cursor, deeper ones further ---
      const onMove = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth - 0.5) * 2;
        const ny = (e.clientY / window.innerHeight - 0.5) * 2;
        figures.forEach((_, i) => {
          figXs[i](nx * FIGURES[i].depth * -42);
          figYs[i](ny * FIGURES[i].depth * -30);
        });
      };
      root.addEventListener("mousemove", onMove);

      // --- subtle parallax on scroll ---
      gsap.to(".hero-title", {
        yPercent: -12,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => {
        offDone();
        detachKinetic();
        root.removeEventListener("mousemove", onMove);
      };
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="hero" id="top">
      <div className="hero-media">
        {FIGURES.map((figure, i) => (
          <figure
            key={PROJECTS[i].slug}
            className="hero-figure"
            data-cursor-tag={PROJECTS[i].title}
            onClick={() =>
              navigate(`/work/${PROJECTS[i].slug}`, PROJECTS[i].title)
            }
            style={
              {
                top: figure.top,
                left: figure.left,
                "--fw": figure.width,
              } as React.CSSProperties
            }
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={PROJECTS[i].thumb} alt={PROJECTS[i].title} loading="lazy" />
            <video
              src={PROJECTS[i].video}
              muted
              loop
              playsInline
              preload="none"
            />
          </figure>
        ))}
      </div>

      <div className="hero-top mono">
        <span>Independent — Est. 2019</span>
        <span>Based in Madrid, ES</span>
        <span>Available for freelance</span>
      </div>

      <h1 className="hero-title">
        <span className="mask">
          <span data-kinetic>Graphic</span>
        </span>
        <span className="mask">
          <span className="hero-line-2">
            <em className="serif-it">designer</em>
            <span data-kinetic>&nbsp;&amp;</span>
          </span>
        </span>
        <span className="mask">
          <span className="hero-line-indent" data-kinetic>
            Developer®
          </span>
        </span>
      </h1>

      <div className="hero-meta">
        <p className="hero-meta-col mono">
          Crafting expressive digital experiences where bold typography meets
          precise code.
        </p>
        <a href="#works" className="hero-scroll mono" data-cursor="Scroll">
          <span className="hero-scroll-dot" />
          Scroll to explore
        </a>
      </div>
    </section>
  );
}
