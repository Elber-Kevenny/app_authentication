import "@fastify/passport";
import { AccountAttributes } from "../server/models/userModel.ts";

// Extendendo o módulo do @fastify/passport
declare module "@fastify/passport" {
  interface PassportUser extends AccountAttributes {}
}

// Opcional: Garante que a propriedade request.user no Fastify use seu tipo Account
declare module "fastify" {
  interface FastifyRequest {
    user?: AccountAttributes;
  }
}
