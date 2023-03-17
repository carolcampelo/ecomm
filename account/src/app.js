import express from 'express';
import db from './config/dbConnect.js';
import routes from './routes/index.js';
import redisConnection from '../utils/redis/redisConnect.js';

db.on('error', console.log.bind(console, 'Conection error'));

db.once('open', () => {
  console.log('DB Conected Successfully.');
});

redisConnection.connect();

redisConnection.on('error', (error) => {
  console.error(error);
});

redisConnection.on('connect', () => {
  console.log('Redis Connected!');
});

const app = express();

app.use(express.json());

routes(app);

export default app;
