
import { MessageCircle } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';

export function Header() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return <header className="bg-primary text-white shadow-lg sticky top-0 z-50 border-b border-secondary/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-secondary rounded-lg px-2 py-1 flex-shrink-0" aria-label="Página inicial do Corretor">
            <div className="bg-secondary/10 p-2 rounded-lg border border-secondary/50">
              <h1 className="text-xl md:text-2xl font-serif font-bold text-secondary tracking-tighter">
                SUA<span className="text-white font-light ml-1">MARCA</span>
              </h1>
              <p className="text-[10px] text-secondary/80 font-medium tracking-[0.2em] -mt-1 uppercase">Corretor (a) Imobiliário (a)</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-4">
            <SearchBar placeholder="Código, bairro ou tipo de imóvel..." />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4 md:gap-8" aria-label="Navegação principal">
            <Link to="/" className={`text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest ${isActive('/') ? 'text-secondary' : ''}`}>
              Home
            </Link>
            <Link to="/properties" className={`text-sm font-medium hover:text-secondary transition-colors uppercase tracking-widest ${isActive('/properties') ? 'text-secondary' : ''}`}>
              Imóveis
            </Link>
            
            <a href="https://wa.me/5512912345678" target="_blank" rel="noopener noreferrer" 
               className="bg-secondary text-primary px-4 py-2 rounded-md font-bold text-xs uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-lg">
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </nav>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <SearchBar placeholder="Busque por código ou bairro..." />
        </div>
      </div>
    </header>;
}