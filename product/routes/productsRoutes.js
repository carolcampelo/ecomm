import express from 'express';
import ProductController from '../controllers/productsController.js';

const router = express.Router();

router
    .get("/api/products", ProductController.findProducts)
    .get("/api/products/:id", ProductController.findProductById)
    .post("/api/admin/products", ProductController.addProducts)
    .put("/api/admin/products/:id", ProductController.updateProducts)
    .delete("/api/admin/products/:id", ProductController.deleteProducts)

export default router;