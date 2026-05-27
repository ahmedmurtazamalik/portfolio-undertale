import React, { useEffect, useRef, useState } from 'react';

interface WaterfallSkillsProps {
  isActive: boolean;
}

export const WaterfallSkills: React.FC<WaterfallSkillsProps> = ({ isActive }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showEchoText, setShowEchoText] = useState(false);
  const [showCrystalText, setShowCrystalText] = useState(false);
  
  // Reference isActive to satisfy TS unused parameter checks
  if (isActive) {
    // No-op
  }

  // Canvas waterfall particles animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    class PixelParticle {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * -height;
        this.size = Math.floor(Math.random() * 3) + 2; // 2px to 4px
        this.speed = Math.random() * 4 + 3; // descending speed
        this.opacity = Math.random() * 0.5 + 0.3;
      }

      update() {
        this.y += this.speed;
        if (this.y > height) {
          this.y = Math.random() * -20;
          this.x = Math.random() * width;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.fillStyle = `rgba(64, 196, 170, ${this.opacity})`;
        // Render hard pixel squares
        c.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
      }
    }

    const particles: PixelParticle[] = Array.from({ length: 250 }, () => new PixelParticle());

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint dark blue waterfall back column (ambient tint)
      ctx.fillStyle = 'rgba(26, 64, 96, 0.08)';
      ctx.fillRect(0, 0, width, height);

      // Draw falling pixel particles
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="scroll-section w-full h-screen bg-[#000d1a] text-[#c8e8e0] flex flex-col justify-between p-12 max-md:p-6 overflow-hidden relative">
      
      {/* EASTER EGG BACKGROUND WATERFALL TEXT: faint "don't forget" */}
      <div className="absolute left-[8%] inset-y-0 z-0 pointer-events-none select-none flex flex-col justify-around opacity-[0.04] text-[#40c4aa] font-press text-[12px] uppercase select-none tracking-[0.25em] leading-none">
        <div>don't forget</div>
        <div>don't forget</div>
        <div>don't forget</div>
        <div>don't forget</div>
        <div>don't forget</div>
        <div>don't forget</div>
        <div>don't forget</div>
      </div>

      {/* BACKGROUND: Cavern stone silhouettes */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-15">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Rippled cavern columns */}
          <path d="M0 0 L50 200 L0 400 L40 600 L0 800 Z" fill="#1a4060" />
          <path d="M100% 0 L90% 300 L100% 500 L95% 700 L100% 900 Z" fill="#1a4060" />
          
          {/* Large glowing bioluminescent crystals (unanimated background placeholders) */}
          <polygon points="120,450 140,380 160,450 140,510" fill="#40c4aa" />
          <polygon points="820,150 835,110 850,150 835,180" fill="#6a8faf" />
        </svg>
      </div>

      {/* CANVAS WATERFALL: Covers the entire section behind text */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        <canvas ref={canvasRef} className="w-full h-full pixelated" />
      </div>

      {/* HEADER: Standard Label */}
      <div className="z-10 select-none flex justify-between items-center w-full">
        <span className="font-press text-[16px] md:text-[18px] text-[#40c4aa] uppercase tracking-wider">
          SKILLS / TECH STACK
        </span>
        <span className="font-press text-[11px] md:text-[12px] text-[#40c4aa]/60 max-md:hidden select-none">
          AREA 4: WATERFALL
        </span>
      </div>

      {/* CORE SKILLS STATS LAYOUT */}
      <div className="z-10 flex-1 flex flex-col md:flex-row items-center justify-center gap-16 w-full max-w-5xl mx-auto px-4 my-auto relative">
        
        {/* Left Side: Stat box skills grid */}
        <div className="flex-1 w-full max-w-3xl bg-black border-[3px] border-white p-10 max-md:p-6 shadow-[8px_8px_0_#000] relative">
          
          {/* Character Info header */}
          <div className="flex justify-between items-center border-b-2 border-white pb-4 mb-8 font-press text-[11px] md:text-[13px] text-white">
            <div>"AHMED MURTAZA MALIK"</div>
            <div>LV 22</div>
            <div className="max-sm:hidden">HP 99 / 99</div>
          </div>

          {/* Stats Lines representing CV Skills */}
          <div className="flex flex-col gap-6 select-none">
            
            {/* Category: Languages */}
            <div className="grid grid-cols-[130px_1fr] max-md:grid-cols-[100px_1fr] gap-6 items-start group/skill cursor-none">
              <span className="font-press text-[11px] text-[#40c4aa] group-hover/skill:text-[#ffff00] leading-none select-none transition-colors duration-150">
                LANGUAGES
              </span>
              <span className="font-press text-[11px] text-white group-hover/skill:text-[#ffff00] leading-relaxed tracking-wider select-none transition-colors duration-150">
                C++ · Python · JavaScript · C# · Rust · Java · SQL · Assembly
              </span>
            </div>

            {/* Category: Frameworks */}
            <div className="grid grid-cols-[130px_1fr] max-md:grid-cols-[100px_1fr] gap-6 items-start group/skill cursor-none">
              <span className="font-press text-[11px] text-[#40c4aa] group-hover/skill:text-[#ffff00] leading-none select-none transition-colors duration-150">
                FRAMEWORKS
              </span>
              <span className="font-press text-[11px] text-white group-hover/skill:text-[#ffff00] leading-relaxed tracking-wider select-none transition-colors duration-150">
                React · Node.js · Express · Svelte · JavaFX
              </span>
            </div>

            {/* Category: Parallel Computing */}
            <div className="grid grid-cols-[130px_1fr] max-md:grid-cols-[100px_1fr] gap-6 items-start group/skill cursor-none">
              <span className="font-press text-[11px] text-[#40c4aa] group-hover/skill:text-[#ffff00] leading-none select-none transition-colors duration-150">
                HPC
              </span>
              <span className="font-press text-[11px] text-white group-hover/skill:text-[#ffff00] leading-relaxed tracking-wider select-none transition-colors duration-150">
                CUDA · OpenCL · MPI · OpenMP · SIMD · OpenACC
              </span>
            </div>

            {/* Category: AI & ML */}
            <div className="grid grid-cols-[130px_1fr] max-md:grid-cols-[100px_1fr] gap-6 items-start group/skill cursor-none">
              <span className="font-press text-[11px] text-[#40c4aa] group-hover/skill:text-[#ffff00] leading-none select-none transition-colors duration-150">
                AI & ML
              </span>
              <span className="font-press text-[11px] text-white group-hover/skill:text-[#ffff00] leading-relaxed tracking-wider select-none transition-colors duration-150">
                PyTorch · Transformers · GANs · Diffusion Models · RAG
              </span>
            </div>

            {/* Category: Tools */}
            <div className="grid grid-cols-[130px_1fr] max-md:grid-cols-[100px_1fr] gap-6 items-start group/skill cursor-none">
              <span className="font-press text-[11px] text-[#40c4aa] group-hover/skill:text-[#ffff00] leading-none select-none transition-colors duration-150">
                TOOLS
              </span>
              <span className="font-press text-[11px] text-white group-hover/skill:text-[#ffff00] leading-relaxed tracking-wider select-none transition-colors duration-150">
                Git · Linux (Kali) · Docker · Kubernetes · MLflow · DVC
              </span>
            </div>

          </div>

          {/* Simple subtle decorative stats line (CLEANED) */}
          <div className="border-t-2 border-white mt-8 pt-4 flex justify-between font-press text-[10px] text-[#6a8faf]">
            <span>ATK 99</span>
            <span>DEF 99</span>
            <span>EXP 2026</span>
          </div>

        </div>

        {/* Right Side: Glowing Crystal Formation with hover interactions */}
        <div 
          className="shrink-0 flex flex-col items-center gap-4 select-none max-md:hidden pointer-events-auto cursor-none relative group/crystal"
          onMouseEnter={() => setShowCrystalText(true)}
          onMouseLeave={() => setShowCrystalText(false)}
        >
          {/* Custom SVG pixel-art Crystal formation */}
          <div className="w-28 h-28 crystal-glow transition-transform duration-300 group-hover/crystal:scale-110 active:scale-95">
            <svg
              viewBox="0 0 16 16"
              className="pixelated w-full h-full"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Center Main Crystal */}
              <path
                d="M8 1 L11 7 L8 15 L5 7 Z"
                fill="#40c4aa"
                stroke="#ffffff"
                strokeWidth="0.8"
              />
              {/* Left secondary crystal */}
              <path
                d="M4 6 L7 9 L4 14 L2 9 Z"
                fill="#6a8faf"
                stroke="#ffffff"
                strokeWidth="0.6"
              />
              {/* Right tertiary crystal */}
              <path
                d="M12 7 L14 10 L12 14 L10 10 Z"
                fill="#3a6080"
                stroke="#ffffff"
                strokeWidth="0.6"
              />
            </svg>
          </div>
          
          <span className="font-press text-[9px] text-[#6a8faf] uppercase tracking-widest text-center group-hover/crystal:text-white transition-colors">
            * Glowing crystal
          </span>

          {/* Dialogue popup for Crystal (INCREASED size to 12px) */}
          <div 
            className={`absolute bottom-36 right-0 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-all duration-200 pointer-events-none z-30 ${
              showCrystalText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            * A bioluminescent crystal.<br />* It glows with a warm, steady light.<br />* It fills you with determination.
          </div>
        </div>

      </div>

      {/* EASTER EGG: Whispering Echo Flower */}
      <div 
        className="absolute bottom-[18%] left-[6%] z-20 pointer-events-auto cursor-none group"
        onMouseEnter={() => setShowEchoText(true)}
        onMouseLeave={() => setShowEchoText(false)}
      >
        <div className="w-10 h-10 transition-transform group-hover:scale-110 active:scale-95 duration-200">
          <svg viewBox="0 0 12 12" className="pixelated w-full h-full">
            {/* stem */}
            <path d="M6 6v5H5V6h1z" fill="#1c705c" />
            {/* flower petals */}
            <path d="M4 3h4v1H4zm-1 1h6v1H3zm0 1h6v1H3zm1 1h4v1H4z" fill="#40c4aa" className="animate-pulse" />
            {/* yellow center */}
            <path d="M5 4h2v2H5V4z" fill="#e8c040" />
          </svg>
        </div>

        {/* Dialogue popup (INCREASED size to 12px) */}
        <div 
          className={`absolute bottom-12 left-0 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-all duration-200 pointer-events-none z-30 ${
            showEchoText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          * It's an Echo Flower.<br />* A faint voice whispers...<br />* "Be good, won't you?"
        </div>
      </div>

      {/* FOOTER spacing */}
      <div className="z-10 h-4 pointer-events-none select-none" />

    </section>
  );
};
