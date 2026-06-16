import Preloader from "@/components/Preloader";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Works from "@/components/Works";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Preloader />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Works />
        <Services />
        <Footer />
      </main>
    </>
  );
}
