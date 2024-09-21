import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppNavbar from '../../../components/userComponents/AppNavbar';
import AppFooter from '../../../components/userComponents/AppFooter';
import BuyProductContent from '../../../components/userComponents/contents/BuyProductContent';
import ProductPage from '../../../components/userComponents/ProductCard';

function BuyProducts() {
  return (
    <>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<BuyProductContent />} />
        <Route path="/category/:id" element={<ProductPage />} />
      </Routes>
      <AppFooter />
    </>
  );
}

export default BuyProducts;
