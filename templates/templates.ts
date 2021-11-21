
export const indexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" href="data:;base64,=">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter Svelte/Deno" />
    <title>Starter Svelte/Deno</title>
  </head>
  <body>
    <!-- Keep this script. It's how Compiled svelte apps are rendered -->
    <script type="module" src="../build/index.js"></script>
  </body>
</html>`;

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
:global(body) {
  margin: 0px;
  background-color: #fe2;
}
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

export const mainJs = `// This is a placeholder for rendering the svelte files after running NOVA build in the root directory.`;

export const vscodeDenoSettings = `{
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

export const defaultConfigFile =`{
    "generate": "dom",
    "sveltePath": "https://cdn.skypack.dev/svelte@3.44.1",
    "hydratable": true,
  }` 
