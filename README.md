<h1 align="center">NOVAS</h1> 
<h3 align="center">A build tool that lets developers easily set up <a href='https://github.com/sveltejs/svelte'> Svelte </a> applications in a <a href='https://github.com/denoland/deno'> Deno </a> runtime.</h3>


## Features 


<ul>
  <li>Compiler</li>
  <li>Bundler</li>
  <li>Live Reloading</li>
</ul>

## Overview
- After installing, run the following commands to get started.

```
novas create my-app
cd my-app
novas build
novas dev
```
- After running <code>novas dev</code>, open <a href=http://localhost:5000>http://localhost:5000</a> to see your app.</p>
- Make changes to the .svelte files in the source folder for live reloading on the browser.</p>

## How to install NOVAS

- Install the latest version of <a href="https://deno.land/#installation"> Deno</a>.
- Install NOVAS 

```
deno install --allow-net --allow-read --allow-write --unstable -n novas https://raw.githubusercontent.com/Group6OSP/SvelteDeno/master/cli/cli.ts
```


## How to use NOVAS

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

## Meet the NOVAS team
- Christie Herring
- Garrett Hickman
- Sylvia Liu
- Tanner Peterson
