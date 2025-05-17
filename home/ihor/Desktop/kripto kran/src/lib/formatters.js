
export const formatCurrency = (value, decimals = 2) => {
  if (value === undefined || value === null) return 'N/A';
  
  // For very small values, show more decimals
  if (Math.abs(value) < 0.01 && value !== 0) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 6,
      maximumFractionDigits: 6
    }).format(value);
  }
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatNumber = (value, decimals = 0) => {
  if (value === undefined || value === null) return 'N/A';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value);
};

export const formatPercentage = (value) => {
  if (value === undefined || value === null) return 'N/A';
  
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
};

export const shortenNumber = (num) => {
  if (num === null || num === undefined) return 'N/A';
  
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};
