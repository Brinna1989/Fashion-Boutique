import fs from 'fs/promises';
import path from 'path';

class ProductManager {
  constructor(filename = 'products.json') {
    this.path = path.join('api', 'data', filename);
  }

  async _readFile() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      return JSON.parse(data);
    } catch (e) {
      if (e.code === 'ENOENT') return [];
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

  async getProducts() {
    return await this._readFile();
  }

  async getProductById(id) {
    const products = await this._readFile();
    return products.find(p => String(p.id) === String(id));
  }

  async addProduct(productData) {
    const products = await this._readFile();
    const required = ['title','description','code','price','status','stock','category','thumbnails'];
    for (const f of required) if (productData[f] === undefined) throw new Error(`Falta campo: ${f}`);
    const id = await this._generateId(products);
    const newProduct = { id, ...productData };
    products.push(newProduct);
    await this._writeFile(products);
    return newProduct;
  }

  async updateProduct(id, updates) {
    const products = await this._readFile();
    const idx = products.findIndex(p => String(p.id) === String(id));
    if (idx === -1) return null;
    const { id: _ignore, ...rest } = updates;
    products[idx] = { ...products[idx], ...rest };
    await this._writeFile(products);
    return products[idx];
  }

  async deleteProduct(id) {
    const products = await this._readFile();
    const filtered = products.filter(p => String(p.id) !== String(id));
    if (filtered.length === products.length) return false;
    await this._writeFile(filtered);
    return true;
  }
}

export default ProductManager;
