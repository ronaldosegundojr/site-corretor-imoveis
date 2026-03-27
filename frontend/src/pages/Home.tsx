import { Link } from 'react-router-dom';
import { Search, Award, TrendingUp, Phone } from 'lucide-react';
import { Button } from '../components/Button';
import { PropertyCarousel } from '../components/PropertyCarousel';
import { useProperties } from '../hooks/useProperties';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const navigate = useNavigate();
  const { properties, loading } = useProperties();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  
  // Filter for featured properties
  const featuredProperties = properties.filter(p => p.featured);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('Comprar');
  const [propertyType, setPropertyType] = useState('Casa');

  useEffect(() => {
    let requestRef: number;
    
    const updateVideoPosition = () => {
      if (!videoRef.current || !videoContainerRef.current) return;
      
      const video = videoRef.current;
      const rect = videoContainerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate progress based on how much of the video container is visible
      // We start advancing when the container enters the screen and finish when it's at the top
      const startVisible = windowHeight;
      const endVisible = 100; // Finish slightly before hitting the top
      
      const progress = Math.min(Math.max((startVisible - rect.top) / (startVisible - endVisible), 0), 0.99);
      
      if (video.duration && !isNaN(video.duration)) {
        video.currentTime = video.duration * progress;
      }
      
      requestRef = requestAnimationFrame(updateVideoPosition);
    };

    requestRef = requestAnimationFrame(updateVideoPosition);
    
    if (videoRef.current) {
       videoRef.current.muted = true;
       videoRef.current.load();
    }

    return () => cancelAnimationFrame(requestRef);
  }, []);

  const handleSearch = () => {
    navigate(`/properties?location=${searchTerm}&type=${propertyType}&status=${selectedType === 'Comprar' ? 'Venda' : 'Aluguel'}`);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-slate-800">
      {/* Hero Section - Optimized Spacing */}
      <section className="relative min-h-[700px] flex items-center justify-center bg-primary px-4 pt-32 pb-16">
        {/* Quality Static Background for Hero */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1920" 
            alt="Luxury Architecture" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-bg-light" />
        </div>

        <div className="container mx-auto relative z-10 text-center">
          <div className="animate-fadeIn max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-lg">
              Sua Jornada para o <span className="text-secondary italic">Imóvel Ideal</span> Começa Aqui.
            </h1>
            <p className="text-xl text-slate-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              Consultoria completa para todos os tipos de imóveis, com atendimento personalizado para encontrar a opção que realmente combina com o seu perfil.
            </p>

            {/* Search Widget Component */}
            <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-xl p-3 rounded-2xl shadow-3xl border border-white/50 animate-fadeIn mb-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div className="col-span-1 border-r border-slate-100 px-4 py-2 hover:bg-slate-50 transition-colors rounded-l-xl text-left">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">O que busca?</label>
                  <select 
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full bg-transparent text-primary font-bold text-sm focus:outline-none cursor-pointer"
                  >
                    <option>Comprar</option>
                    <option>Alugar</option>
                    <option>Imóvel Novo</option>
                  </select>
                </div>

                <div className="col-span-1 border-r border-slate-100 px-4 py-2 hover:bg-slate-50 transition-colors text-left">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Tipo de Imóvel</label>
                  <select 
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                    className="w-full bg-transparent text-primary font-bold text-sm focus:outline-none cursor-pointer"
                  >
                    <option>Casa</option>
                    <option>Apartamento</option>
                    <option>Terreno</option>
                    <option>Comercial</option>
                  </select>
                </div>

                <div className="col-span-1 px-4 py-2 hover:bg-slate-50 transition-colors text-left group">
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Localização</label>
                  <input 
                    type="text" 
                    placeholder="Bairro ou cidade..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-primary font-bold text-sm focus:outline-none placeholder:text-slate-300 placeholder:font-normal"
                  />
                  {/* Quick Filter Pills */}
                  <div className="flex flex-wrap gap-1.5 mt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    {['Centro', 'Vila Harmonia', 'Jardim Floridiana'].map(lat => (
                      <button 
                        key={lat}
                        onClick={() => setSearchTerm(lat)}
                        className="text-[8px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full hover:bg-secondary hover:text-primary transition-colors uppercase tracking-widest border border-slate-200"
                      >
                        {lat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="col-span-1 flex items-center p-1">
                  <Button onClick={handleSearch} className="w-full bg-primary text-secondary py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform">
                    <Search className="w-4 h-4" />
                    BUSCAR
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Scroll-to-Build Video Component - Cleaned Version */}
            <div ref={videoContainerRef} className="relative max-w-5xl mx-auto mt-12 group">
                <div className="absolute -inset-2 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-[2.5rem] blur-2xl opacity-40"></div>
                <div className="relative bg-white p-1 rounded-[2.5rem] shadow-3xl border border-white/10 overflow-hidden aspect-video">
                    <video
                        ref={videoRef}
                        src="/video-scroll.mp4"
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover rounded-[2rem]"
                    />
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Optimized Spacing between Hero and Featured */}
      <div className="h-10 bg-bg-light"></div>

      {/* Featured Properties Section */}
      <section className="py-24 bg-bg-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">Seleção Exclusiva</p>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">Imóveis em Destaque</h2>
            </div>
            <Link to="/properties">
              <Button variant="outline" className="text-primary font-bold text-xs py-4 px-8 border-primary/20 bg-white shadow-sm hover:bg-primary hover:text-white transition-all">
                VER TODAS AS OPÇÕES
              </Button>
            </Link>
          </div>

          <PropertyCarousel properties={featuredProperties} loading={loading} />
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-secondary/10 rounded-2xl transform group-hover:rotate-3 transition-transform duration-500"></div>
              <img 
                src="/team.png" 
                alt="Nossa Equipe" 
                className="rounded-2xl shadow-2xl w-full h-[550px] object-cover relative transition-transform duration-500 group-hover:-translate-y-2"
              />
              <div className="absolute -bottom-8 -right-8 bg-white p-6 rounded-2xl shadow-xl border border-secondary/20 max-w-xs">
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-secondary/10 p-2 rounded-lg">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="font-bold text-primary">Equipe Especializada</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <p className="text-secondary font-bold text-xs uppercase tracking-[0.3em] mb-4">Sua Marca Consultoria</p>
                <h2 className="text-4xl font-serif font-bold text-primary mb-6">Variedade e Soluções para Todos os Perfis.</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  Atuo com uma ampla variedade de tipos de imóveis preparados para atender ao seu perfil e necessidade real. 
                  Seja para morar ou investir, trabalho com transparência total para garantir que você faça sempre a melhor negociação.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <p className="text-3xl font-serif font-bold text-primary">+ de R$ 50M</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Em Vendas Realizadas</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-serif font-bold text-primary">100%</p>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Satisfação dos Clientes</p>
                </div>
              </div>

              <div className="pt-4">
                <a href="https://wa.me/5512912345678" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary text-secondary px-8 py-5 rounded-2xl font-bold flex items-center gap-3 shadow-2xl hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                    SOLICITAR CONSULTORIA
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full -translate-x-1/2 translate-y-1/2 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold mb-4">Destaques por Categoria</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Casas de Luxo', image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=600', count: '12 imóveis', link: '/properties?type=Casa' },
              { title: 'Apartamentos Premium', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600', count: '18 imóveis', link: '/properties?type=Apartamento' },
              { title: 'Terrenos em Condomínio', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600', count: '7 imóveis', link: '/properties?type=Terreno' }
            ].map((cat, i) => (
              <div key={i} className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer" onClick={() => navigate(cat.link)}>
                <img src={cat.image} alt={cat.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-80" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="text-secondary font-bold text-[10px] uppercase tracking-[0.2em] mb-2">{cat.count}</p>
                  <h3 className="text-2xl font-bold group-hover:text-secondary transition-colors text-white">{cat.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-secondary p-12 md:p-20 rounded-[3rem] text-center shadow-3xl flex flex-col items-center">
            <div className="p-4 bg-white/20 rounded-full mb-8">
              <TrendingUp className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary mb-8 max-w-3xl">
              Valorize seu Imóvel com a Estratégia Certa.
            </h2>
            <p className="text-primary/70 text-lg md:text-xl font-medium mb-12 max-w-2xl">
              Quer vender ou alugar seu imóvel com agilidade e valor justo? Deixe que cuidamos de tudo por você.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/5512912345678" target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-secondary px-12 py-6 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-2xl">
                  ANUNCIAR MEU IMÓVEL
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}