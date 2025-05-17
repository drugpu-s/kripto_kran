import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const CryptoContext = createContext();

export const CryptoProvider = ({ children }) => {
  const [coins, setCoins] = useState([]);
  const [bchData, setBchData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState(() => {
    const saved = localStorage.getItem('watchlist');
    return saved ? JSON.parse(saved) : [];
  });
  
  const { toast } = useToast();

  const fetchCoins = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin-cash&order=market_cap_desc&per_page=1&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
      );
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить данные Bitcoin Cash');
      }
      
      const data = await response.json();
      if (data && data.length > 0) {
        setBchData(data[0]);
        setCoins(data); // Keep compatibility if other components use 'coins'
      } else {
        throw new Error('Данные Bitcoin Cash не найдены');
      }
      setIsLoading(false);
    } catch (err) {
      console.error('Ошибка загрузки Bitcoin Cash:', err);
      setError(err.message);
      setIsLoading(false);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить данные Bitcoin Cash. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Fetch trending removed as focus is on BCH

  const fetchCoinDetails = async (coinId) => {
    // Primarily for BCH, but can be used for others if needed
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=true`
      );
      
      if (!response.ok) {
        throw new Error('Не удалось загрузить детали монеты');
      }
      
      return await response.json();
    } catch (err) {
      console.error('Ошибка загрузки деталей монеты:', err);
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить детали монеты. Пожалуйста, попробуйте позже.",
        variant: "destructive",
      });
      throw err;
    }
  };

  const addToWatchlist = (coin) => {
    if (!watchlist.some(item => item.id === coin.id)) {
      const newWatchlist = [...watchlist, coin];
      setWatchlist(newWatchlist);
      localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
      toast({
        title: "Добавлено в избранное",
        description: `${coin.name} добавлено в ваш список избранного.`,
      });
    } else {
      toast({
        title: "Уже в избранном",
        description: `${coin.name} уже в вашем списке избранного.`,
      });
    }
  };

  const removeFromWatchlist = (coinId) => {
    const coin = watchlist.find(item => item.id === coinId);
    const newWatchlist = watchlist.filter(item => item.id !== coinId);
    setWatchlist(newWatchlist);
    localStorage.setItem('watchlist', JSON.stringify(newWatchlist));
    toast({
      title: "Удалено из избранного",
      description: coin ? `${coin.name} удалено из вашего списка избранного.` : "Монета удалена из избранного.",
    });
  };

  const isInWatchlist = (coinId) => {
    return watchlist.some(item => item.id === coinId);
  };

  useEffect(() => {
    fetchCoins(); // Fetches BCH data
    
    const interval = setInterval(() => {
      fetchCoins();
    }, 60000);
    
    return () => clearInterval(interval);
  }, [fetchCoins]);

  return (
    <CryptoContext.Provider
      value={{
        coins, // Retained for compatibility, primarily bchData is used
        bchData,
        isLoading,
        error,
        watchlist,
        fetchCoinDetails,
        addToWatchlist,
        removeFromWatchlist,
        isInWatchlist,
      }}
    >
      {children}
    </CryptoContext.Provider>
  );
};