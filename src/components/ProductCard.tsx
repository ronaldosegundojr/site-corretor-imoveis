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
  onAddToCart: () => void;
  quantityInCart?: number;
  onUpdateQuantity?: (quantity: number) => void;
}
export function ProductCard({
  name,
  description,
  price,
  image,
  available,
  onAddToCart,
  quantityInCart = 0,
  onUpdateQuantity
}: ProductCardProps) {
  const isInCart = quantityInCart > 0;
  const handleAddClick = () => {
    console.log('ProductCard: Add button clicked for', name);
    onAddToCart();
  };
  return <article className="bg-white rounded-xl shadow-md overflow-hidden border-2 border-golden-light hover:shadow-xl hover:border-golden-primary transition-all duration-300">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-br from-golden-cream to-golden-light">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-2 right-2 sm:top-3 sm:right-3 flex gap-2">
          {available ? <Badge variant="success">Disponível</Badge> : <Badge variant="error">Indisponível</Badge>}
          {isInCart && <Badge variant="info" className="bg-golden-primary text-golden-dark border-golden-primary font-bold">
              {quantityInCart}
            </Badge>}
        </div>
      </div>

      <div className="p-4 sm:p-5">
        <h3 className="text-lg sm:text-xl font-serif font-bold text-golden-dark mb-2 line-clamp-2">
          {name}
        </h3>
        <p className="text-golden-brown text-xs sm:text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Mobile: Stack vertically, Desktop: Side by side */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          {/* Price */}
          <div className="flex items-center justify-between sm:justify-start">
            <span className="text-xl sm:text-2xl font-bold text-golden-primary">
              R$ {price.toFixed(2)}
            </span>
          </div>

          {/* Button or Quantity Controls */}
          {isInCart && onUpdateQuantity ? <div className="flex items-center justify-center gap-2 bg-golden-light rounded-lg p-1.5 border-2 border-golden-primary w-full sm:w-auto">
              <button onClick={() => onUpdateQuantity(quantityInCart - 1)} className="p-2 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Diminuir quantidade" disabled={!available}>
                <Minus className="w-4 h-4 text-golden-brown" />
              </button>
              <span className="w-10 text-center font-bold text-golden-dark text-lg">
                {quantityInCart}
              </span>
              <button onClick={() => onUpdateQuantity(quantityInCart + 1)} className="p-2 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Aumentar quantidade" disabled={!available}>
                <Plus className="w-4 h-4 text-golden-brown" />
              </button>
            </div> : <Button onClick={handleAddClick} disabled={!available} size="sm" className="w-full sm:w-auto" aria-label={`Adicionar ${name} ao carrinho`}>
              <Plus className="w-4 h-4 inline mr-1" />
              Adicionar
            </Button>}
        </div>
      </div>
    </article>;
}