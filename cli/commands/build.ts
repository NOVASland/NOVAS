import flags from "./flags.ts";
import { ensureFile } from "https://deno.land/std@0.113.0/fs/mod.ts";
import { compiler } from "../../compiler/compiler.ts";
import boilerplate from "../../templates/build.ts";

const getProjectDir = async (currentPath: string): Promise<string[]> => {
  const projectNestedDir: string[] = [];

  for await (const dirEntry of Deno.readDir(currentPath)) {
    // Ignores build/dist folders. Change later to ignore build folder input by user in config.json
    if (
      dirEntry.name === "build" ||
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

// Function to copy over user files when given build command
const buildUserFiles = async (path:string) => { 
  const projectDir = await getProjectDir(`${path}/src`);
  const userFiles = projectDir?.filter((file: string) => (!file.includes("/.") || !file.includes('.svelte')) && ((file.endsWith(".ts") || file.endsWith('.js'))) );
  for (const filePath of userFiles) { 
    const currentBuildPath = './build' + filePath.replace(`${path}`, '');
    if (currentBuildPath === './build/src/index.js') continue;
    
    const fileContent = await Deno.readFile(filePath);
    await ensureFile(currentBuildPath);
    await Deno.writeFile(currentBuildPath, fileContent);
  }
}

// Function to run when given build command
export const BuildProject = async (flag: string, path:string = Deno.cwd()) => {
  if (flags['help'][flag]) {
    console.log(`To run build, type:` + ` %csvno build`, "color:#55dac8");
    return false;
  }
  const encoder = new TextEncoder();
  await ensureFile('./build/index.js');
  const indexjs = encoder.encode(boilerplate.indexJs);
  Deno.writeFile("./build/index.js", indexjs);

  await buildUserFiles(path);
  compiler(`${path}/src/App.svelte`);
  console.log("Your build was successful!");
  return true;
}
