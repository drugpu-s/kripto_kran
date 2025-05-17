
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { CryptoContext } from '@/context/CryptoContext';

const TrendingCoins = () => {
  const { trending } = useContext(CryptoContext);

  if (!trending || trending.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        <Flame className="h-5 w-5 text-orange-500 mr-2" />
        <h2 className="text-xl font-bold">Trending Coins</h2>
      </div>
      
      <div className="overflow-x-auto pb-4">
        <motion.div 
          className="flex space-x-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {trending.map((coin) => (
            <motion.div
              key={coin.id}
              whileHover={{ y: -5 }}
              className="flex-shrink-0 w-48 glass-card rounded-xl p-4"
            >
              <Link to={`/coins/${coin.id}`} className="block">
                <div className="flex items-center mb-3">
                  <img 
                    src={coin.large} 
                    alt={coin.name} 
                    className="w-8 h-8 rounded-full mr-3" 
                  />
                  <div>
                    <h3 className="font-medium text-sm">{coin.name}</h3>
                    <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Market Cap Rank</span>
                  <span className="font-medium">#{coin.market_cap_rank || 'N/A'}</span>
                </div>
                
                <div className="mt-3 pt-3 border-t border-border text-center">
                  <span className="text-xs text-primary">View Details</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TrendingCoins;
