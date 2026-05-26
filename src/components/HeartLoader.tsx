import React, { useState } from 'react';
import gsap from 'gsap';
import { playSaveChime, playBackgroundMusic } from '../utils/audio';

interface HeartLoaderProps {
  onComplete: () => void;
}

export const HeartLoader: React.FC<HeartLoaderProps> = ({ onComplete }) => {
  const [clicked, setClicked] = useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const leftHalfRef = React.useRef<HTMLDivElement>(null);
  const rightHalfRef = React.useRef<HTMLDivElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const flashRef = React.useRef<HTMLDivElement>(null);

  const handleMend = () => {
    if (clicked) return;
    setClicked(true);

    // Play retro save chime
    playSaveChime();

    // GSAP animation to join the two heart halves
    const tl = gsap.timeline({
      onComplete: () => {
        // Play final flash sequence
        triggerFlash();
      }
    });

    // Animate the halves to merge at the center
    tl.to([leftHalfRef.current, rightHalfRef.current], {
      x: 0,
      rotation: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  const triggerFlash = () => {
    // Start background music
    playBackgroundMusic();

    const tl = gsap.timeline({
      onComplete: () => {
        // Notify parent to reveal the website
        onComplete();
      }
    });

    // 1. Flash screen to solid white and shrink the heart
    tl.to(flashRef.current, {
      opacity: 1,
      duration: 0.2,
      ease: 'power1.in'
    })
      .to(boxRef.current, {
        scale: 0.2,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut'
      }, '<')
      .to(buttonRef.current, {
        opacity: 0,
        duration: 0.2
      }, '<')
      // 2. Fade out the white flash to reveal the website
      .to(flashRef.current, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out'
      });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[99999] bg-[#000] flex flex-col items-center justify-center select-none font-press"
    >
      {/* Absolute White Flash Overlay */}
      <div
        ref={flashRef}
        className="absolute inset-0 bg-white opacity-0 pointer-events-none z-[100000]"
      />

      {/* Retro Dialogue Instruction */}
      <div className="text-white text-[10px] md:text-[12px] tracking-wider mb-8 text-center max-w-md px-6 leading-loose select-none">
        {clicked ? (
          <span className="text-[#ffff00] animate-pulse">* MENDING SOUL...</span>
        ) : (
          <span>* Your soul is fractured.<br />* Mend it to restore determination.</span>
        )}
      </div>

      {/* Main Battle Box */}
      <div
        ref={boxRef}
        className="w-[180px] h-[180px] border-[5px] border-white bg-black flex items-center justify-center relative shadow-[0_0_30px_rgba(255,255,255,0.15)] select-none"
        onClick={handleMend}
        style={{ cursor: 'pointer' }}
      >
        {/* Left Half of Heart */}
        <div
          ref={leftHalfRef}
          className="absolute w-20 h-20 origin-center"
          style={{
            transform: clicked ? undefined : 'translate3d(-15px, 0, 0) rotate(-12deg)',
            clipPath: 'inset(0px 50% 0px 0px)',
          }}
        >
          <svg
            viewBox="0 0 9 9"
            className="pixelated w-full h-full drop-shadow-[0_4px_6px_rgba(255,0,0,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1h2v1H1zm5 0h2v1H6zM0 2h4v1H0zm5 0h4v1H5zM0 3h9v1H0zm1 4h7v-3H1zm1 1h5v-1H2zm1 1h3v-1H3zm1 1h1v-1H4z"
              fill="#ff0000"
            />
          </svg>
        </div>

        {/* Right Half of Heart */}
        <div
          ref={rightHalfRef}
          className="absolute w-20 h-20 origin-center"
          style={{
            transform: clicked ? undefined : 'translate3d(15px, 0, 0) rotate(12deg)',
            clipPath: 'inset(0px 0px 0px 50%)',
          }}
        >
          <svg
            viewBox="0 0 9 9"
            className="pixelated w-full h-full drop-shadow-[0_4px_6px_rgba(255,0,0,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1h2v1H1zm5 0h2v1H6zM0 2h4v1H0zm5 0h4v1H5zM0 3h9v1H0zm1 4h7v-3H1zm1 1h5v-1H2zm1 1h3v-1H3zm1 1h1v-1H4z"
              fill="#ff0000"
            />
          </svg>
        </div>

        {/* Simple Crack line representation in center when fractured */}
        {!clicked && (
          <div className="absolute inset-y-0 w-1 flex flex-col justify-between items-center z-20 pointer-events-none opacity-80">
            <div className="w-1 h-3 bg-black mt-6" />
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <div className="w-1 h-4 bg-black" />
            <div className="w-2 h-2 bg-black rotate-45" />
            <div className="w-1 h-6 bg-black mb-6" />
          </div>
        )}
      </div>

      {/* Button for mending */}
      <button
        ref={buttonRef}
        onClick={handleMend}
        disabled={clicked}
        className={`mt-10 px-8 py-3.5 border-[3px] border-white bg-black hover:bg-white hover:text-black text-white text-[10px] tracking-widest uppercase select-none transition-all active:scale-95 duration-150 relative shadow-[4px_4px_0_#fff] hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] ${clicked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
      >
        [ MEND SOUL ]
      </button>
    </div>
  );
};
