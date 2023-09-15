import mysql from 'mysql';
import dotenv from 'dotenv';
import { toNumber } from 'lodash';
dotenv.config();

export var connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});
