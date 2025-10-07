// api/server.js
import express from 'express';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';

// Configuración base para __dirname (ESModules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

// Servidor HTTP y Socket.IO
const httpServer = app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

const io = new Server(httpServer);

// Conexión de cliente por WebSocket
io.on('connection', (socket) => {
  console.log('🟢 Cliente conectado por WebSocket');

  // Crear nuevo producto
  socket.on('newProduct', async (data) => {
    try {
      await fetch(`http://localhost:${PORT}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // Traer lista completa de productos y emitir
      const res = await fetch(`http://localhost:${PORT}/api/products`);
      const products = await res.json();
      io.emit('updateProducts', products);

    } catch (err) {
      console.error('Error creando producto via WS:', err);
    }
  });

  // Eliminar producto
  socket.on('deleteProduct', async (id) => {
    try {
      await fetch(`http://localhost:${PORT}/api/products/${id}`, {
        method: 'DELETE',
      });

      // Traer lista completa de productos y emitir
      const res = await fetch(`http://localhost:${PORT}/api/products`);
      const products = await res.json();
      io.emit('updateProducts', products);

    } catch (err) {
      console.error('Error eliminando producto via WS:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('🔴 Cliente desconectado');
  });
});

