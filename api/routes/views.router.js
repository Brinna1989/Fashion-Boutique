// api/routes/views.router.js
import express from 'express';
import ProductManager from '../managers/ProductManager.js';
const router = express.Router();
const manager = new ProductManager();

router.get('/', async (req, res) => {
  const products = await manager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await manager.getProducts();
  res.render('realTimeProducts', { products });
});

export default router;

