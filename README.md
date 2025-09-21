# VideoPlayerStudy

Projeto de estudo de NativeScript com player de vídeo em JavaScript puro, sem XML, usando `@nstudio/nativescript-exoplayer`.

---

## 1. Pré-requisitos

Antes de rodar o projeto, você precisa ter instalado:

- Node.js (recomenda-se LTS ou versão estável)
- npm
- NativeScript CLI
- Java JDK (11 ou superior)
- Android SDK e ferramentas de build
- Emulador Android ou dispositivo físico

---

## 2. Configuração do ambiente Android (Linux/macOS)

1. Defina o SDK do Android no seu `.zshrc` ou `.bashrc`:

```bash
export ANDROID_SDK_ROOT=$HOME/Android
export PATH=$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$ANDROID_SDK_ROOT/platform-tools:$PATH
```

2. Recarregue as variáveis de ambiente:

```bash
source ~/.zshrc
```

3. Instale as ferramentas necessárias do SDK:

```bash
sdkmanager --install "platform-tools" "platforms;android-34" "build-tools;34.0.0"
```

4. Verifique se as ferramentas estão acessíveis:

```bash
which sdkmanager
which adb
```

---

## 3. Criando e rodando o projeto NativeScript

1. Criar o projeto (JavaScript puro):

```bash
ns create VideoPlayerStudy --js
cd VideoPlayerStudy
```

2. Rodar o emulador Android:

```bash
emulator -list-avds      # lista os emuladores disponíveis
emulator -avd Pixel34    # substitua "Pixel34" pelo seu AVD
```

3. Instalar o plugin de vídeo:

```bash
npm install @nstudio/nativescript-exoplayer
```

---


## 5. Rodando o aplicativo

No terminal:

```bash
ns run android
```

Ou, para iOS (apenas no macOS):

```bash
ns run ios
```

---

## 6. Observações

- Este projeto não usa XML, toda a UI é criada dinamicamente em JavaScript.
- Usa o plugin moderno `@nstudio/nativescript-exoplayer` para reprodução de vídeos com ExoPlayer.
- O ExoPlayer oferece melhor performance e recursos mais avançados que o plugin antigo.
- Certifique-se de que o emulador esteja rodando antes de executar `ns run android`.

---

