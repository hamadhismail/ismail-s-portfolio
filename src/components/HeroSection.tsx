import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  'FULL-STACK DEVELOPER',
  'PRODUCT DESIGNER',
  'GEN AI INTEGRATION',
  'MERN DEVELOPER',
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const hamadhRef = useRef<HTMLSpanElement>(null);
  const ismailRef = useRef<HTMLSpanElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter continuous sequence
  useEffect(() => {
    // Respect prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setDisplayText(ROLES[0]);
      return;
    }

    const currentRole = ROLES[roleIndex];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing phase: 85ms per character
      if (displayText.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        }, 85);
      } else {
        // Pause after completing a role: 1500ms
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting phase: 50ms per character
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentRole.slice(0, displayText.length - 1));
        }, 50);
      } else {
        // Pause before starting the next role: 200ms
        timer = setTimeout(() => {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
        }, 200);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, roleIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial page load entrance for text only (never touches photo)
      const entranceTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      entranceTl.fromTo(
        labelRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.1
      );

      entranceTl.fromTo(
        hamadhRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.2
      );

      entranceTl.fromTo(
        ismailRef.current,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 1, ease: 'power3.out' },
        0.35
      );

      entranceTl.fromTo(
        roleRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.55
      );

      entranceTl.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0.8
      );

      // 2. Single fully reversible ScrollTrigger timeline
      // Controlled 100% by scroll position (scrub: true)
      // At scroll 0: opacity: 1, scale: 1, y: 0, visibility: visible
      // Scrolling down: opacity 1 -> 0, scale 1 -> 1.15, y 0 -> -80px
      // Scrolling back upward: automatically reverses to opacity: 1, scale: 1, y: 0
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      // Photo animation (reversible)
      scrollTl.to(
        portraitRef.current,
        {
          opacity: 0,
          scale: 1.15,
          y: -80,
          ease: 'none',
        },
        0
      );

      // Hero title transformation
      scrollTl.to(
        titleGroupRef.current,
        {
          scale: 1.25,
          y: -200,
          opacity: 0.15,
          ease: 'none',
        },
        0
      );

      // Ambient halo fade
      scrollTl.to(
        glowRef.current,
        {
          opacity: 0,
          scale: 1.1,
          ease: 'none',
        },
        0
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-between select-none"
    >
      {/* 1. Subtle Architectural Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* 2. Atmospheric Volumetric Spotlight / Studio Halo behind Hamadh */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute right-[5%] sm:right-[15%] top-[15%] h-[350px] w-[350px] sm:h-[500px] sm:w-[500px] lg:h-[650px] lg:w-[650px] rounded-full blur-[90px] sm:blur-[120px] will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(255, 255, 255, 0.14) 0%, rgba(140, 160, 200, 0.05) 50%, transparent 75%)',
        }}
      />

      {/* 3. Subtle Rotating Orbital Lens Ring (desktop & tablet) */}
      <div className="pointer-events-none absolute right-[5%] sm:right-[10%] top-[18%] h-[400px] w-[400px] lg:h-[580px] lg:w-[580px] rounded-full border border-white/[0.04] hidden sm:block">
        <div className="absolute inset-3 rounded-full border border-dashed border-white/[0.03] animate-[spin_120s_linear_infinite]" />
      </div>

      {/* 4. Giant Outline Watermark Typography in Background */}
      <div
        className="pointer-events-none absolute bottom-[10%] sm:bottom-[12%] left-0 right-0 z-0 overflow-hidden leading-none select-none opacity-[0.035]"
        style={{
          WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.9)',
          color: 'transparent',
        }}
      >
        <span
          className="font-grotesk font-black uppercase tracking-tighter whitespace-nowrap block"
          style={{ fontSize: 'clamp(5rem, 18vw, 22rem)' }}
        >
          HAMADH ISMAIL
        </span>
      </div>

      {/* 5. Portrait Image (Hamadh's Real Photo) */}
      <div
        ref={portraitRef}
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-[90vw] sm:w-[65vw] md:w-[52vw] lg:w-[45vw] h-full z-[2] overflow-hidden will-change-transform"
        style={{
          opacity: 1,
          visibility: 'visible',
        }}
      >
        <img
          src="/hero-portrait.jpg"
          alt="Hamadh Ismail Portrait"
          className="h-full w-full object-cover object-top sm:object-center filter contrast-125 brightness-100"
        />

        {/* Soft gradient edge fade into #050505 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/60 sm:via-[#050505]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
      </div>

      {/* ================= FOREGROUND TYPOGRAPHY ================= */}
      {/* Top spacing */}
      <div className="h-20 sm:h-28 w-full relative z-10" />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 flex-1 flex flex-col justify-center">
        {/* Label: PORTFOLIO · 2026 */}
        <p
          ref={labelRef}
          className="mb-3 sm:mb-5 font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-[#8A8A8A] flex items-center gap-2"
        >
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/70" />
          PORTFOLIO · 2026
        </p>

        {/* Hero Title: HAMADH ISMAIL */}
        <div
          ref={titleGroupRef}
          className="origin-left will-change-transform select-none"
        >
          <h1
            className="font-grotesk font-black uppercase tracking-tight text-white leading-[0.86]"
            style={{ fontSize: 'clamp(2.8rem, 11vw, 11.5rem)' }}
          >
            <div className="overflow-hidden">
              <span ref={hamadhRef} className="inline-block">
                HAMADH
              </span>
            </div>
            <div className="overflow-hidden">
              <span ref={ismailRef} className="inline-block text-white/95">
                ISMAIL
              </span>
            </div>
          </h1>
        </div>

        {/* Cinematic Typewriter Role Subtitle */}
        <div
          ref={roleRef}
          className="mt-4 sm:mt-7 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.22em] text-[#8A8A8A] uppercase min-h-[2.4rem] sm:min-h-[1.75rem] flex items-center flex-wrap leading-relaxed"
        >
          <span className="text-white/90">{displayText}</span>
          <span
            className="cursor-caret ml-1 text-white font-light select-none"
            style={{ animation: 'cursorBlink 1s ease-in-out infinite' }}
            aria-hidden="true"
          >
            |
          </span>
        </div>
      </div>

      {/* Bottom Bar: SCROLL Indicator & Coordinates */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-6 sm:pb-10 flex items-end justify-between">
        <div ref={scrollRef} className="flex flex-col items-start gap-2.5">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#8A8A8A]">
            SCROLL
          </span>
          <div className="relative h-10 sm:h-12 w-[1px] bg-white/20 overflow-hidden">
            <span
              className="absolute inset-x-0 top-0 h-1/2 w-full bg-white"
              style={{ animation: 'scrollTick 2s ease-in-out infinite' }}
            />
          </div>
        </div>

        <div className="text-right font-mono text-[10px] tracking-[0.25em] uppercase text-[#8A8A8A]">
          CHENNAI / INDIA
        </div>
      </div>

      <style>{`
        @keyframes scrollTick {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
