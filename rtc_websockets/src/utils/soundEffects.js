// Sound effects utility for chat notifications
class SoundEffects {
  constructor() {
    this.sounds = {};
    this.enabled = true;
    this.init();
  }

  init() {
    try {
      // Create audio contexts for different sounds
      this.createMessageSound();
      this.createNotificationSound();
      this.createTypingSound();
    } catch (error) {
      console.warn("Sound effects initialization failed:", error);
      this.enabled = false;
    }
  }

  createMessageSound() {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(
        600,
        audioContext.currentTime + 0.1
      );

      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.1
      );

      this.sounds.message = { audioContext, oscillator, gainNode };
    } catch (error) {
      console.warn("Message sound creation failed:", error);
    }
  }

  createNotificationSound() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      800,
      audioContext.currentTime + 0.2
    );

    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.2
    );

    this.sounds.notification = { audioContext, oscillator, gainNode };
  }

  createTypingSound() {
    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      300,
      audioContext.currentTime + 0.05
    );

    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.05
    );

    this.sounds.typing = { audioContext, oscillator, gainNode };
  }

  playMessageSound() {
    if (!this.enabled || !this.sounds.message) return;

    const { audioContext, oscillator, gainNode } = this.sounds.message;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }

  playNotificationSound() {
    if (!this.enabled || !this.sounds.notification) return;

    const { audioContext, oscillator, gainNode } = this.sounds.notification;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);
  }

  playTypingSound() {
    if (!this.enabled || !this.sounds.typing) return;

    const { audioContext, oscillator, gainNode } = this.sounds.typing;

    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export default new SoundEffects();
