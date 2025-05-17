import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Send, ShieldCheck } from 'lucide-react'; // Changed icons

const Footer = () => {
  return (
    <footer className="bg-card/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">K</span>
              </div>
              <span className="text-xl font-bold">KriptoKran</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Зарабатывайте Bitcoin Cash, выполняя задания и участвуя в активностях.
            </p>
          </div>
          
          <div>
            <p className="font-medium mb-4">Навигация</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-primary transition-colors">Главная</Link></li>
              <li><Link to="/bch-details" className="text-muted-foreground hover:text-primary transition-colors">О Bitcoin Cash</Link></li>
              <li><Link to="/app/tasks" className="text-muted-foreground hover:text-primary transition-colors">Задания</Link></li>
              <li><Link to="/app/affiliate" className="text-muted-foreground hover:text-primary transition-colors">Партнерка</Link></li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4">Поддержка</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-muted-foreground hover:text-primary transition-colors">Обратная связь</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Условия использования</a></li>
            </ul>
          </div>
          
          <div>
            <p className="font-medium mb-4">Социальные сети</p>
            <div className="flex space-x-4">
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Forum">
                <ShieldCheck className="h-5 w-5" />
              </a>
            </div>
            <div className="mt-4">
              <p className="font-medium mb-2">Реклама</p>
              <div className="bg-muted/50 p-2 rounded-md text-xs text-muted-foreground">
                Место для вашей рекламы. <Link to="/contact" className="text-primary hover:underline">Свяжитесь с нами!</Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} KriptoKran. Все права защищены.</p>
          <p className="mt-1">Данные о курсе Bitcoin Cash предоставлены CoinGecko API.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;