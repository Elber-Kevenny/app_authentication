import 'dotenv/config'
import sequelizedb from './db/db.js';
import './models/userModel.js'


const { db } = sequelizedb;


async function setup() {
  try {
    await db.sync({ force: true });

    process.exit(0)
  } catch (e) {
    process.exit(1)
  }
}


setup()