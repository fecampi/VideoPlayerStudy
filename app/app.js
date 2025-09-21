const { Application, Page, GridLayout, StackLayout, Label, Button, Observable } = require("@nativescript/core");

// Testando o import do vídeo primeiro
console.log("📦 Importando plugin de vídeo...");
const { Video } = require("@nstudio/nativescript-exoplayer");
console.log("✅ Plugin de vídeo importado com sucesso");

function createPage() {
  console.log("🚀 Criando página...");
  const page = new Page();

  // ViewModel reativo
  const vm = new Observable();
  vm.set("isPlaying", true); // Estado do vídeo (inicia tocando)
  vm.set("buttonText", "PAUSE"); // Texto do botão sem emojis
  page.bindingContext = vm;

  // GridLayout para permitir sobreposição
  const gridLayout = new GridLayout();
  gridLayout.rows = "*"; // Uma linha ocupando toda altura
  gridLayout.columns = "*"; // Uma coluna ocupando toda largura

  // VÍDEO EM TELA CHEIA (camada de fundo)
  console.log("🎬 Criando componente de vídeo...");
  const video = new Video();
  video.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  video.width = "100%";
  video.height = "100%";
  video.controls = false; // Sem controles para ficar limpo
  video.autoplay = true;
  video.loop = true;

  // Posicionar vídeo na grade (linha 0, coluna 0)
  GridLayout.setRow(video, 0);
  GridLayout.setColumn(video, 0);

  // Adicionando listeners para debug e sincronização
  video.on("readyToPlay", () => {
    console.log("✅ Vídeo pronto para tocar");
  });

  video.on("started", () => {
    console.log("▶️ Vídeo iniciado");
    vm.set("isPlaying", true);
    vm.set("buttonText", "PAUSE");
  });

  video.on("paused", () => {
    console.log("⏸️ Vídeo pausado");
    vm.set("isPlaying", false);
    vm.set("buttonText", "PLAY");
  });

  video.on("error", (args) => {
    console.log("❌ Erro no vídeo:", args.error);
  });

  gridLayout.addChild(video);
  console.log("✅ Vídeo adicionado ao layout");

  // CONTROLES SOBREPOSTOS
  const controlsLayout = new StackLayout();
  controlsLayout.verticalAlignment = "bottom";
  controlsLayout.horizontalAlignment = "center";
  controlsLayout.backgroundColor = "rgba(0, 0, 0, 0.7)";
  controlsLayout.padding = "15";
  controlsLayout.marginBottom = "30";

  // Posicionar controles na mesma posição (sobreposição)
  GridLayout.setRow(controlsLayout, 0);
  GridLayout.setColumn(controlsLayout, 0);

  // Botão de Play/Pause estilo player
  const playPauseButton = new Button();
  playPauseButton.bind({
    sourceProperty: "buttonText",
    targetProperty: "text"
  });
  playPauseButton.color = "white";
  playPauseButton.backgroundColor = "transparent";
  playPauseButton.borderColor = "white";
  playPauseButton.borderWidth = "2";
  playPauseButton.borderRadius = "5";
  playPauseButton.width = "100";
  playPauseButton.height = "45";
  playPauseButton.fontSize = "14";
  playPauseButton.fontWeight = "bold";

  playPauseButton.on("tap", () => {
    const isPlaying = vm.get("isPlaying");

    if (isPlaying) {
      // Pausar vídeo
      video.pause();
      vm.set("isPlaying", false);
      vm.set("buttonText", "PLAY");
      console.log("⏸️ Vídeo pausado");
    } else {
      // Tocar vídeo
      video.play();
      vm.set("isPlaying", true);
      vm.set("buttonText", "PAUSE");
      console.log("▶️ Vídeo tocando");
    }
  });

  controlsLayout.addChild(playPauseButton);  gridLayout.addChild(controlsLayout);

  page.content = gridLayout;
  return page;
}

Application.run({ create: createPage });
