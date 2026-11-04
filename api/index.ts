import buildApp from "../src/server/index";

let app: any;

async function getApp() {
  if (!app) {
    app = await buildApp();
    await app.ready();
  }
  return app;
}

export default async function handler(req: any, res: any) {
  const fastify = await getApp();
  fastify.server.emit("request", req, res);
}
