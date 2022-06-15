import flags from "./flags.ts";
import { ensureFile,existsSync } from "https://deno.land/std@0.113.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.113.0/path/mod.ts";
import { compiler } from "../compiler/compiler.ts";
import boilerplate from "../templates/build.ts";
import denofy from "../compiler/compiler.ts";

const updateNeeded=async (srcfn: string, buildfn: string)=>{
    const buildexists=await existsSync(buildfn);
    await ensureFile(buildfn);

    const srcstat=await Deno.fstatSync( Deno.openSync(srcfn, { read: true }).rid);
    const buildstat=await Deno.fstatSync( Deno.openSync(buildfn, { read: true }).rid);
    const srcmtime=srcstat?.mtime || 0;
    const buildmtime=buildstat?.mtime || -1;

    return (!buildexists || srcmtime>buildmtime);
}
// Function to run when given build command
export const BuildProject = async (flag: string, cwd = Deno.cwd(), path = '/src/App.svelte') => { // C:\\Users\\Tanner\\Documents\\GitHub\\NOVAS2\\tests\\src\\App.svelte
  const sveltePath = "https://cdn.skypack.dev/svelte@3.44.1";
  const encoder = new TextEncoder();
  const fullPath = join(cwd, path);
  const memoized: { [key: string]: boolean } = {};

  if (flags["help"][flag]) {
    console.log(`To run build, type:` + ` %NOVAS build`, "color:#55dac8");
    return false;
  }

  await ensureFile("./build/index.js");
  Deno.writeFile("./build/index.js", encoder.encode(boilerplate.indexJs));
  
  const buildImports = async (filePath: string) => {
    let buildfn=join("./build", filePath.replace(cwd, ""));
    buildfn += filePath.endsWith(".svelte")  ? '.js':'';

    filePath.endsWith(".svelte") ? await handleSvelte() : handleOther();

    async function handleSvelte() {
      const { js, ast } = await compiler(filePath); 
      if (await updateNeeded(filePath,buildfn)) {
        console.log('updating',filePath);
        const data = encoder.encode(js);
        await Deno.writeFile(buildfn,data);
      }
      const nestedImports = ast.instance?.content?.body?.filter((
        script: { type: string; source: { value: string } },
      ) => script.type === "ImportDeclaration");
      if (!nestedImports) return;
      for await (const nested of nestedImports) {
        if (memoized[nested.source.value] === true) continue;
        memoized[nested.source.value] = true;
        await buildImports(join(cwd, nested.source.value.replace(".", "src/")));
      }
    }

    async function handleOther() {
      try {
        if (await updateNeeded(filePath,buildfn)) {
          const currentFile = await Deno.readTextFile(filePath);
          const denofiedFile = await denofy(currentFile, sveltePath);
          const data = encoder.encode(denofiedFile);
          await Deno.writeFile(buildfn, data);
        }
     }
      catch(e) {
        console.log(e);
        return;
      }
    }
  };

  await buildImports(fullPath);

  console.log("Your build was successful!");
  return true;
};
