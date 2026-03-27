import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Search, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Property } from '../types/Property';
import mockData from '../data/properties.json';

export function Admin() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  const initialFormData: Property = {
    id: '',
    title: '',
    description: '',
    price: 0,
    images: [],
    type: 'Casa',
    status: 'Venda',
    location: {
      city: '',
      neighborhood: '',
      address: ''
    },
    features: {
      bedrooms: 0,
      suites: 0,
      bathrooms: 0,
      garages: 0,
      area: 0
    },
    featured: false,
    code: ''
  };

  const [formData, setFormData] = useState<Property>(initialFormData);

  useEffect(() => {
    loadProperties();
  }, []);

  const loadProperties = () => {
    const staticProperties = mockData.properties as Property[];
    const storedPropertiesStr = localStorage.getItem('registered_properties');
    const storedProperties: Property[] = storedPropertiesStr ? JSON.parse(storedPropertiesStr) : [];
    
    // Combine both but mark static ones as "system" properties
    setProperties([...storedProperties, ...staticProperties]);
    setLoading(false);
  };

  const saveToStorage = (updatedList: Property[]) => {
    // Only save properties that are NOT from the mockData (unless they were edited)
    // For simplicity in a "no backend" demo, we'll just save everything that was added via admin
    const registeredOnly = updatedList.filter(p => !mockData.properties.find(m => m.id === p.id));
    localStorage.setItem('registered_properties', JSON.stringify(registeredOnly));
  };

  const handleSave = () => {
    if (!formData.title || !formData.price || !formData.location.city) {
      alert('Preencha os campos obrigatórios (Título, Preço e Cidade)');
      return;
    }

    let updatedProperties: Property[];
    if (isCreating) {
      const newProperty = { 
        ...formData, 
        id: `prop-local-${Date.now()}`,
        code: formData.code || `NEW-${Math.floor(Math.random() * 1000)}`
      };
      updatedProperties = [newProperty, ...properties];
    } else {
      updatedProperties = properties.map(p => p.id === formData.id ? formData : p);
    }

    setProperties(updatedProperties);
    saveToStorage(updatedProperties);
    handleCancel();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este imóvel?')) {
      const updatedProperties = properties.filter(p => p.id !== id);
      setProperties(updatedProperties);
      saveToStorage(updatedProperties);
    }
  };

  const handleEdit = (property: Property) => {
    setFormData(property);
    setEditingProperty(property);
    setIsCreating(false);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingProperty(null);
    setFormData(initialFormData);
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-20 text-center">Carregando painel...</div>;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-primary text-white p-8 rounded-2xl shadow-xl mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h1 className="text-3xl font-serif font-bold text-secondary mb-2">Painel do Corretor</h1>
            <p className="text-slate-300">Administre seus imóveis e listagens de forma simples.</p>
          </div>
          <Button onClick={() => setIsCreating(true)} className="bg-secondary text-primary font-bold px-8 py-4 rounded-xl shadow-lg hover:scale-105 transition-all">
            <Plus className="w-5 h-5 mr-2" />
            CADASTRAR IMÓVEL
          </Button>
        </div>

        {/* Search */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-8 border border-slate-100">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Buscar por título, código ou bairro..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all font-medium"
            />
          </div>
        </div>

        {/* Form Modal-like Overlay */}
        {(isCreating || editingProperty) && (
          <div className="fixed inset-0 z-[100] bg-primary/40 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] shadow-3xl p-8 md:p-12 relative">
              <button onClick={handleCancel} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X className="w-6 h-6 text-slate-400" />
              </button>

              <h2 className="text-3xl font-serif font-bold text-primary mb-8">
                {isCreating ? 'Novo Cadastro de Imóvel' : 'Editar Imóvel'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Basic Info */}
                <div className="space-y-6">
                  <h3 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-slate-100 pb-2">Informações Básicas</h3>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Título do Anúncio *</label>
                    <input 
                      type="text" 
                      value={formData.title} 
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-secondary/20 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tipo</label>
                      <select 
                        value={formData.type} 
                        onChange={e => setFormData({...formData, type: e.target.value as any})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option>Casa</option>
                        <option>Apartamento</option>
                        <option>Terreno</option>
                        <option>Comercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status</label>
                      <select 
                        value={formData.status} 
                        onChange={e => setFormData({...formData, status: e.target.value as any})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      >
                        <option value="Venda">Comprar (Venda)</option>
                        <option value="Aluguel">Alugar</option>
                        <option value="Novo">Imóvel Novo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Preço (R$) *</label>
                    <input 
                      type="number" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: Number(e.target.value)})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                {/* Location & Details */}
                <div className="space-y-6">
                  <h3 className="text-primary font-bold text-sm uppercase tracking-widest border-b border-slate-100 pb-2">Localização e Specs</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bairro</label>
                      <input 
                        type="text" 
                        value={formData.location.neighborhood} 
                        onChange={e => setFormData({...formData, location: {...formData.location, neighborhood: e.target.value}})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Cidade *</label>
                      <input 
                        type="text" 
                        value={formData.location.city} 
                        onChange={e => setFormData({...formData, location: {...formData.location, city: e.target.value}})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Dorms</label>
                      <input type="number" value={formData.features.bedrooms} onChange={e => setFormData({...formData, features: {...formData.features, bedrooms: Number(e.target.value)}})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center"/>
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Suítes</label>
                      <input type="number" value={formData.features.suites} onChange={e => setFormData({...formData, features: {...formData.features, suites: Number(e.target.value)}})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center"/>
                    </div>
                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase tracking-widest mb-2">Área m²</label>
                      <input type="number" value={formData.features.area} onChange={e => setFormData({...formData, features: {...formData.features, area: Number(e.target.value)}})} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-center"/>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">URL da Imagem</label>
                    <input 
                      type="text" 
                      placeholder="https://images.unsplash.com/..." 
                      value={formData.images[0] || ''} 
                      onChange={e => setFormData({...formData, images: [e.target.value]})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Descrição Completa</label>
                  <textarea 
                    value={formData.description} 
                    onChange={e => setFormData({...formData, description: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none resize-none"
                  />
                </div>

                <div className="md:col-span-2 flex items-center gap-4 py-4 bg-slate-50 rounded-2xl px-6">
                   <label className="flex items-center gap-3 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.featured} 
                        onChange={e => setFormData({...formData, featured: e.target.checked})}
                        className="w-6 h-6 rounded-lg text-secondary border-slate-300 focus:ring-secondary"
                      />
                      <span className="font-bold text-primary flex items-center gap-2">
                         <Star className="w-4 h-4 text-secondary fill-secondary" />
                         Destaque na Página Inicial
                      </span>
                   </label>
                </div>

                <div className="md:col-span-2 flex gap-4 pt-4 border-t border-slate-100">
                  <Button onClick={handleSave} className="flex-1 bg-primary text-secondary py-5 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Save className="w-6 h-6" />
                    SALVAR IMÓVEL
                  </Button>
                  <Button onClick={handleCancel} variant="outline" className="flex-1 py-5 rounded-2xl font-bold border-slate-200">
                    CANCELAR
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Listings Table */}
        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-primary text-secondary">
                <th className="p-6 text-xs font-bold uppercase tracking-widest">Imóvel</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest">Status/Tipo</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest">Preço</th>
                <th className="p-6 text-xs font-bold uppercase tracking-widest text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProperties.map(p => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <img src={p.images[0]} alt={p.title} className="w-16 h-12 object-cover rounded-lg bg-slate-100 shadow-sm" />
                      <div>
                        <p className="font-bold text-primary line-clamp-1">{p.title}</p>
                        <p className="text-xs text-slate-400 font-medium">Cód: {p.code}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-secondary/20 px-2 py-0.5 rounded self-start">
                        {p.status}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{p.type}</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-primary">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(p.price)}
                  </td>
                  <td className="p-6">
                    <div className="flex items-center justify-center gap-2">
                       <button onClick={() => handleEdit(p)} className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                         <Edit2 className="w-4 h-4" />
                       </button>
                       <button onClick={() => handleDelete(p.id)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                         <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProperties.length === 0 && (
            <div className="p-20 text-center text-slate-400 font-medium tracking-wide">
              Nenhum imóvel encontrado na sua listagem.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}