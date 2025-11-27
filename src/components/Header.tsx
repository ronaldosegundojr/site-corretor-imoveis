import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { SearchBar } from './SearchBar';
interface HeaderProps {
  cartItemCount: number;
}
export function Header({
  cartItemCount
}: HeaderProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <header className="bg-golden-dark text-white shadow-lg sticky top-0 z-50 border-b-2 border-golden-primary">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-golden-primary rounded-lg px-2 py-1 flex-shrink-0" aria-label="Página inicial da Perfumaria Golden">
            <img src="/image.png" alt="Perfumaria Golden Logo" className="h-12 w-12 object-contain" />
            <div className="hidden sm:block">
              <h1 className="text-2xl font-serif font-bold text-golden-primary">
                Golden
              </h1>
              <p className="text-xs text-golden-light">PERFUMARIA</p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md">
            <SearchBar placeholder="Buscar produtos, perfumes, cosméticos..." />
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4 md:gap-6" aria-label="Navegação principal">
            <Link to="/" className={`font-medium hover:text-golden-primary transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary rounded px-2 py-1 hidden sm:block ${isActive('/') ? 'text-golden-primary' : ''}`}>
              Início
            </Link>
            <Link to="/products" className={`font-medium hover:text-golden-primary transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary rounded px-2 py-1 ${isActive('/products') ? 'text-golden-primary' : ''}`}>
              Produtos
            </Link>
            <Link to="/cart" className="relative p-2 hover:bg-golden-brown rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label={`Carrinho de compras com ${cartItemCount} ${cartItemCount === 1 ? 'item' : 'itens'}`}>
              <ShoppingCart className="w-6 h-6" aria-hidden="true" />
              {cartItemCount > 0 && <span className="absolute -top-1 -right-1 bg-golden-primary text-golden-dark text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>}
            </Link>
          </nav>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-3">
          <SearchBar placeholder="Buscar produtos..." />
        </div>
      </div>
    </header>;
}