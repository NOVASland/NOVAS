const boilerplate = {
  indexJs: `import App from './src/App.svelte.js';

const socket = new WebSocket("ws://localhost:80");

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

export default app;`,
};

export default boilerplate;
