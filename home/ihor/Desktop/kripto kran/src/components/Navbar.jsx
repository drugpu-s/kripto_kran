import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Search, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/ThemeToggle';
import SearchBar from '@/components/SearchBar';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    setIsOpen(false);
    setShowSearch(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Markets', path: '/markets' },
    { name: 'Watchlist', path: '/watchlist' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatType: "loop" }}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold">K</span>
            </motion.div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400">
              KriptoKran
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? 'text-primary' : 'text-foreground/80'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            {/* Placeholder for Login/User button - to be added later */}
            {/* <Button variant="outline">Login</Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-primary/10 text-primary'
                        : 'hover:bg-accent hover:text-accent-foreground'
                    }`
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-2 border-t border-border">
                <ThemeToggle />
                {/* Placeholder for Login/User button - to be added later */}
                {/* <Button variant="outline" className="w-full mt-2">Login</Button> */}
              </div>
            </div>
          </motion.div>
        )}

        {/* Search Bar */}
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="py-3 border-t border-border"
          >
            <SearchBar onClose={toggleSearch} />
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Navbar;