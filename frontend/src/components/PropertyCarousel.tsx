import { Property } from '../types/Property';
import { PropertyCard } from './PropertyCard';

interface PropertyCarouselProps {
  properties: Property[];
  loading?: boolean;
}

export function PropertyCarousel({ properties, loading }: PropertyCarouselProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((n) => (
          <div key={n} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-slate-200" />
            <div className="p-5 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-1/4" />
              <div className="h-6 bg-slate-200 rounded w-3/4" />
              <div className="grid grid-cols-4 gap-2 pt-4">
                {[1, 2, 3, 4].map((i) => <div key={i} className="h-8 bg-slate-100 rounded" />)}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-2xl border-2 border-dashed border-slate-100">
        <p className="text-slate-400 font-medium tracking-wide">Nenhum imóvel encontrado.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {properties.map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
