import { CartWidget } from "../../common/cartWidget/CartWidget";
import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img
          src="https://res.cloudinary.com/dyhunacbk/image/upload/v1756405410/Girls_otauvh.png"
          alt="Logo Tienda"
          className="navbar-logo"
        />
        <Link to="/" className="navbar-brand">
          Fashion Boutique ♥
        </Link>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/category/Jeans">Jeans</Link>
        </li>
        <li>
          <Link to="/category/Blusas & remeras">Blusas & remeras</Link>
        </li>
      </ul>

      <CartWidget />
    </nav>
  );
};
