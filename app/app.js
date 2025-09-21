const { Application, Page, StackLayout, Label, Button, Observable } = require("@nativescript/core");

function createPage() {
  const page = new Page();

  // ViewModel reativo
  const vm = new Observable();
  vm.set("contador", 0);
  page.bindingContext = vm;

  // Layout
  const layout = new StackLayout();

  // Label que mostra o contador
  const label = new Label();
  label.bind({
    sourceProperty: "contador",
    targetProperty: "text"
  });

  // Botão que incrementa o contador
  const button = new Button();
  button.text = "Incrementar";
  button.on("tap", () => {
    vm.set("contador", vm.get("contador") + 1);
  });

  layout.addChild(label);
  layout.addChild(button);

  page.content = layout;
  return page;
}

Application.run({ create: createPage });
