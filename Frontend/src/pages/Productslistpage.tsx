/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// src/pages/ProductsList/ProductsListPage.tsx
import { useState, useEffect } from "react";
import api from "../services/api";
import Header from "../components/header";
import "./ProductsListPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  mainImage?: string;
  seller: {
    id: number;
    firstName: string;
    lastName: string;
  };
  views: number;
  rating: number;
}

function ProductsListPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;

  // ✅ Vérifier le rôle de l'utilisateur
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    fetchProducts();
  }, [category]);

  useEffect(() => {
    // Filtrer les produits selon la recherche
    if (search) {
      const filtered = products.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
    setCurrentPage(1); // Reset à la page 1 lors d'une recherche
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params: any = {};
      if (category) params.category = category;

      const response = await api.get("/products", { params });
      setProducts(response.data.data);
      setFilteredProducts(response.data.data);
      setError("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des produits",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Le filtre se fait automatiquement via useEffect
  };

  // ✅ Ajouter au panier
  const addToCart = (product: Product) => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      // Vérifier si le produit existe déjà
      const existingItemIndex = cart.findIndex(
        (item: any) => item.productId === product.id,
      );

      if (existingItemIndex > -1) {
        // Augmenter la quantité
        cart[existingItemIndex].quantity += 1;
      } else {
        // Ajouter nouveau produit
        cart.push({
          id: Date.now(),
          productId: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity: 1,
          mainImage: product.mainImage,
          seller: product.seller,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      // Animation de confirmation
      const btn = document.getElementById(`cart-btn-${product.id}`);
      if (btn) {
        btn.textContent = "✓ Ajouté !";
        btn.style.background = "#27ae60";
        setTimeout(() => {
          btn.textContent = "🛒 Ajouter au panier";
          btn.style.background = "";
        }, 2000);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
    }
  };

  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="products-list-page">
      <Header />

      <div className="products-list-container">
        {/* En-tête */}
        <div className="page-header">
          <h1>🛍️ Tous les Produits</h1>
          <p className="page-subtitle">Découvrez notre sélection de produits</p>
        </div>

        {/* Filtres */}
        <div className="filters-section">
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="🔍 Rechercher un produit..."
              className="search-input"
            />
            <button type="submit" className="btn-search">
              Rechercher
            </button>
          </form>

          <div className="category-filter">
            <label htmlFor="category">Catégorie :</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="category-select"
            >
              <option value="">Toutes les catégories</option>
              <option value="electronics">Électronique</option>
              <option value="clothing">Vêtements</option>
              <option value="food">Alimentation</option>
              <option value="books">Livres</option>
              <option value="home">Maison</option>
              <option value="sports">Sports</option>
              <option value="beauty">Beauté</option>
              <option value="toys">Jouets</option>
              <option value="other">Autre</option>
            </select>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Chargement */}
        {loading && (
          <div className="loading-message">
            <div className="loading-spinner"></div>
            <p>Chargement des produits...</p>
          </div>
        )}

        {/* Message vide */}
        {!loading && filteredProducts.length === 0 && (
          <div className="empty-message">
            <p style={{ fontSize: "3rem", margin: "0 0 10px 0" }}>🔭</p>
            <p style={{ margin: 0 }}>Aucun produit trouvé.</p>
            <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
              Essayez de modifier vos critères de recherche.
            </p>
          </div>
        )}

        {/* ✅ Info pagination */}
        {!loading && filteredProducts.length > 0 && (
          <div className="pagination-info">
            Affichage de {indexOfFirstProduct + 1} à{" "}
            {Math.min(indexOfLastProduct, filteredProducts.length)} sur{" "}
            {filteredProducts.length} produits
          </div>
        )}

        {/* Grille de produits */}
        <div className="products-grid">
          {currentProducts.map((product) => (
            <div key={product.id} className="product-card">
              {product.mainImage ? (
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="product-image"
                />
              ) : (
                <div className="product-image-placeholder">🖼️</div>
              )}

              <div className="product-content">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">
                  {product.description || "Aucune description disponible"}
                </p>

                <div className="product-seller">
                  <span>Vendu par : </span>
                  <strong>
                    {product.seller.firstName} {product.seller.lastName}
                  </strong>
                </div>

                <div className="product-info">
                  <div>
                    <div className="product-price">
                      {product.price.toFixed(2)} TND
                    </div>
                    <div
                      className={`product-stock ${product.stock > 0 ? "stock-available" : "stock-unavailable"}`}
                    >
                      {product.stock > 0
                        ? `✓ En stock (${product.stock})`
                        : "✗ Rupture de stock"}
                    </div>
                  </div>
                </div>

                <div className="product-meta">
                  <span>👁️ {product.views} vues</span>
                  <span>⭐ {product.rating.toFixed(1)}</span>
                </div>

                {/* ✅ Bouton panier visible uniquement pour les clients */}
                {userRole === "client" && (
                  <button
                    id={`cart-btn-${product.id}`}
                    className="btn-add-cart"
                    disabled={product.stock === 0}
                    onClick={() => addToCart(product)}
                  >
                    🛒 Ajouter au panier
                  </button>
                )}

                {/* ✅ Message pour les vendeurs */}
                {userRole === "vendeur" && (
                  <div className="vendor-message">
                    👀 Vous consultez ce produit en tant que vendeur
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Pagination */}
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Précédent
            </button>

            <div className="pagination-numbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`pagination-number ${currentPage === number ? "active" : ""}`}
                  >
                    {number}
                  </button>
                ),
              )}
            </div>

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Suivant →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsListPage;
