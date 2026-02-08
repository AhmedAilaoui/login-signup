/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import "./OrdersHistoryPage.css";

interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  productImage: string;
  sellerName: string;
}

interface Order {
  id: number;
  totalAmount: number;
  subtotal: number;
  shippingCost: number;
  status: string;
  shippingAddress: string;
  phone: string;
  notes: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrderStats {
  totalOrders: number;
  totalSpent: string;
  totalItems: number;
  statusCounts: Record<string, number>;
}

function OrdersHistoryPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<OrderStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch("http://localhost:3001/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des commandes");
      }

      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/api/orders/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des statistiques", err);
    }
  };

  const toggleOrderDetails = (orderId: number) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "status-pending";
      case "processing":
        return "status-processing";
      case "shipped":
        return "status-shipped";
      case "delivered":
        return "status-delivered";
      case "cancelled":
        return "status-cancelled";
      default:
        return "";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "En attente";
      case "processing":
        return "En cours";
      case "shipped":
        return "Expédié";
      case "delivered":
        return "Livré";
      case "cancelled":
        return "Annulé";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="orders-history-page">
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Chargement de vos commandes...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="orders-history-page">
        <div className="bg-decoration">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
        </div>

        <div className="orders-container">
        <div className="orders-header">
          <h1>📦 Mes Commandes</h1>
          <p>Suivez l'historique et le statut de vos achats</p>
        </div>

        {/* Statistiques */}
        {stats && (
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">🛒</div>
              <div className="stat-content">
                <h3>{stats.totalOrders}</h3>
                <p>Commandes totales</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>{stats.totalSpent} TND</h3>
                <p>Total dépensé</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>{stats.totalItems}</h3>
                <p>Articles achetés</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-content">
                <h3>{stats.statusCounts.delivered || 0}</h3>
                <p>Commandes livrées</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>❌ {error}</p>
          </div>
        )}

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📭</div>
            <h2>Aucune commande pour le moment</h2>
            <p>Commencez à acheter pour voir vos commandes ici !</p>
            <button
              className="btn-primary"
              onClick={() => navigate("/products-list")}
            >
              🛍️ Découvrir les produits
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div
                  className="order-summary"
                  onClick={() => toggleOrderDetails(order.id)}
                >
                  <div className="order-info">
                    <div className="order-number">
                      <strong>Commande #{order.id}</strong>
                      <span
                        className={`status-badge ${getStatusBadgeClass(order.status)}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <div className="order-date">
                      📅 {formatDate(order.createdAt)}
                    </div>
                    <div className="order-items-count">
                      📦 {order.items.length} article(s)
                    </div>
                  </div>
                  <div className="order-total">
                    <strong>{Number(order.totalAmount).toFixed(2)} TND</strong>
                    <span className="expand-icon">
                      {expandedOrder === order.id ? "▲" : "▼"}
                    </span>
                  </div>
                </div>

                {expandedOrder === order.id && (
                  <div className="order-details">
                    {/* Articles */}
                    <div className="order-items">
                      <h3>Articles commandés :</h3>
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <img
                            src={
                              item.productImage ||
                              "https://via.placeholder.com/80"
                            }
                            alt={item.productName}
                            className="item-image"
                          />
                          <div className="item-info">
                            <h4>{item.productName}</h4>
                            <p className="item-seller">
                              Vendu par : {item.sellerName}
                            </p>
                            <p className="item-quantity">
                              Quantité : {item.quantity}
                            </p>
                          </div>
                          <div className="item-price">
                            {Number(item.price).toFixed(2)} TND
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Résumé des prix */}
                    <div className="order-pricing">
                      <div className="pricing-row">
                        <span>Sous-total :</span>
                        <span>{Number(order.subtotal).toFixed(2)} TND</span>
                      </div>
                      <div className="pricing-row">
                        <span>Frais de livraison :</span>
                        <span>{Number(order.shippingCost).toFixed(2)} TND</span>
                      </div>
                      <div className="pricing-row total">
                        <strong>Total :</strong>
                        <strong>{Number(order.totalAmount).toFixed(2)} TND</strong>
                      </div>
                    </div>

                    {/* Adresse de livraison */}
                    {order.shippingAddress && (
                      <div className="order-address">
                        <h3>📍 Adresse de livraison :</h3>
                        <p>{order.shippingAddress}</p>
                        {order.phone && <p>📞 {order.phone}</p>}
                      </div>
                    )}

                    {/* Notes */}
                    {order.notes && (
                      <div className="order-notes">
                        <h3>📝 Notes :</h3>
                        <p>{order.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </>
  );
}

export default OrdersHistoryPage;
