/**
 * Wedding Audio Controller
 * Exclusively plays the uploaded wedding audio track (3:17 duration).
 * All previous synthesized music and classical drones have been completely removed.
 */

import { ASSETS } from '../config/assets';

class WeddingAudioController {
  private audioElement: HTMLAudioElement | null = null;
  private isHtmlAudioPlaying = false;
  private listeners: Set<(isPlaying: boolean) => void> = new Set();

  public subscribe(listener: (isPlaying: boolean) => void) {
    this.listeners.add(listener);
    listener(this.isPlaying());
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    const state = this.isPlaying();
    this.listeners.forEach((fn) => fn(state));
  }

  public isPlaying(): boolean {
    return this.isHtmlAudioPlaying;
  }

  private initAudio() {
    if (this.audioElement) return;

    this.audioElement = new Audio();
    this.audioElement.src = ASSETS.backgroundMusic;
    this.audioElement.loop = true;
    this.audioElement.volume = 0.5;
    this.audioElement.preload = 'auto';

    this.audioElement.addEventListener('playing', () => {
      this.isHtmlAudioPlaying = true;
      this.notify();
    });

    this.audioElement.addEventListener('pause', () => {
      this.isHtmlAudioPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('ended', () => {
      this.isHtmlAudioPlaying = false;
      this.notify();
    });

    this.audioElement.addEventListener('error', () => {
      // If .mp3 fails, try .wav alternate
      if (this.audioElement && this.audioElement.src.endsWith('.mp3')) {
        this.audioElement.src = ASSETS.backgroundMusicWav;
        this.audioElement.load();
        this.audioElement.play().catch(() => {
          this.isHtmlAudioPlaying = false;
          this.notify();
        });
      }
    });
  }

  public async startMusic(): Promise<boolean> {
    if (this.isPlaying()) return true;

    try {
      this.initAudio();
      if (!this.audioElement) return false;

      const playPromise = this.audioElement.play();
      if (playPromise !== undefined) {
        await playPromise;
        this.isHtmlAudioPlaying = true;
        this.notify();
        return true;
      }
    } catch {
      // Browser autoplay policy might require explicit button tap
      this.isHtmlAudioPlaying = false;
      this.notify();
      return false;
    }

    return false;
  }

  public pauseMusic() {
    if (this.audioElement) {
      this.audioElement.pause();
      this.isHtmlAudioPlaying = false;
      this.notify();
    }
  }

  public async toggleMusic(): Promise<boolean> {
    if (this.isPlaying()) {
      this.pauseMusic();
      return false;
    } else {
      return await this.startMusic();
    }
  }
}

export const weddingAudio = new WeddingAudioController();
