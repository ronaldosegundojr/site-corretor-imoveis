import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from './ProductCard';
import { Product } from '../types/Product';
interface ProductCarouselProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  getQuantityInCart: (productId: string) => number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
}
export function ProductCarousel({
  products,
  onAddToCart,
  getQuantityInCart,
  onUpdateQuantity
}: ProductCarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 12; // 3 rows x 4 columns
  const totalPages = Math.ceil(products.length / productsPerPage);
  const goToNext = () => {
    setCurrentPage(prev => prev >= totalPages - 1 ? 0 : prev + 1);
  };
  const goToPrevious = () => {
    setCurrentPage(prev => prev <= 0 ? totalPages - 1 : prev - 1);
  };
  const goToPage = (page: number) => {
    setCurrentPage(page);
  };
  const startIndex = currentPage * productsPerPage;
  const visibleProducts = products.slice(startIndex, startIndex + productsPerPage);
  return <div className="relative">
      {/* Products Grid - 3 rows x 4 columns with equal heights */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr mb-8">
        {visibleProducts.map((product, index) => <div key={product.id} className="flex" style={{
        animation: `fadeIn 0.4s ease-out ${index * 0.05}s both`
      }}>
            <ProductCard {...product} onAddToCart={() => onAddToCart(product)} quantityInCart={getQuantityInCart(product.id)} onUpdateQuantity={quantity => onUpdateQuantity(product.id, quantity)} />
          </div>)}
      </div>

      {/* Navigation Controls */}
      {totalPages > 1 && <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button onClick={goToPrevious} className="p-3 bg-white border-2 border-golden-primary rounded-full shadow-md hover:bg-golden-light hover:border-golden-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Página anterior">
            <ChevronLeft className="w-5 h-5 text-golden-brown" />
          </button>

          {/* Page Indicators */}
          <div className="flex gap-2">
            {Array.from({
          length: totalPages
        }).map((_, index) => <button key={index} onClick={() => goToPage(index)} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-golden-primary focus:ring-offset-2 ${index === currentPage ? 'bg-golden-primary w-8' : 'bg-golden-light hover:bg-golden-primary'}`} aria-label={`Ir para página ${index + 1}`} aria-current={index === currentPage} />)}
          </div>

          {/* Next Button */}
          <button onClick={goToNext} className="p-3 bg-white border-2 border-golden-primary rounded-full shadow-md hover:bg-golden-light hover:border-golden-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Próxima página">
            <ChevronRight className="w-5 h-5 text-golden-brown" />
          </button>
        </div>}

      {/* Page Counter */}
      {totalPages > 1 && <p className="text-center text-sm text-golden-brown mt-4">
          Página {currentPage + 1} de {totalPages}
        </p>}
    </div>;
}