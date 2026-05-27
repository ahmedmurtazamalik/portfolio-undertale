import React, { useState, useEffect } from 'react';
import { DialogueBox } from './DialogueBox';

interface RuinsHeroProps {
  isActive: boolean;
}

const DIALOGUE_POOLS = [
  [
    "* Golden flowers line the corridor.",
    "* The sweet smell of butterscotch fills the air.",
    "* You feel a strange sense of comfort."
  ],
  [
    "* Shadowy arches crumble in silence.",
    "* The ancient stones carry old memories.",
    "* Determination whispers in your ear."
  ],
  [
    "* A small mouse runs into a crack in the wall.",
    "* It seems determined to find the cheese.",
    "* You smile warmly."
  ],
  [
    "* The autumn leaves crunch under your feet.",
    "* Red and gold carpet the dark brick floor.",
    "* You feel a quiet peace."
  ],
  [
    "* You hear a faint echo of laughter down the hall.",
    "* Home is just around the corner.",
    "* You are filled with determination."
  ],
  [
    "* A warm draft carries the scent of cinnamon.",
    "* The shadows dance gently along the pillars.",
    "* There is nothing to fear here."
  ]
];

export const RuinsHero: React.FC<RuinsHeroProps> = ({ isActive }) => {
  const [showSecret, setShowSecret] = useState(false);
  const [currentPool, setCurrentPool] = useState(DIALOGUE_POOLS[0]);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    if (!isActive) {
      // Reset to first pool when exiting section
      setCurrentPool(DIALOGUE_POOLS[0]);
      setCycleKey(0);
      return;
    }

    const interval = setInterval(() => {
      // Pick a random pool different from the current one
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * DIALOGUE_POOLS.length);
      } while (DIALOGUE_POOLS[nextIndex] === currentPool);

      setCurrentPool(DIALOGUE_POOLS[nextIndex]);
      setCycleKey((prev) => prev + 1);
    }, 6500); // Cycles every 6.5 seconds

    return () => clearInterval(interval);
  }, [isActive, currentPool]);

  return (
    <section className="scroll-section w-full h-screen bg-[#1a0a0a] text-[#f0e6d3] flex flex-col justify-between p-12 max-md:p-6 overflow-hidden relative">

      {/* BACKGROUND: Tiled ancient ruins and walls in SVG */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-40">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Grid of crumbling bricks */}
          <defs>
            <pattern id="brick-pattern" width="80" height="40" patternUnits="userSpaceOnUse">
              <rect width="80" height="40" fill="#150808" stroke="#3d1515" strokeWidth="2" />
              <line x1="40" y1="0" x2="40" y2="20" stroke="#3d1515" strokeWidth="2" />
              <line x1="0" y1="20" x2="0" y2="40" stroke="#3d1515" strokeWidth="2" />
              <line x1="80" y1="20" x2="80" y2="40" stroke="#3d1515" strokeWidth="2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#brick-pattern)" />

          {/* Random stone debris drawn using SVG rects */}
          <rect x="15%" y="70%" width="32" height="16" fill="#301010" />
          <rect x="75%" y="60%" width="48" height="24" fill="#301010" />
          <rect x="78%" y="58%" width="16" height="8" fill="#502020" />
        </svg>
      </div>

      {/* AMBIENT LIGHT BEAM: Pulses slowly in the center */}
      <div className="absolute inset-0 z-0 flex justify-center pointer-events-none select-none">
        <div
          className="w-[350px] md:w-[900px] h-full bg-gradient-to-b from-[#d4956a]/32 via-[#d4956a]/16 to-transparent ruins-light-beam"
          style={{
            clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
          }}
        />
      </div>

      {/* SECRET HOVER TILE (Ruins cracked floor tile) */}
      <div
        className="absolute bottom-[22%] left-[25%] z-20 group pointer-events-auto"
        onMouseEnter={() => setShowSecret(true)}
        onMouseLeave={() => setShowSecret(false)}
      >
        {/* The Cracked Tile Shape */}
        <div className="w-12 h-12 border-2 border-[#8b3a3a]/40 bg-[#250d0d] flex items-center justify-center cursor-none transition-colors group-hover:border-[#d4956a] group-hover:bg-[#3d1515] active:scale-95 duration-200">
          <svg width="24" height="24" viewBox="0 0 10 10" className="pixelated w-8 h-8 fill-none stroke-[#8b3a3a] group-hover:stroke-[#d4956a] stroke-1">
            {/* Cracks in tile */}
            <path d="M1 2h2v1H1zm2 1h1v2H3zm1 2h2v1H4zm2-1h1v-2H6zm1-2h2v1H7z" />
          </svg>
        </div>

        {/* Hidden Detail Floating dialogue box (INCREASED size to 12px) */}
        <div
          className={`absolute bottom-16 left-1/2 -translate-x-1/2 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-all duration-300 pointer-events-none z-30 ${showSecret ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
          * Cracks in the floor. Cracks in the ceiling.<br />* The golden flowers bloom anyway.
        </div>
      </div>

      {/* HEADER: Section indicator / spacing */}
      <div className="z-10 select-none w-full flex justify-between items-center">
        <div className="font-press text-[16px] md:text-[18px] text-[#8b3a3a] tracking-widest uppercase">
          AREA 1: RUINS
        </div>
        <span className="font-press text-[11px] md:text-[12px] text-[#8b3a3a]/60 max-md:hidden select-none">
          LV 22 DETERMINED
        </span>
      </div>

      {/* CENTER CONTENT */}
      <div className="z-10 flex flex-col items-center justify-center text-center gap-8 mt-auto mb-auto w-full max-w-4xl">
        <h1 className="font-press text-[36px] md:text-[54px] leading-tight tracking-wider text-white m-0 drop-shadow-[0_5px_0_#000] select-none">
          Ahmed Murtaza Malik
        </h1>
        <p className="font-press text-[14px] md:text-[19px] text-[#d4956a] m-0 tracking-wide drop-shadow-[0_2.5px_0_#000] select-none">
          CS Graduate. Builder of things.
        </p>

        {/* Reusable Typewriter Dialogue Box */}
        <div className="w-full max-w-2xl mt-8 px-4">
          <DialogueBox
            key={cycleKey}
            lines={currentPool}
            isActive={isActive}
            className="shadow-[0_8px_0_#000] min-h-[110px]"
          />
        </div>
      </div>

      {/* BOTTOM FOOTER: Bouncing Scroll indicator */}
      <div className="z-10 flex flex-col items-center select-none pb-4">
        <div className="bounce-arrow flex flex-col items-center">
          <span className="font-press text-[8px] text-[#8b3a3a] tracking-widest uppercase mb-1.5">
            Scroll Down
          </span>
          <svg
            width="20"
            height="12"
            viewBox="0 0 5 3"
            className="pixelated w-6 h-4 fill-[#8b3a3a]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 0h5v1H0zm1 1h3v1H1zm2 1h1v1H3zm-1 0h1v1H2z" />
          </svg>
        </div>
      </div>

    </section>
  );
};
