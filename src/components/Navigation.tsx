import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';

interface NavigationProps {
  onNavClick?: (href: string) => void;
}

const NAV_LINKS = [
  { label: 'ABOUT', href: '#about' },
  { label: 'PROJECTS', href: '#projects' },
  { label: 'CONTACT', href: '#contact' },
];

const Navigation = ({ onNavClick }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // 1. Navigation fades upward on load
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -25, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out', delay: 0.1 }
      );
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(href);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.1] py-4'
          : 'bg-transparent py-7'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
        {/* Brand: H / 2026 */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-white hover:text-white/80 transition-colors uppercase"
        >
          <span>H</span>
          <span className="text-white/40 mx-2">/</span>
          <span>2026</span>
        </a>

        {/* Desktop Links: ABOUT | PROJECTS | CONTACT */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 text-[11px] font-mono tracking-[0.25em] text-[#8A8A8A]">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  className="hover:text-white transition-colors uppercase"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Right CTA: EMAIL ME */}
        <div className="hidden md:block">
          <a
            href="mailto:hamadhismail04@gmail.com"
            className="inline-block text-[11px] font-mono uppercase tracking-[0.25em] border border-white/20 bg-white/[0.04] px-5 py-2.5 rounded-full text-white transition-all hover:bg-white hover:text-black hover:border-white"
          >
            EMAIL ME
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            className="text-[11px] font-mono uppercase tracking-widest text-white border border-white/20 px-3.5 py-1.5 rounded-full"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#050505] border-b border-white/[0.1] px-6 py-6 flex flex-col gap-5">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-sm font-mono tracking-widest text-white/80 hover:text-white uppercase"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:hamadhismail04@gmail.com"
            className="text-xs font-mono tracking-widest text-white border border-white/20 px-4 py-2.5 rounded-full text-center mt-2"
          >
            EMAIL ME
          </a>
        </div>
      )}
    </header>
  );
};

export default Navigation;
