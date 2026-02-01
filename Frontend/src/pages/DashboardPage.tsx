/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Dashboard/DashboardPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/header";
import "./DashboardPage.css";

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  status: string;
  mainImage?: string;
  views: number;
  rating: number;
  createdAt: string;
}

interface Stats {
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  outOfStock: number;
  totalViews: number;
  averageRating: number;
}

interface FormData {
  name: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  mainImage: string;
}

function DashboardPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "electronics",
    mainImage: "",
  });

  useEffect(() => {
    // Vérifier le rôle
    const userRole = localStorage.getItem("userRole");
    if (userRole !== "vendeur") {
      navigate("/products-list");
      return;
    }

    fetchProducts();
    fetchStats();
  }, [navigate]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products/my/products");
      setProducts(response.data.data);
      setError("");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Erreur lors du chargement des produits",
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/products/my/stats");
      setStats(response.data.data);
    } catch (err: any) {
      console.error("Erreur stats:", err);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      stock: "",
      category: "electronics",
      mainImage: "",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const productData = {
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        category: formData.category,
        mainImage: formData.mainImage || undefined,
      };

      if (editingProduct) {
        await api.put(`/products/${editingProduct.id}`, productData);
      } else {
        await api.post("/products", productData);
      }

      resetForm();
      fetchProducts();
      fetchStats();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      mainImage: product.mainImage || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      setLoading(true);
      await api.delete(`/products/${id}`);
      fetchProducts();
      fetchStats();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct,
  );
  const totalPages = Math.ceil(products.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  return (
    <div className="dashboard-page">
      <Header />

      <div className="dashboard-container">
        {/* En-tête */}
        <div className="dashboard-header">
          <h1>🏪 Dashboard Vendeur</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? "btn-cancel" : "btn-primary"}
          >
            {showForm ? "✕ Annuler" : "➕ Ajouter un produit"}
          </button>
        </div>

        {/* Statistiques */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalProducts}</div>
                <div className="stat-label">Total produits</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <div className="stat-value">{stats.activeProducts}</div>
                <div className="stat-label">Actifs</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">👁️</div>
              <div className="stat-content">
                <div className="stat-value">{stats.totalViews}</div>
                <div className="stat-label">Vues totales</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-content">
                <div className="stat-value">
                  {stats.averageRating.toFixed(1)}
                </div>
                <div className="stat-label">Note moyenne</div>
              </div>
            </div>
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            {error}
          </div>
        )}

        {/* Formulaire */}
        {showForm && (
          <div className="form-container">
            <h2>
              {editingProduct ? "✏️ Modifier le produit" : "➕ Nouveau produit"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nom du produit *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Ex: iPhone 15 Pro"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="form-textarea"
                    placeholder="Décrivez votre produit..."
                    rows={3}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Prix (TND) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="stock">Stock *</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="category">Catégorie *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
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

                <div className="form-group">
                  <label htmlFor="mainImage">URL de l'image (optionnel)</label>
                  <input
                    type="url"
                    id="mainImage"
                    name="mainImage"
                    value={formData.mainImage}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="https://exemple.com/image.jpg"
                  />
                </div>

                <div className="form-actions">
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading
                      ? "⏳ Sauvegarde..."
                      : editingProduct
                        ? "💾 Mettre à jour"
                        : "✨ Créer"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn-secondary"
                  >
                    ✕ Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Liste des produits */}
        <div className="products-list">
          <h2>📦 Mes produits ({products.length})</h2>

          {loading && !showForm && (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Chargement des produits...</p>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="empty-message">
              <p style={{ fontSize: "3rem", margin: "0 0 10px 0" }}>🔭</p>
              <p style={{ margin: 0 }}>Aucun produit disponible.</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                Ajoutez-en un pour commencer !
              </p>
            </div>
          )}

          {/* ✅ Info pagination */}
          {!loading && products.length > 0 && (
            <div className="pagination-info">
              Affichage de {indexOfFirstProduct + 1} à{" "}
              {Math.min(indexOfLastProduct, products.length)} sur{" "}
              {products.length} produits
            </div>
          )}

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

                  <div className="product-actions">
                    <button
                      onClick={() => handleEdit(product)}
                      className="btn-edit"
                    >
                      ✏️ Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn-delete"
                    >
                      🗑️ Supprimer
                    </button>
                  </div>
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
    </div>
  );
}

export default DashboardPage;
