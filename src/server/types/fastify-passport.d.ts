import "@fastify/passport";
import { AccountAttributes } from "../server/models/userModel.ts";

declare module "@fastify/passport" {
  interface PassportUser extends AccountAttributes {}
}

declare module "fastify" {
  interface FastifyRequest {
    user?: AccountAttributes;
  }
}
