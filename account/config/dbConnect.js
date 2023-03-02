import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost';
console.log(DB_HOST);

const dbConfig = {
  url: `mongodb://admin:secret@${DB_HOST}:27017/ecomm-account?authSource=admin`,
};

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

export default db;
