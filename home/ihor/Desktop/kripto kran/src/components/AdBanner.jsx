import React from 'react';
import { motion } from 'framer-motion';

const AdBanner = ({ placement }) => {
  const adContent = {
    'top-banner': { text: 'Рекламный баннер: Лучшие предложения по Bitcoin Cash!', style: 'bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white p-3 text-center text-sm' },
    'bottom-banner': { text: 'Специальное предложение: Увеличьте свой доход BCH!', style: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white p-3 text-center text-sm' },
    'sidebar-banner': { text: 'Реклама: Купить/Продать BCH выгодно!', style: 'bg-green-500/20 text-green-700 p-3 text-center text-xs rounded-md' },
    'mid-content-banner': { text: 'Уникальная возможность заработать BCH - Начните сейчас!', style: 'bg-teal-500/10 text-teal-600 p-4 text-center text-base rounded-lg border border-teal-500/30 my-6' },
  };

  const currentAd = adContent[placement] || { text: 'Рекламное место', style: 'bg-muted/30 text-muted-foreground p-2 text-center text-xs' };

  return (
    <motion.div
      initial={{ opacity: 0, y: placement === 'top-banner' ? -20 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className={`my-4 ${currentAd.style}`}
    >
      <p>{currentAd.text}</p>
    </motion.div>
  );
};

export default AdBanner;