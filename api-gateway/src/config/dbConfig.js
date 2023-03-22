import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const DB_HOST = process.env.NODE_ENV === 'test' ? '127.0.0.1' : process.env.DB_HOST;
const { USER, PASSWORD, PORT } = process.env;

mongoose.set('strictQuery', false);

const dbConfig = {
  url: `mongodb://${USER}:${PASSWORD}@${DB_HOST}:${PORT}/ecomm-account?authSource=admin`,
};

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

export default db;
