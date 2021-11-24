// import { readableStreamFromReader } from "https://deno.land/std@0.113.0/streams/conversion.ts";
import { BuildProject } from "../commands/build.ts";
import { join } from "https://deno.land/std@0.113.0/path/mod.ts";
import { Application, send, Router } from 'https://deno.land/x/oak@v9.0.1/mod.ts';

export default async function devServer() {

  const eventTypes: { [key: string]: boolean} = { remove: true, modify: true }; // Other option: create;


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
      console.log(e.data);
    };

    // Watches for file changes and if there is a change, refreshes the page
    async function fileWatcher() {
      const watcher = Deno.watchFs(`${Deno.cwd()}/src`);
      let lastMessageSent = Date.now();
      for await (const event of watcher) {
        if (eventTypes[event.kind] && Date.now() - lastMessageSent > 1000) {
          watcher.close();
          console.log('Compiling...')
          await BuildProject('');
          socket.send("reload window");
          lastMessageSent = Date.now();
        }
      }
    }

    socket.onerror = (e) => console.log("socket errored:", e);
    socket.onclose = () => console.log("Closing.");
    return response;
  }

  webSocketServer();
  
  const port = 3000;
  const app = new Application();
  const router = new Router();
  
  app.use(async (ctx) => {
    const { pathname } = ctx.request.url;
    if (pathname === "/") {
      await send(ctx, pathname, {
        root: join(Deno.cwd(), "public"),
        index: "index.html",
      });
    } else if (pathname === "/build/index.js") {
      ctx.response.type = "application/javascript";
      await send(ctx, pathname, {
        root: Deno.cwd(),
        index: "index.js",
      });
    } else {
      await send(ctx, pathname, {
        root: Deno.cwd(),
        index: "",
      });
    }
  });


  app.use(router.routes());
  
  app.addEventListener('listen', () => {
    console.log(`🎉 Listening on port ${port}`);
  });

  await app.listen({ port });

}