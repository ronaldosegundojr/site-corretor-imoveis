export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  type: 'Casa' | 'Apartamento' | 'Terreno' | 'Comercial';
  status: 'Venda' | 'Aluguel' | 'Vendido' | 'Novo';
  location: {
    city: string;
    neighborhood: string;
    address?: string;
  };
  features: {
    bedrooms: number;
    suites: number;
    bathrooms: number;
    garages: number;
    area: number; // in m2
  };
  featured: boolean;
  code: string;
  brokerId?: string;
}

export interface PropertyData {
  properties: Property[];
}
