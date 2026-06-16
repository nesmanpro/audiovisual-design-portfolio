export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  stack: string[];
  /** grayscale thumb used by the hero floating figures */
  thumb: string;
  cover: string;
  detail1: string;
  detail2: string;
  video: string;
  tagline: string;
  intro: string;
  body: [string, string];
  fact: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "kosmo-studio",
    title: "Kosmo Studio",
    category: "Brand & Web",
    year: "2026",
    client: "Kosmo Studio — Berlin, DE",
    role: "Art direction, identity & development",
    stack: ["Next.js", "GSAP", "WebGL", "Sanity"],
    thumb: "https://picsum.photos/seed/kosmo/480/600?grayscale",
    cover: "https://picsum.photos/seed/kosmo/1600/900",
    detail1: "https://picsum.photos/seed/kosmo-2/900/1200",
    detail2: "https://picsum.photos/seed/kosmo-3/1200/800",
    video:
      "https://videos.pexels.com/video-files/3571264/3571264-hd_1920_1080_30fps.mp4",
    tagline: "an identity that refuses to sit still",
    intro:
      "Kosmo is a young motion studio with serious ambition and zero patience for corporate polish. They asked for a brand that behaves like their reels: loud, kinetic, impossible to ignore. We gave their wordmark a pulse and built the site around it.",
    body: [
      "The identity is a single variable letterform system: every K stretches, leans and snaps back depending on context — print sits still, screens never do. The blue was picked the old way, with swatches taped to a window for a week.",
      "The site is a Next.js build where the type itself is the interface. GSAP drives a weight-axis that reacts to the cursor, and the showreel only plays when you slow down — a small reward for not scrolling like a maniac.",
    ],
    fact: "Built in nine weeks. We argued about the kerning for three of them.",
  },
  {
    slug: "aurelia",
    title: "Aurelia",
    category: "E-commerce",
    year: "2025",
    client: "Aurelia Jewellery — Lisbon, PT",
    role: "UX, visual design & front-end",
    stack: ["Next.js", "Shopify", "GSAP", "Lenis"],
    thumb: "https://picsum.photos/seed/aurelia/480/600?grayscale",
    cover: "https://picsum.photos/seed/aurelia/1600/900",
    detail1: "https://picsum.photos/seed/aurelia-2/900/1200",
    detail2: "https://picsum.photos/seed/aurelia-3/1200/800",
    video:
      "https://videos.pexels.com/video-files/2099568/2099568-hd_1920_1080_30fps.mp4",
    tagline: "slow luxury, fast checkout",
    intro:
      "Aurelia makes hand-finished jewellery in small batches, and their old store made it look like a dropshipping operation. The brief was one sentence: make the site feel like the box the ring arrives in.",
    body: [
      "We slowed everything down on purpose — oversized product photography, a serif that takes its time, white space most e-commerce dashboards would call a bug. Every piece gets a full-bleed spread, not a grid cell.",
      "Under the calm surface it is ruthlessly efficient: headless Shopify, a two-step checkout, and product pages that preload while you are still admiring the previous one. Conversion went up 38% in the first quarter.",
    ],
    fact: "The founder cried at the staging link. Good tears, we checked.",
  },
  {
    slug: "nota-records",
    title: "Nota Records",
    category: "Art Direction",
    year: "2025",
    client: "Nota Records — Madrid, ES",
    role: "Art direction & design system",
    stack: ["Identity", "Editorial", "Motion", "Web"],
    thumb: "https://picsum.photos/seed/nota/480/600?grayscale",
    cover: "https://picsum.photos/seed/nota/1600/900",
    detail1: "https://picsum.photos/seed/nota-2/900/1200",
    detail2: "https://picsum.photos/seed/nota-3/1200/800",
    video:
      "https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4",
    tagline: "sleeves you can hear",
    intro:
      "An independent label putting out music that doesn't fit playlists, Nota needed a visual system that could stretch from ambient drone to post-punk without rebranding every quarter. The answer was a system built on restraint: one grid, one typeface, infinite noise.",
    body: [
      "Every release gets the same skeleton — catalogue number, mono labels, brutal alignment — and one variable: a generative texture seeded from the audio file itself. The sleeve literally is the record.",
      "We extended the system to everything the label touches: vinyl, cassettes, posters, a microsite per release. The discipline of the grid is what lets the chaos of the artwork read as intentional.",
    ],
    fact: "Catalogue NR-009 sold out in a day. The band insists it was the music.",
  },
  {
    slug: "pulso-mag",
    title: "Pulso Mag",
    category: "Editorial Web",
    year: "2024",
    client: "Pulso — Mexico City, MX",
    role: "Design & creative development",
    stack: ["Next.js", "GSAP", "Storyblok", "Vercel"],
    thumb: "https://picsum.photos/seed/pulso/480/600?grayscale",
    cover: "https://picsum.photos/seed/pulso/1600/900",
    detail1: "https://picsum.photos/seed/pulso-2/900/1200",
    detail2: "https://picsum.photos/seed/pulso-3/1200/800",
    video:
      "https://videos.pexels.com/video-files/3195394/3195394-hd_1920_1080_25fps.mp4",
    tagline: "a magazine that breathes",
    intro:
      "Pulso covers culture in Latin America with long, patient journalism — and was serving it in a layout built for clickbait. We rebuilt the reading experience from the paragraph up: typography first, chrome last.",
    body: [
      "Articles open like printed spreads: a full-screen headline, a beat of silence, then the text. Reading progress lives in the margin, pull quotes interrupt like a good editor, and ads were redesigned to behave like inserts, not popups.",
      "The whole front-end runs on a content model editors actually enjoy: blocks they can rearrange like a paste-up board. Average read time doubled, which for a magazine is the only metric that matters.",
    ],
    fact: "The editor-in-chief printed the homepage and framed it. We don't ask why.",
  },
  {
    slug: "helio-type",
    title: "Helio Type",
    category: "Type Design",
    year: "2024",
    client: "Self-initiated — released by /Letsornot",
    role: "Type design & specimen site",
    stack: ["Glyphs", "Variable fonts", "Three.js", "GSAP"],
    thumb: "https://picsum.photos/seed/helio/480/600?grayscale",
    cover: "https://picsum.photos/seed/helio/1600/900",
    detail1: "https://picsum.photos/seed/helio-2/900/1200",
    detail2: "https://picsum.photos/seed/helio-3/1200/800",
    video:
      "https://videos.pexels.com/video-files/2278095/2278095-hd_1920_1080_30fps.mp4",
    tagline: "one axis to rule them all",
    intro:
      "Helio started as a sketch of a lowercase g during a very long call. Two years later it is a variable display family with a single expressive axis that morphs it from compressed editorial sharpness to wide, friendly signage.",
    body: [
      "Drawing one axis that survives both extremes meant redrawing the whole middle: 9 masters, 600+ glyphs, and a spacing pass that nearly ended a friendship. The result moves like rubber but sets like steel.",
      "The specimen site treats the font as a playground — drag to change the axis, type your own headline, watch it react to the cursor. Half marketing, half toy, which is exactly the ratio type deserves.",
    ],
    fact: "The lowercase g has been redrawn 41 times. It is still not done.",
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
