import { BrowserRouter, Routes, Route } from "react-router-dom"; // OJO! acá debería ser react-router-dom
import { ItemListContainer } from "./components/pages/itemListContainer/ItemListContainer";
import Cart from "./components/pages/cart/Cart";
import { Navbar } from "./components/layout/navbar/Navbar";
import { Footer } from "./components/layout/footer/Footer";  // 👈 Importar Footer
import NotFound from "./components/pages/notFound/NotFound";
import ItemDetailContainer from "./components/pages/itemDetailContainer/ItemDetailContainer";
import CartContextProvider from "./context/CartContext";
import Checkout from "./components/pages/checkout/Checkout";

function App() {
  return (
    <BrowserRouter>
      <CartContextProvider>
        <Navbar />
        <Routes>
          {/* Empiezo a crear mis rutas */}
          <Route path="/" element={<ItemListContainer />} />
          <Route path="/category/:name" element={<ItemListContainer />} />
          <Route path="/detalle/:id" element={<ItemDetailContainer />} />
          <Route path="/carrito" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth/login" element={<h1>Login</h1>} />
          <Route path="/auth/register" element={<h1>Registro</h1>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer /> 
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;

