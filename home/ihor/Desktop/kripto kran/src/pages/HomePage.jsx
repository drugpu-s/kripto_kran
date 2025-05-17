import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Award, Users, Gift } from 'lucide-react';
import { CryptoContext } from '@/context/CryptoContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import CoinCard from '@/components/CoinCard'; // Re-using CoinCard for BCH display
import AdBanner from '@/components/AdBanner';

const HomePage = () => {
  const { bchData, isLoading: cryptoLoading } = useContext(CryptoContext);
  const { user } = useAuth();

  const featureCards = [
    {
      icon: Zap,
      title: 'Выполняйте задания',
      description: 'Получайте Bitcoin Cash за выполнение простых заданий от наших партнеров.',
      link: '/app/tasks',
      bgColor: 'bg-blue-500/10',
      iconColor: 'text-blue-500',
    },
    {
      icon: Award,
      title: 'Участвуйте в играх',
      description: 'Испытайте удачу в наших игровых слотах и увеличьте свой BCH баланс.',
      link: '/app/games',
      bgColor: 'bg-purple-500/10',
      iconColor: 'text-purple-500',
    },
    {
      icon: Users,
      title: 'Партнерская программа',
      description: 'Приглашайте друзей и получайте процент от их заработка. Рекламируйте нас!',
      link: '/app/affiliate',
      bgColor: 'bg-teal-500/10',
      iconColor: 'text-teal-500',
    },
    {
      icon: Gift,
      title: 'Ежедневные бонусы',
      description: 'Заходите каждый день, чтобы получать бонусы и участвовать в розыгрышах.',
      link: '/app/dashboard', // Or a dedicated bonus page
      bgColor: 'bg-orange-500/10',
      iconColor: 'text-orange-500',
    },
  ];

  return (
    <div>
      <section className="relative py-16 mb-12 overflow-hidden">
        <div className="hero-glow left-1/4 top-1/2 transform -translate-y-1/2"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center max-w-3xl mx-auto px-4"
        >
          <img  class="mx-auto mb-6 h-24 w-24" alt="Bitcoin Cash логотип" src="https://images.unsplash.com/photo-1579623261984-41f9a81d4044" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            Зарабатывайте Bitcoin Cash с KriptoKran
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Выполняйте задания, играйте в игры, участвуйте в партнерской программе и получайте реальный Bitcoin Cash!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {user ? (
              <Button size="lg" asChild>
                <Link to="/app/dashboard">Перейти в кабинет</Link>
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link to="/register">Начать зарабатывать</Link>
              </Button>
            )}
            <Button size="lg" variant="outline" asChild>
              <Link to="/bch-details">Что такое Bitcoin Cash?</Link>
            </Button>
          </div>
        </motion.div>
      </section>

      <AdBanner placement="mid-content-banner" />

      {bchData && !cryptoLoading && (
        <section className="mb-12 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Текущий курс Bitcoin Cash (BCH)</h2>
          <CoinCard coin={bchData} isBCHFocus={true} />
        </section>
      )}
      {cryptoLoading && (
         <div className="flex justify-center items-center py-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}


      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-10">Как это работает?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`glass-card rounded-xl p-6 flex flex-col items-center text-center ${card.bgColor}`}
            >
              <div className={`p-3 rounded-full ${card.iconColor} bg-background mb-4`}>
                <card.icon className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-grow">{card.description}</p>
              <Button variant="link" asChild className="text-primary">
                <Link to={user ? card.link : '/register'}>Узнать больше</Link>
              </Button>
            </motion.div>
          ))}
        </div>
      </section>
      
      <AdBanner placement="sidebar-banner" /> {/* Example: Another Ad Placement */}

    </div>
  );
};

export default HomePage;