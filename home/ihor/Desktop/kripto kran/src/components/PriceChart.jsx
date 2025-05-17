
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PriceChart = ({ sparkline, priceChange, height = 100 }) => {
  const [path, setPath] = useState('');
  const [points, setPoints] = useState([]);
  
  useEffect(() => {
    if (!sparkline || !sparkline.price) return;
    
    const prices = sparkline.price;
    if (prices.length === 0) return;
    
    // Filter out null values
    const validPrices = prices.filter(price => price !== null);
    if (validPrices.length === 0) return;
    
    // Calculate min and max for scaling
    const minPrice = Math.min(...validPrices);
    const maxPrice = Math.max(...validPrices);
    const range = maxPrice - minPrice;
    
    // Avoid division by zero
    const scale = range === 0 ? 1 : height / range;
    
    // Generate points
    const chartPoints = validPrices.map((price, i) => {
      const x = (i / (validPrices.length - 1)) * 100;
      const y = height - ((price - minPrice) * scale);
      return { x, y, price };
    });
    
    setPoints(chartPoints);
    
    // Create SVG path
    let pathData = `M ${chartPoints[0].x},${chartPoints[0].y}`;
    for (let i = 1; i < chartPoints.length; i++) {
      pathData += ` L ${chartPoints[i].x},${chartPoints[i].y}`;
    }
    
    setPath(pathData);
  }, [sparkline, height]);
  
  const strokeColor = priceChange >= 0 ? '#00c853' : '#ff3d00';
  
  return (
    <div className="relative w-full h-full">
      <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
        <motion.path
          d={path}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

export default PriceChart;
