import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Move, Car, MessageCircle } from 'lucide-react';
import { Property } from '../types/Property';
import { Button } from './Button';
import { getPropertyLink } from '../utils/propertyUtils';

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 group transition-all hover:shadow-xl hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Link to={getPropertyLink(property.id, property.title, property.status)}>
          <img
            src={property.images[0] || 'https://via.placeholder.com/400x300?text=Imóvel+Sem+Foto'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </Link>
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary/90 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
            {property.status}
          </span>
          {property.featured && (
            <span className="bg-secondary text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Destaque
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <p className="text-secondary font-bold text-lg drop-shadow-md">
            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price)}
          </p>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start gap-2 mb-2 text-slate-400">
          <MapPin className="w-3.5 h-3.5 shrink-0 mt-0.5" />
          <p className="text-xs font-medium uppercase tracking-wide truncate">
            {property.location.neighborhood}, {property.location.city}
          </p>
        </div>

        <Link to={getPropertyLink(property.id, property.title, property.status)}>
          <h3 className="text-primary font-serif font-bold text-lg mb-4 line-clamp-1 hover:text-secondary transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="grid grid-cols-4 gap-2 py-4 border-y border-slate-50 mb-4">
          <div className="flex flex-col items-center gap-1">
            <Move className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">{property.features.area}m²</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bed className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">{property.features.bedrooms} Quartos</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Bath className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">{property.features.bathrooms} Banheiros</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Car className="w-4 h-4 text-slate-400" />
            <span className="text-[10px] text-slate-500 font-bold uppercase">{property.features.garages} Vagas</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Link to={getPropertyLink(property.id, property.title, property.status)} className="flex-1">
            <Button variant="outline" className="w-full text-xs font-bold py-2 border-slate-200 hover:bg-slate-50 hover:text-primary">
              VER DETALHES
            </Button>
          </Link>
          <a 
            href={`https://wa.me/5512912345678?text=Olá!%20Tenho%20interesse%20no%20imóvel:%20${property.title}%20(Cód:%20${property.code})`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
          >
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
