
export const indexHTML = `<!DOCTYPE html>
<html lang="en">
  <head>
    <link rel="icon" href="data:;base64,=">
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Starter NOVAS app" />
    <title>Starter NOVAS app</title>
  </head>
  <body>
    <!-- Keep this script. It's how compiled svelte apps are rendered -->
    <script type="module" src="../build/index.js"></script>
  </body>
</html>`;
export const svelteComponent=`<script>
const src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png'
</script>
<div class='github-container'>
  <img {src} alt='github logo'>
  <a class='Github' href='https://github.com/NOVASland/NOVAS'>
    Github
  </a>
</div>
<style>
img {
  max-height: 25px;
}
.github-container {
  display: flex;
  align-items: center;
}
</style>
`
export const svelteAppComponent = `<script>
import Component from './component.svelte';
let count = 0;

function handleClick() {
  count += 1;
}

const resetCount = () => {
  count -= 1;
}
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
</style>

<div class="counter">
<p class="app-name">
  NOVAS
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
<Component/>

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
    "sveltePath": "https://cdn.skypack.dev/svelte@3.42.3",
    "hydratable": true,
  }` 
