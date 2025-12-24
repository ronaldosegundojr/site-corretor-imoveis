
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { CartItem } from '../components/CartItem';
import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
export function Cart() {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotal
  } = useCart();
  const total = getTotal();
  if (cart.length === 0) {
    return <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-amber-600" aria-hidden="true" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-amber-900 mb-3">
              Carrinho Vazio
            </h2>
            <p className="text-gray-600 mb-8">
              Você ainda não adicionou nenhum produto ao carrinho
            </p>
            <Link to="/products">
              <Button size="lg">
                <ShoppingBag className="w-5 h-5 inline mr-2" aria-hidden="true" />
                Ver Produtos
              </Button>
            </Link>
          </div>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
      <div className="container mx-auto px-4 py-12">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                1
              </div>
              <span className="ml-2 text-sm font-medium text-amber-900">
                Carrinho
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                Entrega
              </span>
            </div>
            <div className="w-16 h-1 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center font-bold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-gray-500">
                Pagamento
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-900 mb-4 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded px-2 py-1">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Continuar Comprando
          </Link>
          <h2 className="text-4xl font-serif font-bold text-amber-900">
            Seu Carrinho
          </h2>
          <p className="text-gray-600 mt-2">
            {cart.length} {cart.length === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(item => <CartItem key={item.id} {...item} onUpdateQuantity={quantity => updateQuantity(item.id, quantity)} onRemove={() => removeFromCart(item.id)} />)}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-6 sticky top-24">
              <h3 className="text-2xl font-serif font-bold text-amber-900 mb-6">
                Resumo do Pedido
              </h3>

              <div className="space-y-3 mb-6">
                {cart.map(item => <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold text-amber-700">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>

              <div className="border-t-2 border-amber-100 pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-900">
                    Total
                  </span>
                  <span className="text-3xl font-bold text-amber-700">
                    R$ {total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link to="/delivery">
                <Button fullWidth size="lg" className="shadow-lg">
                  Continuar para Entrega
                  <ArrowRight className="w-5 h-5 inline ml-2" />
                </Button>
              </Link>

              <p className="text-xs text-gray-500 text-center mt-4">
                Você preencherá seus dados nas próximas etapas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}