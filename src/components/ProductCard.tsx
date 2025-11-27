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
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-golden-cream to-golden-light">
        <img src={image} alt={name} className="w-full h-full object-cover" loading="lazy" />
        <div className="absolute top-3 right-3 flex gap-2">
          {available ? <Badge variant="success">Disponível</Badge> : <Badge variant="error">Indisponível</Badge>}
          {isInCart && <Badge variant="info" className="bg-golden-primary text-golden-dark border-golden-primary font-bold">
              {quantityInCart} no carrinho
            </Badge>}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-serif font-bold text-golden-dark mb-2">
          {name}
        </h3>
        <p className="text-golden-brown text-sm mb-4 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-golden-primary">
            R$ {price.toFixed(2)}
          </span>

          {isInCart && onUpdateQuantity ? <div className="flex items-center gap-2 bg-golden-light rounded-lg p-1 border-2 border-golden-primary">
              <button onClick={() => onUpdateQuantity(quantityInCart - 1)} className="p-1.5 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Diminuir quantidade" disabled={!available}>
                <Minus className="w-4 h-4 text-golden-brown" />
              </button>
              <span className="w-8 text-center font-bold text-golden-dark">
                {quantityInCart}
              </span>
              <button onClick={() => onUpdateQuantity(quantityInCart + 1)} className="p-1.5 hover:bg-golden-primary hover:text-golden-dark rounded transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Aumentar quantidade" disabled={!available}>
                <Plus className="w-4 h-4 text-golden-brown" />
              </button>
            </div> : <Button onClick={handleAddClick} disabled={!available} size="sm" aria-label={`Adicionar ${name} ao carrinho`}>
              <Plus className="w-4 h-4 inline mr-1" />
              Adicionar
            </Button>}
        </div>
      </div>
    </article>;
}