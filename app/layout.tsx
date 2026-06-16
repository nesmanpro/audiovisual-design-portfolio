import type { Metadata } from "next";
import { Syne, Instrument_Serif, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Letsornot® — Creative Developer & Graphic Designer",
  description:
    "Portfolio of NES, an independent graphic designer and creative developer crafting award-worthy digital experiences with type, motion and code.",
};

import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${instrumentSerif.variable} ${plexMono.variable}`}
    >
      <body className="is-loading">
        <PageTransition>
          <SmoothScroll />
          <Cursor />
          <Header />
          {children}
        </PageTransition>
      </body>
    </html>
  );
}
