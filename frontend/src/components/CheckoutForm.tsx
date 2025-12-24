import React, { useState } from 'react';
import { X, User, Phone, MapPin, Mail, Home, Navigation } from 'lucide-react';
import { Button } from './Button';
interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (userInfo: UserInfo) => void;
}
export interface UserInfo {
  nome: string;
  celular: string;
  endereco: string;
  cep: string;
  numero: string;
  email?: string;
}
export function CheckoutForm({
  isOpen,
  onClose,
  onSubmit
}: CheckoutFormProps) {
  const [formData, setFormData] = useState<UserInfo>({
    nome: '',
    celular: '',
    endereco: '',
    cep: '',
    numero: '',
    email: ''
  });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name as keyof UserInfo]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  const validateForm = (): boolean => {
    const newErrors: Partial<UserInfo> = {};
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome completo é obrigatório';
    }
    if (!formData.celular.trim()) {
      newErrors.celular = 'Celular é obrigatório';
    }
    if (!formData.endereco.trim()) {
      newErrors.endereco = 'Endereço é obrigatório';
    }
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    }
    if (!formData.numero.trim()) {
      newErrors.numero = 'Número é obrigatório';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        nome: '',
        celular: '',
        endereco: '',
        cep: '',
        numero: '',
        email: ''
      });
      setErrors({});
    }
  };
  if (!isOpen) return null;
  return <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
        {/* Modal */}
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-scaleIn" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-amber-900 to-amber-800 text-white p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-serif font-bold mb-1">
                  Finalizar Pedido
                </h2>
                <p className="text-amber-100 text-sm">
                  Preencha seus dados para continuar
                </p>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-white" aria-label="Fechar formulário">
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Nome Completo */}
            <div>
              <label htmlFor="nome" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                <User className="w-4 h-4" aria-hidden="true" />
                Nome Completo *
              </label>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.nome ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Seu nome completo" />
              {errors.nome && <p className="text-red-600 text-xs mt-1">{errors.nome}</p>}
            </div>

            {/* Celular */}
            <div>
              <label htmlFor="celular" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                <Phone className="w-4 h-4" aria-hidden="true" />
                Celular *
              </label>
              <input type="tel" id="celular" name="celular" value={formData.celular} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.celular ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="(00) 00000-0000" />
              {errors.celular && <p className="text-red-600 text-xs mt-1">{errors.celular}</p>}
            </div>

            {/* Email (opcional) */}
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                <Mail className="w-4 h-4" aria-hidden="true" />
                E-mail <span className="text-gray-400 text-xs">(opcional)</span>
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-3 border-2 border-amber-200 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-colors" placeholder="seu@email.com" />
            </div>

            {/* Endereço */}
            <div>
              <label htmlFor="endereco" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Endereço de Entrega *
              </label>
              <input type="text" id="endereco" name="endereco" value={formData.endereco} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.endereco ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="Rua, Avenida, etc." />
              {errors.endereco && <p className="text-red-600 text-xs mt-1">{errors.endereco}</p>}
            </div>

            {/* CEP e Número */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="cep" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <Navigation className="w-4 h-4" aria-hidden="true" />
                  CEP *
                </label>
                <input type="text" id="cep" name="cep" value={formData.cep} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.cep ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="00000-000" />
                {errors.cep && <p className="text-red-600 text-xs mt-1">{errors.cep}</p>}
              </div>

              <div>
                <label htmlFor="numero" className="flex items-center gap-2 text-sm font-semibold text-amber-900 mb-2">
                  <Home className="w-4 h-4" aria-hidden="true" />
                  Número *
                </label>
                <input type="text" id="numero" name="numero" value={formData.numero} onChange={handleChange} className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 transition-colors ${errors.numero ? 'border-red-300 focus:border-red-500 focus:ring-red-200' : 'border-amber-200 focus:border-amber-500 focus:ring-amber-200'}`} placeholder="123" />
                {errors.numero && <p className="text-red-600 text-xs mt-1">{errors.numero}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button type="submit" fullWidth size="lg" className="shadow-lg">
                Enviar Pedido via WhatsApp
              </Button>
              <p className="text-xs text-center text-gray-500 mt-3">
                * Campos obrigatórios
              </p>
            </div>
          </form>
        </div>
      </div>
    </>;
}