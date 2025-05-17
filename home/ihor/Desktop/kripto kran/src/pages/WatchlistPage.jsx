
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, AlertCircle } from 'lucide-react';
import { CryptoContext } from '@/context/CryptoContext';
import CoinCard from '@/components/CoinCard';
import { Button } from '@/components/ui/button';

const WatchlistPage = () => {
  const { watchlist, removeFromWatchlist } = useContext(CryptoContext);

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <div className="flex items-center mb-2">
          <Star className="h-6 w-6 text-yellow-400 mr-2" />
          <h1 className="text-3xl font-bold">Your Watchlist</h1>
        </div>
        <p className="text-muted-foreground">
          Track and monitor your favorite cryptocurrencies.
        </p>
      </motion.div>
      
      {watchlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 glass-card rounded-xl"
        >
          <AlertCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-xl font-bold mb-2">Your watchlist is empty</h2>
          <p className="text-muted-foreground mb-6">
            Add cryptocurrencies to your watchlist to track their performance.
          </p>
          <Button asChild>
            <Link to="/markets">Explore Markets</Link>
          </Button>
        </motion.div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {watchlist.map((coin) => (
            <CoinCard 
              key={coin.id} 
              coin={coin} 
              onRemoveFromWatchlist={removeFromWatchlist}
              isInWatchlist={true}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default WatchlistPage;
