import { Link } from "react-router-dom"; 
import "./productCard.css";

const ProductCard = ({ product }) => {
  const { title, description, price, id, imageUrl } = product;

  return (
    <div className="product-card">
      <img src={imageUrl} alt={title} className="product-img" />

      <div className="product-info">
        <h2 className="product-title">{title}</h2>
        <p className="product-price">${price}</p>
        <p className="product-description">{description}</p>

        <Link to={`/detalle/${id}`} className="btn-detail">
          Ver detalle
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;

