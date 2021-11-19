const boilerplate = {
indexHtml: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Svelte/Deno" />
    <title>Starter Svelte/Deno</title>
  </head>
  <body>
    <script type="module" src="/src/index.js"></script>
  </body>
</html>`,

indexJs: `import App from './App.svelte.js';

const socket = new WebSocket("ws://localhost:80");
console.log("index.js Listening ws:80", socket)

const reloadWindow = () => {
  window.location.reload();
};

socket.addEventListener("open", function (_event) {
  socket.send("Listening for changes");
});

socket.addEventListener("message", function (event) {
  if (event.data === 'reload window') {
    reloadWindow();
  }
});

const app = new App({
  target: document.body,
});

export default app;`
};

export default boilerplate;