// src/App.tsx
import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SubscribePage from "./pages/SubscribePage";
import DashboardPage from "./pages/DashboardPage";
import ProductsListPage from "./pages/Productslistpage";
import CartPage from "./pages/CartPage"; // ✅ NOUVEAU
import type { JSX } from "react";

// Composant de protection des routes
function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

// Route protégée pour les vendeurs uniquement
function VendorRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole !== "vendeur") {
    return <Navigate to="/products-list" replace />;
  }

  return children;
}

// ✅ Route protégée pour les clients uniquement
function ClientRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userRole === "vendeur") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/subscribe" element={<SubscribePage />} />

      {/* Routes protégées - VENDEUR */}
      <Route
        path="/dashboard"
        element={
          <VendorRoute>
            <DashboardPage />
          </VendorRoute>
        }
      />

      {/* Routes protégées - TOUS UTILISATEURS */}
      <Route
        path="/products-list"
        element={
          <PrivateRoute>
            <ProductsListPage />
          </PrivateRoute>
        }
      />

      {/* ✅ NOUVEAU - Route protégée - CLIENTS uniquement */}
      <Route
        path="/cart"
        element={
          <ClientRoute>
            <CartPage />
          </ClientRoute>
        }
      />

      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
