import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Bed, Bath, Move, Car, MessageCircle, ChevronLeft, Phone, Calendar, ShieldCheck, Share2 } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { Button } from '../components/Button';

export function PropertyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  
  const property = properties.find(p => p.id === id || p.id === `prop-local-${id}`);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-secondary"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen pt-32 pb-20 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-serif font-bold text-primary mb-4">Imóvel não encontrado</h2>
        <Button onClick={() => navigate('/properties')} variant="outline">
          Voltar para listagem
        </Button>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/5512912345678?text=Olá!%20Tenho%20interesse%20no%20imóvel:%20${property.title}%20(Cód:%20${property.code})`;

  return (
    <div className="min-h-screen bg-bg-light pt-24 pb-20">
      <div className="container mx-auto px-4">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest mb-8 hover:text-secondary transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar para resultados
        </button>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 aspect-video overflow-hidden rounded-3xl shadow-2xl bg-slate-200">
                <img 
                  src={property.images[0] || 'https://via.placeholder.com/1200x800?text=Imóvel+Principal'} 
                  alt={property.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              {property.images.slice(1, 4).map((img, idx) => (
                <div key={idx} className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl bg-slate-100">
                  <img src={img} alt={`Vista ${idx + 2}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex gap-2">
                  <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{property.status}</span>
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">{property.type}</span>
                </div>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Código: {property.code}</p>
              </div>

              <h1 className="text-2xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-2 text-slate-500 font-medium mb-10">
                <MapPin className="w-5 h-5 text-secondary" />
                <p>{property.location.neighborhood}, {property.location.city}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-y border-slate-100 mb-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Move className="w-5 h-5 text-secondary" />
                    <span className="text-lg font-bold text-primary">{property.features.area}m²</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Área Total</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-secondary" />
                    <span className="text-lg font-bold text-primary">{property.features.bedrooms}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Dormitórios</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-secondary" />
                    <span className="text-lg font-bold text-primary">{property.features.bathrooms}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Banheiros</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-secondary" />
                    <span className="text-lg font-bold text-primary">{property.features.garages}</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Vagas</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-serif font-bold text-primary uppercase tracking-tight">Descrição do Imóvel</h3>
                <p className="text-slate-500 leading-relaxed text-lg whitespace-pre-line">
                  {property.description}
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar - Contact */}
          <div className="space-y-8">
            <div className="bg-primary p-8 rounded-3xl shadow-3xl text-white sticky top-32">
              <div className="text-center mb-8 pb-8 border-b border-white/10">
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">Valor do Investimento</p>
                <h2 className="text-3xl md:text-5xl font-serif font-bold mb-2 text-white">
                   {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
                </h2>
                {property.status === 'Aluguel' && <p className="text-slate-300 font-medium">/ mês</p>}
              </div>

              <div className="space-y-4">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-secondary text-primary py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] transition-all">
                    <MessageCircle className="w-6 h-6" />
                    FALAR COM CORRETOR (A)
                  </Button>
                </a>
                <a href="tel:5512912345678" className="block">
                  <Button variant="outline" className="w-full border-white/20 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10">
                    <Phone className="w-6 h-6 text-secondary" />
                    LIGAR AGORA
                  </Button>
                </a>
              </div>

              <div className="mt-10 pt-10 border-t border-white/10 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-2 rounded-lg">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Segurança Jurídica</h4>
                    <p className="text-xs text-slate-400 mt-1">Imóvel com documentação 100% verificada para sua total tranquilidade.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-secondary/20 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">Visita Personalizada</h4>
                    <p className="text-xs text-slate-400 mt-1">Agende seu horário e tenha uma experiência exclusiva de tour.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-center gap-4">
                <button className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition-colors">
                  <Share2 className="w-5 h-5 text-secondary" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
