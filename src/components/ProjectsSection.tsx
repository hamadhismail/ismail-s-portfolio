import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  number: string;
  title: string;
  category: string;
  technologies: string[];
  liveUrl: string;
  image: string;
  detailImages: string[];
  description: string;
}

const PROJECTS: Project[] = [
  {
    number: '01',
    title: 'APEXSTRENGTH',
    category: 'PERSONAL · WEB APPLICATION',
    technologies: ['React', 'TypeScript', 'Tailwind', 'Performance Tracking'],
    liveUrl: 'https://apex-strength-eta.vercel.app/',
    image: '/Forge.png',
    detailImages: ['/Forge1.png', '/Forge2.png'],
    description: 'High-performance fitness & strength training platform engineered for athlete progression and tracking.',
  },
  {
    number: '02',
    title: 'LAWLAB',
    category: 'PERSONAL · LEGAL-TECH',
    technologies: ['React', 'Tailwind', 'Search Architecture', 'Legal AI'],
    liveUrl: 'https://law-lab.vercel.app/',
    image: '/lawlab.png',
    detailImages: ['/lawlab1.png', '/lawlab2.png'],
    description: 'Modern legal-tech discovery hub designed to simplify case research and statutory comprehension.',
  },
  {
    number: '03',
    title: 'RESUMEIQ',
    category: 'PERSONAL · GENAI',
    technologies: ['React', 'GenAI', 'Gemini / Claude API', 'Resume Parser'],
    liveUrl: 'https://resume-iq-tau-pink.vercel.app/',
    image: '/resumeiq-hero.png',
    detailImages: ['/resumeiq-feedback.png', '/resumeiq-score.png'],
    description: 'AI-driven resume reviewer that analyzes career profiles and generates tailored improvement metrics.',
  },
  {
    number: '04',
    title: 'NOTCH',
    category: 'PERSONAL · DESIGN SYSTEM',
    technologies: ['React', 'TypeScript', 'Tailwind', 'UI/UX Design'],
    liveUrl: 'https://notch-vsto.vercel.app/',
    image: '/notch-hero.png',
    detailImages: ['/notch-pricing.png', '/notch-mockup.png'],
    description: 'Sleek, minimalist product landing and component design system built with meticulous typographic balance.',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const desktopPinnedViewportRef = useRef<HTMLDivElement>(null);
  const mobilePinnedViewportRef = useRef<HTMLDivElement>(null);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);

  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);
  const [mobileProgress, setMobileProgress] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. SECTION INTRO: Animate 02 / SELECTED WORK header with clip-path, translateY, opacity
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          {
            clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
            y: 40,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: headerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: 'power3.out',
          }
        );
      }

      const mm = gsap.matchMedia();

      // ==========================================
      // DESKTOP: Film-Scene Pinned Sequence (>= 1024px)
      // ==========================================
      mm.add('(min-width: 1024px)', () => {
        if (!desktopPinnedViewportRef.current) return;

        const slides = gsap.utils.toArray<HTMLElement>('.film-slide');
        const numSlides = slides.length;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: desktopPinnedViewportRef.current,
            start: 'top top',
            end: `+=${numSlides * 1000}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        slides.forEach((slide, i) => {
          if (i === 0) {
            const img = slide.querySelector('.slide-img');
            const title = slide.querySelector('.slide-title');
            tl.to(img, { scale: 1.08, ease: 'none' }, 0);
            tl.to(title, { y: -25, ease: 'none' }, 0);
          } else {
            const prevSlide = slides[i - 1];
            const startTime = i;

            tl.fromTo(
              slide,
              {
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
                opacity: 1,
              },
              {
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                opacity: 1,
                ease: 'power2.inOut',
                duration: 1,
              },
              startTime
            );

            tl.to(
              prevSlide,
              {
                scale: 0.94,
                opacity: 0.3,
                ease: 'power2.inOut',
                duration: 1,
              },
              startTime
            );

            const img = slide.querySelector('.slide-img');
            const title = slide.querySelector('.slide-title');
            tl.fromTo(
              img,
              { scale: 1 },
              { scale: 1.08, ease: 'none', duration: 1 },
              startTime + 0.2
            );
            tl.fromTo(
              title,
              { y: 15 },
              { y: -25, ease: 'none', duration: 1 },
              startTime + 0.2
            );
          }
        });

        // Desktop Horizontal Gallery
        if (horizontalSectionRef.current && horizontalTrackRef.current) {
          const trackWidth = horizontalTrackRef.current.scrollWidth;
          const scrollDistance = trackWidth - window.innerWidth;

          gsap.to(horizontalTrackRef.current, {
            x: -scrollDistance,
            ease: 'none',
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: 'top top',
              end: () => `+=${scrollDistance}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // ==========================================
      // MOBILE: Pinned Cinematic Project Sequence (< 1024px)
      // ==========================================
      mm.add('(max-width: 1023px)', () => {
        if (!mobilePinnedViewportRef.current) return;

        const scenes = gsap.utils.toArray<HTMLElement>('.mobile-scene');
        const total = scenes.length;

        // Calculate scroll distance based on project count and viewport
        const scrollDistance = total * window.innerHeight * 0.9;

        const mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: mobilePinnedViewportRef.current,
            start: 'top top',
            end: `+=${scrollDistance}`,
            pin: true,
            scrub: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const p = self.progress;
              setMobileProgress(p);
              const idx = Math.min(total - 1, Math.floor(p * total + 0.05));
              setMobileActiveIndex(idx);
            },
          },
        });

        scenes.forEach((scene, i) => {
          const img = scene.querySelector('.mobile-scene-img');
          const title = scene.querySelector('.mobile-scene-title');
          const number = scene.querySelector('.mobile-scene-number');

          if (i === 0) {
            // Scene 0: initial active state
            // While scrolling through scene 0:
            // IMAGE: scale 1 -> 1.08, y 0 -> -10px
            // TITLE: y 20px -> -20px, opacity 1 -> 0.4
            // NUMBER: subtle movement
            mobileTl.to(img, { scale: 1.08, y: -10, ease: 'none', duration: 1 }, 0);
            mobileTl.to(title, { y: -20, opacity: 0.4, ease: 'none', duration: 1 }, 0);
            mobileTl.to(number, { x: 8, ease: 'none', duration: 1 }, 0);
          } else {
            const prevScene = scenes[i - 1];
            const prevImg = prevScene.querySelector('.mobile-scene-img');
            const startTime = i;

            // Transition from previous scene into this scene:
            // Prev image: scale up, fade slightly, move upward
            mobileTl.to(
              prevScene,
              { opacity: 0, y: -40, ease: 'power2.inOut', duration: 1 },
              startTime
            );
            mobileTl.to(
              prevImg,
              { scale: 1.14, ease: 'power2.inOut', duration: 1 },
              startTime
            );

            // Current scene: starts slightly lower, opacity 0, clip-path hidden
            // Then: opacity 0 -> 1, y 60px -> 0, clip-path -> full
            mobileTl.fromTo(
              scene,
              {
                opacity: 0,
                y: 60,
                clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              },
              {
                opacity: 1,
                y: 0,
                clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
                ease: 'power2.inOut',
                duration: 1,
              },
              startTime
            );

            // Inside current scene: scrub animation
            mobileTl.fromTo(
              img,
              { scale: 1, y: 0 },
              { scale: 1.08, y: -10, ease: 'none', duration: 1 },
              startTime + 0.2
            );
            mobileTl.fromTo(
              title,
              { y: 20, opacity: 1 },
              { y: -20, opacity: 0.4, ease: 'none', duration: 1 },
              startTime + 0.2
            );
            mobileTl.fromTo(
              number,
              { x: 0 },
              { x: 8, ease: 'none', duration: 1 },
              startTime + 0.2
            );
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative w-full bg-[#050505] text-white">
      {/* ==========================================
          02 / SELECTED WORK Section Intro
         ========================================== */}
      <div ref={headerRef} className="mx-auto max-w-7xl px-6 md:px-12 pt-28 sm:pt-36 pb-10 sm:pb-12">
        <div className="flex items-center justify-between border-b border-white/[0.15] pb-5 mb-8">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white">
            02 / SELECTED WORK
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
            CINEMATIC ARCHIVE // 0{PROJECTS.length}
          </span>
        </div>

        <h2
          className="font-grotesk font-black uppercase tracking-tight text-white leading-none"
          style={{ fontSize: 'clamp(2.75rem, 8.5vw, 7.5rem)' }}
        >
          Selected Work
        </h2>
      </div>

      {/* ==========================================
          DESKTOP PINNED EXPERIENCE (>= 1024px)
         ========================================== */}
      <div className="hidden lg:block relative w-full">
        <div
          ref={desktopPinnedViewportRef}
          className="relative h-screen w-full overflow-hidden bg-[#050505]"
        >
          {PROJECTS.map((project, index) => (
            <div
              key={project.number}
              className={`film-slide absolute inset-0 h-full w-full flex items-center justify-center p-8 xl:p-14 ${
                index === 0 ? 'z-10' : `z-${10 + index}`
              }`}
              style={{
                zIndex: index + 10,
                backgroundColor: '#050505',
              }}
            >
              {/* Card Container */}
              <div
                data-cursor="view"
                className="relative h-[86vh] w-full max-w-7xl rounded-[24px] border border-white/[0.15] bg-[#09090b] p-8 xl:p-12 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 group"
              >
                {/* Top Row */}
                <div className="relative z-10 flex items-start justify-between gap-8 pb-6 border-b border-white/[0.15]">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="font-mono text-xs tracking-widest text-white/40">
                        {project.number} / 0{PROJECTS.length}
                      </span>
                      <span className="font-mono text-xs tracking-[0.2em] text-[#8A8A8A] uppercase">
                        {project.category}
                      </span>
                    </div>

                    <h3
                      className="slide-title font-grotesk font-black uppercase tracking-tight text-white transition-transform duration-300 group-hover:translate-x-3"
                      style={{ fontSize: 'clamp(2.2rem, 4.2vw, 4.2rem)' }}
                    >
                      {project.title}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-6 py-2.5 font-mono text-xs tracking-[0.2em] uppercase text-white transition-all duration-300 hover:bg-white hover:text-black hover:border-white"
                    >
                      <span>VIEW PROJECT</span>
                      <ArrowUpRight size={15} />
                    </a>

                    <div className="hidden xl:flex items-center gap-2 font-mono text-[10px] text-white/50 tracking-wider">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span key={tech} className="border border-white/10 px-2.5 py-0.5 rounded-full">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Media Showcase */}
                <div className="relative z-10 grid grid-cols-12 gap-5 flex-1 pt-6 min-h-0 items-stretch">
                  <div className="col-span-8 relative rounded-xl overflow-hidden border border-white/[0.1] bg-black/60">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="slide-img h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  <div className="col-span-4 flex flex-col gap-4 min-h-0">
                    {project.detailImages.map((imgSrc, imgIndex) => (
                      <div
                        key={imgIndex}
                        className="relative flex-1 rounded-xl overflow-hidden border border-white/[0.1] bg-black/60"
                      >
                        <img
                          src={imgSrc}
                          alt={`${project.title} detail ${imgIndex + 1}`}
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom line description */}
                <div className="pt-4 flex items-center justify-between text-xs font-mono text-[#8A8A8A] tracking-wider">
                  <p className="max-w-xl truncate">{project.description}</p>
                  <span>SCROLL FOR NEXT SCENE ↓</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ==========================================
          MOBILE PINNED CINEMATIC PROJECT SEQUENCE (< 1024px)
         ========================================== */}
      <div className="block lg:hidden relative w-full">
        <div
          ref={mobilePinnedViewportRef}
          className="relative h-screen w-full overflow-hidden bg-[#050505] flex flex-col justify-between"
        >
          {/* Subtle Mobile Progress Indicator at top */}
          <div className="relative z-30 px-6 pt-5 pb-2 flex items-center justify-between font-mono text-xs text-[#8A8A8A]">
            <div className="flex items-center gap-2">
              <span className="text-white font-bold tracking-widest">
                0{mobileActiveIndex + 1}
              </span>
              <span className="text-white/30">/</span>
              <span className="tracking-widest">0{PROJECTS.length}</span>
            </div>

            {/* Visual Progress Bar */}
            <div className="w-28 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-75"
                style={{ width: `${Math.max(15, mobileProgress * 100)}%` }}
              />
            </div>

            <span className="text-[10px] tracking-widest uppercase text-white/40">
              PINNED SCENE
            </span>
          </div>

          {/* Layered Project Scenes (Only one dominant, others transitioning) */}
          <div className="relative flex-1 w-full overflow-hidden">
            {PROJECTS.map((project, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={project.number}
                  className={`mobile-scene absolute inset-0 w-full h-full flex flex-col justify-between px-5 pb-6 will-change-transform ${
                    isFirst ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    zIndex: index + 10,
                  }}
                >
                  {/* Large Project Image (80-90% mobile viewport width, aspect approx 4/5) */}
                  <div className="relative w-full h-[46vh] sm:h-[50vh] rounded-2xl overflow-hidden border border-white/[0.18] bg-black/60 shadow-2xl my-auto">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mobile-scene-img h-full w-full object-cover will-change-transform"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Below the image: Project Info */}
                  <div className="flex flex-col gap-2 pt-3 border-t border-white/[0.1]">
                    <div className="flex items-center justify-between font-mono text-xs text-[#8A8A8A]">
                      <span className="mobile-scene-number font-bold text-white/50 tracking-wider">
                        {project.number} / 0{PROJECTS.length}
                      </span>
                      <span className="uppercase tracking-widest text-[11px] truncate max-w-[200px]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="mobile-scene-title font-grotesk font-black uppercase text-2xl sm:text-3xl text-white tracking-tight leading-tight will-change-transform">
                      {project.title}
                    </h3>

                    <p className="font-mono text-[11px] text-[#8A8A8A] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>

                    <div className="pt-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] py-3 font-mono text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors"
                      >
                        <span>VIEW PROJECT</span>
                        <ArrowUpRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom subtle scroll hint on mobile */}
          <div className="relative z-30 px-6 py-2 flex items-center justify-between font-mono text-[9px] text-[#8A8A8A] tracking-[0.2em] uppercase border-t border-white/[0.08]">
            <span>SCROLL TO ADVANCE</span>
            <span>SCENE {mobileActiveIndex + 1} OF {PROJECTS.length}</span>
          </div>
        </div>
      </div>

      {/* ==========================================
          03 / MORE WORK — HORIZONTAL PROJECT GALLERY
         ========================================== */}
      <div ref={horizontalSectionRef} className="relative w-full overflow-hidden border-t border-white/[0.15] bg-[#050505] py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12 mb-10">
          <div className="flex items-center justify-between border-b border-white/[0.15] pb-5 mb-8">
            <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white">
              03 / MORE WORK
            </span>
            <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
              GALLERY ARCHIVE
            </span>
          </div>
          <h3
            className="font-grotesk font-black uppercase tracking-tight text-white leading-none"
            style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)' }}
          >
            Project Archive
          </h3>
        </div>

        {/* Gallery Track (desktop pinned, mobile touch-scrollable) */}
        <div
          ref={horizontalTrackRef}
          className="flex gap-6 sm:gap-8 px-6 md:px-12 overflow-x-auto lg:overflow-visible scrollbar-none snap-x snap-mandatory will-change-transform pb-6"
        >
          {PROJECTS.map((project) => (
            <div
              key={project.number}
              data-cursor="view"
              className="shrink-0 snap-center w-[84vw] sm:w-[480px] md:w-[580px] rounded-2xl border border-white/[0.15] bg-[#09090b] p-5 sm:p-6 flex flex-col justify-between gap-5 group"
            >
              <div className="flex items-center justify-between font-mono text-xs text-[#8A8A8A]">
                <span>{project.number}</span>
                <span className="uppercase">{project.category}</span>
              </div>

              <div className="relative h-56 sm:h-72 w-full overflow-hidden rounded-xl border border-white/[0.1]">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <h4 className="font-grotesk font-black uppercase text-xl sm:text-2xl text-white group-hover:translate-x-2 transition-transform">
                  {project.title}
                </h4>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-mono text-xs tracking-wider uppercase text-white/70 hover:text-white"
                >
                  <span>VIEW</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
