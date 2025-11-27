import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShoppingBag, MessageCircle, TrendingUp, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { ProductCarousel } from '../components/ProductCarousel';
import { useCartContext } from '../contexts/CartContext';
import productsData from '../data/products.json';
export function Home() {
  const cart = useCartContext();
  // Get different product sets - now showing 12 products each
  const newArrivals = productsData.products.slice(0, 12);
  const featuredProducts = productsData.products.slice(12, 24);
  const bestsellers = productsData.products.filter(p => p.bestseller).slice(0, 12);
  const getQuantityInCart = (productId: string) => {
    const item = cart.cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };
  const handleAddToCart = (product: any) => {
    console.log('Home: Adding product to cart:', product.name);
    cart.addToCart(product);
  };
  return <div className="min-h-screen bg-golden-cream">
      {/* Top Carousel - Novidades */}
      <section className="bg-gradient-to-r from-golden-light to-golden-cream py-12 border-b-2 border-golden-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-golden-primary text-golden-dark px-4 py-2 rounded-full mb-3">
              <Sparkles className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-bold">NOVIDADES</span>
            </div>
            <h2 className="text-3xl font-serif font-bold text-golden-dark mb-2">
              Recém-Chegados
            </h2>
            <p className="text-golden-brown">
              Confira os últimos lançamentos da nossa coleção
            </p>
          </div>

          <ProductCarousel products={newArrivals} onAddToCart={handleAddToCart} getQuantityInCart={getQuantityInCart} onUpdateQuantity={cart.updateQuantity} />
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-golden-dark text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        </div>

        <div className="container mx-auto px-4 py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-golden-primary/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-5 h-5 text-golden-primary" aria-hidden="true" />
              <span className="text-sm font-medium text-golden-light">
                Produtos de Beleza Premium
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight text-golden-primary">
              Beleza e Cuidado em Cada Detalhe
            </h1>
            <p className="text-xl text-golden-light mb-8 leading-relaxed">
              Perfumes exclusivos, cosméticos de qualidade, cuidados para
              cabelo, unhas e pele. Tudo que você precisa para realçar sua
              beleza natural.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/products">
                <Button size="lg" className="shadow-xl">
                  <ShoppingBag className="w-5 h-5 inline mr-2" aria-hidden="true" />
                  Ver Catálogo Completo
                </Button>
              </Link>
              <a href="https://wa.me/5516997320195?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20os%20produtos%20da%20Perfumaria%20Golden" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="bg-white/10 backdrop-blur-sm border-white text-white hover:bg-white/20">
                  <MessageCircle className="w-5 h-5 inline mr-2" aria-hidden="true" />
                  Fale Conosco
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-golden-light text-golden-dark px-4 py-2 rounded-full mb-3">
            <Star className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm font-bold">DESTAQUES</span>
          </div>
          <h3 className="text-3xl font-serif font-bold text-golden-dark mb-3">
            Produtos em Destaque
          </h3>
          <p className="text-golden-brown max-w-2xl mx-auto">
            Seleção especial com os melhores produtos para você
          </p>
        </div>

        <ProductCarousel products={featuredProducts} onAddToCart={handleAddToCart} getQuantityInCart={getQuantityInCart} onUpdateQuantity={cart.updateQuantity} />
      </section>

      {/* Bestsellers Carousel */}
      <section className="bg-gradient-to-r from-golden-light to-golden-cream py-16 border-y-2 border-golden-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-golden-primary text-golden-dark px-4 py-2 rounded-full mb-3">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
              <span className="text-sm font-bold">MAIS VENDIDOS</span>
            </div>
            <h3 className="text-3xl font-serif font-bold text-golden-dark mb-3">
              Produtos Mais Vendidos
            </h3>
            <p className="text-golden-brown max-w-2xl mx-auto">
              Os favoritos dos nossos clientes que você precisa conhecer
            </p>
          </div>

          <ProductCarousel products={bestsellers} onAddToCart={handleAddToCart} getQuantityInCart={getQuantityInCart} onUpdateQuantity={cart.updateQuantity} />

          <div className="text-center mt-12">
            <Link to="/products">
              <Button variant="secondary" size="lg">
                Ver Todos os Produtos
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-16 h-16 bg-golden-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-8 h-8 text-golden-dark" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-serif font-bold text-golden-dark mb-2">
              Produtos Premium
            </h4>
            <p className="text-golden-brown">
              Perfumes, cosméticos e produtos de beleza de alta qualidade
            </p>
          </div>

          <div className="p-6">
            <div className="w-16 h-16 bg-golden-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-golden-dark" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-serif font-bold text-golden-dark mb-2">
              Atendimento WhatsApp
            </h4>
            <p className="text-golden-brown">
              Compre facilmente via WhatsApp com atendimento personalizado
            </p>
          </div>

          <div className="p-6">
            <div className="w-16 h-16 bg-golden-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 text-golden-dark" aria-hidden="true" />
            </div>
            <h4 className="text-xl font-serif font-bold text-golden-dark mb-2">
              Entrega Rápida
            </h4>
            <p className="text-golden-brown">
              Receba seus produtos favoritos com segurança e agilidade
            </p>
          </div>
        </div>
      </section>
    </div>;
}