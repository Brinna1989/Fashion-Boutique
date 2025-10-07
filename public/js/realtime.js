/* global io */
const socket = io();

// Actualizar la lista de productos cuando el servidor emita cambios
socket.on('updateProducts', (products) => {
  renderProducts(products);
});

// Función para renderizar productos en el <ul>
function renderProducts(products) {
  const list = document.getElementById('productList');
  list.innerHTML = '';
  products.forEach(p => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>${p.title}</strong> - $${p.price} (Stock: ${p.stock})
      <button onclick="deleteProduct('${p.id}')">Eliminar</button>
    `;
    list.appendChild(li);
  });
}

// Enviar nuevo producto al servidor vía WebSocket
const form = document.getElementById('productForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const price = Number(document.getElementById('price').value);
  const stock = Number(document.getElementById('stock').value);
  const category = document.getElementById('category').value;

  // Enviar datos mínimos necesarios y completar los campos que espera la API
  socket.emit('newProduct', {
    title,
    price,
    stock,
    category,
    description: '',
    code: '',
    status: true,
    thumbnails: []
  });

  form.reset();
});

// Función para eliminar un producto vía WebSocket
function deleteProduct(id) {
  socket.emit('deleteProduct', id);
}

// Exponer función global para poder usarla en onclick de Handlebars
window.deleteProduct = deleteProduct;


