let audioCtx: AudioContext | null = null;
let bgMusic: HTMLAudioElement | null = null;

/**
 * Plays the looping background music.
 */
export const playBackgroundMusic = () => {
  if (typeof window === 'undefined') return;
  try {
    if (!bgMusic) {
      bgMusic = new Audio('/undertale.mp3');
      bgMusic.loop = true;
      bgMusic.volume = 0.35;
    }
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {
        // Blocked by autoplay policies, will retry on click
      });
    }
  } catch (e) {
    // Silent catch
  }
};

/**
 * Stops the looping background music.
 */
export const stopBackgroundMusic = () => {
  try {
    if (bgMusic) {
      bgMusic.pause();
    }
  } catch (e) {
    // Silent catch
  }
};

/**
 * Lazy initializer for AudioContext, handles browser resume patterns
 */
const getAudioContext = (): AudioContext | null => {
  if (typeof window === 'undefined') return null;
  
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  
  if (audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {
      // Quiet fail if browser gesture policy still blocks it
    });
  }
  
  return audioCtx;
};

/**
 * Plays a classic Undertale text tick sound (short triangle wave pulse, louder and crisper)
 */
export const playDialogueTick = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now); // Satisfying retro character tone
    
    // Snappy envelope at 0.15 volume
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.04);
  } catch (err) {
    // Handle error silently
  }
};

/**
 * Plays the SAVE chime (sweet ascending arpeggio C5 -> E5 -> G5)
 */
export const playSaveChime = () => {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    
    const now = ctx.currentTime;
    
    const playNote = (freq: number, delay: number) => {
      const startTime = now + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0.06, startTime); // Moderate, comfortable volume
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.22); // Sweet decay
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 0.25);
    };
    
    // Ascending arpeggio C5 (523.25 Hz) -> E5 (659.25 Hz) -> G5 (783.99 Hz)
    playNote(523.25, 0.0);
    playNote(659.25, 0.08);
    playNote(783.99, 0.16);
  } catch (err) {
    // Handle error silently
  }
};
