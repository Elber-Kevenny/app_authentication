import { Sequelize, Options } from "sequelize";
import dotenv from "dotenv";
import path from "node:path";

const envFile = ".env.development";

dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const dbOptions: Options = {
  host: process.env.POSTGRES_HOST,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
  dialect: "postgres",
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
