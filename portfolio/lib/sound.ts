/** Tiny Web Audio synth for the intro (no audio files). Respects a persisted mute flag. */

const KEY = "portfolio-sound";
let ctx: AudioContext | null = null;
let chimed = false;

export const isMuted = () => typeof window !== "undefined" && localStorage.getItem(KEY) === "off";
export const setMuted = (m: boolean) => {
  localStorage.setItem(KEY, m ? "off" : "on");
  window.dispatchEvent(new Event("sound-change"));
};
export const onSoundChange = (cb: () => void) => {
  window.addEventListener("sound-change", cb);
  return () => window.removeEventListener("sound-change", cb);
};

function audio() {
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  ctx ??= new AC();
  return ctx;
}

function whoosh(c: AudioContext, t: number, dur: number) {
  const len = Math.floor(c.sampleRate * dur);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buf;
  const f = c.createBiquadFilter();
  f.type = "bandpass";
  f.Q.value = 1.1;
  f.frequency.setValueAtTime(250, t);
  f.frequency.exponentialRampToValueAtTime(4200, t + dur);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.22, t + dur * 0.6);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(c.destination);
  src.start(t);
}

function tick(c: AudioContext, t: number) {
  const o = c.createOscillator();
  o.type = "triangle";
  o.frequency.value = 900 + Math.random() * 1800;
  const g = c.createGain();
  g.gain.setValueAtTime(0.05, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
  o.connect(g).connect(c.destination);
  o.start(t);
  o.stop(t + 0.06);
}

function chime(c: AudioContext, t: number) {
  [523.25, 659.25, 783.99, 1046.5].forEach((hz, i) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = hz;
    const g = c.createGain();
    const s = t + i * 0.09;
    g.gain.setValueAtTime(0.0001, s);
    g.gain.exponentialRampToValueAtTime(0.13, s + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, s + 1.3);
    o.connect(g).connect(c.destination);
    o.start(s);
    o.stop(s + 1.4);
  });
}

/**
 * Whoosh + ticks while the chips fly in, chime when the portrait is complete.
 * Browsers block audio until the user interacts: if so, play just the chime on the first gesture.
 */
export function playWelcome(duration: number) {
  if (isMuted()) return;
  const c = audio();
  const full = () => {
    const t = c.currentTime + 0.05;
    whoosh(c, t, duration);
    for (let i = 0; i < 22; i++) tick(c, t + 0.3 + Math.random() * (duration - 0.4));
    chime(c, t + duration);
    chimed = true;
  };
  const onGesture = () => {
    ["pointerdown", "keydown", "touchend"].forEach((e) => window.removeEventListener(e, onGesture));
    if (chimed || isMuted()) return;
    c.resume().then(() => {
      if (c.state === "running") {
        chime(c, c.currentTime + 0.05);
        chimed = true;
      }
    });
  };
  c.resume().catch(() => {});
  if (c.state === "running") {
    full();
  } else {
    ["pointerdown", "keydown", "touchend"].forEach((e) => window.addEventListener(e, onGesture));
  }
}
