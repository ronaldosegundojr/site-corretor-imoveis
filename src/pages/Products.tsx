import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { useCartContext } from '../contexts/CartContext';
import { useLocation } from 'react-router-dom';
import productsData from '../data/products.json';
export function Products() {
  const cart = useCartContext();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [location.search]);
  const categories = ['Todos', 'Perfumes', 'Cabelos', 'Unhas', 'Pele', 'Maquiagem'];
  const filteredProducts = productsData.products.filter(product => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower) || product.category.toLowerCase().includes(searchLower);
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const getQuantityInCart = (productId: string) => {
    const item = cart.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  const handleAddToCart = (product: any) => {
    console.log('Products: handleAddToCart called for:', product.name);
    cart.addToCart(product);
    console.log('Products: addToCart executed');
  };
  return <div className="min-h-screen bg-golden-cream">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-golden-dark mb-3">
            Nossos Produtos de Beleza
          </h2>
          <p className="text-golden-brown max-w-2xl mx-auto">
            Explore nossa seleção completa de perfumes, cosméticos e produtos
            para cuidados pessoais
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden-primary w-5 h-5" aria-hidden="true" />
            <input type="text" placeholder="Buscar por nome, descrição ou categoria..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border-2 border-golden-primary/30 rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20 transition-colors bg-white" aria-label="Buscar produtos" />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => <button key={category} onClick={() => setSelectedCategory(category)} className={`px-6 py-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-golden-primary ${selectedCategory === category ? 'bg-golden-primary text-golden-dark shadow-md' : 'bg-white text-golden-brown border-2 border-golden-light hover:border-golden-primary'}`} aria-pressed={selectedCategory === category}>
                {category}
              </button>)}
          </div>

          {/* Results count */}
          {searchTerm && <p className="text-center text-golden-brown">
              {filteredProducts.length}{' '}
              {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
              {searchTerm && ` para "${searchTerm}"`}
            </p>}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => <ProductCard key={product.id} {...product} onAddToCart={() => handleAddToCart(product)} quantityInCart={getQuantityInCart(product.id)} onUpdateQuantity={quantity => cart.updateQuantity(product.id, quantity)} />)}
          </div> : <div className="text-center py-16">
            <p className="text-xl text-golden-brown mb-4">
              Nenhum produto encontrado
            </p>
            <p className="text-gray-600">
              Tente ajustar os filtros ou buscar por outro termo
            </p>
          </div>}
      </div>
    </div>;
}