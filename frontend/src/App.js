import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "./components/ui/toaster";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Zone from "./pages/Zone";
import Login from "./pages/Login";
import OrderSuccess from "./pages/OrderSuccess";
import Profile from "./pages/Profile";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Layout Component
const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <Layout>
                  <Home />
                </Layout>
              }
            />
            <Route
              path="/shop"
              element={
                <Layout>
                  <Shop />
                </Layout>
              }
            />
            <Route
              path="/zone"
              element={
                <Layout>
                  <Zone />
                </Layout>
              }
            />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <Route
              path="/cart"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/checkout"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/orders"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/profile"
              element={
                <Layout>
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                </Layout>
              }
            />
            <Route
              path="/order-success/:orderId"
              element={
                <Layout>
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                </Layout>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          <Toaster />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
