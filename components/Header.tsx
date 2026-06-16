"use client";

import Magnetic from "./Magnetic";
import { usePageTransition } from "./PageTransition";

const LINKS = [
  { label: "Works", href: "/#works" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const { navigate } = usePageTransition();

  const go = (href: string, label?: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(href, label);
  };

  return (
    <header className="header">
      <Magnetic>
        <a href="/" className="header-logo" onClick={go("/", "Home")}>
          /LETSORNOT
        </a>
      </Magnetic>
      <nav className="header-nav mono">
        {LINKS.map((link) => (
          <Magnetic key={link.href} strength={0.25}>
            <a
              href={link.href}
              className="nav-link"
              onClick={go(link.href, link.label)}
            >
              {link.label}
            </a>
          </Magnetic>
        ))}
      </nav>
    </header>
  );
}
