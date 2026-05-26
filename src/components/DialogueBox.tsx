import React, { useEffect, useState } from 'react';
import { playDialogueTick } from '../utils/audio';

interface DialogueBoxProps {
  lines: string[];
  isActive: boolean;
  className?: string;
  onComplete?: () => void;
  speed?: number; // Time in ms per character
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  lines,
  isActive,
  className = '',
  onComplete,
  speed = 12, // 12ms per character creates a highly snappy, fluid reading speed
}) => {
  const [visibleLines, setVisibleLines] = useState<string[]>(lines.map(() => ''));
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!isActive) {
      // Reset state if section is exited, allowing for re-typing when scrolling back
      setVisibleLines(lines.map(() => ''));
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsFinished(false);
      return;
    }

    if (isFinished) return;

    if (lines.length === 0) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const currentLine = lines[currentLineIndex];

    if (currentCharIndex < currentLine.length) {
      const char = currentLine[currentCharIndex];
      const timer = setTimeout(() => {
        setVisibleLines((prev) => {
          const updated = [...prev];
          updated[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
          return updated;
        });

        // Don't play tick sound for spaces to sound more natural
        if (char !== ' ') {
          playDialogueTick();
        }

        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Line complete, schedule transition to next line
      if (currentLineIndex < lines.length - 1) {
        const lineBreakTimer = setTimeout(() => {
          setCurrentLineIndex((prev) => prev + 1);
          setCurrentCharIndex(0);
        }, 120); // Snappier dramatic pause between distinct lines/sentences
        return () => clearTimeout(lineBreakTimer);
      } else {
        // All lines printed
        setIsFinished(true);
        if (onComplete) onComplete();
      }
    }
  }, [isActive, currentLineIndex, currentCharIndex, lines, isFinished, speed, onComplete]);

  return (
    <div
      className={`bg-black border-[3px] border-white text-white p-8 font-press text-[14px] leading-relaxed relative flex flex-col select-none ${className}`}
    >
      <div className="flex-1 relative">
        {/* Constant layout skeleton to prevent container resizing/jumping during typing */}
        <div className="invisible select-none pointer-events-none">
          {lines.map((line, idx) => (
            <p key={idx} className="m-0 mb-6 last:mb-0 min-h-[1.5em] whitespace-pre-wrap">
              {line}
            </p>
          ))}
        </div>

        {/* Dynamic typewriter visual layer overlay */}
        <div className="absolute inset-0">
          {visibleLines.map((line, idx) => {
            // Do not render subsequent paragraphs until the typewriter reaches them
            if (idx > currentLineIndex) return null;
            return (
              <p key={idx} className="m-0 mb-6 last:mb-0 min-h-[1.5em] whitespace-pre-wrap select-none">
                {line}
              </p>
            );
          })}
        </div>
      </div>

      {/* Dialogue Completion Indicator: Down-facing pixel arrow */}
      {isFinished && (
        <div className="absolute bottom-3.5 right-4 bounce-arrow w-3.5 h-2 flex items-center justify-center">
          <svg
            width="10"
            height="6"
            viewBox="0 0 5 3"
            className="pixelated w-full h-full fill-white"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Pixel arrow grid: 5x3 */}
            <path d="M0 0h5v1H0zm1 1h3v1H1zm1 1h1v1H2z" />
          </svg>
        </div>
      )}
    </div>
  );
};
