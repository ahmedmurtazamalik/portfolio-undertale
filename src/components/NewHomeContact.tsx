import React, { useState } from 'react';
import { DialogueBox } from './DialogueBox';

interface NewHomeContactProps {
  isActive: boolean;
}

export const NewHomeContact: React.FC<NewHomeContactProps> = ({ isActive }) => {
  const [showLocketText, setShowLocketText] = useState(false);
  const contactLinks = [
    {
      name: 'Talk (Email)',
      href: 'mailto:ahmedmurtazamalik@gmail.com',
      // Pixel Envelope icon (7x5)
      iconPath: 'M0 0h7v1H0zm0 1h1v1H0zm2 0h3v1H2zm4 0h1v1H6zm-6 1h1v1H0zm1 0h1v1H1zm4 0h1v1H5zm1 0h1v1H6zm-6 1h1v1H0zm5 0h2v1H5zm-5 1h7v1H0z'
    },
    {
      name: 'View Work (GitHub)',
      href: 'https://github.com/ahmedmurtazamalik',
      // Pixel terminal bracket icon (6x6)
      iconPath: 'M2 0h3v1H2zm-1 1h1v1H1zm3 0h1v1H4zm-3 1h1v2H1zm3 0h1v2H4zm-1 3h1v1H3z'
    },
    {
      name: 'Connect (LinkedIn)',
      href: 'https://linkedin.com/in/ahmed-murtaza-malik/',
      // Pixel letters "in" (8x6)
      iconPath: 'M0 0h1v1H0zm3 0h1v1H3zm0 1h1v1H3zm4 0h1v1H7zm-7 1h1v4H0zm3 0h1v4H3zm1 0h2v1H4zm2 0h1v1H6zm1 1h1v3H7z'
    }
  ];

  return (
    <section className="scroll-section w-full h-screen bg-[#0d0d14] text-[#f0ece4] flex flex-col justify-between p-12 max-md:p-6 max-sm:p-4 overflow-hidden relative">
      
      {/* BACKGROUND: Cozy room silhouettes and golden fire glow */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-25">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          {/* Tiled old stone floor */}
          <pattern id="stone-floor" width="100" height="50" patternUnits="userSpaceOnUse">
            <rect width="100%" height="50" fill="#09090e" stroke="#252538" strokeWidth="1" />
            <line x1="50" y1="0" x2="50" y2="25" stroke="#252538" strokeWidth="1" />
            <line x1="0" y1="25" x2="0" y2="50" stroke="#252538" strokeWidth="1" />
            <line x1="100" y1="25" x2="100" y2="50" stroke="#252538" strokeWidth="1" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#stone-floor)" />
          
          {/* Subtle room columns and bookshelf silhouettes */}
          <rect x="5%" y="10%" width="80" height="350" fill="#06060a" />
          <rect x="85%" y="10%" width="80" height="350" fill="#06060a" />
        </svg>
      </div>



      {/* HEADER: Standard Label */}
      <div className="z-10 select-none flex justify-between items-center w-full">
        <span className="font-press text-[16px] md:text-[18px] text-[#8080b0] uppercase tracking-wider">
          Contact
        </span>
        <span className="font-press text-[11px] md:text-[12px] text-[#8080b0]/60 max-md:hidden select-none">
          AREA 5: NEW HOME
        </span>
      </div>

      {/* CORE CONTACT LAYOUT */}
      <div className="z-10 flex-1 flex flex-col items-center justify-center gap-6 md:gap-8 w-full max-w-4xl mx-auto px-4 max-sm:px-2 my-auto relative">
        
        {/* Fireplace (Hearth) and Pixel Fire */}
        <div className="flex flex-col items-center gap-3 select-none relative">
          {/* Firelight Flicker Keyframe Style Block */}
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes firelightFlicker {
              0%, 100% {
                transform: translate(-50%, -50%) scale(1);
                opacity: 0.85;
              }
              30% {
                transform: translate(-50%, -50%) scale(1.1);
                opacity: 1;
              }
              50% {
                transform: translate(-50%, -50%) scale(0.92);
                opacity: 0.72;
              }
              80% {
                transform: translate(-50%, -50%) scale(1.05);
                opacity: 0.9;
              }
            }
          `}} />

          <div className="w-36 h-24 bg-transparent relative flex justify-center items-end z-10">
            
            {/* Ambient Glow centered right behind the fire (Expanded size and higher opacity) */}
            <div 
              className="absolute w-[750px] h-[750px] max-md:w-[480px] max-md:h-[480px] bg-[radial-gradient(circle,_rgba(232,114,26,0.45)_0%,_rgba(196,75,30,0.16)_40%,_rgba(12,12,20,0)_70%)] pointer-events-none select-none"
              style={{
                left: '50%',
                top: '75%',
                zIndex: 0,
                animation: 'firelightFlicker 1.6s infinite ease-in-out'
              }}
            />

            {/* Fireplace stone frame SVG */}
            <svg 
              viewBox="0 0 40 24" 
              className="pixelated absolute inset-0 w-full h-full fill-[#1c1c28] stroke-[#8080b0] stroke-1"
            >
              {/* Stone fireplace frame layout */}
              <path d="M0 24V0h40v24h-6V6H6v18H0z" />
              {/* Mantle shelf on top */}
              <rect x="0" y="0" width="40" height="3" fill="#c8a060" />
            </svg>

            {/* Firewood logs */}
            <div className="absolute bottom-1 w-16 h-5 z-10 pointer-events-none select-none">
              <svg viewBox="0 0 20 6" className="pixelated w-full h-full">
                {/* Left log angled */}
                <path d="M 2 4 L 11 2 L 12 3 L 3 5 Z" fill="#8b5a2b" stroke="#5c3a21" strokeWidth="0.5" />
                {/* Right log angled, crossing under */}
                <path d="M 18 4 L 9 2 L 8 3 L 17 5 Z" fill="#704214" stroke="#4a2c0f" strokeWidth="0.5" />
                {/* Center glowing coal / ember base */}
                <rect x="7" y="4" width="6" height="2" fill="#e8721a" className="animate-pulse" />
                <rect x="9" y="5" width="2" height="1" fill="#ffff00" className="animate-pulse" />
              </svg>
            </div>

            {/* Fire particles animated loop (3-4 frame loop) */}
            <div className="w-12 h-12 mb-1.5 z-20 flex items-end justify-center fire-pulse">
              <svg 
                viewBox="0 0 10 10" 
                className="pixelated w-full h-full fill-[#e8721a] drop-shadow-[0_0_8px_#c44b1e]"
              >
                {/* 10x10 custom flame path shape */}
                <path d="M4 1h2v1H4zm-1 2h4v1H3zm-1 2h6v1H2zm0 1h6v1H2zm-1 1h8v1H1zm-1 1h10v1H0z" />
                {/* Inner hot yellow flame */}
                <path d="M4 4h2v1H4zm-1 2h4v1H3zm-1 2h6v1H2z" fill="#ffff00" />
              </svg>
            </div>
            
          </div>
          <span className="font-press text-[9.5px] text-[#c8a060] uppercase tracking-wider select-none animate-pulse text-center z-10">
            * A warm hearth glow. It feels like home.
          </span>
        </div>

        {/* Reusable Dialogue Box */}
        <div className="w-full max-w-2xl">
          <DialogueBox 
            lines={[
              "* You've reached the end.",
              "* Murtaza would love to hear from you."
            ]}
            isActive={isActive}
            className="shadow-[0_8px_0_#000] min-h-[85px] md:min-h-[110px] border-[3px] border-[#8080b0]"
          />
        </div>

        {/* Pixel Styled Social/Contact Links */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 w-full max-w-xl">
          {contactLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-black border-[3px] border-white text-white py-2 px-4 max-sm:py-1.5 max-sm:px-3 font-press text-[10px] max-sm:text-[8px] uppercase flex items-center gap-2 md:gap-3 shadow-[4px_4px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all active:scale-95 duration-200 cursor-none group"
            >
              {/* Custom Pixel Icon */}
              <div className="w-4 h-4 shrink-0 flex items-center justify-center">
                <svg viewBox="0 0 8 6" className="pixelated w-full h-full fill-white group-hover:fill-[#ffff00] currentColor transition-colors">
                  <path d={link.iconPath} fill="currentColor" />
                </svg>
              </div>
              <span>
                * {link.name}
              </span>
            </a>
          ))}
        </div>

      </div>

      {/* EASTER EGG: Heart-shaped Locket (Hidden on screens below sm to prevent footer overlap) */}
      <div 
        className="absolute bottom-[16%] left-[10%] z-20 pointer-events-auto cursor-none group hidden sm:block"
        onMouseEnter={() => setShowLocketText(true)}
        onMouseLeave={() => setShowLocketText(false)}
      >
        <div className="w-8 h-8 transition-transform group-hover:scale-110 active:scale-95 duration-200">
          <svg viewBox="0 0 9 9" className="pixelated w-full h-full">
            <path 
              d="M1 1h2v1H1zm5 0h2v1H6zM0 2h4v1H0zm5 0h4v1H5zM0 3h9v1H0zm1 4h7v-3H1zm1 1h5v-1H2zm1 1h3v-1H3zm1 1h1v-1H4z" 
              fill="#d4a853" 
              className="drop-shadow-[0_2px_4px_rgba(212,168,83,0.6)]"
            />
          </svg>
        </div>

        {/* Locket dialogue box popup (INCREASED size to 12px) */}
        <div 
          className={`absolute bottom-12 left-0 w-80 bg-black border-2 border-white text-white p-4 font-press text-[12px] leading-relaxed shadow-[0_4px_12px_rgba(0,0,0,0.7)] transition-all duration-200 pointer-events-none z-30 ${
            showLocketText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          * It's a heart-shaped locket.<br />* Inside it says:<br />* "Best Friends Forever."
        </div>
      </div>

      {/* FOOTER: copyright and SAVED callback indicator */}
      <div className="z-10 flex flex-col sm:flex-row justify-between items-center w-full border-t border-[#8080b0]/20 pt-4 font-press text-[10px] md:text-[12px] text-[#8080b0]/70 select-none max-sm:gap-2 max-sm:pb-4">
        <span className="max-sm:text-[8px]">AHMED MURTAZA MALIK © 2026</span>
        
        {/* * SAVED. with save star */}
        <div className="flex items-center gap-2 text-white max-sm:text-[8px]">
          <span>* SAVED.</span>
          <div className="w-3.5 h-3.5">
            <svg viewBox="0 0 7 7" className="pixelated w-full h-full fill-[#ffff00]">
              <path d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z" />
            </svg>
          </div>
        </div>
      </div>

    </section>
  );
};
