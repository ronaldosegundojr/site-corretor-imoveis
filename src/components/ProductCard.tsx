import React, { lazy } from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Plus, Minus } from 'lucide-react';
interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
  onAddToCart: () => void;
  quantityInCart?: number;
  onUpdateQuantity?: (quantity: number) => void;
  outOfStock?: boolean;
  showWhenOutOfStock?: boolean;
}
export function ProductCard({
  name,
  description,
  price,
  image,
  available,
  onAddToCart,
  quantityInCart = 0,
  onUpdateQuantity,
  outOfStock = false
}: ProductCardProps) {
  const isInCart = quantityInCart > 0;
  const canPurchase = available && !outOfStock;
  const handleAddClick = () => {
    if (!canPurchase) return;
    console.log('ProductCard: Add button clicked for', name);
    onAddToCart();
  };
  return <article className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-golden-light hover:shadow-xl hover:border-golden-primary transition-all duration-300 flex flex-col h-full">
      {/* Image - Fixed height */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-golden-cream to-golden-light flex-shrink-0">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex flex-wrap gap-2 justify-end">
          {outOfStock ? <Badge variant="error" className="bg-red-600 text-white border-red-700">
              Fora de Estoque
            </Badge> : available ? <Badge variant="success">Disponível</Badge> : <Badge variant="error">Indisponível</Badge>}
          {isInCart && <Badge variant="info" className="bg-golden-primary text-golden-dark border-golden-primary font-bold">
              {quantityInCart}
            </Badge>}
        </div>
      </div>

      {/* Content - Flexible height with consistent structure */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        {/* Title - Fixed height with line clamp */}
        <h3 className="text-lg sm:text-xl font-serif font-bold text-golden-dark mb-2 line-clamp-2 min-h-[3.5rem] sm:min-h-[3.5rem]">
          {name}
        </h3>

        {/* Description - Fixed height with line clamp */}
        <p className="text-golden-brown text-xs sm:text-sm mb-4 line-clamp-2 min-h-[2.5rem] sm:min-h-[2.5rem]">
          {description}
        </p>

        {/* Spacer to push price/button to bottom */}
        <div className="flex-grow"></div>

        {/* Out of Stock Message */}
        {outOfStock && <div className="mb-3 p-2 bg-red-50 border border-red-200 rounded-lg text-center">
            <p className="text-xs text-red-700 font-medium">
              Produto temporariamente indisponível
            </p>
          </div>}

        {/* Price and Button - Fixed at bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
          {/* Price */}
          <div className="flex items-center">
            <span className="text-xl sm:text-2xl font-bold text-golden-primary whitespace-nowrap">
              R$ {price.toFixed(2)}
            </span>
          </div>

          {/* Button or Quantity Controls */}
          {isInCart && onUpdateQuantity && canPurchase ? <div className="flex items-center justify-center gap-2 bg-golden-light rounded-lg p-1.5 border-2 border-golden-primary w-full sm:w-auto flex-shrink-0">
              <button onClick={() => onUpdateQuantity(quantityInCart - 1)} className="p-2 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary flex-shrink-0" aria-label="Diminuir quantidade">
                <Minus className="w-4 h-4 text-golden-brown" />
              </button>
              <span className="w-10 text-center font-bold text-golden-dark text-lg flex-shrink-0">
                {quantityInCart}
              </span>
              <button onClick={() => onUpdateQuantity(quantityInCart + 1)} className="p-2 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary flex-shrink-0" aria-label="Aumentar quantidade">
                <Plus className="w-4 h-4 text-golden-brown" />
              </button>
            </div> : <Button onClick={handleAddClick} disabled={!canPurchase} size="sm" className="w-full sm:w-auto flex-shrink-0" aria-label={outOfStock ? 'Produto fora de estoque' : `Adicionar ${name} ao carrinho`}>
              {outOfStock ? <>Indisponível</> : <>
                  <Plus className="w-4 h-4 inline mr-1" />
                  Adicionar
                </>}
            </Button>}
        </div>
      </div>
    </article>;
}