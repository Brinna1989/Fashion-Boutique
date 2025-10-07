import express from 'express';
import CartManager from '../managers/CartManager.js';

const router = express.Router();
const manager = new CartManager();

router.post('/', async (req,res) => {
  try { res.status(201).json(await manager.createCart()); }
  catch(e){ res.status(500).json({error:e.message}); }
});

router.get('/:cid', async (req,res) => {
  try {
    const cart = await manager.getCartById(req.params.cid);
    if(!cart) return res.status(404).json({error:'Carrito no encontrado'});
    res.json(cart);
  } catch(e){ res.status(500).json({error:e.message}); }
});

router.post('/:cid/product/:pid', async (req,res) => {
  try {
    const cart = await manager.addProductToCart(req.params.cid, req.params.pid);
    if(!cart) return res.status(404).json({error:'Carrito no encontrado'});
    res.json(cart);
  } catch(e){ res.status(500).json({error:e.message}); }
});

export default router;
