import React, { useEffect, useState, useMemo } from 'react';
import { playDialogueTick } from '../utils/audio';

interface DialogueBoxProps {
  lines: string[];
  isActive: boolean;
  className?: string;
  onComplete?: () => void;
  speed?: number; // Time in ms per character
}

interface StyledChar {
  char: string;
  color: string;
}

export function parseStyledText(text: string): { chars: StyledChar[]; rawText: string } {
  const chars: StyledChar[] = [];
  let currentColor = 'inherit';
  let i = 0;
  while (i < text.length) {
    if (text[i] === '[') {
      const closeIdx = text.indexOf(']', i);
      if (closeIdx !== -1) {
        const tag = text.substring(i + 1, closeIdx);
        if (tag === 'y' || tag === 'r' || tag === 'b' || tag === 'w') {
          if (tag === 'y') currentColor = '#ffff00'; // Yellow
          else if (tag === 'r') currentColor = '#ff0000'; // Red
          else if (tag === 'b') currentColor = '#38bdf8'; // Cyan/Blue
          else if (tag === 'w') currentColor = 'inherit'; // White/Default
          i = closeIdx + 1;
          continue;
        }
      }
    }
    chars.push({ char: text[i], color: currentColor });
    i++;
  }
  const rawText = chars.map((c) => c.char).join('');
  return { chars, rawText };
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  lines,
  isActive,
  className = '',
  onComplete,
  speed = 12, // 12ms per character creates a highly snappy, fluid reading speed
}) => {
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Parse lines to extract styling information
  const parsedLines = useMemo(() => {
    return lines.map((line) => parseStyledText(line));
  }, [lines]);

  useEffect(() => {
    if (!isActive) {
      // Reset state if section is exited, allowing for re-typing when scrolling back
      setCurrentLineIndex(0);
      setCurrentCharIndex(0);
      setIsFinished(false);
      return;
    }

    if (isFinished) return;

    if (parsedLines.length === 0) {
      setIsFinished(true);
      if (onComplete) onComplete();
      return;
    }

    const currentLine = parsedLines[currentLineIndex];

    if (currentCharIndex < currentLine.chars.length) {
      const charObj = currentLine.chars[currentCharIndex];
      const timer = setTimeout(() => {
        // Don't play tick sound for spaces to sound more natural
        if (charObj.char !== ' ') {
          playDialogueTick();
        }

        setCurrentCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else {
      // Line complete, schedule transition to next line
      if (currentLineIndex < parsedLines.length - 1) {
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
  }, [isActive, currentLineIndex, currentCharIndex, parsedLines, isFinished, speed, onComplete]);

  return (
    <div
      className={`bg-black border-[3px] border-white text-white p-8 font-press text-[14px] leading-relaxed relative flex flex-col select-none ${className}`}
    >
      <div className="flex-1 relative">
        {/* Constant layout skeleton to prevent container resizing/jumping during typing */}
        <div className="invisible select-none pointer-events-none">
          {parsedLines.map((parsed, idx) => (
            <p key={idx} className="m-0 mb-6 last:mb-0 min-h-[1.5em] whitespace-pre-wrap">
              {parsed.rawText}
            </p>
          ))}
        </div>

        {/* Dynamic typewriter visual layer overlay */}
        <div className="absolute inset-0">
          {parsedLines.map((parsed, idx) => {
            // Do not render subsequent paragraphs until the typewriter reaches them
            if (idx > currentLineIndex) return null;

            const visibleChars =
              idx === currentLineIndex
                ? parsed.chars.slice(0, currentCharIndex)
                : parsed.chars;

            return (
              <p key={idx} className="m-0 mb-6 last:mb-0 min-h-[1.5em] whitespace-pre-wrap select-none">
                {visibleChars.map((charObj, charIdx) => (
                  <span key={charIdx} style={{ color: charObj.color }}>
                    {charObj.char}
                  </span>
                ))}
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

