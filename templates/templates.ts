
export const indexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Svelte/Deno" />
    <link rel="stylesheet" type="text/css" href="/index.css" />
    <title>Starter Svelte/Deno</title>
  </head>
  <body>
    <!-- Keep this script. It's how Compiled svelte apps are rendered -->
    <script type="module" src="index.js"></script>
  </body>
</html>`;
  
export const oakServer = (port: string) => {

return `import { Application, send } from 'https://deno.land/x/oak@v9.0.1/mod.ts';
  
const port = ${port};
const app = new Application();

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: \`$\{Deno.cwd()}/build\`,
    index: 'index.html',
  });
});

app.addEventListener('listen', () => {
  console.log(\`🎉 Listening on port $\{port}\`);
});

await app.listen({ port });
`;
}

export const opineServer = (port: string) => {

return `import { opine } from "https://deno.land/x/opine@1.3.3/mod.ts";

const port = ${port};
const app = opine();

app.get("/src/index.js", (req, res, next) => {
  const js = \`$\{Deno.cwd()}/build/src/index.js\`;
  res.sendFile(js);
})

app.get("/src/App.svelte.js", (req, res, next) => {
  const js = \`$\{Deno.cwd()}/build/src/App.svelte.js\`;
  res.sendFile(js);
})

app.use("/", (req, res, _next) => {
  console.log(req.url);
  const html = \`$\{Deno.cwd()}/build/index.html\`;
  res.type("text/html").sendFile(html);
});


app.listen({ port });

console.log(\`🎉 Listening on port $\{port}\`);
`;
}

export const svelteAppComponent = `<script>
let count = 0;

function handleClick() {
  count += 1;
}

const resetCount = () => {
  count -= 1;
}
const src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
</script>

<style>
.counter {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
.app-name {
  font-size: 40px;
  font-weight: bold;
}
img {
  max-height: 25px;
}
.github-container {
  display: flex;
  align-items: center;
}
</style>

<div class="counter">
<p class="app-name">
  Svelte/Deno.
</p>
<p>
  You clicked {count} {count === 1 ? 'time' : 'times'}
</p>
<button  on:click={handleClick}>
  Increment count
</button>
<button on:click={resetCount}>
  Decrement count
</button>
<div class='github-container'>
  <img {src} alt='github logo'>
  <a class='Github' href='https://github.com/Group6OSP/SvelteDeno'>
    Github
  </a>
</div>

</div>
`;

export const mainJs = `// This is where Svelte will be compiled, do not touch!`;


export const indexCSS = `body{
  margin: 0;
  padding: 0;
}`;

export const settingsJson = `{
  "deno.enable": true,
  "deno.lint": true,
  "deno.unstable": true,
  "[typescript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "[javascript]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "[svelte]": {
    "editor.defaultFormatter": "denoland.vscode-deno"
  },
  "deno.suggest.imports.hosts": {
    "https://deno.land": true
  },
}`;

export const defaultConfigFile = () => {
  return `{
    "generate": "dom",
    "sveltePath": "https://cdn.skypack.dev/svelte@3.44.1",
    "hydratable": true,
    "css": true,
    "preserveComments": false,
    "preserveWhitespace": false
  }` 
};