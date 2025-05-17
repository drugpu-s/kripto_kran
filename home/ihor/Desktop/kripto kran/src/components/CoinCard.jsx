import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatCurrency, formatPercentage } from '@/lib/formatters';

const CoinCard = ({ coin, onAddToWatchlist, isInWatchlist, onRemoveFromWatchlist, isBCHFocus = false }) => {
  const priceChange24h = coin.price_change_percentage_24h;
  const isPriceUp = priceChange24h >= 0;
  const detailPath = isBCHFocus ? "/bch-details" : `/coins/${coin.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <Link to={detailPath} className="flex items-center space-x-3">
            <img src={coin.image} alt={coin.name} className="w-10 h-10 rounded-full" />
            <div>
              <h3 className="font-bold text-lg">{coin.name}</h3>
              <span className="text-xs text-muted-foreground uppercase">{coin.symbol}</span>
            </div>
          </Link>
          {!isBCHFocus && onAddToWatchlist && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => isInWatchlist ? onRemoveFromWatchlist(coin.id) : onAddToWatchlist(coin)}
              className={isInWatchlist ? "text-yellow-400" : "text-muted-foreground"}
            >
              <Star className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-baseline">
            <span className="text-2xl font-bold">{formatCurrency(coin.current_price)}</span>
            <div className={`flex items-center ${isPriceUp ? 'price-up' : 'price-down'}`}>
              {isPriceUp ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              <span className="text-sm font-medium">
                {formatPercentage(priceChange24h)}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground">Рыночная кап.</p>
              <p className="font-medium">{formatCurrency(coin.market_cap, 0)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Объем (24ч)</p>
              <p className="font-medium">{formatCurrency(coin.total_volume, 0)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-border">
          <Button asChild className="w-full">
            <Link 
              to={detailPath}
              className="flex items-center justify-center"
            >
              Подробнее <ExternalLink className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CoinCard;