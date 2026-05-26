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
import { playBackgroundMusic } from './utils/audio';
import './App.css';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<TransitionWipeHandle>(null);
  
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
    if (!introFinished) return;

    const handleInteraction = () => {
      playBackgroundMusic();
    };

    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);

    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
    };
  }, [introFinished]);

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
