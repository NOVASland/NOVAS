import { join } from "https://deno.land/std@0.113.0/path/mod.ts";
import flags from "./flags.ts";
import {
  indexCSS,
  indexHTML,
  mainJs,
  opineServer,
  oakServer,
  svelteAppComponent,
  settingsJson,
  defaultConfigFile,
} from "../../templates/templates.ts";

export async function CreateProject(name: string, path: string, flag: string): Promise<boolean> {
  // Set default port
  // let port = '3000';
  // let server = 'oak';
  
  // TODO: Fix flags to be useful
  if (flags['help'][flag] || flags['help'][name]) {
    console.log(`To create a project, type:` + ` %csvno create ` + `%c[project name]`, "color:#55dac8;", "color:red;")
    return false;
  }
  // If given custom flag, user will be given two prompts to establish port and app name
  // Will use default port and name if none given 
  // if (flags['custom'][flag]) {
  //   console.log(`Let's customize your project! 🎊`);
  //   port = `${prompt('🦖 What port would like to run your server on? ', '3000')}`;
  //   server = `${prompt('🦖 Would you like to use an oak [oak] or opine [opine] server? ', 'oak')}`;

  //   //do u want opine server?
  //   //ssr?
  //   //hot module reloading?
  // }
  // Establish project path
  const appDir = `${path}/${name}`;
  
  try {
    const startTime = Date.now();

    const encoder = new TextEncoder();

    await Deno.mkdir(join(path, name));
    await Deno.mkdir(join(appDir, "public"));
    await Deno.mkdir(join(appDir, "src"));
    // await Deno.mkdir(join(appDir, "server"));
    await Deno.mkdir(join(appDir, ".vscode"));
    
    const indexHtmlFile = await Deno.create(join(`${path}/${name}/public`, "index.html"));
    const settings = await Deno.create(join(`${path}/${name}/.vscode`, "settings.json"));
    const defaultConfig = await Deno.create(join(appDir, "compileOptions.json"));
    const srcFile = await Deno.create(join(`${appDir}/src`, "App.svelte"));
    const mainJsFile = await Deno.create(join(`${appDir}/src`, "index.js"));
    const cssFile = await Deno.create(join(`${appDir}/public`, "index.css"));
    
    indexHtmlFile.write(encoder.encode(indexHTML));
    settings.write(encoder.encode(settingsJson));
    defaultConfig.write(encoder.encode(defaultConfigFile()));
    srcFile.write(encoder.encode(svelteAppComponent));
    mainJsFile.write(encoder.encode(mainJs));
    cssFile.write(encoder.encode(indexCSS));

    //TODO: We don't need this if we're using the default settings.
    // if(server.toLowerCase() === 'oak') {
    //   serverFile.write(encoder.encode(oakServer(`${port}`)));
    // } else if (server.toLowerCase() === 'opine') {
    //   serverFile.write(encoder.encode(opineServer(`${port}`)));
    // } else {
    //   console.log('unsupported server')
    // }
    
    const endTime = Date.now();
    console.log(`Project created successfully in ${(endTime - startTime) / 1000}s.! 🦕`);

    return true;
  } catch (error: unknown) {
    console.log(error);
    return false;
  }
}
