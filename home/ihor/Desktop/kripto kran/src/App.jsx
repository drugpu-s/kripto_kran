import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CryptoProvider } from '@/context/CryptoContext';

// Layouts
import MainLayout from '@/layouts/MainLayout';

// Pages
import HomePage from '@/pages/HomePage';
import CoinDetailsPage from '@/pages/CoinDetailsPage';
import MarketsPage from '@/pages/MarketsPage';
import WatchlistPage from '@/pages/WatchlistPage';
import NotFoundPage from '@/pages/NotFoundPage';

function App() {
  return (
    <CryptoProvider>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
      >
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="coins/:coinId" element={<CoinDetailsPage />} />
            <Route path="markets" element={<MarketsPage />} />
            <Route path="watchlist" element={<WatchlistPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </motion.div>
    </CryptoProvider>
  );
}

export default App;