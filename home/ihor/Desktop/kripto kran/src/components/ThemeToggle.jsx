
import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  // For now, we'll just simulate a theme toggle
  // In a real app, you would implement actual dark/light mode
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-400" />
      )}
    </Button>
  );
};

export default ThemeToggle;
