const {
  Application,
  Page,
  Observable,
} = require("@nativescript/core");

const { Player } = require("./components/player");

// ========== APPLICATION ==========
function createPage() {
  console.log("🚀 Inicializando aplicação...");
  const page = new Page();

  // Criar instância do player
  const player = new Player({
    src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    autoplay: true,
    loop: true,
  });

  // Configurar binding context
  const viewModel = new Observable();
  page.bindingContext = viewModel;
  player.bindTo(viewModel);

  // Definir conteúdo da página
  page.content = player.getElement();

  return page;
}

console.log("🌟 INICIANDO APLICAÇÃO VideoPlayerStudy");
Application.run({ create: createPage });
