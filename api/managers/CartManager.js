
import fs from 'fs/promises';
import path from 'path';

class CartManager {
  constructor(filename = 'carts.json') {
    this.path = path.join('api', 'data', filename);
  }

  async _readFile() {
    try { 
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch(e) {
      if(e.code === 'ENOENT') return [];
      throw e;
    }
  }

  async _writeFile(data) {
    await fs.writeFile(this.path, JSON.stringify(data, null, 2), 'utf-8');
  }

  async _generateId(items) {
    if (!items.length) return 1;
    return Math.max(...items.map(i => Number(i.id) || 0)) + 1;
  }

  async createCart() {
    const carts = await this._readFile();
    const id = await this._generateId(carts);
    const newCart = { id, products: [] };
    carts.push(newCart);
    await this._writeFile(carts);
    return newCart;
  }

  async getCartById(id) {
    const carts = await this._readFile();
    return carts.find(c => String(c.id) === String(id));
  }

  async addProductToCart(cid, pid) {
    const carts = await this._readFile();
    const idx = carts.findIndex(c => String(c.id) === String(cid));
    if (idx === -1) return null;
    const cart = carts[idx];
    const pidx = cart.products.findIndex(p => String(p.product) === String(pid));
    if (pidx === -1) cart.products.push({ product: pid, quantity: 1 });
    else cart.products[pidx].quantity += 1;
    carts[idx] = cart;
    await this._writeFile(carts);
    return cart;
  }
}

export default CartManager;
