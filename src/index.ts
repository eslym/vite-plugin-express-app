import type { Application } from "express";
import type { Server as WsServer } from "ws";
import type { PluginOption, ViteDevServer } from "vite";

const HMR_HEADER = "vite-hmr";

export function viteExpressApp(
    app: Application,
    wsServer?: WsServer
): PluginOption {
    const listen = app.listen;

    app.listen = function (
        this: Application,
        ...args: Parameters<typeof listen>
    ) {
        const server = listen.apply(this, args);
        server.on("listening", () => {
            app.emit("listening", server);
        });
        return server;
    } as any;

    return {
        name: "vite-express",
        configureServer(server: ViteDevServer) {
            if (server.httpServer) {
                server.httpServer.on("listening", () => {
                    app.set("is vite", true);
                    app.emit("listening", server.httpServer);
                });
                if (wsServer) {
                    server.httpServer.on("upgrade", (req, socket, head) => {
                        if (
                            req.headers["sec-websocket-protocol"] === HMR_HEADER
                        )
                            return;
                        wsServer.handleUpgrade(
                            req,
                            socket,
                            head,
                            (socket, req) => {
                                wsServer.emit("connection", socket, req);
                            }
                        );
                    });
                }
            }
            return () => {
                server.middlewares.use(
                    (app as any as { handle: Function }).handle.bind(app)
                );
            };
        },
    };
}
