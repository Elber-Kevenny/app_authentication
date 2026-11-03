import fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import fastifyView from "@fastify/view";
import handlebars from "handlebars";
import { userRouter } from "./routes/userRouter.js";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyPassport from "@fastify/passport";
import cors from "@fastify/cors";
import "dotenv/config";

const app = fastify();
const PORT = 3000;

await app.register(fastifyFormbody);
await app.register(cors, {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
await app.register(fastifyCookie);
await app.register(fastifySession, {
  secret: process.env.SESSION_SECRET!,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
  saveUninitialized: false,
});

await app.register(fastifyPassport.initialize());
await app.register(fastifyPassport.secureSession());
app.register(userRouter);

try {
  await app.listen({ port: PORT });
  console.log(`server run in http://localhost:${PORT}`);
} catch (e) {
  console.error(e);
  process.exit(1);
}
