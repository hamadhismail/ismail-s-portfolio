import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCategory {
  number: string;
  category: string;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    number: '01',
    category: 'LANGUAGES',
    description: 'Core programming and scripting languages for systems, logic, and data.',
    skills: ['Python', 'JavaScript (ES6+)', 'TypeScript', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    number: '02',
    category: 'FRAMEWORKS & LIBRARIES',
    description: 'Modern front-end engineering, motion systems, and data processing.',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Pandas', 'NumPy'],
  },
  {
    number: '03',
    category: 'AI & GENAI INTEGRATION',
    description: 'Wiring large language models and intelligent automation into production.',
    skills: ['Gemini API', 'Claude API', 'OpenAI', 'Prompt Engineering', 'LLM Automation', 'RAG Flows'],
  },
  {
    number: '04',
    category: 'TOOLS & PLATFORMS',
    description: 'Design tooling, cloud infrastructure, and version-controlled developer operations.',
    skills: ['Figma', 'Vercel', 'Git', 'GitHub', 'Power BI', 'Canva', 'VS Code', 'Excel'],
  },
  {
    number: '05',
    category: 'CORE SERVICES',
    description: 'End-to-end digital craft from interface architecture to full-stack execution.',
    skills: ['UI/UX Design', 'Front-End Development', 'GenAI Integration', 'Data Visualization', 'Product Prototyping'],
  },
];

const CapabilitiesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!rowsRef.current) return;

      const rows = gsap.utils.toArray<HTMLElement>('.skill-category-row');
      rows.forEach((row) => {
        gsap.fromTo(
          row,
          { opacity: 0, y: 35 },
          {
            scrollTrigger: {
              trigger: row,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          }
        );

        // Animate line divider
        const line = row.querySelector('.category-divider');
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0, transformOrigin: 'left' },
            {
              scrollTrigger: {
                trigger: row,
                start: 'top 85%',
                toggleActions: 'play none none none',
              },
              scaleX: 1,
              duration: 1.1,
              ease: 'power2.out',
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="capabilities"
      className="relative min-h-screen w-full bg-[#050505] text-white px-6 md:px-12 py-28 sm:py-36 md:py-44 border-t border-white/[0.15]"
    >
      <div className="mx-auto max-w-7xl w-full">
        {/* Section Header: 04 / CAPABILITIES */}
        <div className="flex items-center justify-between border-b border-white/[0.15] pb-5 mb-14 md:mb-20">
          <span className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-white">
            04 / CAPABILITIES
          </span>
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#8A8A8A] uppercase">
            TECHNICAL ARSENAL // {SKILL_CATEGORIES.length} DOMAINS
          </span>
        </div>

        {/* Section Title */}
        <div className="mb-16 md:mb-24">
          <h2
            className="font-grotesk font-black uppercase tracking-tight text-white leading-none mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)' }}
          >
            Skills & Expertise
          </h2>
          <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-[#8A8A8A] uppercase max-w-xl">
            Technologies, frameworks, and specialized toolsets I leverage to engineer high-performance web products.
          </p>
        </div>

        {/* Categories List */}
        <div ref={rowsRef} className="flex flex-col gap-10 sm:gap-14">
          {SKILL_CATEGORIES.map((cat) => (
            <div
              key={cat.number}
              className="skill-category-row group flex flex-col gap-6"
            >
              {/* Category Header Row */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-baseline">
                {/* Index & Category Name */}
                <div className="lg:col-span-6 flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono text-xs sm:text-sm text-white/40 tracking-widest">
                    {cat.number}
                  </span>
                  <h3
                    className="font-grotesk font-black uppercase tracking-tight text-white group-hover:translate-x-2 transition-transform duration-300"
                    style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.75rem)' }}
                  >
                    {cat.category}
                  </h3>
                </div>

                {/* Category Description */}
                <div className="lg:col-span-6">
                  <p className="font-mono text-xs sm:text-sm text-[#8A8A8A] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>

              {/* Skill Pill Tags */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pl-0 sm:pl-10">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-xs sm:text-sm text-white/90 border border-white/20 bg-white/[0.04] px-4 py-2 rounded-full tracking-wider transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Line Divider */}
              <div className="category-divider h-[1px] w-full bg-white/[0.1] mt-4" />
            </div>
          ))}
        </div>

        {/* Bottom Index */}
        <div className="pt-16 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#8A8A8A] border-t border-white/[0.15]">
          <span>VERIFIED SKILLSET</span>
          <span>AVAILABLE FOR FULL-TIME & CONTRACT ROLES</span>
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
