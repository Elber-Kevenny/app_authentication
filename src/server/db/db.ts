import { Sequelize, Options } from "sequelize";
import dotenv from "dotenv";
import path from "node:path";
import pg from "pg";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: path.resolve(process.cwd(), ".env.development") });
}

const dbOptions: Options = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
  dialect: "postgres",
  dialectModule: pg,
  dialectOptions: process.env.NODE_ENV === "production" ? {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  } : {},
};

const db = new Sequelize(dbOptions);

try {
  await db.authenticate();
  console.log("Connection has been established successfully");
} catch (e) {
  console.error("Unable to connect to the database:", e);
}

export default {
  db,
};
