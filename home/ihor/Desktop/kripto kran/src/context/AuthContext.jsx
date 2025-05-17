import React, { createContext, useState, useContext, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const storedUser = localStorage.getItem('kriptokran-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    // Mock login
    if (email && password) {
      const mockUser = { id: '1', email, name: 'Пользователь BCH', bchBalance: 1.25 };
      localStorage.setItem('kriptokran-user', JSON.stringify(mockUser));
      setUser(mockUser);
      setLoading(false);
      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в KriptoKran!",
      });
      return mockUser;
    } else {
      setLoading(false);
      toast({
        title: "Ошибка входа",
        description: "Неверный email или пароль.",
        variant: "destructive",
      });
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email, password, name) => {
    setLoading(true);
    // Mock registration
    if (email && password && name) {
      const mockUser = { id: String(Date.now()), email, name, bchBalance: 0 };
      localStorage.setItem('kriptokran-user', JSON.stringify(mockUser));
      setUser(mockUser);
      setLoading(false);
      toast({
        title: "Регистрация успешна",
        description: "Ваш аккаунт создан.",
      });
      return mockUser;
    } else {
      setLoading(false);
      toast({
        title: "Ошибка регистрации",
        description: "Пожалуйста, заполните все поля.",
        variant: "destructive",
      });
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('kriptokran-user');
    setUser(null);
    toast({
      title: "Выход из системы",
      description: "Вы успешно вышли из своего аккаунта.",
    });
  };
  
  const updateUserBalance = (newBalance) => {
    if (user) {
      const updatedUser = { ...user, bchBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('kriptokran-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUserBalance }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);