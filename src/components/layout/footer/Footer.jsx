import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <h2 className="footer-logo">Fashion Boutique</h2>
        <p className="footer-text">Girls: moda que inspira💄</p>
        <div className="footer-socials">
          <a href="#">Instagram</a>
          <a href="#">Facebook</a>
          <a href="#">TikTok</a>
        </div>
      </div>
      <p className="footer-rights">
        © 2025 Fashion Boutique - Todos los derechos reservados
      </p>
    </footer>
  );
};
