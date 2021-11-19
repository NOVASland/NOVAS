<h1 align="center">Svelte/Deno</h1> 
<h3 align="center">A build tool that lets developers easily set up Svelte applications in a Deno runtime.</h3>

<hr/>

<h3 align="left">Features</h3> 
<hr/>
<ul>
  <li>Compiler</li>
  <li>Bundler</li>
  <li>Live Reloading</li>
</ul>

<h3 align="left">Overview</h3> 
<hr/>
<p> After installing, run the following commands to get started. </p>

```
SvelteDeno create my-app
cd my-app
SvelteDeno build
SvelteDeno dev
```
<p> After running <code>Svelte/Deno dev</code>, open <a href=http://localhost:5000>http://localhost:5000</a> to see your app.</p>
<p> Make changes to the .svelte files in the source folder for live reloading on the browser.</p>


<div>
  <h3 align="left">How to install Svelte/Deno</h3> 
  <hr/>
  <p> Install the latest version of <a href="https://deno.land/#installation"> Deno</a>.</p>
  <p> Install SvelteDeno </p>

  ```
  deno install --allow-net --allow-read --allow-write --unstable -n SvelteDeno https://raw.githubusercontent.com/Group6OSP/SvelteDeno/master/cli/cli.ts
  ```
  
</div>
<h3 align="left">How to use Svelte/Deno</h3> 
<hr/>
<p> To create a project, type: </p>

```
SvelteDeno create [project name]
```
<p> To compile, first change directories to the root of the project (<code>cd [project name]</code>) then type: </p>

```
SvelteDeno build
```

<p> To start developing, type: </p>

```
SvelteDeno dev
```

<h3 align="left">Meet the team</h3> 
<hr>
