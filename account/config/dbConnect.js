import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB_HOST = process.env.NODE_ENV === 'test' ? '127.0.0.1' : process.env.DB_HOST;

mongoose.set('strictQuery', false);

const dbConfig = {
  url: `mongodb://admin:secret@${DB_HOST}:27017/ecomm-account?authSource=admin`,
};

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

export default db;
