import { useState } from 'react';
import { Button } from '../components/Button';
import { Lock, User, Key, Home as HomeIcon } from 'lucide-react';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock frontend login simulation
    setTimeout(() => {
      // Hardcoded for demo: admin/admin
      if (email === 'admin' && password === 'admin') {
        localStorage.setItem('auth_token', 'frontend-mock-token-' + Date.now());
        window.location.href = '/admin';
      } else {
        setError('Acesso negado. Utilize admin / admin para testar o sistema.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center py-12 px-4 font-serif">
      <div className="max-w-md w-full">
        {/* Logo/Home Link */}
        <div className="text-center mb-10">
          <div className="bg-primary w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform cursor-pointer" onClick={() => window.location.href = '/'}>
            <HomeIcon className="w-8 h-8 text-secondary" />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-2">Login do Corretor</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-[0.3em]">Ambiente Administrativo</p>
        </div>

        <div className="bg-white p-10 rounded-[2.5rem] shadow-3xl border border-slate-100 relative overflow-hidden">
          {/* Abstract background */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 -translate-y-1/2 translate-x-1/2 rotate-45" />

          <form className="space-y-8 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Usuário</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:outline-none placeholder:text-slate-300 font-medium transition-all"
                    placeholder="ex: admin"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-2">Sua Senha</label>
                <div className="relative">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary/40" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:outline-none placeholder:text-slate-300 font-medium transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-xs font-bold animate-shake">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-secondary py-5 rounded-[1.5rem] font-bold shadow-2xl hover:scale-105 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-3"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  ENTRAR NO PAINEL
                </>
              )}
            </Button>
            
            <p className="text-center text-[10px] text-slate-400 font-medium uppercase tracking-widest">
              Acesso restrito para corretores autorizados
            </p>
          </form>
        </div>
        
        {/* Help Link */}
        <div className="text-center mt-10">
          <p className="text-slate-400 text-xs font-medium">Voltar para a <span className="text-primary font-bold cursor-pointer hover:underline" onClick={() => window.location.href = '/'}>Página Inicial</span></p>
        </div>
      </div>
    </div>
  );
}