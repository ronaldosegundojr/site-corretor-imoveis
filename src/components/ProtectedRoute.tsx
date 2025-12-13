import { useEffect, useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './Button';
interface ProtectedRouteProps {
  children: React.ReactNode;
}
export function ProtectedRoute({
  children
}: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  // Credenciais (em produção, use variáveis de ambiente)
  const ADMIN_USERNAME = 'admin';
  const ADMIN_PASSWORD = 'golden2024'; // MUDE ESTA SENHA!
  // Chave para localStorage
  const AUTH_KEY = 'perfumaria_golden_admin_auth';
  const AUTH_EXPIRY_KEY = 'perfumaria_golden_admin_expiry';
  const MAX_ATTEMPTS = 5;
  const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutos
  const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 horas
useEffect(() => {
    checkAuthentication();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const checkAuthentication = () => {
    const authToken = localStorage.getItem(AUTH_KEY);
    const expiry = localStorage.getItem(AUTH_EXPIRY_KEY);
    if (authToken && expiry) {
      const expiryTime = parseInt(expiry);
      const now = Date.now();
      if (now < expiryTime) {
        setIsAuthenticated(true);
      } else {
        // Sessão expirada
        logout();
      }
    }
    setIsLoading(false);
  };
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    // Verificar tentativas
    const lockoutUntil = localStorage.getItem('admin_lockout');
    if (lockoutUntil) {
      const lockoutTime = parseInt(lockoutUntil);
      if (Date.now() < lockoutTime) {
        const remainingMinutes = Math.ceil((lockoutTime - Date.now()) / 60000);
        setError(`Muitas tentativas. Tente novamente em ${remainingMinutes} minutos.`);
        return;
      } else {
        localStorage.removeItem('admin_lockout');
        setAttempts(0);
      }
    }
    // Validar credenciais
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      // Login bem-sucedido
      const expiryTime = Date.now() + SESSION_DURATION;
      const authToken = btoa(`${username}:${Date.now()}`); // Token simples
      localStorage.setItem(AUTH_KEY, authToken);
      localStorage.setItem(AUTH_EXPIRY_KEY, expiryTime.toString());
      localStorage.removeItem('admin_lockout');
      setIsAuthenticated(true);
      setAttempts(0);
    } else {
      // Login falhou
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      if (newAttempts >= MAX_ATTEMPTS) {
        const lockoutUntil = Date.now() + LOCKOUT_TIME;
        localStorage.setItem('admin_lockout', lockoutUntil.toString());
        setError(`Muitas tentativas incorretas. Bloqueado por 15 minutos.`);
      } else {
        setError(`Credenciais inválidas. Tentativa ${newAttempts} de ${MAX_ATTEMPTS}`);
      }
      setPassword('');
    }
  };
  const logout = () => {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(AUTH_EXPIRY_KEY);
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };
  if (isLoading) {
    return <div className="min-h-screen bg-golden-cream flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-golden-primary border-t-transparent"></div>
      </div>;
  }
  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gradient-to-br from-golden-dark via-golden-brown to-golden-dark flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-golden-primary rounded-full mb-4 shadow-2xl">
              <Lock className="w-10 h-10 text-golden-dark" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-golden-primary mb-2">
              Área Administrativa
            </h1>
            <p className="text-golden-light">
              Perfumaria Golden - Acesso Restrito
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-golden-primary">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-golden-dark mb-2">
                  Usuário
                </label>
                <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20 transition-colors" placeholder="Digite seu usuário" required autoComplete="username" />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-golden-dark mb-2">
                  Senha
                </label>
                <div className="relative">
                  <input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20 transition-colors pr-12" placeholder="Digite sua senha" required autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-golden-brown hover:text-golden-primary transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 text-red-700 text-sm">
                  {error}
                </div>}

              {/* Submit Button */}
              <Button type="submit" fullWidth size="lg" className="shadow-lg">
                <Lock className="w-5 h-5 mr-2" />
                Entrar
              </Button>
            </form>

            {/* Info */}
            <div className="mt-6 pt-6 border-t border-golden-light">
              <p className="text-xs text-center text-golden-brown">
                🔒 Acesso protegido por autenticação
              </p>
              <p className="text-xs text-center text-golden-brown mt-1">
                Sessão expira em 2 horas
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 text-center">
            <p className="text-sm text-golden-light">
              Esqueceu a senha? Entre em contato com o administrador.
            </p>
          </div>
        </div>
      </div>;
  }
  // Authenticated - show admin panel with logout option
  return <div>
      {/* Logout Button (fixed top-right) */}
      <div className="fixed top-4 right-4 z-50">
        <Button onClick={logout} variant="secondary" size="sm" className="shadow-lg">
          🚪 Sair
        </Button>
      </div>
      {children}
    </div>;
}