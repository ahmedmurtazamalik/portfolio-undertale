import React, { useState } from 'react';

interface SideNavProps {
  activeSection: number;
  onNavClick: (index: number) => void;
}

export const SideNav: React.FC<SideNavProps> = ({ activeSection, onNavClick }) => {
  const sections = ['Home', 'About', 'Projects', 'Skills', 'Contact'];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-6 md:flex md:flex-col max-md:top-auto max-md:bottom-6 max-md:left-1/2 max-md:-translate-x-1/2 max-md:translate-y-0 max-md:flex-row max-md:justify-center">
      {sections.map((name, index) => {
        const isActive = activeSection === index;
        return (
          <div
            key={name}
            className="relative flex items-center justify-center"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Tooltip (Mini Dialogue Box) - Desktop Only */}
            <div
              className={`absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none transition-all duration-200 hidden md:block ${
                hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
              }`}
            >
              <div className="bg-black border-2 border-white text-white py-1.5 px-3 font-press text-[9px] whitespace-nowrap leading-none shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                * {name}
              </div>
            </div>

            {/* Heart Button */}
            <button
              onClick={() => onNavClick(index)}
              className="w-6 h-6 flex items-center justify-center bg-transparent border-none outline-none focus:outline-none cursor-none relative transition-transform active:scale-90"
              aria-label={`Navigate to ${name}`}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 9 9"
                className="pixelated w-full h-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isActive ? (
                  /* Filled Red Heart */
                  <path
                    d="M1 1h2v1H1zm5 0h2v1H6zM0 2h4v1H0zm5 0h4v1H5zM0 3h9v1H0zm1 4h7v-3H1zm1 1h5v-1H2zm1 1h3v-1H3zm1 1h1v-1H4z"
                    fill="#ff0000"
                  />
                ) : (
                  /* Outline Gray Heart */
                  <path
                    d="M1 1h2v1H1zm5 0h2v1H6zM0 2h1v1H0zm3 0h1v1H3zm2 0h1v1H5zM8 2h1v1H8zM0 3h1v1H0zM8 3h1v1H8zM1 4h1v1H1zM7 4h1v1H7zM2 5h1v1H2zM6 5h1v1H6zM3 6h1v1H3zM5 6h1v1H5zM4 7h1v1H4z"
                    fill="#666666"
                  />
                )}
              </svg>
            </button>
          </div>
        );
      })}
    </nav>
  );
};
