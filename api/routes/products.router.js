
import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const manager = new ProductManager();

router.get('/', async (req,res) => { 
  try { res.json(await manager.getProducts()); } 
  catch(e){ res.status(500).json({error:e.message}); }
});

router.get('/:pid', async (req,res) => {
  try { 
    const prod = await manager.getProductById(req.params.pid);
    if(!prod) return res.status(404).json({error:'Producto no encontrado'});
    res.json(prod);
  } catch(e){ res.status(500).json({error:e.message}); }
});

router.post('/', async (req,res) => {
  try { res.status(201).json(await manager.addProduct(req.body)); }
  catch(e){ res.status(400).json({error:e.message}); }
});

router.put('/:pid', async (req,res) => {
  try {
    const updated = await manager.updateProduct(req.params.pid, req.body);
    if(!updated) return res.status(404).json({error:'Producto no encontrado'});
    res.json(updated);
  } catch(e){ res.status(400).json({error:e.message}); }
});

router.delete('/:pid', async (req,res) => {
  try {
    const ok = await manager.deleteProduct(req.params.pid);
    if(!ok) return res.status(404).json({error:'Producto no encontrado'});
    res.json({message:'Producto eliminado'});
  } catch(e){ res.status(500).json({error:e.message}); }
});

export default router;
