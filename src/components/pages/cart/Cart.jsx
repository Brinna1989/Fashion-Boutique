import React, { useContext } from "react";
import { CartContext } from "../../../context/CartContext";
import { Link } from "react-router-dom";
import "./cart.css";

const Cart = () => {
  const { cart, resetCart, removeById, getTotalAmount } =
    useContext(CartContext); 
  let total = getTotalAmount();

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛍️ Items agregados</h1>
      {cart.map((producto) => {
        return (
          <div
            key={producto.id}
            className="cart-item"
            style={{
              display: "flex",
              gap: "24px",
              border: "1px solid black",
              width: "400px",
            }}
          >
            <h2>{producto.title}</h2>
            <h2> ${producto.price}</h2>
            <h2> x{producto.cantidad}</h2>
            <button onClick={() => removeById(producto.id)}>eliminar</button>
          </div>
        );
      })}

      <h4 className="cart-total">El total a pagar es: ${total}</h4>

      <div className="cart-actions">
        <button onClick={resetCart} className="btn-detail">
          Limpiar carrito
        </button>
        {cart.length >= 1 && (
          <Link to="/checkout" className="btn-detail">
            Finalizar compra
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;

