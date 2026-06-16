"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { onPreloaderDone } from "@/lib/preloader";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.stop();
    const offDone = onPreloaderDone(() => lenis.start());

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>(
        'a[href^="#"]'
      );
      if (!anchor || anchor.hash.length < 2) return;
      const target = document.querySelector(anchor.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { duration: 1.6 });
    };
    document.addEventListener("click", onAnchorClick);

    // programmatic scrolls requested by the page transition / header
    const onScrollTo = (e: Event) => {
      const detail = (e as CustomEvent).detail as {
        selector?: string;
        top?: number;
        immediate?: boolean;
      };
      const target =
        detail.selector != null
          ? document.querySelector<HTMLElement>(detail.selector)
          : detail.top ?? 0;
      if (target == null) return;
      lenis.scrollTo(target, {
        immediate: detail.immediate,
        duration: detail.immediate ? 0 : 1.6,
      });
    };
    window.addEventListener("app:scrollto", onScrollTo);

    return () => {
      offDone();
      document.removeEventListener("click", onAnchorClick);
      window.removeEventListener("app:scrollto", onScrollTo);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
