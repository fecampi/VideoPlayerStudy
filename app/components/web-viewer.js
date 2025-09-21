const { WebView } = require("@nativescript/core");

// ========== WEB VIEWER COMPONENT ==========
// Responsável pela WebView e controles de navegação
class WebViewer {
  constructor(options = {}) {
    this.webView = null;
    this.url = options.url || "https://www.nativescript.org/";
    this.listeners = {};

    this._createWebView();
    this._setupEvents();

    console.log("🌐 WebViewer criado com URL:", this.url);
  }

  _createWebView() {
    console.log("🌐 Criando elemento WebView...");
    this.webView = new WebView();
    this.webView.src = this.url;
    this.webView.width = "100%";
    this.webView.height = "100%";

    // Configurar transparência
    this.webView.backgroundColor = "transparent";
    this.webView.opacity = 0.9; // Ajuste a opacidade (0.0 = totalmente transparente, 1.0 = opaco)

    // Configurações específicas do Android para transparência
    if (this.webView.android) {
      try {
        this.webView.android.setBackgroundColor(0x00000000); // Fundo transparente no Android
        this.webView.android.getSettings().setMixedContentMode(0); // Permitir conteúdo misto
      } catch (e) {
        console.log("⚠️ Erro ao configurar transparência no Android:", e);
      }
    }
  }

  _setupEvents() {
    this.webView.on("loadStarted", (args) => {
      console.log("🔄 WebView carregando:", args.url);
      this._trigger("loadStarted", args.url);
    });

    this.webView.on("loadFinished", (args) => {
      console.log("✅ WebView carregada:", args.url);
      this._trigger("loadFinished", args.url);
    });

    this.webView.on("loadError", (args) => {
      console.log("❌ Erro ao carregar WebView:", args.error);
      this._trigger("loadError", args.error);
    });
  }

  // API pública para controle da WebView
  loadUrl(url) {
    console.log("🔗 Carregando nova URL:", url);
    this.url = url;
    this.webView.src = url;
  }

  goBack() {
    if (this.webView.canGoBack) {
      this.webView.goBack();
      console.log("⬅️ Navegando para trás");
    } else {
      console.log("⚠️ Não é possível voltar");
    }
  }

  goForward() {
    if (this.webView.canGoForward) {
      this.webView.goForward();
      console.log("➡️ Navegando para frente");
    } else {
      console.log("⚠️ Não é possível avançar");
    }
  }

  reload() {
    this.webView.reload();
    console.log("🔄 Recarregando página");
  }

  getCurrentUrl() {
    return this.webView.src;
  }

  getElement() {
    return this.webView;
  }

  // Sistema de eventos personalizado
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

  bindTo(bindingContext) {
    // Pode ser usado para vincular propriedades ao contexto de binding
    console.log("📎 WebViewer vinculado ao binding context");
  }
}

module.exports = { WebViewer };
