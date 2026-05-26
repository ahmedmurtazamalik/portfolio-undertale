import { forwardRef, useImperativeHandle, useRef } from 'react';
import gsap from 'gsap';

export interface TransitionWipeHandle {
  trigger: (callback?: () => void) => void;
}

export const TransitionWipe = forwardRef<TransitionWipeHandle, {}>((_, ref) => {
  const wipeRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(ref, () => ({
    trigger(callback) {
      if (!wipeRef.current) {
        if (callback) callback();
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          // Fire custom callback immediately after screen is fully covered/wiped
          if (callback) callback();
        },
      });

      // Kill any unresolved transitions on the node
      gsap.killTweensOf(wipeRef.current);

      // Perform authentic retro horizontal sweep wipe:
      // 1. Set scaleX to 0, anchor to LEFT
      // 2. Animate scaleX to 1 over 200ms (screen turns fully white)
      // 3. Swap anchor to RIGHT
      // 4. Animate scaleX back to 0 over 200ms (revealing underlying page)
      tl.set(wipeRef.current, {
        scaleX: 0,
        transformOrigin: 'left center',
        opacity: 1,
      })
      .to(wipeRef.current, {
        scaleX: 1,
        duration: 0.18,
        ease: 'power2.inOut',
      })
      .set(wipeRef.current, {
        transformOrigin: 'right center',
      })
      .to(wipeRef.current, {
        scaleX: 0,
        duration: 0.18,
        ease: 'power2.inOut',
      });
    },
  }));

  return (
    <div
      ref={wipeRef}
      className="fixed inset-0 z-[9999] bg-white pointer-events-none transform scale-x-0"
      style={{
        width: '100vw',
        height: '100vh',
      }}
    />
  );
});

TransitionWipe.displayName = 'TransitionWipe';
