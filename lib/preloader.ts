const DONE_FLAG = "__preloaderDone";
const DONE_EVENT = "preloader:done";

declare global {
  interface Window {
    [DONE_FLAG]?: boolean;
  }
}

export function isPreloaderDone() {
  return typeof window !== "undefined" && !!window[DONE_FLAG];
}

export function markPreloaderDone() {
  window[DONE_FLAG] = true;
  // Dispatch outside the calling gsap callback so listeners don't create
  // their animations inside the preloader's gsap context.
  requestAnimationFrame(() => window.dispatchEvent(new CustomEvent(DONE_EVENT)));
}

/** Runs `cb` when the preloader finishes (immediately if it already has). */
export function onPreloaderDone(cb: () => void): () => void {
  if (window[DONE_FLAG]) {
    cb();
    return () => {};
  }
  const handler = () => cb();
  window.addEventListener(DONE_EVENT, handler, { once: true });
  return () => window.removeEventListener(DONE_EVENT, handler);
}
