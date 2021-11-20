/**
 * The command to start the server.
 * @param args The command arguments.
 */
export const StartProject = async (_flag: string) => {
  //check for help flag
  const p = Deno.run({cmd: ["deno", "run", "--allow-read", "--allow-net", "--allow-run", "./server/server.ts"]})
  const { code } = await p.status()
  return { code }
}