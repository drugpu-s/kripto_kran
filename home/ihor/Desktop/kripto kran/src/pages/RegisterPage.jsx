import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "Ошибка пароля",
        description: "Пароли не совпадают.",
        variant: "destructive",
      });
      return;
    }
    try {
      await register(email, password, name);
      navigate('/app/dashboard');
    } catch (error) {
       // Toast is handled in AuthContext
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center min-h-[calc(100vh-200px)] py-8"
    >
      <div className="w-full max-w-md p-8 space-y-8 glass-card rounded-xl shadow-2xl">
        <div className="text-center">
          <UserPlus className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-3xl font-bold text-foreground">Создать аккаунт</h1>
          <p className="text-muted-foreground">Присоединяйтесь к KriptoKran и начните зарабатывать!</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Имя</Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                required
                className="pl-10"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
             <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="pl-10"
                />
            </div>
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
            </div>
          </div>
          <div>
            <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
            <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="pl-10"
                />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
        <p className="text-center text-sm text-muted-foreground">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default RegisterPage;