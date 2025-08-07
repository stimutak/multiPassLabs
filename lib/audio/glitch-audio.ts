/**
 * Glitch Audio System
 * Richard Devine-inspired procedural audio generation
 * Creates glitchy, atmospheric sounds for the terminal experience
 */

export class GlitchAudioSystem {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isInitialized = false;
  private activeNodes: Set<AudioNode> = new Set();

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  async init(): Promise<void> {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.3;
      this.masterGain.connect(this.audioContext.destination);
      this.isInitialized = true;
    } catch (error) {
      console.warn('Audio context initialization failed:', error);
    }
  }

  /**
   * Play a boot sequence sound
   */
  async playBootSound(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;

    // Create a series of beeps with increasing frequency
    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.frequency.value = 200 + (i * 100);
      osc.type = 'square';
      
      gain.gain.setValueAtTime(0, now + i * 0.15);
      gain.gain.linearRampToValueAtTime(0.1, now + i * 0.15 + 0.01);
      gain.gain.linearRampToValueAtTime(0, now + i * 0.15 + 0.1);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      osc.start(now + i * 0.15);
      osc.stop(now + i * 0.15 + 0.1);
      
      this.trackNode(osc);
    }
  }

  /**
   * Play system check sound (quick chirp)
   */
  async playSystemCheckSound(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);
    osc.type = 'sawtooth';
    
    filter.type = 'bandpass';
    filter.frequency.value = 1200;
    filter.Q.value = 10;
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.05);
    
    this.trackNode(osc);
  }

  /**
   * Play glitch sound effect
   */
  async playGlitchSound(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    const duration = 0.1 + Math.random() * 0.2;
    
    // Noise generator
    const bufferSize = this.audioContext.sampleRate * duration;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() - 0.5) * 0.5;
      // Add some digital artifacts
      if (Math.random() > 0.95) {
        data[i] = Math.random() > 0.5 ? 1 : -1;
      }
    }
    
    const noise = this.audioContext.createBufferSource();
    noise.buffer = buffer;
    
    // Filters for shaping the glitch
    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'highpass';
    filter1.frequency.value = 1000 + Math.random() * 2000;
    filter1.Q.value = Math.random() * 10;
    
    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'peaking';
    filter2.frequency.setValueAtTime(500, now);
    filter2.frequency.exponentialRampToValueAtTime(5000, now + duration);
    filter2.Q.value = 20;
    filter2.gain.value = 10;
    
    const gain = this.audioContext.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    
    // Distortion
    const distortion = this.audioContext.createWaveShaper();
    const curve = this.makeDistortionCurve(50);
    // @ts-expect-error - TypeScript strict mode issue with ArrayBufferLike vs ArrayBuffer
    distortion.curve = curve;
    
    noise.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(distortion);
    distortion.connect(gain);
    gain.connect(this.masterGain);
    
    noise.start(now);
    noise.stop(now + duration);
    
    this.trackNode(noise);
  }

  /**
   * Play ambient drone sound
   */
  async playAmbientDrone(duration: number = 5): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    
    // Create multiple oscillators for a rich drone
    const oscillators: OscillatorNode[] = [];
    const gains: GainNode[] = [];
    
    const fundamentalFreq = 50 + Math.random() * 30;
    
    for (let i = 0; i < 4; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const pan = this.audioContext.createStereoPanner();
      
      // Harmonic frequencies with slight detuning
      osc.frequency.value = fundamentalFreq * (i + 1) + (Math.random() - 0.5) * 2;
      osc.type = i % 2 === 0 ? 'sine' : 'triangle';
      
      // Slow frequency modulation
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      lfo.frequency.value = 0.1 + Math.random() * 0.3;
      lfoGain.gain.value = 2;
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start(now);
      lfo.stop(now + duration);
      
      // Amplitude envelope
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.02 / (i + 1), now + 0.5);
      gain.gain.setValueAtTime(0.02 / (i + 1), now + duration - 0.5);
      gain.gain.linearRampToValueAtTime(0, now + duration);
      
      // Stereo positioning
      pan.pan.value = (Math.random() - 0.5) * 0.8;
      
      osc.connect(gain);
      gain.connect(pan);
      pan.connect(this.masterGain);
      
      osc.start(now);
      osc.stop(now + duration);
      
      oscillators.push(osc);
      gains.push(gain);
      this.trackNode(osc);
      this.trackNode(lfo);
    }
  }

  /**
   * Play typing sound effect
   */
  async playTypingSound(): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    
    // Short click sound
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    
    osc.frequency.value = 2000 + Math.random() * 1000;
    osc.type = 'square';
    
    gain.gain.setValueAtTime(0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.01);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.01);
    
    this.trackNode(osc);
  }

  /**
   * Play entity signature sound (unique per entity)
   */
  async playEntitySound(entityId: string): Promise<void> {
    if (!this.audioContext || !this.masterGain) return;

    const now = this.audioContext.currentTime;
    
    // Generate unique parameters based on entity ID
    const hash = this.hashCode(entityId);
    const baseFreq = 200 + (hash % 800);
    const modFreq = 1 + (hash % 10);
    const filterFreq = 500 + (hash % 3000);
    
    const osc = this.audioContext.createOscillator();
    const modOsc = this.audioContext.createOscillator();
    const modGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const gain = this.audioContext.createGain();
    
    // Main oscillator
    osc.frequency.value = baseFreq;
    osc.type = ['sine', 'square', 'sawtooth', 'triangle'][hash % 4] as OscillatorType;
    
    // Modulation
    modOsc.frequency.value = modFreq;
    modGain.gain.value = 50;
    modOsc.connect(modGain);
    modGain.connect(osc.frequency);
    
    // Filter
    filter.type = 'bandpass';
    filter.frequency.value = filterFreq;
    filter.Q.value = 5 + (hash % 10);
    
    // Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start(now);
    osc.stop(now + 0.3);
    modOsc.start(now);
    modOsc.stop(now + 0.3);
    
    this.trackNode(osc);
    this.trackNode(modOsc);
  }

  /**
   * Set master volume
   */
  setVolume(volume: number): void {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }

  /**
   * Mute/unmute audio
   */
  toggleMute(): boolean {
    if (this.masterGain) {
      const isMuted = this.masterGain.gain.value === 0;
      this.masterGain.gain.value = isMuted ? 0.3 : 0;
      return !isMuted;
    }
    return false;
  }

  /**
   * Clean up audio context
   */
  dispose(): void {
    this.activeNodes.forEach(node => {
      try {
        if ('stop' in node && typeof node.stop === 'function') {
          node.stop();
        }
        if ('disconnect' in node && typeof node.disconnect === 'function') {
          node.disconnect();
        }
      } catch {
        // Node might already be stopped
      }
    });
    
    this.activeNodes.clear();
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
    }
    
    this.audioContext = null;
    this.masterGain = null;
    this.isInitialized = false;
  }

  /**
   * Helper: Create distortion curve
   */
  private makeDistortionCurve(amount: number): Float32Array {
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    
    return curve;
  }

  /**
   * Helper: Track audio nodes for cleanup
   */
  private trackNode(node: AudioNode): void {
    this.activeNodes.add(node);
    
    if ('onended' in node) {
      (node as any).onended = () => {
        this.activeNodes.delete(node);
      };
    }
  }

  /**
   * Helper: Generate hash code from string
   */
  private hashCode(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }
}

// Singleton instance
let audioSystemInstance: GlitchAudioSystem | null = null;

export function getAudioSystem(): GlitchAudioSystem {
  if (!audioSystemInstance) {
    audioSystemInstance = new GlitchAudioSystem();
  }
  return audioSystemInstance;
}

// Convenience functions
export const initAudio = () => getAudioSystem().init();
export const playBootSound = () => getAudioSystem().playBootSound();
export const playSystemCheckSound = () => getAudioSystem().playSystemCheckSound();
export const playGlitchSound = () => getAudioSystem().playGlitchSound();
export const playAmbientDrone = (duration?: number) => getAudioSystem().playAmbientDrone(duration);
export const playTypingSound = () => getAudioSystem().playTypingSound();
export const playEntitySound = (entityId: string) => getAudioSystem().playEntitySound(entityId);
export const setAudioVolume = (volume: number) => getAudioSystem().setVolume(volume);
export const toggleAudioMute = () => getAudioSystem().toggleMute();