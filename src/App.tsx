import { useState, useEffect, useRef } from 'react';
import { RuinsHero } from './components/RuinsHero';
import { SnowdinAbout } from './components/SnowdinAbout';
import { HotlandProjects } from './components/HotlandProjects';
import { WaterfallSkills } from './components/WaterfallSkills';
import { NewHomeContact } from './components/NewHomeContact';
import { SideNav } from './components/SideNav';
import { SavePoint } from './components/SavePoint';
import { CustomCursor } from './components/CustomCursor';
import { TransitionWipe } from './components/TransitionWipe';
import { HeartLoader } from './components/HeartLoader';
import type { TransitionWipeHandle } from './components/TransitionWipe';
import { playBackgroundMusic, stopBackgroundMusic } from './utils/audio';
import './App.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<TransitionWipeHandle>(null);
  const [musicEnabled, setMusicEnabled] = useState(true);
  
  // Guard reference to avoid double-firing wipes during programmatic scrolling
  const isNavigatingRef = useRef(false);

  // Sync scroll positioning with IntersectionObserver for standard wheel scrolls
  useEffect(() => {
    if (!introFinished) return;
    
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.children);

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sections.indexOf(entry.target);
          if (index !== -1 && index !== activeSection && !isNavigatingRef.current) {
            // Trigger horizontal wipe animation as they cross the section boundary
            wipeRef.current?.trigger(() => {
              setActiveSection(index);
            });
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null, // relative to document viewport
      threshold: 0.51, // Triggers right when the section covers more than 50% of the screen
    });

    sections.forEach((sec) => observer.observe(sec));

    return () => {
      observer.disconnect();
    };
  }, [activeSection, introFinished]);

  // Fallback to start background music on interaction once loaded
  useEffect(() => {
    if (!introFinished || !musicEnabled) return;

    const handleInteraction = () => {
      if (musicEnabled) {
        playBackgroundMusic();
      }
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [introFinished, musicEnabled]);

  const handleToggleMusic = () => {
    if (musicEnabled) {
      stopBackgroundMusic();
      setMusicEnabled(false);
    } else {
      setMusicEnabled(true);
      playBackgroundMusic();
    }
  };

  // Clean transition-wipe navigation on clicking side nav hearts
  const handleNavClick = (index: number) => {
    if (index === activeSection || isNavigatingRef.current) return;

    isNavigatingRef.current = true;
    
    // Trigger transition wipe
    wipeRef.current?.trigger(() => {
      const container = containerRef.current;
      if (container) {
        const targetSection = container.children[index] as HTMLElement;
        if (targetSection) {
          // Snaps the section into target position while screen is white
          targetSection.scrollIntoView({ behavior: 'auto' });
        }
      }
      setActiveSection(index);
      
      // Release navigation lock shortly after transition finishes
      setTimeout(() => {
        isNavigatingRef.current = false;
      }, 100);
    });
  };

  return (
    <>
      {!introFinished ? (
        <HeartLoader onComplete={() => setIntroFinished(true)} />
      ) : (
        <>
          {/* Global Interactive elements */}
          <CustomCursor />
          <SavePoint />
          <TransitionWipe ref={wipeRef} />
          
          {/* Music Toggle Button */}
          <button
            onClick={handleToggleMusic}
            className="fixed left-3 md:left-6 top-1/2 -translate-y-1/2 z-50 bg-black border-[3px] border-white text-white p-2 md:p-3 font-press text-[7px] md:text-[9px] uppercase flex flex-col items-center gap-1 shadow-[4px_4px_0_#000] hover:border-[#ffff00] hover:text-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.5)] transition-all active:scale-95 duration-200 cursor-none"
            aria-label="Toggle Background Music"
          >
            <div className="w-3.5 h-3.5 shrink-0 flex items-center justify-center">
              {musicEnabled ? (
                <svg viewBox="0 0 9 9" className="pixelated w-full h-full fill-current">
                  <path d="M5 1h3v2H5zm0 2h1v4H5zm-3 4h3v2H2z" />
                </svg>
              ) : (
                <svg viewBox="0 0 9 9" className="pixelated w-full h-full fill-current">
                  <path d="M5 1h3v2H5zm0 2h1v2H5zm-3 4h3v2H2z" />
                  <line x1="1" y1="8" x2="8" y2="1" stroke="currentColor" strokeWidth="1" />
                </svg>
              )}
            </div>
            <span className="text-[6px] md:text-[7px] mt-1 tracking-wider whitespace-nowrap">
              MUSIC
            </span>
            <span className="text-[7px] md:text-[8px] font-bold text-[#ffff00] tracking-wider">
              {musicEnabled ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Outlined/filled heart side navigation indicators */}
          <SideNav activeSection={activeSection} onNavClick={handleNavClick} />

          {/* Snap Scroll Snapping viewport container */}
          <main 
            ref={containerRef}
            className="scroll-container"
          >
            <div className="scroll-section">
              <RuinsHero isActive={activeSection === 0} />
            </div>
            
            <div className="scroll-section">
              <SnowdinAbout isActive={activeSection === 1} />
            </div>
            
            <div className="scroll-section">
              <HotlandProjects isActive={activeSection === 2} />
            </div>
            
            <div className="scroll-section">
              <WaterfallSkills isActive={activeSection === 3} />
            </div>
            
            <div className="scroll-section">
              <NewHomeContact isActive={activeSection === 4} />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default App;
