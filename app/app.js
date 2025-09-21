const {
  Application,
  Page,
  Observable,
  GridLayout,
  StackLayout,
  Button,
} = require("@nativescript/core");

const { Player } = require("./components/player");
const { WebViewer } = require("./components/web-viewer");

// ========== APPLICATION ==========
function createPage() {
  console.log("🚀 Inicializando aplicação...");
  const page = new Page();

  // ViewModel para controlar a navegação
  const viewModel = new Observable();
  viewModel.set("showPlayer", true);
  viewModel.set("showWebView", false);
  viewModel.set("webViewOverlay", false); // Novo: controlar sobreposição
  viewModel.set("currentView", "player");
  page.bindingContext = viewModel;

  // Layout principal
  const mainLayout = new GridLayout();
  mainLayout.rows = "auto, *";
  mainLayout.columns = "*";

  // Barra de navegação com botões
  const navLayout = new StackLayout();
  navLayout.orientation = "horizontal";
  navLayout.horizontalAlignment = "center";
  navLayout.backgroundColor = "#333";
  navLayout.padding = "10";
  GridLayout.setRow(navLayout, 0);

  // Botão para mostrar player
  const playerButton = new Button();
  playerButton.text = "📹 Video Player";
  playerButton.backgroundColor = "#007ACC";
  playerButton.color = "white";
  playerButton.margin = "5";
  playerButton.borderRadius = "5";
  playerButton.on("tap", () => {
    console.log("🎬 Mostrando Video Player");
    viewModel.set("showPlayer", true);
    viewModel.set("showWebView", false);
    viewModel.set("currentView", "player");
  });

  // Botão para mostrar webview
  const webButton = new Button();
  webButton.text = "🌐 Web View";
  webButton.backgroundColor = "#28A745";
  webButton.color = "white";
  webButton.margin = "5";
  webButton.borderRadius = "5";
  webButton.on("tap", () => {
    console.log("🌐 Mostrando Web View");
    viewModel.set("showPlayer", false);
    viewModel.set("showWebView", true);
    viewModel.set("webViewOverlay", false);
    viewModel.set("currentView", "webview");
  });

  // Botão para sobrepor webview
  const overlayButton = new Button();
  overlayButton.text = "🎭 Overlay";
  overlayButton.backgroundColor = "#FF6B35";
  overlayButton.color = "white";
  overlayButton.margin = "5";
  overlayButton.borderRadius = "5";
  overlayButton.on("tap", () => {
    console.log("🎭 Ativando modo overlay");
    viewModel.set("showPlayer", true);
    viewModel.set("showWebView", true);
    viewModel.set("webViewOverlay", true);
    viewModel.set("currentView", "overlay");
  });

  navLayout.addChild(playerButton);
  navLayout.addChild(webButton);
  navLayout.addChild(overlayButton);
  mainLayout.addChild(navLayout);

  // Container para o conteúdo
  const contentLayout = new GridLayout();
  contentLayout.rows = "*";
  contentLayout.columns = "*";
  GridLayout.setRow(contentLayout, 1);

  // Criar instância do player
  const player = new Player({
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    autoplay: true,
    loop: true,
  });
  player.bindTo(viewModel);

  // Criar instância do WebViewer com transparência
  const webViewer = new WebViewer({
    url: "https://www.google.com" // URL mais simples para teste de overlay
  });
  webViewer.bindTo(viewModel);

  // Inicialmente, ocultar o WebViewer
  webViewer.getElement().visibility = "collapse";

  // Posicionar elementos no content layout
  GridLayout.setRow(player.getElement(), 0);
  GridLayout.setColumn(player.getElement(), 0);

  GridLayout.setRow(webViewer.getElement(), 0);
  GridLayout.setColumn(webViewer.getElement(), 0);

  contentLayout.addChild(player.getElement());
  contentLayout.addChild(webViewer.getElement());
  mainLayout.addChild(contentLayout);

  // Binding para controlar visibilidade e sobreposição
  viewModel.on("propertyChange", (args) => {
    if (args.propertyName === "showPlayer") {
      player.getElement().visibility = args.value ? "visible" : "collapse";
    }
    if (args.propertyName === "showWebView") {
      webViewer.getElement().visibility = args.value ? "visible" : "collapse";
    }
    if (args.propertyName === "webViewOverlay") {
      if (args.value) {
        // Modo overlay: WebView fica por cima do player
        console.log("🎭 Ativando modo overlay - WebView transparente sobre o player");
        webViewer.getElement().opacity = 0.7; // Mais transparente no modo overlay
      } else {
        // Modo normal: opacidade padrão
        webViewer.getElement().opacity = 0.9;
      }
    }
  });  // Definir conteúdo da página
  page.content = mainLayout;

  return page;
}

console.log("🌟 INICIANDO APLICAÇÃO VideoPlayerStudy");
Application.run({ create: createPage });
