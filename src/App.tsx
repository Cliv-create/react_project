import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import {LoginPage} from "./pages/LoginPage.tsx";
import {RegisterPage} from "./pages/RegisterPage.tsx";
import {Layout} from "./components/layout/Layout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {CategoryPage} from "./pages/CategoryPage.tsx";
import {AuthGuard} from "./components/auth/AuthGuard.tsx";
import {CartPage} from "./pages/CartPage.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import {CartProvider} from "./context/CartContext.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";

function App() {

  return (
      <Router>
          <AuthProvider>
              <CartProvider>
                  <Routes>
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />
                      <Route path="/" element={
                          <Layout>
                              <HomePage />
                          </Layout>
                      } />
                      <Route path="/category/:categoryId" element={
                          <Layout>
                              <CategoryPage />
                          </Layout>
                      } />
                      <Route path="/product/:productId" element={
                          <Layout>
                              <ProductPage />
                          </Layout>
                      } />
                      <Route path="/cart/:cartId" element={
                          <AuthGuard>
                              <Layout>
                                  <CartPage />
                              </Layout>
                          </AuthGuard>
                      } />
                      <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
              </CartProvider>
          </AuthProvider>
      </Router>
  )
}

export default App
