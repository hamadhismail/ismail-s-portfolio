import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import ContactSection from './components/ContactSection';
import CustomCursor from './components/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const handleNavClick = (href: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(href, { offset: 0, duration: 1.2 });
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-x-hidden selection:bg-white selection:text-black">
      {/* Subtle film grain overlay */}
      <div className="cinema-grain" aria-hidden="true" />

      {/* Desktop-only custom cursor */}
      <CustomCursor />

      {/* Fixed minimal navigation */}
      <Navigation onNavClick={handleNavClick} />

      {/* Continuous cinematic story flow */}
      <main className="relative w-full">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <CapabilitiesSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default App;
