/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  mainImage: string;
  seller: {
    firstName: string;
    lastName: string;
  };
}

function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate();

  const SHIPPING_COST = 7.0;

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedCart = cart.map((item) =>
      item.id === itemId ? { ...item, quantity: newQuantity } : item,
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = (itemId: number) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return calculateSubtotal() + SHIPPING_COST;
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      // Préparer les données de la commande
      const orderData = {
        items: cart.map((item) => ({
          productId: item.productId,
          productName: item.name,
          price: item.price,
          quantity: item.quantity,
          productImage: item.mainImage,
          sellerName: `${item.seller.firstName} ${item.seller.lastName}`,
        })),
        subtotal: calculateSubtotal(),
        shippingCost: SHIPPING_COST,
        totalAmount: calculateTotal(),
        shippingAddress: "Adresse à définir", // Vous pouvez ajouter un formulaire pour ça
        phone: localStorage.getItem("userPhone") || "",
        notes: "",
      };

      // Envoyer la commande au backend
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la commande");
      }

      // Commande réussie
      setOrderSuccess(true);
      clearCart();

      // Rediriger vers l'historique des commandes après 2 secondes
      setTimeout(() => {
        navigate("/orders-history");
      }, 2000);
    } catch (error: any) {
      console.error("Erreur lors de la commande:", error);
      alert(`Erreur: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="cart-page">
        <div className="success-message">
          <div className="success-icon">✓</div>
          <h2>Commande passée avec succès !</h2>
          <p>
            Merci pour votre achat. Vous allez être redirigé vers vos
            commandes...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
      </div>

      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Mon Panier</h1>
          <p>
            {cart.length > 0
              ? `${cart.length} article(s) dans votre panier`
              : "Votre panier est vide"}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez nos produits et ajoutez-les à votre panier !</p>
            <button
              className="btn-discover"
              onClick={() => navigate("/products-list")}
            >
              🛍️ Découvrir les produits
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img
                    src={item.mainImage}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-seller">
                      Vendu par : {item.seller.firstName} {item.seller.lastName}
                    </p>
                    <p className="item-price">{item.price.toFixed(2)} TND</p>
                  </div>
                  <div className="item-quantity">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="item-total">
                    {(item.price * item.quantity).toFixed(2)} TND
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => removeItem(item.id)}
                  >
                    🗑️
                  </button>
                </div>
              ))}

              <button className="btn-clear-cart" onClick={clearCart}>
                Vider le panier
              </button>
            </div>

            <div className="cart-summary">
              <h2>Résumé de la commande</h2>
              <div className="summary-row">
                <span>Sous-total</span>
                <span>{calculateSubtotal().toFixed(2)} TND</span>
              </div>
              <div className="summary-row">
                <span>Frais de livraison</span>
                <span>{SHIPPING_COST.toFixed(2)} TND</span>
              </div>
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>{calculateTotal().toFixed(2)} TND</strong>
              </div>
              <button
                className="btn-checkout"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? "Traitement..." : "Passer la commande"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
