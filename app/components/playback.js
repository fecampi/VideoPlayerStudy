const { Video } = require("@nstudio/nativescript-exoplayer");

// ========== PLAYBACK ==========
// Responsável pela lógica de reprodução do vídeo
class Playback {
  constructor(options = {}) {
    this.src = options.src;
    this.autoplay = options.autoplay || false;
    this.loop = options.loop || false;
    this.isPlaying = false;
    this.video = null;
    this.listeners = {};

    this._createVideoElement();
    this._setupEvents();

    console.log(
      "🎯 Estado inicial - isPlaying:",
      this.isPlaying,
      "autoplay:",
      this.autoplay
    );
  }

  _createVideoElement() {
    console.log("🎬 Criando elemento de vídeo...");
    this.video = new Video();
    this.video.src = this.src;
    this.video.width = "100%";
    this.video.height = "100%";
    this.video.controls = false;
    this.video.autoplay = false;
    this.video.loop = this.loop;
  }

  _setupEvents() {
    this.video.on("readyToPlay", () => {
      this._trigger("readyToPlay");
    });

    this.video.on("started", () => {
      console.log("▶️ Playback iniciado");
      this.isPlaying = true;
      this._trigger("play");
    });

    this.video.on("paused", () => {
      this.isPlaying = false;
      this._trigger("pause");
    });

    this.video.on("error", (args) => {
      this._trigger("error", args.error);
    });
  }

  play() {
    if (this.video && !this.isPlaying) {
      try {
        const result = this.video.play();
        console.log("✅ Play chamado", result);
        this.isPlaying = true;
        this._trigger("play");
      } catch (e) {
        console.log("❌ Erro ao tocar vídeo:", e);
      }
    }
  }

  pause() {
    if (this.video && this.isPlaying) {
      try {
        const result = this.video.pause();
        console.log("⏸️ Pause chamado", result);

        this.isPlaying = false;
        this._trigger("pause");
      } catch (e) {
        console.log("❌ Erro ao pausar vídeo:", e);
      }
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  getElement() {
    return this.video;
  }

  // Sistema de eventos
  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  _trigger(event, data = null) {
    if (this.listeners[event]) {
      this.listeners[event].forEach((callback) => callback(data));
    }
  }
}

module.exports = { Playback };
