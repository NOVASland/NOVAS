import { compile } from "https://cdn.jsdelivr.net/npm/svelte@3.42.3/compiler.mjs";
import { join } from "https://deno.land/std@0.113.0/path/mod.ts";
import { ensureFile } from "https://deno.land/std@0.113.0/fs/mod.ts"; // Requires --unstable flag

const getOptions = async() => {
  let options: { [key: string]: string|boolean};
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
    };
  }
  return options;
}

const denofy = (file:string, sveltePath: string | boolean) => {
  return file.replace(
    /import\s(.+?)\sfrom\s*['"](.+?)(.svelte)['"]/igm,
    `import $1 from '$2$3.js'`,
    )
    .replace(
      /import\s(.+?)\sfrom\s*['"](svelte\/(.+?))['"]/igm,
      `import $1 from '${sveltePath}` + `/$3'`,
    )
    .replace(
      /import\s(.+?)\sfrom\s*['"](svelte)['"]/igm,
      `import $1 from '${sveltePath}/internal'`,
    ) 
}

export const compiler = async (file: string) => {
  const options = await getOptions()
  const encoder = new TextEncoder();
  const currentFile = await Deno.readTextFile(file)

  file.endsWith('.svelte') ? await handleSvelte() : handleOther();
  
  async function handleSvelte() {
    const { js, ast } = compile(currentFile, options);
    const denoImports = denofy(js?.code ?? '', options?.sveltePath)
    const data = encoder.encode(denoImports);

    await ensureFile("./build" + file.replace(Deno.cwd(), '') + ".js");
    await Deno.writeFile("./build" + file.replace(Deno.cwd(), '') + ".js", data);

    const nestedImports = ast.instance?.content?.body?.filter((script: { type: string; source: { value: string; }; }) => script.type === "ImportDeclaration")
    if(!nestedImports) return;
    for(const nested of nestedImports){
      compiler(join(Deno.cwd(), nested.source.value.replace('.', 'src/')))
    }
  }

  async function handleOther(){
    // We could denofy the other files here, in the off chance that they import svelte files the imports will need to be changed to .svelte.js.
    // Not doing this for now, because I haven't found an example of this happening.
    // Also might need to find imports here and include and call this function on them. Right now ../cli/commands/build.ts takes care of it in a way.
    const data = encoder.encode(currentFile);
    await ensureFile("./build" + file.replace(Deno.cwd(), ''));
    await Deno.writeFile("./build" + file.replace(Deno.cwd(), ''), data);
  }
 
} 
