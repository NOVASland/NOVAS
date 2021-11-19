import { readableStreamFromReader } from "https://deno.land/std@0.113.0/streams/conversion.ts";
import { easyCompile } from "../../compiler/compiler.ts";

export default async function devServer() {

  const port = 5000;
  const listener = Deno.listen({ port: port });
  console.log(`Listening on port ${port}`);
  const eventTypes: { [key: string]: boolean} = { remove: true, modify: true }; // Other option: create;

  // Listens on port 80 for the websocket
  async function webSocketServer() {
    const listener1 = Deno.listen({ port: 80 });
    for await (const conn of listener1) {
      handle(conn);
    }
  }

  // Connects the port to http
  async function handle(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn);
    for await (const requestEvent of httpConn) {
      await requestEvent.respondWith(handleReq(requestEvent.request));
    }
  }

  // Upgrades the http request to a websocket and listens
  function handleReq(req: Request): Response {
    const upgrade = req.headers.get("upgrade") || "";
    if (upgrade.toLowerCase() != "websocket") {
      return new Response("request isn't trying to upgrade to websocket.");
    }

    fileWatcher();

    const { socket, response } = Deno.upgradeWebSocket(req);

    socket.onopen = () => console.log("");

    socket.onmessage = (e) => {
      console.log("socket message:", e.data);
    };

    // Watches for file changes and if there is a change, refreshes the page
    async function fileWatcher() {
      const watcher = Deno.watchFs(`${Deno.cwd()}/src`);
      let lastMessageSent = Date.now();
      for await (const event of watcher) {
        if (eventTypes[event.kind] && Date.now() - lastMessageSent > 1000) {
          watcher.close();
          easyCompile();
          console.log("Your build was successful!");
          socket.send("reload window");
          lastMessageSent = Date.now();
        }
      }
    }

    socket.onerror = (e) => console.log("socket errored:", e);
    socket.onclose = () => console.log("");
    return response;
  }

  webSocketServer();

  // Http server
  for await (const conn of listener) {
    const httpConn = Deno.serveHttp(conn);
    for await (const { request: req, respondWith: res } of httpConn) {
      const fileName = "./build" + (new URL(req.url)).pathname;
      const fileSize = (await Deno.stat(fileName)).size.toString();
      if (fileName == "./build/") {
        res(
          new Response(
            readableStreamFromReader(
              await Deno.open(`${Deno.cwd()}/build/index.html`),
            ),
            {
              headers: {
                "content-type": "text/html",
                "content-length":
                  (await Deno.stat(`${Deno.cwd()}/build/index.html`)).size
                    .toString(),
              },
            },
          ),
        );
        continue;
      }
      res(
        new Response(readableStreamFromReader(await Deno.open(fileName)), {
          headers: {
            "content-type": "text/javascript",
            "content-length": fileSize,
          },
        }),
      );
    }
  }
}
