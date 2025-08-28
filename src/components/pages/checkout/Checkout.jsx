import { useContext, useState } from "react";
import { CartContext } from "../../../context/CartContext";
import { db } from "../../../firebaseConfig";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import "./checkout.css";


const Checkout = () => {

  const [user, setUser] = useState({
    nombre: "",
    telefono: "",
    email: "",
  });

  const { cart, getTotalAmount, resetCart } = useContext(CartContext);

  const [orderId, setOrderId] = useState(null);

  const handleSubmit = (evento) => {
    evento.preventDefault();
    console.log(user);
    
    let total = getTotalAmount();
    let objetoCompra = {
      buyer: user,
      items: cart,
      total: total,
    };

    let ordersCollection = collection(db, "orders");
    let res = addDoc(ordersCollection, objetoCompra);
    res
      .then((res) => {
        setOrderId(res.id);
        resetCart();
      })
      .catch((error) => {
        alert("ocurrio un error al comprar");
        console.log(error);
      });

    

    let productosCollection = collection(db, "products");
    objetoCompra.items.forEach((elemento) => {
      let productRef = doc(productosCollection, elemento.id);
      updateDoc(productRef, { stock: elemento.stock - elemento.cantidad });
    });
  };

  const handleChange = (evento) => {
    setUser({ ...user, [evento.target.name]: evento.target.value });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Formulario de compra</h1>
      {orderId ? (
        <h2 className="checkout-success">El número de orden es {orderId}</h2>
      ) : (
        <form onSubmit={handleSubmit} className="checkout-form">
          <input
            type="text"
            placeholder="Nombre"
            name="nombre"
            onChange={handleChange}
            className="checkout-input"
            autoComplete="name"
          />
          <input
            type="text"
            placeholder="telefono"
            name="telefono"
            onChange={handleChange}
            className="checkout-input"
            autoComplete="tel"
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            onChange={handleChange}
            className="checkout-input"
            autoComplete="email"
          />
          <button className="checkout-btn">Comprar</button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
