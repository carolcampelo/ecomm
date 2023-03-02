import mongoose from 'mongoose';

const dbConfig = {
  url: 'mongodb://admin:secret@mongo-ecomm:27017/ecomm-product?authSource=admin',
};

const areWeTesting = process.env.JEST_WORKER_ID !== undefined;

if (areWeTesting) dbConfig.url = 'mongodb://admin:secret@localhost:27017/ecomm-product?authSource=admin';

mongoose.connect(dbConfig.url);

const db = mongoose.connection;

export default db;
