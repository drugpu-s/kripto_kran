
import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Search, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { CryptoContext } from '@/context/CryptoContext';
import CoinCard from '@/components/CoinCard';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const CoinList = ({ limit = 12 }) => {
  const { coins, isLoading, addToWatchlist, removeFromWatchlist, isInWatchlist } = useContext(CryptoContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap_desc');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (value) => {
    setSortBy(value);
  };

  const sortCoins = (coins) => {
    const [field, direction] = sortBy.split('_');
    
    return [...coins].sort((a, b) => {
      let valueA, valueB;
      
      if (field === 'name') {
        valueA = a.name.toLowerCase();
        valueB = b.name.toLowerCase();
        return direction === 'asc' 
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      
      if (field === 'price') {
        valueA = a.current_price;
        valueB = b.current_price;
      } else if (field === 'change') {
        valueA = a.price_change_percentage_24h;
        valueB = b.price_change_percentage_24h;
      } else {
        // Default to market cap
        valueA = a.market_cap;
        valueB = b.market_cap;
      }
      
      return direction === 'asc' ? valueA - valueB : valueB - valueA;
    });
  };

  const filteredCoins = coins
    .filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
  const sortedCoins = sortCoins(filteredCoins);
  const displayCoins = limit ? sortedCoins.slice(0, limit) : sortedCoins;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative w-full md:w-64">
          <Input
            type="text"
            placeholder="Search coins..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <Select value={sortBy} onValueChange={handleSort}>
          <SelectTrigger className="w-full md:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="market_cap_desc">Market Cap ↓</SelectItem>
            <SelectItem value="market_cap_asc">Market Cap ↑</SelectItem>
            <SelectItem value="price_desc">Price ↓</SelectItem>
            <SelectItem value="price_asc">Price ↑</SelectItem>
            <SelectItem value="change_desc">24h Change ↓</SelectItem>
            <SelectItem value="change_asc">24h Change ↑</SelectItem>
            <SelectItem value="name_asc">Name (A-Z)</SelectItem>
            <SelectItem value="name_desc">Name (Z-A)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {displayCoins.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No coins found matching your search.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {displayCoins.map((coin) => (
            <CoinCard 
              key={coin.id} 
              coin={coin} 
              onAddToWatchlist={addToWatchlist}
              onRemoveFromWatchlist={removeFromWatchlist}
              isInWatchlist={isInWatchlist(coin.id)}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default CoinList;
