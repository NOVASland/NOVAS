import flags from "./flags.ts";
import devServer from "../dev/server.ts";

// Function to run with dev command
export const DevProject = (flag: string) => {
  if (flags['help'][flag]) {
    console.log(`you requested help (${flag}) with the dev command`);
    return false;
  }
  devServer();
  return true
}
