import { useEffect, useState } from 'react';
import { Search, Filter, Home as HomeIcon, Building2, Map as MapIcon } from 'lucide-react';
import { PropertyCard } from '../components/PropertyCard';
import { useLocation } from 'react-router-dom';
import { useProperties } from '../hooks/useProperties';

export function Properties() {
  const location = useLocation();
  const { properties, loading, error } = useProperties();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('Todos');
  const [selectedStatus, setSelectedStatus] = useState<string>('Todos');
  const [selectedBedrooms, setSelectedBedrooms] = useState<number>(0);
  const [selectedSuites, setSelectedSuites] = useState<number>(0);

  // Get search query from URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get('location');
    const typeQuery = params.get('type');
    const statusQuery = params.get('status');
    const bedroomsQuery = params.get('bedrooms');
    const suitesQuery = params.get('suites');

    if (searchQuery) setSearchTerm(searchQuery);
    if (typeQuery) setSelectedType(typeQuery);
    if (statusQuery) setSelectedStatus(statusQuery);
    if (bedroomsQuery) setSelectedBedrooms(parseInt(bedroomsQuery));
    if (suitesQuery) setSelectedSuites(parseInt(suitesQuery));
  }, [location.search]);

  const propertyTypes = [
    { name: 'Todos', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'Casa', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'Apartamento', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Terreno', icon: <MapIcon className="w-4 h-4" /> },
    { name: 'Comercial', icon: <Building2 className="w-4 h-4" /> }
  ];

  const filteredProperties = properties.filter(property => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      property.title.toLowerCase().includes(searchLower) || 
      property.description.toLowerCase().includes(searchLower) || 
      property.location.neighborhood.toLowerCase().includes(searchLower) ||
      property.code?.toLowerCase().includes(searchLower);
    
    const matchesType = selectedType === 'Todos' || property.type === selectedType;
    const matchesStatus = selectedStatus === 'Todos' || property.status === selectedStatus;
    const matchesBedrooms = property.features.bedrooms >= selectedBedrooms;
    const matchesSuites = (property.features.suites || 0) >= selectedSuites;

    return matchesSearch && matchesType && matchesStatus && matchesBedrooms && matchesSuites;
  });

  if (error) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-red-100">
          <div className="bg-red-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Filter className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-bold text-primary mb-2">Erro ao carregar catálogo</h2>
          <p className="text-slate-500 mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="w-full bg-primary text-secondary font-bold py-3 rounded-xl hover:bg-secondary hover:text-primary transition-all">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Search Header */}
      <section className="bg-primary pt-32 pb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
              Encontre Sua <span className="text-secondary italic">Exclusividade</span>.
            </h1>
            <p className="text-slate-300 font-medium text-lg">
              Explore nossa seleção rigorosa de imóveis disponíveis para venda e locação.
            </p>
          </div>

          <div className="max-w-2xl mx-auto relative group">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-secondary w-6 h-6 stroke-[2.5]" />
            <input 
              type="text" 
              placeholder="Busque por código, bairro ou característica..." 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} 
              className="w-full pl-16 pr-6 py-5 bg-white shadow-2xl rounded-2xl text-primary font-bold focus:outline-none focus:ring-4 focus:ring-secondary/20 transition-all placeholder:text-slate-300 placeholder:font-normal" 
            />
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-10 relative z-20">
        <div className="bg-white p-4 rounded-2xl shadow-xl mb-12 border border-slate-100 flex flex-wrap justify-center gap-3">
          {propertyTypes.map(type => (
            <button 
              key={type.name} 
              onClick={() => setSelectedType(type.name)} 
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 ${selectedType === type.name ? 'bg-primary text-secondary shadow-lg shadow-primary/20 scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-primary'}`}
            >
              {type.icon}
              {type.name}
            </button>
          ))}
        </div>

        {/* Results Info */}
        {(searchTerm || selectedType !== 'Todos') && (
          <div className="mb-8 flex items-center justify-between border-b border-slate-200 pb-4">
            <p className="text-slate-500 font-medium">
              Mostrando <span className="text-primary font-bold">{filteredProperties.length}</span> resultados
              {searchTerm && <span> para "<span className="text-secondary font-bold">{searchTerm}</span>"</span>}
              {selectedType !== 'Todos' && <span> em <span className="text-secondary font-bold">{selectedType}</span>s</span>}
            </p>
            <button onClick={() => { setSearchTerm(''); setSelectedType('Todos'); setSelectedStatus('Todos'); setSelectedBedrooms(0); setSelectedSuites(0); }} className="text-secondary font-bold text-xs uppercase tracking-widest hover:text-primary transition-colors">
              Limpar Filtros
            </button>
          </div>
        )}

        {/* Properties Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 py-12">
            {[1,2,3,4,5,6].map(i => (
              <div key={i} className="bg-white rounded-2xl h-[450px] animate-pulse shadow-sm" />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 py-12">
            {filteredProperties.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-slate-100">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-10 h-10 text-slate-200" />
            </div>
            <h3 className="text-2xl font-serif font-bold text-primary mb-2">Nenhum imóvel encontrado</h3>
            <p className="text-slate-400 font-medium">Tente ajustar seus filtros ou termos de pesquisa.</p>
          </div>
        )}
      </div>
    </div>
  );
}
