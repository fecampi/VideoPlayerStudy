const {
  Button,
  Observable,
} = require("@nativescript/core");

// ========== CONTROL UI COMPONENT ==========
// Responsável pela interface e controles
class MediaControl {
  constructor(playback, options = {}) {
    this.playback = playback;
    this.viewModel = new Observable();
    this.button = null;

    this._createButton();
    this._setupBindings();
    this._setupEvents();
  }

  _createButton() {
    this.button = new Button();
    this.button.color = "white";
    this.button.backgroundColor = "transparent";
    this.button.borderColor = "white";
    this.button.borderWidth = "2";
    this.button.borderRadius = "5";
    this.button.width = "100";
    this.button.height = "45";
    this.button.fontSize = "14";
    this.button.fontWeight = "bold";
  }

  _setupBindings() {
    // Sempre começa com PLAY
    const initialText = "PLAY";
    this.button.text = initialText;

    // Configurar o ViewModel para o binding context
    this.viewModel.set("buttonText", initialText);
    this.button.bindingContext = this.viewModel;

    // Fazer o binding
    this.button.bind({
      sourceProperty: "buttonText",
      targetProperty: "text",
    });
  }

  _setupEvents() {
    // Evento de clique do botão
    this.button.on("tap", () => {
      this.playback.toggle();
    });

    // Escutar eventos do playback
    this.playback.on("play", () => {
      this.viewModel.set("buttonText", "PAUSE");
    });

    this.playback.on("pause", () => {
      this.viewModel.set("buttonText", "PLAY");
    });
  }

  getElement() {
    return this.button;
  }

  bindTo(bindingContext) {
    console.log("📎 Binding configurado para o botão");
  }
}

module.exports = { MediaControl };
