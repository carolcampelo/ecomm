import express from 'express';
import logger from 'morgan';
import db from './src/config/dbConfig.js';
import routes from './src/routes/apiGatewayRoutes.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const port = 3006;
const app = express();
app.use(logger('dev'));

db.on('error', console.log.bind(console, 'Connection error'));
db.once('open', () => {
	console.log('API Gateway DB Connected Successfully!');
});

routes(app)

app.listen(port,() => {console.log(`API Gateway running! Port ${port}`);});