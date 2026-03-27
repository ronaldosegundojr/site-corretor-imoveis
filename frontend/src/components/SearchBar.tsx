import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
interface SearchBarProps {
  onSearch?: (query: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
}
export function SearchBar({
  onSearch,
  placeholder = 'Buscar imóveis...',
  autoFocus = false,
  className = ''
}: SearchBarProps) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (value: string) => {
    setQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/properties?location=${encodeURIComponent(query)}`);
    }
  };
  const clearSearch = () => {
    setQuery('');
    if (onSearch) {
      onSearch('');
    }
  };
  return <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary w-5 h-5 pointer-events-none" aria-hidden="true" />
      <input type="text" value={query} onChange={e => handleSearch(e.target.value)} placeholder={placeholder} autoFocus={autoFocus} className="w-full pl-10 pr-10 py-2.5 bg-primary/50 backdrop-blur-sm border-2 border-secondary/30 text-white placeholder-slate-400 rounded-lg focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all" aria-label="Buscar imóveis" />
      {query && <button type="button" onClick={clearSearch} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secondary hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-secondary rounded p-1" aria-label="Limpar busca">
          <X className="w-4 h-4" />
        </button>}
    </form>;
}