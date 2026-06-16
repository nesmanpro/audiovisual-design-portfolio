"use client";

import { useEffect, useRef } from "react";
import { gsap, SplitText } from "@/lib/gsap";
import { isPreloaderDone, markPreloaderDone } from "@/lib/preloader";
import type { Project } from "@/lib/projects";
import { usePageTransition } from "./PageTransition";
import Magnetic from "./Magnetic";

export default function ProjectView({
  project,
  next,
  index,
}: {
  project: Project;
  next: Project;
  index: number;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const { navigate } = usePageTransition();

  useEffect(() => {
    // direct loads land here without the home preloader
    document.body.classList.remove("is-loading");
    if (!isPreloaderDone()) markPreloaderDone();

    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      // --- entrance (timed to finish as the veil lifts) ---
      const maskedLines = gsap.utils.toArray<HTMLElement>(".mask > *", root);
      gsap.set(maskedLines, { yPercent: 115 });

      gsap
        .timeline({ defaults: { ease: "power4.out" }, delay: 0.35 })
        .to(maskedLines, { yPercent: 0, duration: 1.3, stagger: 0.1 })
        .from(
          ".project-facts > *, .project-header .section-tag",
          {
            opacity: 0,
            y: 24,
            duration: 0.9,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.4,
        )
        .from(
          ".project-media",
          { opacity: 0, y: 80, duration: 1.1, ease: "power3.out" },
          0.55,
        );

      // --- scroll choreography ---
      const video = root.querySelector<HTMLElement>(".project-media video");
      if (video) {
        gsap.fromTo(
          video,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: ".project-media",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }

      const split = SplitText.create(".project-intro", {
        type: "words",
        wordsClass: "word",
      });
      gsap.to(split.words, {
        opacity: 1,
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".project-intro",
          start: "top 78%",
          end: "bottom 45%",
          scrub: 0.6,
        },
      });

      gsap.utils
        .toArray<HTMLElement>(".project-para, .project-img")
        .forEach((el) => {
          gsap.from(el, {
            opacity: 0,
            y: 70,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 86%" },
          });
        });

      gsap.utils.toArray<HTMLElement>(".project-img img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: "none",
            scrollTrigger: {
              trigger: img,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.from(".project-quote", {
        opacity: 0,
        scale: 0.96,
        y: 40,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".project-quote", start: "top 80%" },
      });

      const nextSplit = SplitText.create(".project-next-title", {
        type: "lines",
        mask: "lines",
      });
      gsap.from(nextSplit.lines, {
        yPercent: 115,
        duration: 1.2,
        stagger: 0.09,
        ease: "power4.out",
        scrollTrigger: { trigger: ".project-next", start: "top 75%" },
      });
    }, root);

    return () => ctx.revert();
  }, [project.slug]);

  const num = String(index + 1).padStart(2, "0");

  return (
    <main ref={rootRef} className="project">
      <header className="project-header">
        <div className="section-tag mono">
          <span>
            (Case {num}) — {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <h1 className="project-title">
          <span className="mask">
            <span>{project.title}</span>
          </span>
          <span className="mask">
            <span className="serif-it project-tagline">{project.tagline}</span>
          </span>
        </h1>
        <dl className="project-facts mono">
          <div>
            <dt>Client</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt>Stack</dt>
            <dd>{project.stack.join(", ")}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
        </dl>
      </header>

      <div className="project-media">
        <video src={project.video} autoPlay muted loop playsInline />
      </div>

      <section className="section">
        <div className="section-tag mono">
          <span>(01) — The brief</span>
          <span>{project.client}</span>
        </div>
        <p className="about-text project-intro">{project.intro}</p>
      </section>

      <section className="section project-story">
        <figure className="project-img project-img-a">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.detail1} alt={`${project.title} — detail`} />
        </figure>
        <div className="project-para">
          <span className="mono project-para-label">(02) — The concept</span>
          <p>{project.body[0]}</p>
        </div>
        <div className="project-para project-para-offset">
          <span className="mono project-para-label">(03) — The build</span>
          <p>{project.body[1]}</p>
        </div>
        <figure className="project-img project-img-b">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.detail2} alt={`${project.title} — detail`} />
        </figure>
      </section>

      <p className="project-quote serif-it">“{project.fact}”</p>

      <nav className="project-next section">
        <div className="section-tag mono">
          <span>(Next case)</span>
          <span>{next.category}</span>
        </div>
        <a
          href={`/work/${next.slug}`}
          className="project-next-title"
          data-cursor="Next"
          onClick={(e) => {
            e.preventDefault();
            navigate(`/work/${next.slug}`, next.title);
          }}
        >
          {next.title}
          <span className="serif-it"></span>
        </a>
        <Magnetic strength={0.2}>
          <a
            href="/"
            className="project-back mono"
            onClick={(e) => {
              e.preventDefault();
              navigate("/#works", "Works");
            }}
          >
            ← Back to all works
          </a>
        </Magnetic>
      </nav>
    </main>
  );
}
