import express from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = express.Router();
const manager = new ProductManager();

// Obtener todos los productos
router.get('/', async (req, res) => { 
  try {
    const products = await manager.getProducts();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Obtener producto por ID
router.get('/:pid', async (req, res) => {
  try { 
    const prod = await manager.getProductById(req.params.pid);
    if (!prod) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(prod);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Crear producto con validaciones
router.post('/', async (req, res) => {
  try {
    const { title, description, code, price, status, stock, category, thumbnails } = req.body;

    // ⚠️ Validaciones obligatorias
    if (!title || !price || !stock || !category) {
      return res.status(400).json({
        error: 'Campos obligatorios: title, price, stock, category'
      });
    }

    if (isNaN(price) || isNaN(stock)) {
      return res.status(400).json({
        error: 'Los campos price y stock deben ser numéricos.'
      });
    }

    const productData = {
      title,
      description: description || '',
      code: code || '',
      price: Number(price),
      status: status !== undefined ? status : true,
      stock: Number(stock),
      category,
      thumbnails: thumbnails || []
    };

    const newProduct = await manager.addProduct(productData);
    res.status(201).json(newProduct);

  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Actualizar producto con validaciones
router.put('/:pid', async (req, res) => {
  try {
    const { price, stock } = req.body;

    // ⚠️ Validar tipos de datos si se envían
    if (price !== undefined && isNaN(price)) {
      return res.status(400).json({ error: 'El campo price debe ser numérico.' });
    }
    if (stock !== undefined && isNaN(stock)) {
      return res.status(400).json({ error: 'El campo stock debe ser numérico.' });
    }

    const updated = await manager.updateProduct(req.params.pid, req.body);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });

    res.json(updated);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const ok = await manager.deleteProduct(req.params.pid);
    if (!ok) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
