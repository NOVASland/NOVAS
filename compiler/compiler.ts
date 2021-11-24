import { compile } from "https://cdn.jsdelivr.net/npm/svelte@3.42.3/compiler.mjs";
import { join } from "https://deno.land/std@0.113.0/path/mod.ts";

const getOptions = async () => {
  let options: { [key: string]: string | boolean };
  try {
    const decoderlol = new TextDecoder("utf-8");
    const data = await Deno.readFile(join(Deno.cwd(), "compileOptions.json"));
    options = JSON.parse(decoderlol.decode(data));
  } catch {
    // All options: https://svelte.dev/docs#svelte_compile
    options = {
      generate: "dom",
      sveltePath: "https://cdn.skypack.dev/svelte@3.44.1",
      hydratable: true,
    };
  }
  return options;
};

const denofy = (file: string, sveltePath: string | boolean) => {
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
    );
};

export const compiler = async (file: string) => {
  const options = await getOptions();
  const currentFile = await Deno.readTextFile(file);

  const { js, ast } = compile(currentFile, options);
  const denoImports = denofy(js?.code ?? "", options?.sveltePath);
  const denoCompiled = { js: denoImports, ast };

  return denoCompiled;
}

export default denofy;
