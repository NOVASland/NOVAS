 import flags from "./flags.ts";
import { ensureFile } from "https://deno.land/std@0.113.0/fs/mod.ts"; // Requires --unstable flag
import { easyCompile, getProjectDir } from "../../compiler/compiler.ts"

// Function to copy over user files when given build command
const buildUserFiles = async () => { 
  const projectDir = await getProjectDir(Deno.cwd());
  const userFiles = projectDir?.filter((file: string) => (!file.includes("/.") || !file.includes('.svelte')) && ((file.endsWith(".ts") || file.endsWith('.js'))) );
  for (const filePath of userFiles) { 
    const currentBuildPath = './build' + filePath.replace(`${Deno.cwd()}`, '');
    
    if (currentBuildPath === './build/src/index.js') continue;
    
    const fileContent = await Deno.readFile(filePath);
    await ensureFile(currentBuildPath);
    await Deno.writeFile(currentBuildPath, fileContent);
  }
}

// Function to run when given build command
export const BuildProject = async (flag: string) => {
  if (flags['help'][flag]) {
    console.log(`To run build, type:` + ` %csvno build`, "color:#55dac8");
    return false;
  }
  await buildUserFiles();
  easyCompile();
  console.log("Your build was successful!");
  return true;
}
