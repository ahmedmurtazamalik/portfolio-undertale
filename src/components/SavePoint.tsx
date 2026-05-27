import React, { useState, useEffect, useRef } from 'react';
import { playSaveChime, playDialogueTick } from '../utils/audio';

export const SavePoint: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [typedText, setTypedText] = useState('');
  const hideTimerRef = useRef<number | null>(null);
  const typingTimerRef = useRef<number | null>(null);

  const targetText = '* Murtaza is filled with determination.';

  const handleSave = () => {
    // Play sweet save chime
    playSaveChime();
    
    // Clear any active typing or hide timers
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);

    setTypedText('');
    setShowDialog(true);

    let charIdx = 0;
    
    // Type text character-by-character
    typingTimerRef.current = window.setInterval(() => {
      charIdx++;
      const currentSub = targetText.substring(0, charIdx);
      setTypedText(currentSub);

      const nextChar = targetText[charIdx - 1];
      if (nextChar && nextChar !== ' ') {
        playDialogueTick();
      }

      if (charIdx >= targetText.length) {
        if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
        
        // Auto hide dialogue 2 seconds after typing completes
        hideTimerRef.current = window.setTimeout(() => {
          setShowDialog(false);
        }, 2200);
      }
    }, 35); // Classic dialogue typing speed for the save notification
  };

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      if (typingTimerRef.current) window.clearInterval(typingTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* Floating Star */}
      <button
        onClick={handleSave}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-transparent border-0 focus:outline-none transition-transform active:scale-95 cursor-none"
        title="SAVE"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 7 7"
          className="pixelated w-full h-full save-star"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Pixelated 4-point star */}
          <path
            d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z"
            fill="#ffff00"
          />
        </svg>
      </button>

      {/* Save Dialogue Overlay */}
      {showDialog && (
        <div className="fixed bottom-16 md:bottom-20 right-4 md:right-6 z-40 w-[90%] max-w-xs md:max-w-sm select-none pointer-events-none animate-[fadeIn_0.15s_ease-out]">
          <div className="bg-[#000] border-[3px] border-white text-white p-4 md:p-5 font-press text-[10px] md:text-[12px] leading-relaxed shadow-[0_4px_20px_rgba(0,0,0,0.8)] relative">
            {/* Dialogue text */}
            <p className="m-0 select-none min-h-[1.5em] whitespace-pre-wrap">
              {typedText}
            </p>
            {/* Small yellow save star in corner of the box */}
            <div className="absolute right-2.5 top-2.5 w-3.5 h-3.5">
              <svg viewBox="0 0 7 7" className="pixelated w-full h-full" fill="none">
                <path
                  d="M3 0h1v1h-1zM3 1h1v1h-1zM2 2h3v1h-3zM0 3h7v1h-7zM2 4h3v1h-3zM3 5h1v1h-1zM3 6h1v1h-1z"
                  fill="#ffff00"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
