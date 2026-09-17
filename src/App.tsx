import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { HomePage } from './pages/HomePage';
import { BouquetsPage } from './pages/BouquetsPage';
import { BouquetDetailPage } from './pages/BouquetDetailPage';
import { CustomPage } from './pages/CustomPage';
import { CartPage } from './pages/CartPage';

export function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bouquets" element={<BouquetsPage />} />
          <Route path="/bouquets/:slug" element={<BouquetDetailPage />} />
          <Route path="/sur-mesure" element={<CustomPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
