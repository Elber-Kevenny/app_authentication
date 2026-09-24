import { Sequelize, Options } from "sequelize";
import 'dotenv/config';


// interface Sequelizedb {
//   host: string,
//   username: string,
//   password: number,
//   database: string,
//   port: number,
//   dialect: string,
// }


const dbOptions: Options = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
  dialect: 'postgres',
}

const db = new Sequelize(dbOptions)

try {
  await db.authenticate()
  console.log('Connection has been established successfully')
} catch (e) {
  console.error('Unable to connect to the database:', e)
}

export default {
  db
}