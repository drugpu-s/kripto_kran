import React from 'react';
import { motion } from 'framer-motion';
import CoinList from '@/components/CoinList';
import AdBanner from '@/components/AdBanner';

const MarketsPage = () => {
  return (
    <div>
      <AdBanner placement="top-banner" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Рынки криптовалют</h1>
        <p className="text-muted-foreground">
          Отслеживайте цены и производительность криптовалют на рынке. (В данный момент отображается только Bitcoin Cash)
        </p>
      </motion.div>
      
      <CoinList limit={1} /> {/* Only show BCH */}
      <div className="mt-8">
        <AdBanner placement="bottom-banner" />
      </div>
    </div>
  );
};

export default MarketsPage;