import fastify from "fastify";
import fastifyFormbody from "@fastify/formbody";
import { userRouter } from "./routes/userRouter.js";
import fastifyCookie from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyPassport from "@fastify/passport";
import cors from "@fastify/cors";
import "dotenv/config";
import { AuthService } from "./services/authService.js";
import ConnectSessionSequelizeFactory from "connect-session-sequelize";

export default async function buildApp() {
  const app = fastify();

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
      secure: process.env.NODE_ENV === "production" ? true : false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    },
    saveUninitialized: false,
  });

  await app.register(fastifyPassport.initialize());
  await app.register(fastifyPassport.secureSession());
  fastifyPassport.use("local", AuthService.genStrategy());
  fastifyPassport.use("jwt", AuthService.genJWTStrategy());

  fastifyPassport.registerUserSerializer(async (user: any, _request) => {
    return user.username;
  });

  fastifyPassport.registerUserDeserializer(
    async (username: string, _request) => {
      const account = await AuthService.findByUsername(username);
      if (!account) {
        throw new Error("User not found");
      }
      return account;
    },
  );
  await app.register(userRouter, { prefix: "/api" });

  return app;
}

if (process.env.NODE_ENV !== "production") {
  const app = await buildApp();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`server run in http://localhost:${PORT}`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
