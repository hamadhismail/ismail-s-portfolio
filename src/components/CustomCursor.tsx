import { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const currentPos = useRef({ x: -100, y: -100 });
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    setIsDesktop(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaChange);

    const onMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="view"]');
      if (projectEl) {
        setIsHoveringProject(true);
        setCursorText('VIEW →');
      } else {
        setIsHoveringProject(false);
        setCursorText('');
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let animationFrameId: number;
    const render = () => {
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.18;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.18;
      setPos({ x: currentPos.current.x, y: currentPos.current.y });
      animationFrameId = requestAnimationFrame(render);
    };
    animationFrameId = requestAnimationFrame(render);

    return () => {
      mediaQuery.removeEventListener('change', handleMediaChange);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [visible]);

  if (!isDesktop || !visible) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-[9999] -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <div
        className={`flex items-center justify-center rounded-full transition-all duration-200 ease-out ${
          isHoveringProject
            ? 'h-20 w-20 bg-white text-black font-semibold text-[11px] tracking-wider shadow-2xl'
            : 'h-2.5 w-2.5 bg-white'
        }`}
      >
        {isHoveringProject && <span className="font-mono">{cursorText}</span>}
      </div>
    </div>
  );
};

export default CustomCursor;
