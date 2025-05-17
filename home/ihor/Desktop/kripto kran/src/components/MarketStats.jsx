
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, BarChart3, DollarSign } from 'lucide-react';
import { formatCurrency, formatNumber } from '@/lib/formatters';

const MarketStats = ({ globalData }) => {
  if (!globalData) return null;
  
  const stats = [
    {
      title: 'Market Cap',
      value: formatCurrency(globalData.total_market_cap?.usd || 0, 0),
      change: globalData.market_cap_change_percentage_24h_usd,
      icon: DollarSign,
    },
    {
      title: '24h Volume',
      value: formatCurrency(globalData.total_volume?.usd || 0, 0),
      icon: BarChart3,
    },
    {
      title: 'BTC Dominance',
      value: `${(globalData.market_cap_percentage?.btc || 0).toFixed(1)}%`,
      icon: TrendingUp,
    },
    {
      title: 'Active Coins',
      value: formatNumber(globalData.active_cryptocurrencies || 0),
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
          className="glass-card rounded-xl p-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold mt-2">{stat.value}</p>
          
          {stat.change !== undefined && (
            <div className={`flex items-center mt-1 text-xs ${stat.change >= 0 ? 'price-up' : 'price-down'}`}>
              {stat.change >= 0 ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingDown className="h-3 w-3 mr-1" />
              )}
              <span>{stat.change >= 0 ? '+' : ''}{stat.change.toFixed(2)}%</span>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default MarketStats;
