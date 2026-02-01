// src/components/Header.tsx
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function Header() {
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  if (!token) {
    return null; // Ne pas afficher le header si non connecté
  }

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">◈</span>
            <span className="logo-text">NEXUS</span>
          </Link>

          <nav className="nav-menu">
            {userRole === "vendeur" ? (
              <>
                <Link to="/dashboard" className="nav-link">
                  🏪 Mon Dashboard
                </Link>
                <Link to="/products-list" className="nav-link">
                  📦 Tous les produits
                </Link>
              </>
            ) : (
              <>
                <Link to="/products-list" className="nav-link">
                  🛍️ Produits
                </Link>
                <Link to="/cart" className="nav-link">
                  🛒 Mon Panier
                </Link>
              </>
            )}

            <button onClick={handleLogout} className="btn btn-logout">
              🚪 Déconnexion
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
