import { gsap } from "@/lib/gsap";

/** Wraps every character of text inside `root` (including nested elements,
 *  e.g. an italic <em>) in a `.kinetic-char` span so its variable font
 *  weight can react to cursor proximity. Returns the created spans. */
export function splitChars(root: HTMLElement): HTMLSpanElement[] {
  const chars: HTMLSpanElement[] = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) textNodes.push(node as Text);

  for (const textNode of textNodes) {
    const frag = document.createDocumentFragment();
    for (const ch of textNode.textContent ?? "") {
      // keep whitespace as plain text — wrapping it in an inline-block
      // span collapses it to zero width
      if (/\s/.test(ch)) {
        frag.appendChild(document.createTextNode(ch));
        continue;
      }
      const span = document.createElement("span");
      span.className = "kinetic-char";
      span.textContent = ch;
      frag.appendChild(span);
      chars.push(span);
    }
    textNode.parentNode?.replaceChild(frag, textNode);
  }
  return chars;
}

/** Makes `chars` bulk up (variable font weight + slight lift) the closer
 *  the cursor gets, while the mouse is inside `root`. Returns a cleanup fn. */
export function attachKineticType(
  root: HTMLElement,
  chars: HTMLElement[],
  radius = 180
) {
  let mouseX = -9999;
  let mouseY = -9999;
  let rafId = 0;
  let active = false;

  const update = () => {
    for (const char of chars) {
      const rect = char.getBoundingClientRect();
      const dx = rect.left + rect.width / 2 - mouseX;
      const dy = rect.top + rect.height / 2 - mouseY;
      const dist = Math.hypot(dx, dy);
      const force = Math.max(0, 1 - dist / radius);
      char.style.setProperty("--wght", String(550 + force * 250));
      char.style.transform = `translateY(${force * -0.06}em)`;
    }
    if (active) rafId = requestAnimationFrame(update);
  };

  const onMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };
  const onEnter = () => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    active = true;
    rafId = requestAnimationFrame(update);
  };
  const onLeave = () => {
    active = false;
    cancelAnimationFrame(rafId);
    gsap.to(chars, {
      "--wght": 550,
      y: 0,
      duration: 0.6,
      ease: "power3.out",
      clearProps: "transform",
    });
  };

  root.addEventListener("mousemove", onMove);
  root.addEventListener("mouseenter", onEnter);
  root.addEventListener("mouseleave", onLeave);

  return () => {
    active = false;
    cancelAnimationFrame(rafId);
    root.removeEventListener("mousemove", onMove);
    root.removeEventListener("mouseenter", onEnter);
    root.removeEventListener("mouseleave", onLeave);
  };
}
