//import dotenv from "dotenv";
import pg from 'pg';

const { Pool } = pg;

const databaseConfig = {
   connectionString: process.env.DATABASE_URL,
   ssl:{
         rejectUnautorized: false
   }
   //  host: 'localhost',
   //  port: 5432,
   //  user: 'postgres',
   //  password: 'euamopalmeiras',
   //  database: 'shortly'
}

const connection = new Pool(databaseConfig);

export default connection;