import { CreateProject } from "./commands/create.ts";
import { DevProject } from "./commands/dev.ts";
import { BuildProject } from "./commands/build.ts";
// import { StartProject } from "./commands/start.ts";
// import flags from "./commands/flags.ts";

const command: { [key: string]: boolean } = { "create": true, "dev": true, "build": true, "start": true };
const { args: Args } = Deno;
const [cmd, appName, flag] = [Args[0], Args[1], Args[2]];

async function Main(appName: string, flag: string) {
  try {
    if (command[cmd]) {
      switch (cmd) {
        case "create":
          appName ? 
            await CreateProject(appName, Deno.cwd(), flag) : 
            Main(`${prompt('Please enter App name: ', 'myApp')}`, flag);
          break;
        case "dev":
          DevProject(appName);
          break;
        case "build":
          await BuildProject(appName);
          break;
        // case "start":
        //   await StartProject(appName);
        //   break;
      }
    } 
    else if (cmd === "--version" || cmd === "-v") {
      console.log(`Svno 1.0`);
    }
    else {
      console.log(`To create a project, type:` + ` %csvno create ` + `%c[project name]`, "color:#55dac8;", "color:red;");
      console.log(`To compile a project, type:` + ` %csvno build`, "color:#55dac8;");
      console.log(`To start your developing, type:` + ` %csvno start`, "color:#55dac8;");
    }
  } catch (error) {
    if (!(error instanceof Deno.errors.NotFound)) {
      console.log(error);
    }
  }
}
// Boolean to let you know if the current module is the program entry point
if (import.meta.main) {
  await Main(appName, flag);
}
