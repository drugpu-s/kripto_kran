
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { CryptoContext } from '@/context/CryptoContext';

const SearchBar = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const { coins } = useContext(CryptoContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      const filteredResults = coins
        .filter(coin => 
          coin.name.toLowerCase().includes(query.toLowerCase()) || 
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [query, coins]);

  const handleSelect = (coinId) => {
    navigate(`/coins/${coinId}`);
    setQuery('');
    if (onClose) onClose();
  };

  return (
    <div className="relative w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search coins..."
          className="w-full h-10 pl-10 pr-10 rounded-md bg-secondary/50 border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
          autoFocus
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 mt-2 w-full rounded-md bg-card border border-border shadow-lg"
        >
          <ul className="py-1">
            {results.map((coin) => (
              <li key={coin.id}>
                <button
                  onClick={() => handleSelect(coin.id)}
                  className="flex items-center w-full px-4 py-2 text-left hover:bg-accent transition-colors"
                >
                  <img 
                    src={coin.image} 
                    alt={coin.name} 
                    className="w-6 h-6 mr-3 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{coin.name}</div>
                    <div className="text-xs text-muted-foreground uppercase">{coin.symbol}</div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
};

export default SearchBar;
