<h1 align="center">NOVAS</h1> 
<h3 align="center">A <a href="https://novas.land/"> build tool </a> that lets developers easily set up <a href='https://github.com/sveltejs/svelte'> Svelte </a> applications in a <a href='https://github.com/denoland/deno'> Deno </a> runtime.</h3>


## ✨ Features 


<ul>
  <li>Compiler</li>
  <li>Bundler</li>
  <li>Live Reloading</li>
</ul>

## 💫  Overview
- After installing, run the following commands to get started.

```
novas create my-app
cd my-app
novas build
novas dev
```
- After running <code>novas dev</code>, open <a href=http://localhost:3000>http://localhost:3000</a> to see your app.</p>
- Make changes to the .svelte files in the source folder for live reloading on the browser.</p>

## 💻 How to install NOVAS

- Install the latest version of <a href="https://deno.land/#installation"> Deno</a>.
- Install NOVAS 

```
deno install --allow-net --allow-read --allow-write --unstable https://deno.land/x/novas/cli.ts
```
<details><summary>About Permissions</summary>
<ul>
  <li>--allow-net: Required for the dev server. </li>
  <li> --allow-read: Allows NOVAS to compile svelte files.</li>
  <li> --allow-write: Allows NOVAS to write to files it creates during the <code>novas build</code> process</li>
  <li> --unstable: Allows the use of Deno's standard modules which might not be stable yet.</li>
</ul>
Read more about <a href="https://deno.land/manual@v1.16.2/getting_started/permissions">permissions</a> or <a href="https://deno.land/manual/runtime/stability">stability</a> here
</details>

## ⭐ How to use NOVAS

- To create a project, type: 

```
novas create [project name]
```
- To compile, first change directories to the root of the project (<code>cd [project name]</code>) then type:

```
novas build
```

- To start developing, type: 

```
novas dev
```

- This will start up the development server and will open a websocket listening for any changes to the <code>./src</code> folder. Upon saving changes, your svelte code will be compiled again and the browser will reload to reflect the changes.

## Read More
- <a href='https://medium.com/codex/novas-accelerating-svelte-and-deno-application-generation-3371c395461a'>NOVAS: Accelerating Svelte and Deno Application Creation </a>

## ➕ Contributing
As an open-source product, we value your help! 
- To contribute, please submit a PR with a descriptive title or create an issue to discuss with other contributors before proceeding. 

## 👋 Meet the NOVAS team
- <a href='https://github.com/clherring'>Christie Herring</a>
- <a href='https://github.com/grhhhh'>Garrett Hickman</a>
- <a href='https://github.com/liusylvia'>Sylvia Liu</a>
- <a href='https://github.com/tanpeterson'>Tanner Peterson</a>

<h3 align='center'>Developed Under OS Labs</h3>
