/**
 * Sound effects utility using Web Audio API
 * Creates simple, pleasant sound effects without external files
 */

class SoundEffects {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      // Load mute preference
      const muted = localStorage.getItem('soundMuted');
      this.enabled = muted !== 'true';
    }
  }

  private createOscillator(
    frequency: number,
    type: OscillatorType = 'sine',
    duration: number = 0.1
  ) {
    if (!this.audioContext || !this.enabled) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.type = type;
    oscillator.frequency.value = frequency;

    // Envelope for smooth sound
    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      this.audioContext.currentTime + duration
    );

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // Play merge sound - higher pitch for higher values
  merge(value: number) {
    if (!this.enabled) return;
    const baseFrequency = 200;
    const frequency = baseFrequency + (value * 50);
    this.createOscillator(frequency, 'sine', 0.15);
  }

  // Play combo sound - escalating pitch
  combo(comboCount: number) {
    if (!this.enabled || !this.audioContext) return;
    
    const frequencies = [400, 500, 600];
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.createOscillator(freq + (comboCount * 20), 'square', 0.1);
      }, index * 50);
    });
  }

  // Play achievement sound - celebratory
  achievement() {
    if (!this.enabled || !this.audioContext) return;
    
    const melody = [523, 659, 784, 1047]; // C5, E5, G5, C6
    melody.forEach((freq, index) => {
      setTimeout(() => {
        this.createOscillator(freq, 'sine', 0.2);
      }, index * 100);
    });
  }

  // Play game over sound - descending
  gameOver() {
    if (!this.enabled || !this.audioContext) return;
    
    const notes = [400, 350, 300, 250];
    notes.forEach((freq, index) => {
      setTimeout(() => {
        this.createOscillator(freq, 'triangle', 0.3);
      }, index * 150);
    });
  }

  // Play button click sound
  click() {
    if (!this.enabled) return;
    this.createOscillator(600, 'square', 0.05);
  }

  // Toggle sound on/off
  toggle() {
    this.enabled = !this.enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundMuted', String(!this.enabled));
    }
    return this.enabled;
  }

  // Check if sound is enabled
  isEnabled() {
    return this.enabled;
  }
}

// Singleton instance
export const soundEffects = new SoundEffects();
