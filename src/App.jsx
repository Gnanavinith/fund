import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './Components/Navbar'
import Footer from './Components/Footer';
import HeroPage from "./Pages/HeroPage" 
import DonatePage from "./Pages/DonatePage"
import PricingPage from "./Pages/PricingPage"
import ContactUsPage from "./Pages/ContactUsPage"
import CartDetailPage from './Pages/CartDetailPage';
import LoginForm from './SecurityForm/LoginForm';
import RegisterForm from './SecurityForm/RegisterForm';
import PostStartup from './Pages/PostStartup';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/homepage" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/homepage" element={<HeroPage />} />
          <Route path="/overallcarts" element={<DonatePage />} />
          <Route path="/Pricing" element={<PricingPage />} />
          <Route path="/Contactus" element={<ContactUsPage />} />
          <Route path="/cart/:id" element={<CartDetailPage />} />
          <Route 
            path="/poststartup" 
            element={
              <ProtectedRoute>
                <PostStartup />
              </ProtectedRoute>
            } 
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
