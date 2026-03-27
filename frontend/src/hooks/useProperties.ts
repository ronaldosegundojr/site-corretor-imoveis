import { useState, useEffect } from 'react';
import { Property } from '../types/Property';
import mockData from '../data/properties.json';

const API_URL = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';

interface UsePropertiesResult {
  properties: Property[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProperties(): UsePropertiesResult {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProperties = () => {
    try {
      setLoading(true);
      // Combine mock static data with localStorage data
      const staticProperties = mockData.properties as Property[];
      const storedPropertiesStr = localStorage.getItem('registered_properties');
      const storedProperties: Property[] = storedPropertiesStr ? JSON.parse(storedPropertiesStr) : [];
      
      // Ensure IDs are unique - local storage (registered) properties take precedence if same ID
      const allProperties = [...storedProperties];
      staticProperties.forEach(staticProp => {
        if (!allProperties.find(p => p.id === staticProp.id)) {
          allProperties.push(staticProp);
        }
      });

      setProperties(allProperties);
      setError(null);
    } catch (err) {
      console.error('Erro ao carregar propriedades:', err);
      setProperties(mockData.properties as Property[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProperties();
  }, []);

  return {
    properties,
    loading,
    error,
    refetch: loadProperties,
  };
}
