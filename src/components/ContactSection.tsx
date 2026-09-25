import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_LINKS = [
  {
    label: 'EMAIL →',
    href: 'mailto:hamadhismail04@gmail.com?subject=Project%20Inquiry&body=Hello%20Hamadh,%0A%0AI%20visited%20your%20portfolio%20website%20and%20would%20like%20to%20know%20more%20about%20your%20services.%0A%0AThank%20you.',
    target: '_self',
    note: 'hamadhismail04@gmail.com',
  },
  {
    label: 'GITHUB →',
    href: 'https://github.com/hamadhismail',
    target: '_blank',
    note: '@hamadhismail',
  },
  {
    label: 'LINKEDIN →',
    href: 'https://www.linkedin.com/in/hamadhismail04/',
    target: '_blank',
    note: 'in/hamadhismail04',
  },
  {
    label: 'WHATSAPP →',
    href: 'https://wa.me/919962736287?text=Hi%20Hamadh,%20can%20I%20get%20more%20information%20about%20your%20services?',
    target: '_blank',
    note: '+91 9962736287',
  },
];

const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Lines reveal
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current];
      lines.forEach((line) => {
        if (!line) return;
        gsap.fromTo(
          line,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            yPercent: 80,
            opacity: 0,
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
            ease: 'none',
          }
        );
      });

      // Background image subtle zoom
      if (bgImageRef.current) {
        gsap.fromTo(
          bgImageRef.current,
          { scale: 1, opacity: 0.15 },
          {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom bottom',
              scrub: true,
            },
            scale: 1.08,
            opacity: 0.28,
            ease: 'none',
          }
        );
      }

      // Links reveal
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.children,
          { opacity: 0, y: 25 },
          {
            scrollTrigger: {
              trigger: linksRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
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
      id="contact"
      className="relative min-h-screen w-full bg-[#050505] text-white px-6 md:px-12 py-32 md:py-44 border-t border-white/[0.15] flex flex-col justify-between overflow-hidden"
    >
      {/* Subtle cinematic background image (dark, scaling subtly) */}
      <div
        ref={bgImageRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden will-change-transform"
      >
        <img
          src="/hero-portrait.jpg"
          alt=""
          className="h-full w-full object-cover filter grayscale contrast-150 brightness-50"
        />
        <div className="absolute inset-0 bg-[#050505]/85 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl w-full flex-1 flex flex-col justify-between">
        {/* Section Header: 05 / CONTACT */}
        <div className="flex items-center justify-between border-b border-white/[0.15] pb-5 mb-16 md:mb-24">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white">
            05 / CONTACT
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
            LET'S CONNECT
          </span>
        </div>

        {/* Huge Typography:
            LET'S BUILD
            SOMETHING
            USEFUL.
        */}
        <div className="my-auto py-10">
          <h2
            className="font-grotesk font-black uppercase tracking-tight text-white leading-[0.88]"
            style={{ fontSize: 'clamp(3rem, 11vw, 9.5rem)' }}
          >
            <div className="overflow-hidden mb-2">
              <div ref={line1Ref} className="will-change-transform">
                LET'S BUILD
              </div>
            </div>
            <div className="overflow-hidden mb-2">
              <div ref={line2Ref} className="will-change-transform text-white/95">
                SOMETHING
              </div>
            </div>
            <div className="overflow-hidden">
              <div ref={line3Ref} className="will-change-transform text-[#8A8A8A]">
                USEFUL.
              </div>
            </div>
          </h2>
        </div>

        {/* Links Grid */}
        <div
          ref={linksRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-16 border-t border-white/[0.15]"
        >
          {CONTACT_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.target}
              rel={link.target === '_blank' ? 'noopener noreferrer' : undefined}
              className="group flex flex-col gap-2 p-4 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.08] hover:border-white/30 transition-all duration-300"
            >
              <span className="font-grotesk font-bold text-xl sm:text-2xl text-white group-hover:translate-x-2 transition-transform uppercase">
                {link.label}
              </span>
              <span className="font-mono text-xs text-[#8A8A8A] truncate">
                {link.note}
              </span>
            </a>
          ))}
        </div>

        {/* Footer:
            © 2026 HAMADH ISMAIL
            CHENNAI / INDIA
        */}
        <div className="pt-16 sm:pt-20 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8A8A]">
          <span>© 2026 HAMADH ISMAIL</span>
          <span>CHENNAI / INDIA</span>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
