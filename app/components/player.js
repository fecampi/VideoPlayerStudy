const {
  GridLayout,
  StackLayout,
} = require("@nativescript/core");

const { Playback } = require("./playback");
const { MediaControl } = require("./media-control");

// ========== Player ==========
// Responsável pelo layout e composição do player de mídia
class Player {
  constructor(options = {}) {
    this.container = null;
    this.playback = null;
    this.controls = [];

    this._createContainer();
    this._setupPlayback(options);
    this._setupControls();
  }

  _createContainer() {
    this.container = new GridLayout();
    this.container.rows = "*";
    this.container.columns = "*";
  }

  _setupPlayback(options) {
    this.playback = new Playback({
      src:
        options.src ||
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      autoplay: options.autoplay || true,
      loop: options.loop || true,
    });

    if (this.playback.autoplay) {
      setTimeout(() => {
        this.playback.play();
      }, 100);
    }

    // Adicionar vídeo ao container
    const videoElement = this.playback.getElement();
    GridLayout.setRow(videoElement, 0);
    GridLayout.setColumn(videoElement, 0);
    this.container.addChild(videoElement);
  }

  _setupControls() {
    // Criar controles
    const controlsLayout = new StackLayout();
    controlsLayout.verticalAlignment = "bottom";
    controlsLayout.horizontalAlignment = "center";
    controlsLayout.backgroundColor = "rgba(0, 0, 0, 0.7)";
    controlsLayout.padding = "15";
    controlsLayout.marginBottom = "30";

    // Criar botão play/pause
    const playPauseButton = new MediaControl(this.playback);
    controlsLayout.addChild(playPauseButton.getElement());

    // Posicionar controles
    GridLayout.setRow(controlsLayout, 0);
    GridLayout.setColumn(controlsLayout, 0);
    this.container.addChild(controlsLayout);

    this.controls.push(playPauseButton);
  }

  getElement() {
    return this.container;
  }

  bindTo(bindingContext) {
    this.controls.forEach((control) => {
      if (control.bindTo) {
        control.bindTo(bindingContext);
      }
    });
  }
}

module.exports = { Player };
