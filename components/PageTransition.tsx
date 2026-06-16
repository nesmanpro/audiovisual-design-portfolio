"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

type TransitionContextValue = {
  /** Veil-covered navigation. Supports "/path", "/#hash" and "#hash". */
  navigate: (href: string, label?: string) => void;
};

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export const usePageTransition = () => useContext(TransitionContext);

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const veilRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const coveringRef = useRef(false);
  const pendingHashRef = useRef<string | null>(null);
  const firstRef = useRef(true);

  // normalize: replace the CSS translateY(100%) fallback with gsap's own
  // yPercent, otherwise gsap parses it as a px offset and stacks both
  useEffect(() => {
    gsap.set(veilRef.current, { y: 0, yPercent: 100 });
  }, []);

  // reveal when the new route has rendered under the veil
  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    if (!coveringRef.current) return;
    coveringRef.current = false;

    const veil = veilRef.current!;
    const detail = pendingHashRef.current
      ? { selector: pendingHashRef.current, immediate: true }
      : { top: 0, immediate: true };
    pendingHashRef.current = null;
    window.dispatchEvent(new CustomEvent("app:scrollto", { detail }));

    gsap
      .timeline()
      .to(veil, {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
        delay: 0.2,
      })
      .set(veil, { yPercent: 100 });
  }, [pathname]);

  const navigate = useCallback(
    (href: string, label?: string) => {
      const [path, hash] = href.split("#");
      const targetPath = path || pathname;

      // same page: just smooth-scroll, no veil
      if (targetPath === pathname) {
        if (hash) {
          window.dispatchEvent(
            new CustomEvent("app:scrollto", {
              detail: { selector: `#${hash}`, immediate: false },
            })
          );
        }
        return;
      }

      if (coveringRef.current) return;
      coveringRef.current = true;
      pendingHashRef.current = hash ? `#${hash}` : null;
      if (labelRef.current) labelRef.current.textContent = label ?? "";

      gsap.fromTo(
        veilRef.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.7,
          ease: "power4.inOut",
          onComplete: () => router.push(targetPath),
        }
      );
    },
    [pathname, router]
  );

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={veilRef} className="page-veil" aria-hidden="true">
        <span ref={labelRef} className="page-veil-label serif-it" />
      </div>
    </TransitionContext.Provider>
  );
}
