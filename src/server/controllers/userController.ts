import { FastifyRequest, FastifyReply } from "fastify";
import { AuthService } from "../services/authService.js";

interface User {
  username: string;
  password?: string;
  confirmPassword?: string;
}

export const sign = async (
  request: FastifyRequest<{ Body: User }>,
  reply: FastifyReply,
) => {
  const { username, password, confirmPassword } = request.body;
  try {
    if (!username || !password || !confirmPassword) {
      throw new Error("Form invalid");
    }

    if (password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }
    const newAccount = await AuthService.register(username, password);

    const token = AuthService.signJWT(newAccount.username);

    return reply.status(201).send({
      username: newAccount.username,
      token,
    });
  } catch (e: any) {
    console.error("error account creation:", e.message);
    return reply
      .status(400)
      .send({ message: e.message, error: "Account creation faliled" });
  }
};

export const authentication = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user = request.user as any;
    if (!user) {
      return reply.status(401).send({ message: "User not authenticated" });
    }

    const token = AuthService.signJWT(user.username);

    return reply.status(200).send({
      message: "Authentication Successfully",
      token,
      username: user.username,
    });
  } catch (e: any) {
    console.log("authentication:", e);

    return reply.status(401).send({
      statusCode: 401,
      message: "Authentication Failed!",
      error: e.message,
    });
  }
};

export const getDashBoard = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const user = request.user as any;

  if (!user) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  reply.header(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate",
  );
  reply.header("Pragma", "no-cache");
  reply.header("Expires", "0");

  const currentTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return reply.status(200).send({
    username: user.username,
    currentTime,
  });
};

export const apiAuth = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username } = request.user as any;
  const token = AuthService.signJWT(username);

  return reply.send({ token });
};
export const apiTest = async (
  _request: FastifyRequest,
  reply: FastifyReply,
) => {
  return reply.send({ status: "Authenticated" });
};

export const logout = async (_request: FastifyRequest, reply: FastifyReply) => {
  return reply.send({ success: true });
};
