
import { Minus, Plus, Trash2 } from 'lucide-react';
interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  onUpdateQuantity: (quantity: number) => void;
  onRemove: () => void;
}
export function CartItem({
  name,
  price,
  quantity,
  image,
  onUpdateQuantity,
  onRemove
}: CartItemProps) {
  return <div className="flex gap-4 p-4 bg-white rounded-lg border border-amber-100 shadow-sm">
      <img src={image} alt={name} className="w-24 h-24 object-cover rounded-md" />

      <div className="flex-1">
        <h3 className="font-serif font-bold text-amber-900 mb-1">{name}</h3>
        <p className="text-amber-700 font-semibold mb-3">
          R$ {price.toFixed(2)}
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-1">
            <button onClick={() => onUpdateQuantity(quantity - 1)} className="p-1 hover:bg-amber-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="Diminuir quantidade">
              <Minus className="w-4 h-4 text-amber-700" />
            </button>
            <span className="w-8 text-center font-semibold text-amber-900">
              {quantity}
            </span>
            <button onClick={() => onUpdateQuantity(quantity + 1)} className="p-1 hover:bg-amber-100 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500" aria-label="Aumentar quantidade">
              <Plus className="w-4 h-4 text-amber-700" />
            </button>
          </div>

          <button onClick={onRemove} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500" aria-label={`Remover ${name} do carrinho`}>
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="text-right">
        <p className="text-sm text-gray-500 mb-1">Subtotal</p>
        <p className="text-xl font-bold text-amber-700">
          R$ {(price * quantity).toFixed(2)}
        </p>
      </div>
    </div>;
}