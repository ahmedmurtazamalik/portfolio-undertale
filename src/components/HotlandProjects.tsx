import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HotlandProjectsProps {
  isActive: boolean;
}

interface ProjectItem {
  id: string;
  name: string;
  desc: string;
  tech: string[];
  flavorText: string;
  iconPath: string; // SVG path inside a 10x10 grid
  github: string;
}

export const HotlandProjects: React.FC<HotlandProjectsProps> = ({ isActive }) => {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [showHotdogText, setShowHotdogText] = useState(false);

  useEffect(() => {
    if (!cardsRef.current) return;

    // Clear any previous inline styles
    const cards = cardsRef.current.children;
    gsap.killTweensOf(cards);

    if (isActive) {
      // Stagger fade-in using GSAP
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power2.out',
          overwrite: 'auto'
        }
      );
    } else {
      // Reset cards opacity/y when leaving
      gsap.set(cards, { opacity: 0, y: 30 });
    }
  }, [isActive]);

  const projects: ProjectItem[] = [
    {
      id: 'suraiyya',
      name: 'Suraiyya',
      desc: 'MERN-stack focus web app for neurodivergent adults, featuring mood-adaptive AI chatbots, user sentiment analysis, real-time WebRTC body doubling, and gamified task tracking.',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'WebSockets', 'WebRTC'],
      flavorText: '* "An assistive companion. Focus and productivity increase by 25."',
      github: 'https://github.com/ahmedmurtazamalik/surraiya',
      // Pixel heart/brain icon
      iconPath: 'M3 1h2v1H3zm4 0h2v1H7zM2 2h8v1H2zM1 3h10v1H1zM1 4h10v1H1zM2 5h8v1H2zm1 1h6v1H3zm2 1h2v1H5z'
    },
    {
      id: 'scholar-sense',
      name: 'Scholar Sense',
      desc: 'AI research platform engineered to automate Systematic Literature Reviews. Enables researchers to analyze large corpora, perform document queries, and construct semantic summaries.',
      tech: ['PyTorch', 'FastAPI', 'React', 'Transformers', 'Python'],
      flavorText: '* "An ancient scroll of knowledge. Increases INT by 15."',
      github: 'https://github.com/ahmedmurtazamalik/scholarsense',
      // Pixel book icon
      iconPath: 'M2 1h7v1H2zm0 1h1v6H2zm1 0h6v1H3zm0 5h6v1H3zm6-5h1v6H9zM3 3h4v1H3zm0 2h4v1H3z'
    },
    {
      id: 'multimodal-rag',
      name: 'Multimodal RAG System',
      desc: 'High-performance retrieval system incorporating image and text embeddings to support semantic product catalog discovery and real-time vector similarity searches.',
      tech: ['Python', 'CLIP', 'ChromaDB', 'PyTorch', 'Transformers'],
      flavorText: '* "Lens of ultimate clarity. Accuracy and scanning stats rise by 12."',
      github: 'https://github.com/ahmedmurtazamalik/multimodal-rag-system',
      // Pixel magnifying glass
      iconPath: 'M2 1h5v1H2zm-1 1h1v4H1zm5 0h1v4H5zm-4 4h5v1H1zm6 0h1v1H7zm1 1h1v1H8zm1 1h1v1H9z'
    },
    {
      id: 'compiler',
      name: 'Zeta Compiler',
      desc: 'A custom, strongly-typed programming language compiler and interpreter from scratch, including a custom lexer, AST parser, scope symbol tables, and regex matching engine.',
      tech: ['C++', 'Java', 'Compiler Theory', 'AST Parsing'],
      flavorText: '* "A logic machine. Program syntax error rates drop by 30%."',
      github: 'https://github.com/ahmedmurtazamalik/zeta-compiler',
      // Pixel terminal gear icon
      iconPath: 'M4 1h2v1H4zm3 1h1v1H7zm-5 0h1v1H2zm-1 2h8v2H1zm1 3h1v1H2zm5 0h1v1H7zm-3 1h2v1H4z'
    },
    {
      id: 'butterfly',
      name: 'Butterfly Algorithms',
      desc: 'A high performance C++ implementation of parallel butterfly counting algorithms for bipartite graphs, utilizing OpenMP and MPI to optimize computational efficiency and scalability.',
      tech: ['C++', 'MPI', 'OpenMP', 'Python'],
      flavorText: '* "A butterfly parallelization engine. Algorithm efficiency increases 40%."',
      github: 'https://github.com/ahmedmurtazamalik/butterfly-parallelization',
      // Pixel butterfly shape
      iconPath: 'M1 1h2v1H1zm5 0h2v1H6zm-1 1h1v1H5zm-5 1h1v1H0zm8 0h1v1H8zm-7 1h2v1H1zm5 0h2v1H5zm-4 1h4v1H2zm-1 1h6v1H1z'
    },
    {
      id: 'cyclegan',
      name: 'CycleGAN Face Sketches',
      desc: 'Generative adversarial network trained to perform unpaired image-to-image translation between real facial photographs and artist hand-drawn sketches, preserving facial geometry.',
      tech: ['PyTorch', 'GANs', 'Computer Vision', 'OpenCV'],
      flavorText: '* "An adversarial brush. Generative sketch accuracy increases by 25."',
      github: 'https://github.com/ahmedmurtazamalik/cyclegan-face-sketch',
      // Pixel face mask shape
      iconPath: 'M2 1h6v1H2zm-1 1h8v1H1zm0 1h8v1H1zm0 1h8v1H1zm1 1h6v1H2zm1 1h4v1H3zm1 1h2v1H4z'
    }
  ];

  return (
    <section className="scroll-section w-full h-screen bg-[#1a0800] text-[#f5e0c8] flex flex-col justify-between p-12 max-md:p-6 max-sm:p-4 overflow-hidden relative">

      {/* BACKGROUND: Hotland girders and machinery silhouettes */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Tiled industrial trusses */}
          <pattern id="girders" width="120" height="240" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="120" y2="240" stroke="#c44b1e" strokeWidth="2" />
            <line x1="120" y1="0" x2="0" y2="240" stroke="#c44b1e" strokeWidth="2" />
            <line x1="0" y1="0" x2="120" y2="0" stroke="#c44b1e" strokeWidth="4" />
            <line x1="0" y1="120" x2="120" y2="120" stroke="#c44b1e" strokeWidth="2" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#girders)" />

          {/* Silhouetted lab capsules */}
          <rect x="80%" y="30%" width="40" height="120" rx="20" fill="#2a1a0a" stroke="#c44b1e" strokeWidth="2" />
          <rect x="10%" y="40%" width="30" height="90" rx="15" fill="#2a1a0a" stroke="#c44b1e" strokeWidth="2" />
        </svg>
      </div>

      {/* CORE INDUSTRIAL PLATFORMS */}
      <div className="absolute inset-x-0 top-[20%] bottom-[15%] z-0 pointer-events-none select-none border-y border-[#502010]/30 bg-[#2a1a0a]/10" />

      {/* PULSING LAVA FLOOR: Glow pulses at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-12 z-10 pointer-events-none select-none lava-pulse" />

      {/* EASTER EGG: Steaming hot dog cooked by ambient heat */}
      <div
        className="absolute bottom-[16%] right-[12%] z-20 pointer-events-auto cursor-none group"
        onMouseEnter={() => setShowHotdogText(true)}
        onMouseLeave={() => setShowHotdogText(false)}
      >
        {/* Metal Plate and Hot Dog SVG */}
        <div className="w-12 h-8 relative flex items-center justify-center transition-transform group-hover:scale-110 active:scale-95 duration-200">
          <svg viewBox="0 0 12 8" className="pixelated w-full h-full">
            {/* Metal plate */}
            <ellipse cx="6" cy="6" rx="5" ry="1.5" fill="#555" stroke="#aaa" strokeWidth="0.8" />
            {/* Bun */}
            <path d="M2 3h8v3H2z" fill="#d4956a" />
            {/* Sausage */}
            <path d="M1 4h10v1H1z" fill="#b03030" />
            {/* Mustard line */}
            <path d="M4 4h1v1H4zm3 0h1v1H7z" fill="#ffff00" />
          </svg>
          {/* steam particles */}
          <div className="absolute -top-2 w-4 h-4 bg-transparent animate-pulse opacity-60">
            <svg viewBox="0 0 4 4" className="pixelated fill-white">
              <path d="M1 0h1v1H1zm1 1h1v1H2zm-1 2h1v1H1z" />
            </svg>
          </div>
        </div>

        {/* Hotdog Dialogue Popup (INCREASED size to 12px) */}
        <div
          className={`absolute bottom-12 right-0 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-all duration-200 pointer-events-none z-30 ${showHotdogText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
        >
          * A hot dog sits on a warm metal plate.<br />* It is cooked by the ambient heat of the room.<br />* It fills you with determination.
        </div>
      </div>

      {/* HEADER: Standard Label */}
      <div className="z-10 select-none flex justify-between items-center w-full">
        <span className="font-press text-[16px] md:text-[18px] text-[#e8721a] uppercase tracking-wider">
          Projects
        </span>
        <span className="font-press text-[11px] md:text-[12px] text-[#e8721a]/60 max-md:hidden select-none">
          AREA 3: HOTLAND
        </span>
      </div>

      {/* CORE CARD GRID CONTAINER */}
      <div className="z-10 flex-1 flex flex-col justify-center w-full max-w-6xl mx-auto my-1.5 overflow-hidden pr-1">

        <div
          ref={cardsRef}
          className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-4 max-sm:gap-3 w-full max-h-[52vh] sm:max-h-[65vh] md:max-h-[75vh] lg:max-h-none overflow-y-auto no-scrollbar p-1.5"
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-[#0f0502] border-[3px] border-[#c44b1e] p-3.5 md:p-5 shadow-[4px_4px_0_#000] flex flex-col justify-between gap-3 md:gap-4 transition-all hover:border-[#e8721a] hover:bg-[#1a0800] duration-200"
            >
              <div>
                {/* Card Title & Icon */}
                <div className="flex items-center gap-3">
                  {/* Custom Pixel Icon */}
                  <div className="w-8 h-8 shrink-0 bg-transparent flex items-center justify-center">
                    <svg viewBox="0 0 10 10" className="pixelated w-full h-full fill-[#e8721a]">
                      <path d={proj.iconPath} />
                    </svg>
                  </div>

                  <h3 className="font-press text-[12px] text-white m-0 tracking-wide">
                    {proj.name}
                  </h3>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="text-[8px] font-mono border border-[#502010] bg-[#1a0a05] px-1.5 py-0.5 text-[#f5e0c8]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Project Description */}
                <p className="font-sans text-[11.5px] text-[#f5e0c8]/85 mt-3 leading-relaxed">
                  {proj.desc}
                </p>
              </div>

              {/* Action Button & Flavor Text */}
              <div className="flex flex-col gap-2 mt-2">
                {/* Examine Button */}
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex justify-center items-center bg-black border-2 border-white text-white py-1.5 px-3 font-press text-[9px] tracking-wider uppercase select-none transition-colors hover:bg-white hover:text-black cursor-none"
                >
                  * Examine
                </a>

                {/* Flavor Text / Stats Line */}
                <span className="font-press text-[8px] text-[#c44b1e] italic mt-1 select-none">
                  {proj.flavorText}
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* View Writing Portfolio button */}
      <div className="z-10 flex justify-center mt-1 mb-2 select-none">
        <a
          href="https://www.instagram.com/joeywritessometimes/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black border-[3px] border-white text-white py-2 px-4 max-sm:py-1.5 max-sm:px-3 font-press text-[10px] max-sm:text-[8px] uppercase flex items-center gap-2 md:gap-3 shadow-[4px_4px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all active:scale-95 duration-200 cursor-none group"
        >
          <div className="w-2.5 h-2.5 bg-transparent flex items-center">
            <svg viewBox="0 0 7 7" className="pixelated w-full h-full fill-white group-hover:fill-[#ffff00] transition-colors">
              <path d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z" />
            </svg>
          </div>
          <span>* view writing portfolio</span>
        </a>
      </div>

      {/* View More External buttons (Determined Yellow hovers) */}
      <div className="z-10 flex flex-wrap justify-center gap-4 md:gap-6 mt-1 md:mt-2 mb-3 md:mb-4 select-none max-sm:gap-2.5 max-sm:mb-2.5">
        <a
          href="https://github.com/ahmedmurtazamalik?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black border-[3px] border-white text-white py-2 px-4 max-sm:py-1.5 max-sm:px-3 font-press text-[10px] max-sm:text-[8px] uppercase flex items-center gap-2 md:gap-3 shadow-[4px_4px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all active:scale-95 duration-200 cursor-none group"
        >
          {/* custom pixel star icon */}
          <div className="w-2.5 h-2.5 bg-transparent flex items-center">
            <svg viewBox="0 0 7 7" className="pixelated w-full h-full fill-white group-hover:fill-[#ffff00] transition-colors">
              <path d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z" />
            </svg>
          </div>
          <span>* View more on GitHub</span>
        </a>
        <a
          href="https://www.linkedin.com/in/ahmed-murtaza-malik/details/projects/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-black border-[3px] border-white text-white py-2 px-4 max-sm:py-1.5 max-sm:px-3 font-press text-[10px] max-sm:text-[8px] uppercase flex items-center gap-2 md:gap-3 shadow-[4px_4px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all active:scale-95 duration-200 cursor-none group"
        >
          <div className="w-2.5 h-2.5 bg-transparent flex items-center">
            <svg viewBox="0 0 7 7" className="pixelated w-full h-full fill-white group-hover:fill-[#ffff00] transition-colors">
              <path d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z" />
            </svg>
          </div>
          <span>* View more on LinkedIn</span>
        </a>
      </div>

      {/* FOOTER spacing */}
      <div className="z-10 h-2 pointer-events-none select-none" />

    </section>
  );
};
