import React, { useState, useEffect, useRef } from 'react';
import { DialogueBox } from './DialogueBox';

interface SnowdinAboutProps {
  isActive: boolean;
}

export const SnowdinAbout: React.FC<SnowdinAboutProps> = ({ isActive }) => {
  const [showDogText, setShowDogText] = useState(false);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Gentle Mouse Parallax Effect for Snowdin Forest layers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      setMouseOffset({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const bioLines = [
    "I am a passionate CS graduate based in Islamabad, with a strong foundation and knowledge of Generative AI, Deep Learning, and High-Performance Computing. I specialize in AI development and full-stack applications, and have dabbled in indie game development on GameMaker and RPGMaker. My professional career is driven by a desire to architect robust software and intelligent, scalable systems that solve cool problems I am passionate about :)",
    "Most recently, I worked as an AI Intern at Automotive Artificial Intelligence GmbH, where I worked on pipelines that handled geospatial data for HD Lane-Level Mapping tailored for autonomous vehicle navigation.",
    "Beyond the profession, I enjoy film, sports and many other media, and I am an avid narrative writer. If you see me, chances are there's a story in my head :D"
  ];

  const items = [
    "CS GRADUATE",
    "GENERATIVE AI",
    "DEEP LEARNING",
    "HPC ENTHUSIAST",
    "INDIE DEV",
    "WRITER"
  ];

  return (
    <section 
      ref={containerRef}
      className="scroll-section w-full h-screen bg-[#0a1628] text-[#e8f0f5] flex flex-col justify-between p-12 max-md:p-6 overflow-hidden relative"
    >
      {/* BACKGROUND forest layers (Parallax) */}
      
      {/* 1. Deep background trees (slowest movement) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -8}px, ${mouseOffset.y * -4}px, 0)`,
          opacity: 0.15,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <pattern id="far-trees" width="160" height="320" patternUnits="userSpaceOnUse">
            {/* Outline silhouetted trees */}
            <path d="M20 280 L40 200 L60 280 Z M50 290 L70 210 L90 290 Z M100 270 L120 180 L140 270 Z" fill="#4a7fb5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#far-trees)" />
        </svg>
      </div>

      {/* 2. Mid background trees + Glowing cabin */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -16}px, ${mouseOffset.y * -8}px, 0)`,
          opacity: 0.35,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Tiled pine trees */}
          <pattern id="mid-trees" width="200" height="400" patternUnits="userSpaceOnUse">
            <path d="M30 350 L50 250 L70 350 Z M80 370 L110 230 L140 370 Z M150 340 L170 260 L190 340 Z" fill="#25426b" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#mid-trees)" />
          
          {/* Pixel Cabin shape (Absolute in space) */}
          <g transform="translate(680, 240)" className="pixelated">
            {/* Roof */}
            <path d="M0 40 L40 0 L80 40 Z" fill="#15263d" stroke="#4a7fb5" strokeWidth="2" />
            {/* Body */}
            <rect x="10" y="40" width="60" height="40" fill="#0d1c30" stroke="#4a7fb5" strokeWidth="2" />
            {/* Glowing Lantern window */}
            <rect x="32" y="50" width="16" height="16" fill="#d4a853" className="animate-pulse" />
            <rect x="36" y="54" width="8" height="8" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* 3. Foreground Snow ground (fastest movement) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-40 z-10 pointer-events-none select-none transition-transform duration-300 ease-out"
        style={{
          transform: `translate3d(${mouseOffset.x * -24}px, 0, 0)`,
        }}
      >
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          {/* Curved snow landscape */}
          <path d="M0 40 Q25% 10 50% 30 T100% 20 L100% 160 L0 160 Z" fill="#e8f0f5" />
          <path d="M0 60 Q30% 35 60% 50 T100% 40 L100% 160 L0 160 Z" fill="#d8e5ee" />
        </svg>
      </div>

      {/* EASTER EGG: Tiny hidden pixel dog winking/bobbing behind a tree */}
      <div 
        className="absolute bottom-32 left-[15%] z-20 pointer-events-auto cursor-none group"
        onMouseEnter={() => setShowDogText(true)}
        onMouseLeave={() => setShowDogText(false)}
      >
        {/* Pine Tree hiding the dog */}
        <svg width="48" height="96" viewBox="0 0 12 24" className="pixelated absolute bottom-0 left-0 w-16 h-32 drop-shadow-md fill-[#182d47]">
          <path d="M6 0 L12 12 H9 L12 18 H9 L12 24 H0 L3 18 H0 L3 12 H0 Z" />
        </svg>

        {/* 8x6 Pixel Dog hiding behind the tree */}
        <div className="absolute left-10 bottom-2 w-8 h-6 transition-all duration-300 group-hover:-translate-x-1 group-hover:rotate-6">
          <svg viewBox="0 0 8 6" className="pixelated w-full h-full fill-white">
            <path d="M1 2h1v1H1zm5 0h1v1H6zm-5 1h5v1H1zm-1 1h6v1H0zm0 1h2v1H0zm3 0h2v1H3z" />
          </svg>
        </div>

        {/* Dog Dialogue Popup (INCREASED size to 12px) */}
        <div 
          className={`absolute bottom-20 left-6 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_10px_rgba(0,0,0,0.6)] transition-all duration-200 pointer-events-none z-30 ${
            showDogText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          * A small white dog is fast asleep behind the pine tree.<br />* It wiggles its tail.
        </div>
      </div>

      {/* HEADER: Literal Section label floated left */}
      <div className="z-10 select-none flex justify-between items-center w-full">
        <span className="font-press text-[16px] md:text-[18px] text-[#4a7fb5] uppercase tracking-wider">
          About
        </span>
        <span className="font-press text-[11px] md:text-[12px] text-[#4a7fb5]/60 max-md:hidden select-none">
          AREA 2: SNOWDEN
        </span>
      </div>

      {/* CORE CONTENT LAYOUT */}
      <div className="z-10 flex flex-col md:flex-row items-center justify-center gap-12 mt-auto mb-auto w-full max-w-6xl mx-auto px-4">
        
        {/* Left Side: Dialogue Box (Wider battle design) */}
        <div className="flex-1 w-full max-w-4xl">
          <DialogueBox 
            lines={bioLines}
            isActive={isActive}
            speed={4}
            className="shadow-[0_8px_0_#000] min-h-[225px] border-[3px] border-[#e8f0f5]"
          />
        </div>

        {/* Right Side: Adventurer Sprite & Inventory Tag chips */}
        <div className="flex flex-col items-center gap-8 shrink-0">
          
          {/* Custom Pixel Art Avatar generated for Murtaza */}
          <div className="w-32 h-40 flex items-center justify-center bg-[#0d1f36]/40 border-3 border-[#4a7fb5] p-3 shadow-[0_5px_0_#000] overflow-hidden">
            <img 
              src="/src/assets/murtaza_pixel_avatar.png"
              alt="Murtaza Pixel Avatar"
              className="pixelated w-full h-full object-contain adventurer-bob"
            />
          </div>

          {/* Tag Chips Styled as Inventory Items */}
          <div className="flex flex-wrap justify-center gap-2.5 max-w-[320px]">
            {items.map((item) => (
              <div 
                key={item}
                className="bg-black border border-white px-3 py-1.5 flex items-center gap-2 shadow-[2.5px_2.5px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] transition-colors group/tag cursor-none"
              >
                {/* Yellow star indicator for inventory item active selection */}
                <div className="w-2 h-2 shrink-0 bg-transparent flex items-center">
                  <svg viewBox="0 0 7 7" className="pixelated w-full h-full fill-[#d4a853] group-hover/tag:fill-[#ffff00] transition-colors">
                    <path d="M3 0h1v1H3zm-1 1h3v1H2zm-1 1h5v1H1zm-1 1h7v1H0zm1 1h5v1H1zm2 1h3v1H2zm1 1h1v-1H3z" />
                  </svg>
                </div>
                <span className="font-press text-[9px] text-[#e8f0f5] group-hover/tag:text-[#ffff00] whitespace-nowrap transition-colors">
                  {item}
                </span>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* FOOTER: spacing */}
      <div className="z-10 h-4 pointer-events-none select-none" />

    </section>
  );
};
