/* eslint-disable react-hooks/immutability */
// src/pages/Cart/CartPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "./CartPage.css";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mainImage?: string;
  seller: {
    firstName: string;
    lastName: string;
  };
}

function CartPage() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Vérifier que l'utilisateur est bien un client
    const userRole = localStorage.getItem("userRole");
    if (userRole === "vendeur") {
      navigate("/dashboard");
      return;
    }

    // Charger le panier depuis le localStorage
    loadCart();
  }, [navigate]);

  const loadCart = () => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Erreur lors du chargement du panier:", error);
    }
  };

  const saveCart = (items: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(items));
    setCartItems(items);
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cartItems.map((item) =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item,
    );
    saveCart(updatedCart);
  };

  const removeItem = (productId: number) => {
    const updatedCart = cartItems.filter(
      (item) => item.productId !== productId,
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    if (window.confirm("Voulez-vous vraiment vider le panier ?")) {
      saveCart([]);
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 7.0 : 0; // Frais de livraison fixes
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateShipping();
  };

  const handleCheckout = () => {
    setLoading(true);
    // Simuler un processus de paiement
    setTimeout(() => {
      alert("Commande passée avec succès ! (Simulation)");
      saveCart([]);
      setLoading(false);
      navigate("/products-list");
    }, 1500);
  };

  return (
    <div className="cart-page">
      <Header />

      <div className="cart-container">
        {/* En-tête */}
        <div className="cart-header">
          <h1>🛒 Mon Panier</h1>
          <p className="cart-subtitle">
            {cartItems.length} article{cartItems.length > 1 ? "s" : ""} dans
            votre panier
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Panier vide */
          <div className="empty-cart">
            <div className="empty-icon">🛍️</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos produits et ajoutez-en à votre panier !</p>
            <button
              onClick={() => navigate("/products-list")}
              className="btn btn-primary"
            >
              Découvrir les produits
            </button>
          </div>
        ) : (
          /* Panier avec articles */
          <div className="cart-content">
            {/* Liste des articles */}
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    {item.mainImage ? (
                      <img src={item.mainImage} alt={item.name} />
                    ) : (
                      <div className="image-placeholder">🖼️</div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-seller">
                      Vendu par : {item.seller.firstName} {item.seller.lastName}
                    </p>
                    <p className="item-description">{item.description}</p>
                  </div>

                  <div className="item-quantity">
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      className="qty-btn"
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>

                  <div className="item-price">
                    <div className="unit-price">
                      {item.price.toFixed(2)} TND
                    </div>
                    <div className="total-price">
                      {(item.price * item.quantity).toFixed(2)} TND
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.productId)}
                    className="btn-remove"
                    title="Supprimer"
                  >
                    🗑️
                  </button>
                </div>
              ))}

              {/* Bouton vider le panier */}
              <button onClick={clearCart} className="btn-clear-cart">
                🗑️ Vider le panier
              </button>
            </div>

            {/* Résumé de la commande */}
            <div className="cart-summary">
              <h2>Résumé de la commande</h2>

              <div className="summary-line">
                <span>Sous-total</span>
                <span>{calculateSubtotal().toFixed(2)} TND</span>
              </div>

              <div className="summary-line">
                <span>Livraison</span>
                <span>{calculateShipping().toFixed(2)} TND</span>
              </div>

              <div className="summary-line total">
                <span>Total</span>
                <span className="total-amount">
                  {calculateTotal().toFixed(2)} TND
                </span>
              </div>

              <button
                onClick={handleCheckout}
                className="btn btn-primary btn-checkout"
                disabled={loading}
              >
                {loading ? "⏳ Traitement..." : "✓ Commander"}
              </button>

              <button
                onClick={() => navigate("/products-list")}
                className="btn btn-secondary btn-continue"
              >
                ← Continuer mes achats
              </button>

              <div className="payment-methods">
                <p>Modes de paiement acceptés :</p>
                <div className="payment-icons">
                  <span>💳</span>
                  <span>🏦</span>
                  <span>📱</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
