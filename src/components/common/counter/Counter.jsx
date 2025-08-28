import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";

const Counter = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const [contador, setContador] = useState(1);

  const sumar = () => {
    if (contador < product.stock) {
      setContador(contador + 1);
    } else {
      alert("stock maximo");
    }
  };
  const restar = () => {
    setContador(contador - 1);
  };

  const agregarAlCarrito = () => {
    let productoConCantidad = { ...product, cantidad: contador };
    addToCart(productoConCantidad);
    alert("se agrego al carrito");
    
  };

  return (
    <div>
      <button onClick={restar} disabled={contador === 1}>
        restar
      </button>
      <h2>{contador}</h2>
      <button onClick={sumar}>sumar</button>

      <button onClick={agregarAlCarrito}>Agregar al carrito</button>
    </div>
  );
};

export default Counter;
