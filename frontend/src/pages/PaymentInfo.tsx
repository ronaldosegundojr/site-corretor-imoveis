import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, User, Phone, FileText, ArrowLeft, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { useCart } from '../hooks/useCart';
import { generateWhatsAppMessage } from '../utils/whatsapp';
import { DeliveryData } from './DeliveryInfo';
export interface PaymentData {
  formaPagamento: string;
  nomeCompleto: string;
  celular: string;
  celularSecundario?: string;
  observacoes?: string;
}
export function PaymentInfo() {
  const navigate = useNavigate();
  const {
    cart,
    getTotal,
    clearCart
  } = useCart();
  const [formData, setFormData] = useState<PaymentData>({
    formaPagamento: '',
    nomeCompleto: '',
    celular: '',
    celularSecundario: '',
    observacoes: ''
  });
  const [errors, setErrors] = useState<Partial<PaymentData>>({});
  const paymentMethods = ['Dinheiro', 'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Transferência Bancária'];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name as keyof PaymentData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentData> = {};
    if (!formData.formaPagamento) newErrors.formaPagamento = 'Forma de pagamento é obrigatória';
    if (!formData.nomeCompleto.trim()) newErrors.nomeCompleto = 'Nome completo é obrigatório';
    if (!formData.celular.trim()) newErrors.celular = 'Celular é obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Get delivery data from localStorage
      const deliveryDataStr = localStorage.getItem('perfumaria-delivery-data');
      if (!deliveryDataStr) {
        navigate('/delivery');
        return;
      }
      const deliveryData: DeliveryData = JSON.parse(deliveryDataStr);
      // Generate WhatsApp message with all data
      const whatsappUrl = generateWhatsAppMessage(cart, getTotal(), deliveryData, formData);
      // Open WhatsApp
      window.open(whatsappUrl, '_blank');
      // Clear cart and data
      clearCart();
      localStorage.removeItem('perfumaria-delivery-data');
      // Redirect to home
      setTimeout(() => {
        navigate('/');
      }, 1000);
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
            <div className="w-16 h-1 bg-green-500"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                ✓
              </div>
              <span className="ml-2 text-sm font-medium text-green-600">
                Entrega
              </span>
            </div>
            <div className="w-16 h-1 bg-amber-600"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <span className="ml-2 text-sm font-medium text-amber-900">
                Pagamento
              </span>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-serif font-bold text-amber-900 mb-2">
            Dados de Pagamento
          </h1>
          <p className="text-gray-600">
            Informe como deseja pagar e seus dados de contato
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg border-2 border-amber-100 p-6 space-y-5">
              {/* Forma de Pagamento */}
              <div>
                <label htmlFor="formaPagamento" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <CreditCard className="w-4 h-4" aria-hidden="true" />
                  Forma de Pagamento *
                </label>
                <select id="formaPagamento" name="formaPagamento" value={formData.formaPagamento} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.formaPagamento ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`}>
                  <option value="">Selecione uma forma de pagamento</option>
                  {paymentMethods.map(method => <option key={method} value={method}>
                      {method}
                    </option>)}
                </select>
                {errors.formaPagamento && <p className="text-red-600 text-xs mt-1">
                    {errors.formaPagamento}
                  </p>}
              </div>

              {/* Nome Completo */}
              <div>
                <label htmlFor="nomeCompleto" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <User className="w-4 h-4" aria-hidden="true" />
                  Nome Completo *
                </label>
                <input type="text" id="nomeCompleto" name="nomeCompleto" value={formData.nomeCompleto} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.nomeCompleto ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Seu nome completo" />
                {errors.nomeCompleto && <p className="text-red-600 text-xs mt-1">
                    {errors.nomeCompleto}
                  </p>}
              </div>

              {/* Celulares */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="celular" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Celular *
                  </label>
                  <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.celular ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="(00) 00000-0000" />
                  {errors.celular && <p className="text-red-600 text-xs mt-1">
                      {errors.celular}
                    </p>}
                </div>

                <div>
                  <label htmlFor="celularSecundario" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    Celular 2{' '}
                    <span className="text-gray-400 text-xs">(opcional)</span>
                  </label>
                  <input type="tel" id="celularSecundario" name="celularSecundario" value={formData.celularSecundario} onChange={handleChange} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors" placeholder="(00) 00000-0000" />
                </div>
              </div>

              {/* Observações */}
              <div>
                <label htmlFor="observacoes" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <FileText className="w-4 h-4" aria-hidden="true" />
                  Observações Adicionais{' '}
                  <span className="text-gray-400 text-xs">(opcional)</span>
                </label>
                <textarea id="observacoes" name="observacoes" value={formData.observacoes} onChange={handleChange} rows={4} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors resize-none" placeholder="Alguma informação adicional sobre seu pedido..." />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-4">
                <Link to="/delivery" className="flex-1">
                  <Button variant="outline" fullWidth>
                    <ArrowLeft className="w-4 h-4 inline mr-2" />
                    Voltar
                  </Button>
                </Link>
                <Button type="submit" fullWidth className="flex-1 bg-green-600 hover:bg-green-700">
                  <MessageCircle className="w-4 h-4 inline mr-2" />
                  Verificar via WhatsApp
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