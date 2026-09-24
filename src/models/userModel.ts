import sequelizedb from '../db/db.js';
import {Model, DataTypes, CreationOptional } from 'sequelize';

const { db } = sequelizedb;

export interface AccountAttributes {
  id?: number,
  username: string,
  hash: string,
  salt: string,
  createdAt?: Date;
  updatedAt?: Date;
};


export class Account 
  extends Model<AccountAttributes> 
  implements AccountAttributes 
{
 declare id: CreationOptional<number>;
  declare username: string;
  declare hash: string;
  declare salt: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}


 Account.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  }

 },
   {
     sequelize: db,
    tableName: 'Accounts'
   }
 )


export default {
  Account
}