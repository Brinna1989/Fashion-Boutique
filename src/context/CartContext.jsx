import { createContext, useState } from "react";

export const CartContext = createContext(); // el contexto

const CartContextProvider = ({ children }) => {
  // const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [] ); // [{}] --> [{},{}] --> [{},{},{}]
  // localStorage.setItem("cart", JSON.stringify(newArray))

  const [cart, setCart] = useState([]); // [{}] --> [{},{}] --> [{},{},{}]

  console.log(cart);
  const addToCart = (producto) => {
    // siempre siempre siempre asi se agrega algo a un array
    setCart([...cart, producto]);
  };

  const resetCart = () => {
    setCart([]);
  };
  const removeById = (id) => {
    // siempre siempre siempre asi se elimina algo de un array
    let arrayFiltrado = cart.filter((elemento) => elemento.id !== id);
    // ---> [] solo con los elementos que cumplan
    setCart(arrayFiltrado);
  };
  const getTotalAmount = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.price * elemento.cantidad;
    }, 0);

    return total;
  };

  const getTotalQuanty = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.cantidad;
    }, 0);
    return total;
  };

  // const getTotalAmount = () => {
  //   let acc = 0;

  //   for (let i = 0; i < cart.length; i++) {
  //     acc += cart[i].price * cart[i].cantidad;
  //   }

  //   return acc;
  // };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeById,
        resetCart,
        getTotalAmount,
        getTotalQuanty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider; // el componmentre que va a proveer ese context
