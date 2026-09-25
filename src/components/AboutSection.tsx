import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const infoBlocksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Line-by-line reveal using clip-path, yPercent, opacity, scale
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];

      lines.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            yPercent: 80,
            opacity: 0,
            scale: 0.95,
          },
          {
            scrollTrigger: {
              trigger: line,
              start: 'top 88%',
              end: 'top 55%',
              scrub: 0.8,
            },
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            yPercent: 0,
            opacity: 1,
            scale: 1,
            ease: 'none',
          }
        );
      });

      // Bio paragraph reveal
      gsap.fromTo(
        paragraphRef.current,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: paragraphRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
        }
      );

      // Info blocks reveal
      if (infoBlocksRef.current) {
        gsap.fromTo(
          infoBlocksRef.current.children,
          { opacity: 0, y: 25 },
          {
            scrollTrigger: {
              trigger: infoBlocksRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen w-full bg-[#050505] text-white px-6 md:px-12 py-32 md:py-44 flex flex-col justify-between border-t border-white/[0.15]"
    >
      <div className="mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between">
        {/* Top: 01 / ABOUT */}
        <div className="flex items-center justify-between border-b border-white/[0.15] pb-5 mb-16 md:mb-24">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white">
            01 / ABOUT
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
            PROFILE & PHILOSOPHY
          </span>
        </div>

        {/* Main Huge Typography:
            I BUILD
            DIGITAL
            EXPERIENCES.
        */}
        <div className="my-auto py-10">
          <h2
            className="font-grotesk font-black uppercase tracking-tight text-white leading-[0.88]"
            style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)' }}
          >
            <div className="overflow-hidden mb-2">
              <div ref={line1Ref} className="will-change-transform">
                I BUILD
              </div>
            </div>
            <div className="overflow-hidden mb-2">
              <div ref={line2Ref} className="will-change-transform text-white/95">
                DIGITAL
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line3Ref} className="will-change-transform text-[#8A8A8A]">
                EXPERIENCES.
              </div>
            </div>
          </h2>
        </div>

        {/* Bottom Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-16 border-t border-white/[0.15] items-start">
          {/* Paragraph */}
          <div className="lg:col-span-7">
            <p
              ref={paragraphRef}
              className="text-base sm:text-lg md:text-xl font-light leading-relaxed text-[#8A8A8A] max-w-2xl"
            >
              Full-stack developer focused on building premium digital products,
              scalable web applications and experiences that combine technology,
              design and business logic.
            </p>
          </div>

          {/* Small info blocks */}
          <div
            ref={infoBlocksRef}
            className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-6 font-mono text-xs"
          >
            <div>
              <span className="block text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">
                LOCATION
              </span>
              <p className="text-white font-medium tracking-wider">
                CHENNAI / INDIA
              </p>
            </div>

            <div>
              <span className="block text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">
                FOCUS
              </span>
              <p className="text-white font-medium tracking-wider">
                WEB · AI · PRODUCTS
              </p>
            </div>

            <div>
              <span className="block text-[10px] tracking-[0.25em] text-[#8A8A8A] uppercase mb-1">
                PROJECTS
              </span>
              <p className="text-white font-medium tracking-wider">
                10+
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
