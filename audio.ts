// Pure Web Audio API Sound Synthesizer for Hello Kitty Love Haven

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export const playSound = (type: 'sparkle' | 'chime' | 'pop' | 'kiss' | 'harp' | 'heart' | 'open', enabled = true) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'sparkle') {
      // High delicate crystalline twinkle
      const freqs = [1046.5, 1318.5, 1567.98, 2093.0]; // C6, E6, G6, C7
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.08, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.35);
      });
    } else if (type === 'pop') {
      // Cute bubble pop
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'chime' || type === 'heart') {
      // Sweet romantic two-tone chord
      const chords = [523.25, 659.25, 783.99, 1046.5]; // C Major
      chords.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.04);

        gain.gain.setValueAtTime(0.07, now + i * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.04);
        osc.stop(now + i * 0.04 + 0.65);
      });
    } else if (type === 'harp') {
      // Bouquet gift celebration glissando
      const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51, 1760];
      notes.forEach((note, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(note, now + i * 0.06);

        gain.gain.setValueAtTime(0.1, now + i * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.8);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + i * 0.06);
        osc.stop(now + i * 0.06 + 0.85);
      });
    } else if (type === 'open') {
      // Envelope unsealing sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now); // D5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2); // A5

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch {
    // Ignore audio autoplay restrictions gracefully
  }
};

// Gentle ambient music synthesizer (soft cute lofi music box loop)
let musicInterval: ReturnType<typeof setInterval> | null = null;

const LOFI_MELODY = [
  // Sweet gentle lullaby arpeggio in F Major
  { note: 349.23, dur: 0.8 }, // F4
  { note: 440.00, dur: 0.8 }, // A4
  { note: 523.25, dur: 0.8 }, // C5
  { note: 659.25, dur: 1.2 }, // E5
  { note: 523.25, dur: 0.8 }, // C5
  { note: 440.00, dur: 0.8 }, // A4
  { note: 392.00, dur: 0.8 }, // G4
  { note: 493.88, dur: 0.8 }, // B4
  { note: 587.33, dur: 1.2 }, // D5
  { note: 523.25, dur: 1.6 }, // C5
];

export const startAmbientMusic = () => {
  if (musicInterval) return;
  let noteIndex = 0;

  musicInterval = setInterval(() => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const current = LOFI_MELODY[noteIndex];
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(current.note, now);

      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + current.dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + current.dur + 0.1);

      noteIndex = (noteIndex + 1) % LOFI_MELODY.length;
    } catch {
      // Audio autoplay suppression
    }
  }, 900);
};

export const stopAmbientMusic = () => {
  if (musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
};
