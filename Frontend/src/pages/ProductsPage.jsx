import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ProductsPage.css";

const API_URL = "http://localhost:5000/products";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data.data || []);
      setError("");
    } catch (err) {
      setError("Erreur lors du chargement des produits");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
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
      imageUrl: "",
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (editingProduct) {
        await axios.put(`${API_URL}/${editingProduct.id}`, {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      } else {
        await axios.post(API_URL, {
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        });
      }

      resetForm();
      fetchProducts();
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de la sauvegarde");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      stock: product.stock.toString(),
      imageUrl: product.imageUrl || "",
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/${id}`);
      fetchProducts();
    } catch (err) {
      setError("Erreur lors de la suppression");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="products-page">
      <div className="products-container">
        {/* Header */}
        <div className="products-header">
          <h1>🛍️ Gestion des Produits</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className={showForm ? "btn-cancel" : "btn-primary"}
          >
            {showForm ? "✕ Annuler" : "+ Ajouter un produit"}
          </button>
        </div>

        {/* Message d'erreur */}
        {error && <div className="error-message">⚠️ {error}</div>}

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
                    rows="3"
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
                    <label htmlFor="stock">Stock</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      className="form-input"
                      placeholder="0"
                      min="0"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="imageUrl">URL de l'image</label>
                  <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
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
                    ❌ Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Liste des produits */}
        <div className="products-list">
          <h2>📦 Liste des produits ({products.length})</h2>

          {loading && !showForm && (
            <div className="loading-message">
              <div className="loading-spinner"></div>
              <p>Chargement des produits...</p>
            </div>
          )}

          {!loading && products.length === 0 && (
            <div className="empty-message">
              <p style={{ fontSize: "3rem", margin: "0 0 10px 0" }}>📭</p>
              <p style={{ margin: 0 }}>Aucun produit disponible.</p>
              <p style={{ margin: "5px 0 0 0", fontSize: "14px" }}>
                Ajoutez-en un pour commencer !
              </p>
            </div>
          )}

          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
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
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
