import express from 'express';
import routerLogin from './routerLogin.js';
import { authBearer } from'../middlewares/auth.js';
import { createProxyMiddleware } from "http-proxy-middleware";

const routes = (app) => {
  
  app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:3003/', changeOrigin: true }));
  app.use('/api/admin/users', authBearer, createProxyMiddleware({ target: 'http://localhost:3003/', changeOrigin: true }));
  
  app.use(['/api/categories','/api/products'], createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));
  app.use(['/api/admin/categories', '/api/admin/products'], authBearer, createProxyMiddleware({ target: 'http://localhost:3002/', changeOrigin: true }));

  app.use('/payments', authBearer, createProxyMiddleware({ target: 'http://localhost:3004/', changeOrigin: true }));
  
  app.use('/orders', authBearer, createProxyMiddleware({ target: 'http://localhost:3005/', changeOrigin: true }));   
    
  app.use(express.json(), routerLogin);

};

export default routes;
