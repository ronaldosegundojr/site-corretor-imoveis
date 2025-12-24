import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Home, Navigation, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
export interface DeliveryData {
  rua: string;
  bairro: string;
  cidade: string;
  cep: string;
  pontoReferencia?: string;
}
export function DeliveryInfo() {
  const navigate = useNavigate();
  const {
    cart,
    getTotal
  } = useCart();
  const [formData, setFormData] = useState<DeliveryData>({
    rua: '',
    bairro: '',
    cidade: '',
    cep: '',
    pontoReferencia: ''
  });
  const [errors, setErrors] = useState<Partial<DeliveryData>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof DeliveryData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: Partial<DeliveryData> = {};
    if (!formData.rua.trim()) newErrors.rua = 'Rua é obrigatória';
    if (!formData.bairro.trim()) newErrors.bairro = 'Bairro é obrigatório';
    if (!formData.cidade.trim()) newErrors.cidade = 'Cidade é obrigatória';
    if (!formData.cep.trim()) newErrors.cep = 'CEP é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Save delivery data to localStorage
      localStorage.setItem('perfumaria-delivery-data', JSON.stringify(formData));
      navigate('/payment');
    }
  };
  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }
  return <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">
                Carrinho
              </span>
            </div>
            <div className="w-16 h-1 bg-amber-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <span className="ml-2 text-sm font-medium text-amber-900">
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">
            Dados de Entrega
          </h1>
          <p className="text-gray-600">
            Informe o endereço onde deseja receber seus produtos
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-6 space-y-5">
              {/* Rua */}
              <div>
                <label htmlFor="rua" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <Home className="w-4 h-4" aria-hidden="true" />
                  Rua / Avenida *
                </label>
                <input type="text" id="rua" name="rua" value={formData.rua} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.rua ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Ex: Rua das Flores" />
                {errors.rua && <p className="text-red-600 text-xs mt-1">{errors.rua}</p>}
              </div>

              {/* Bairro */}
              <div>
                <label htmlFor="bairro" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Bairro *
                </label>
                <input type="text" id="bairro" name="bairro" value={formData.bairro} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.bairro ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Ex: Centro" />
                {errors.bairro && <p className="text-red-600 text-xs mt-1">{errors.bairro}</p>}
              </div>

              {/* Cidade e CEP */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="cidade" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                    Cidade *
                  </label>
                  <input type="text" id="cidade" name="cidade" value={formData.cidade} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.cidade ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Ex: São Paulo" />
                  {errors.cidade && <p className="text-red-600 text-xs mt-1">{errors.cidade}</p>}
                </div>

                <div>
                  <label htmlFor="cep" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                    <Navigation className="w-4 h-4" aria-hidden="true" />
                    CEP *
                  </label>
                  <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.cep ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="00000-000" />
                  {errors.cep && <p className="text-red-600 text-xs mt-1">{errors.cep}</p>}
                </div>
              </div>

              {/* Ponto de Referência */}
              <div>
                <label htmlFor="pontoReferencia" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  Ponto de Referência{' '}
                  <span className="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea id="pontoReferencia" name="pontoReferencia" value={formData.pontoReferencia} onChange={handleChange} rows={3} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors resize-none" placeholder="Ex: Próximo ao mercado, portão azul..." />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Link to="/cart" className="flex-1">
                  <Button variant="outline" fullWidth>
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Voltar
                  </Button>
                </Link>
                <Button type="submit" fullWidth className="flex-1">
                  Continuar
                  <ArrowRight className="w-4 h-4 inline ml-2" />
                </Button>
              </div>

              <p className="text-xs text-center text-gray-500 mt-3">
                * Campos obrigatórios
              </p>
            </form>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-6 sticky top-24">
              <h3 className="text-xl font-serif font-bold text-amber-900 mb-4">
                Resumo do Pedido
              </h3>
              <div className="space-y-2 mb-4">
                {cart.map(item => <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.quantity}x {item.name}
                    </span>
                    <span className="font-semibold text-amber-700">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>)}
              </div>
              <div className="border-t-2 border-amber-100 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-amber-900">
                    Total
                  </span>
                  <span className="text-2xl font-bold text-amber-700">
                    R$ {getTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}