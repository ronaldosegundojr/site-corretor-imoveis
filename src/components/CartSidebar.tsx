import React, { useEffect } from 'react';
import { X, ShoppingBag, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './Button';
import { CartItem } from '../hooks/useCart';
interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
  total: number;
}
export function CartSidebar({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemove,
  total
}: CartSidebarProps) {
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  // Debug log
  useEffect(() => {
    console.log('CartSidebar isOpen:', isOpen);
    console.log('Cart items:', cart.length);
  }, [isOpen, cart]);
  return <>
      {/* Backdrop */}
      <div className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={onClose} aria-hidden="true" />

      {/* Sidebar */}
      <aside className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-golden-cream shadow-2xl z-[101] transform transition-transform duration-300 ease-out border-l-4 border-golden-primary ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} aria-label="Carrinho de compras">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-golden-primary bg-golden-dark text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-golden-primary rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-golden-dark" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-serif font-bold text-golden-primary">
                  Seu Carrinho
                </h2>
                <p className="text-sm text-golden-light">
                  {cart.length} {cart.length === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-golden-brown rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Fechar carrinho">
              <X className="w-6 h-6 text-golden-light" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-golden-cream">
            {cart.length === 0 ? <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <div className="w-20 h-20 bg-golden-light rounded-full flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 text-golden-brown" aria-hidden="true" />
                </div>
                <p className="text-golden-brown mb-2 font-semibold">
                  Seu carrinho está vazio
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Adicione produtos para começar
                </p>
                <Button onClick={onClose} variant="secondary">
                  Ver Produtos
                </Button>
              </div> : cart.map(item => <div key={item.id} className="flex gap-4 p-4 bg-white rounded-lg border-2 border-golden-light shadow-sm animate-fadeIn">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md border-2 border-golden-light" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-golden-dark truncate mb-1">
                      {item.name}
                    </h3>
                    <p className="text-golden-primary font-bold mb-2">
                      R$ {item.price.toFixed(2)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center bg-golden-light border-2 border-golden-primary rounded hover:bg-golden-primary hover:text-golden-dark transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Diminuir quantidade">
                        -
                      </button>
                      <span className="w-8 text-center font-bold text-golden-dark">
                        {item.quantity}
                      </span>
                      <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center bg-golden-light border-2 border-golden-primary rounded hover:bg-golden-primary hover:text-golden-dark transition-colors focus:outline-none focus:ring-2 focus:ring-golden-primary" aria-label="Aumentar quantidade">
                        +
                      </button>
                      <button onClick={() => onRemove(item.id)} className="ml-auto p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-500" aria-label={`Remover ${item.name}`}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>)}
          </div>

          {/* Footer */}
          {cart.length > 0 && <div className="border-t-2 border-golden-primary p-6 bg-golden-dark text-white">
              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-semibold text-golden-light">
                  Total
                </span>
                <span className="text-3xl font-bold text-golden-primary">
                  R$ {total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link to="/cart" onClick={onClose}>
                  <Button fullWidth size="lg" className="shadow-lg">
                    <ShoppingCart className="w-5 h-5 inline mr-2" />
                    Prosseguir com a Compra
                    <ArrowRight className="w-5 h-5 inline ml-2" />
                  </Button>
                </Link>

                <Button fullWidth size="lg" variant="outline" onClick={onClose} className="border-golden-primary text-golden-primary hover:bg-golden-primary hover:text-golden-dark">
                  <ArrowLeft className="w-5 h-5 inline mr-2" />
                  Continuar Vendo os Produtos
                </Button>
              </div>

              <p className="text-xs text-center text-golden-light mt-4">
                Seus produtos estão salvos no carrinho
              </p>
            </div>}
        </div>
      </aside>
    </>;
}