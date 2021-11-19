import { compile } from "https://cdn.jsdelivr.net/npm/svelte@3.42.3/compiler.mjs";
import { ensureFile } from "https://deno.land/std@0.113.0/fs/mod.ts"; // Requires --unstable flag
import { join } from "https://deno.land/std@0.113.0/path/mod.ts";
import boilerplate from "../templates/build.ts";

type compiledFiles = { [fileName: string]: string };

/**
 * Function to get all project files in the directory.
 * @param {string[]} file An array of svelte files.
 */
export const getProjectDir = async (currentPath: string): Promise<string[]> => {
  const projectNestedDir: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    // Ignores build/dist folders. Change later to ignore build folder input by user in config.json
    if (
      dirEntry.name === "build" || dirEntry.name === "dist" ||
      dirEntry.name === "server"
    ) {
      continue;
    }

    const entryPath = `${currentPath}/${dirEntry.name}`;
    projectNestedDir.push(entryPath);

    if (dirEntry.isDirectory) {
      projectNestedDir.push(...await getProjectDir(entryPath));
    }
  }
  return projectNestedDir;
};

/**
 * Function to get all the .svelte files in the project.
 * @param {string[]} file An array of svelte files.
 */
export const getSvelteFiles = (files: string[]): string[] => {
  const svelteFiles: string[] = files?.filter((file: string) =>
    file.endsWith(".svelte")
  );
  return svelteFiles;
};

/**
 * Changes each .svelte import inside a compiled svelte app into .svelte.js.
 * @param svelteFiles An array of svelte files.
 * @returns An object of compiled files.
 */
export const compileSvelteFiles = async (svelteFiles: string[]): Promise<compiledFiles> => {
  let options;
  
  try{
    const decoderlol = new TextDecoder('utf-8');
    const data = await Deno.readFile(join(Deno.cwd(), "compileOptions.json"));
    options = JSON.parse(decoderlol.decode(data))
  }
  catch{
    console.log("No compileOptions.json file found, using default compile options.");
    // All options: https://svelte.dev/docs#svelte_compile
    options = {
      generate: "dom",
      sveltePath: "https://cdn.skypack.dev/svelte@3.44.1",
      hydratable: true,
      css: true,
      preserveComments: false,
      preserveWhitespace: false,
    };
  }

  const finalSvelteFiles: compiledFiles = {};

  for (const file of svelteFiles) {
    // const { js, ast, css } = compile(await Deno.readTextFile(file), options);
    const { js } = compile(await Deno.readTextFile(file), options);
    //https://cdn.skypack.dev/svelte@3.42.3/internal
    const compiledJavascript: string = js?.code ?? "";

    const denoImports: string = compiledJavascript.replace(
      /import\s(.+?)\sfrom\s*['"](.+?)(.svelte)['"]/igm,
      `import $1 from '$2$3.js'`,
    )
      .replace(
        /import\s(.+?)\sfrom\s*['"](svelte\/(.+?))['"]/igm,
        `import $1 from '${options.sveltePath}` + `/$3'`,
      )
      .replace(
        /import\s(.+?)\sfrom\s*['"](svelte)['"]/igm,
        `import $1 from '${options.sveltePath}/internal'`,
      );

    finalSvelteFiles[file.replace(`${Deno.cwd()}`, "")] = denoImports;
    // console.log(`${'='.repeat(50)} ${file.replace(`${Deno.cwd()}`, "")} ${'='.repeat(50)}`);
    // ast.instance.content.body == An arry of objects. The type has "ImportDeclaration", which probably has imports on it?? On that object, source.value is the import location
    // console.log(ast.instance?.content?.body?.filter((script: { type: string; }) => script.type === "ImportDeclaration"));
    // console.log(js?.code)
    // console.log(`${'='.repeat(50)} ${file.replace(`${Deno.cwd()}`, "")} ${'='.repeat(50)}`);
  }
  return finalSvelteFiles;
};

/**
 * Creates project file architecture for build directory
 * @param object An object with keys as file name and value is the compiled file
 */
export const createBuildDir = async (compiledFiles: compiledFiles): Promise<void> => {
  const encoder = new TextEncoder();
  for (const file in compiledFiles) {
    const data = encoder.encode(compiledFiles[file]);
    await ensureFile("./build" + file + ".js");
    await Deno.writeFile("./build" + file + ".js", data);
  }
  const html = encoder.encode(boilerplate.indexHtml);
  const js = encoder.encode(boilerplate.indexJs);
  Deno.writeFile("./build/index.html", html);
  Deno.writeFile("./build/src/index.js", js);
};

/**
 * Gets all .svelte files in the cwd and compiles them.
 */
export const easyCompile = async (): Promise<void> => {
  // Update this to take an optional directory, so we can replace Deno.cwd
  const projectDir = await getProjectDir(Deno.cwd());
  const svelteFiles = getSvelteFiles(projectDir);
  const weDidIt = await compileSvelteFiles(svelteFiles);
  createBuildDir(weDidIt);
};

// export const testCompile = async (): Promise<void> => {
//   // Update this to take an optional directory, so we can replace Deno.cwd
//   const projectDir = await getProjectDir(Deno.cwd());
//   const svelteFiles = getSvelteFiles(projectDir);
//   const weDidIt = await compileSvelteFiles(svelteFiles);
// }


// testCompile();