import React, { useState } from 'react';
import { Outlet, Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, ListChecks, Users, Gamepad2, Wallet, Repeat, LogOut, Menu, X, Settings, MessageSquare, LifeBuoy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/context/AuthContext';
import AdBanner from '@/components/AdBanner';

const UserLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarNavLinks = [
    { name: 'Панель управления', path: '/app/dashboard', icon: LayoutDashboard },
    { name: 'Задания', path: '/app/tasks', icon: ListChecks },
    { name: 'Партнерка', path: '/app/affiliate', icon: Users },
    { name: 'Игровые слоты', path: '/app/games', icon: Gamepad2 },
    { name: 'Кошелек (BCH)', path: '/app/wallet', icon: Wallet },
    { name: 'Обменник', path: '/app/exchange', icon: Repeat },
    { name: 'Букмекер', path: '/app/betting', icon: LifeBuoy },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 flex-col w-64 bg-card border-r border-border transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <Link to="/app/dashboard" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold">K</span>
            </motion.div>
            <span className="text-xl font-bold">KriptoKran</span>
          </Link>
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {sidebarNavLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground text-foreground/80'
                }`
              }
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-4 border-t border-border">
           <AdBanner placement="sidebar-banner" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 flex items-center justify-between h-16 px-4 bg-card border-b border-border md:px-6">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex-1"></div> {/* Spacer */}
          <div className="flex items-center space-x-4">
            <Link to="/contact">
              <Button variant="ghost" size="icon" aria-label="Обратная связь">
                <MessageSquare className="h-5 w-5" />
              </Button>
            </Link>
            <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
              Баланс: {user?.bchBalance?.toFixed(4) || '0.0000'} BCH
            </span>
            <Avatar>
              <AvatarImage src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${user?.email}`} alt={user?.name} />
              <AvatarFallback>{user?.name?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="icon" onClick={logout} aria-label="Выйти">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-grow p-4 md:p-6 relative overflow-hidden">
          <div className="grid-pattern absolute inset-0 opacity-5 z-0"></div>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default UserLayout;