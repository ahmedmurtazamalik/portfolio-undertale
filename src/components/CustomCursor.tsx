import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mediaQuery.matches) return;

    // Enable custom cursor styles globally on html element
    document.documentElement.classList.add('custom-cursor-enabled');

    const handleMouseMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        // Center the 20x20 cursor (offset by 10px)
        cursorRef.current.style.transform = `translate3d(${e.clientX - 10}px, ${e.clientY - 10}px, 0)`;
      }
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('custom-cursor-enabled');
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [visible]);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-5 h-5 pointer-events-none z-[9999] transition-opacity duration-150 hidden md:block ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 9 9"
        className="pixelated w-full h-full drop-shadow-[0_2px_4px_rgba(255,0,0,0.5)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Pixel-perfect red heart path */}
        <path
          d="M1 1h2v1H1zm5 0h2v1H6zM0 2h4v1H0zm5 0h4v1H5zM0 3h9v1H0zm1 4h7v-3H1zm1 1h5v-1H2zm1 1h3v-1H3zm1 1h1v-1H4z"
          fill="#ff0000"
        />
      </svg>
    </div>
  );
};
