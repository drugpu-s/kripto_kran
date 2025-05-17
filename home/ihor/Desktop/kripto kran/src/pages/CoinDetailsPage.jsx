import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, ExternalLink, TrendingUp, TrendingDown, Globe, Twitter, Users, BookOpen } from 'lucide-react'; // Added BookOpen
import { CryptoContext } from '@/context/CryptoContext';
import { AuthContext } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import PriceChart from '@/components/PriceChart';
import { formatCurrency, formatPercentage, formatNumber } from '@/lib/formatters';
import { useToast } from '@/components/ui/use-toast';
import AdBanner from '@/components/AdBanner';

const CoinDetailsPage = () => {
  const { coinId: routeCoinId } = useParams(); 
  const coinId = routeCoinId || "bitcoin-cash"; // Default to BCH if no param

  const { fetchCoinDetails, addToWatchlist, removeFromWatchlist, isInWatchlist } = useContext(CryptoContext);
  const { user } = useContext(AuthContext);
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getCoinDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchCoinDetails(coinId);
        setCoin(data);
      } catch (error) {
        toast({
          title: "Ошибка",
          description: "Не удалось загрузить детали монеты. Пожалуйста, попробуйте позже.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    getCoinDetails();
  }, [coinId, fetchCoinDetails, toast]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!coin) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-bold mb-4">Монета не найдена</h2>
        <Button asChild>
          <Link to="/">На главную</Link>
        </Button>
      </div>
    );
  }

  const priceChange24h = coin.market_data.price_change_percentage_24h;
  const isPriceUp = priceChange24h >= 0;
  const inWatchlist = user ? isInWatchlist(coin.id) : false; // Watchlist only for logged-in users

  const handleWatchlistToggle = () => {
    if (!user) {
      toast({
        title: "Требуется вход",
        description: "Пожалуйста, войдите в систему, чтобы использовать список избранного.",
        variant: "destructive"
      });
      return;
    }
    if (inWatchlist) {
      removeFromWatchlist(coin.id);
    } else {
      const simplifiedCoin = {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        image: coin.image.small,
        current_price: coin.market_data.current_price.usd,
        price_change_percentage_24h: coin.market_data.price_change_percentage_24h,
        market_cap: coin.market_data.market_cap.usd,
        total_volume: coin.market_data.total_volume.usd,
      };
      addToWatchlist(simplifiedCoin);
    }
  };

  return (
    <div>
      <AdBanner placement="top-banner" />
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link to="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" /> На главную
          </Link>
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
      >
        <div className="flex items-center">
          <img  src={coin.image.large} alt={coin.name} className="w-12 h-12 md:w-16 md:h-16 mr-4 rounded-full shadow-lg" src="https://images.unsplash.com/photo-1642422669683-01c3c4d56371" />
          <div>
            <div className="flex items-center">
              <h1 className="text-3xl md:text-4xl font-bold mr-3">{coin.name}</h1>
              <span className="text-sm bg-secondary px-2 py-1 rounded uppercase">{coin.symbol}</span>
            </div>
            <div className="flex items-center flex-wrap mt-2 text-sm">
              <span className="text-muted-foreground mr-3">Ранг #{coin.market_cap_rank}</span>
              {coin.links?.homepage[0] && (
                <a href={coin.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center mr-3 my-1">
                  <Globe className="h-4 w-4 mr-1" />Вебсайт
                </a>
              )}
              {coin.links?.official_forum_url[0] && (
                 <a href={coin.links.official_forum_url[0]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center mr-3 my-1">
                  <Users className="h-4 w-4 mr-1" />Форум
                </a>
              )}
              {coin.links?.subreddit_url && (
                 <a href={coin.links.subreddit_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline flex items-center mr-3 my-1">
                  <BookOpen className="h-4 w-4 mr-1" />Reddit
                </a>
              )}
            </div>
          </div>
        </div>
        
        {coinId === "bitcoin-cash" && user && (
           <Button asChild>
            <Link to="/app/tasks">Зарабатывать {coin.symbol.toUpperCase()}</Link>
          </Button>
        )}
        {coinId !== "bitcoin-cash" && ( // Show add to watchlist only for non-BCH coins
          <Button
            variant={inWatchlist ? "secondary" : "outline"}
            onClick={handleWatchlistToggle}
            className={inWatchlist ? "text-yellow-400" : ""}
          >
            <Star className="h-4 w-4 mr-2" />
            {inWatchlist ? "Убрать из избранного" : "В избранное"}
          </Button>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        className="glass-card rounded-xl p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row justify-between items-start mb-6">
          <div className="mb-4 md:mb-0">
            <h2 className="text-sm text-muted-foreground mb-1">Текущая цена</h2>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold mr-3">
                {formatCurrency(coin.market_data.current_price.usd)}
              </span>
              <div className={`flex items-center ${isPriceUp ? 'price-up' : 'price-down'}`}>
                {isPriceUp ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                <span className="font-medium">{formatPercentage(priceChange24h)}</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm w-full md:w-auto">
            <div><p className="text-xs text-muted-foreground">Рыночная кап.</p><p className="font-medium">{formatCurrency(coin.market_data.market_cap.usd, 0)}</p></div>
            <div><p className="text-xs text-muted-foreground">Объем (24ч)</p><p className="font-medium">{formatCurrency(coin.market_data.total_volume.usd, 0)}</p></div>
            <div><p className="text-xs text-muted-foreground">Мин/Макс (24ч)</p><p className="font-medium">{formatCurrency(coin.market_data.low_24h.usd)} / {formatCurrency(coin.market_data.high_24h.usd)}</p></div>
            <div><p className="text-xs text-muted-foreground">В обращении</p><p className="font-medium">{formatNumber(coin.market_data.circulating_supply)} {coin.symbol.toUpperCase()}</p></div>
          </div>
        </div>
        
        <div className="h-64 md:h-80">
          <h3 className="text-sm font-medium mb-4">График цены (7 дней)</h3>
          {coin.market_data.sparkline_7d ? (
            <PriceChart sparkline={coin.market_data.sparkline_7d} priceChange={coin.market_data.price_change_percentage_7d_in_currency?.usd || 0} height={250} />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">Данные графика недоступны</div>
          )}
        </div>
      </motion.div>
      
      <AdBanner placement="mid-content-banner" />

      {coin.description?.en && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.3 }}
          className="glass-card rounded-xl p-6 mb-8"
        >
          <h2 className="text-xl font-bold mb-4">О {coin.name}</h2>
          <div 
            className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-a:text-primary prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: coin.description.en.split('.')[0] + '.' }} // Shortened description
          />
          <a href={coin.links?.homepage[0] || '#'} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mt-2 inline-block">
            Читать больше <ExternalLink className="inline-block ml-1 h-4 w-4" />
          </a>
        </motion.div>
      )}
    </div>
  );
};

export default CoinDetailsPage;