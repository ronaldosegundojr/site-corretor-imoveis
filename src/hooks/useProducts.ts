import { useState, useEffect } from 'react';
import { Product } from '../types/Product';

const API_URL = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  importProducts: (file: File) => Promise<Product[]>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log('🔍 Buscando produtos da API:', `${API_URL}/api/products`);
      
      const response = await fetch(`${API_URL}/api/products`);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ Produtos recebidos da API:', data.docs.length);
      console.log('📦 Detalhes dos produtos:', data.docs.map(p => ({ nome: p.name, disponivel: p.available })));
      
      // Transform API data to match our Product interface
      const transformedProducts: Product[] = data.docs.map((product: any) => {
        const transformed = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image || '',
          available: product.available !== undefined ? product.available : (!product.outOfStock && (product.stock > 0 || product.stock === undefined)),
          outOfStock: product.outOfStock || false,
          showWhenOutOfStock: product.showWhenOutOfStock || false,
          category: product.category,
          bestseller: product.featured || product.bestseller || false,
        };
        
        console.log(`🔍 Produto "${product.name}":`, {
          'available API': product.available,
          'available transformado': transformed.available,
          'outOfStock': product.outOfStock,
          'stock': product.stock
        });
        
        return transformed;
      });
      
      console.log('🔄 Produtos transformados:', transformedProducts.length);
      setProducts(transformedProducts);
      setError(null);
    } catch (err) {
      console.error('❌ Erro ao buscar produtos da API:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
      
      // NÃO usar mais fallback - forçar uso da API
      console.log('⚠️ API não disponível - não usando fallback JSON');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const importProducts = async (file: File): Promise<Product[]> => {
    try {
      const text = await file.text();
      const extension = file.name.split('.').pop()?.toLowerCase();

      let newProducts: Product[] = [];

      if (extension === 'json') {
        const jsonData = JSON.parse(text);
        newProducts = jsonData.products || jsonData;
      } else if (extension === 'xml') {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, 'text/xml');
        const products = xmlDoc.querySelectorAll('product');
        
        newProducts = Array.from(products).map((product, index) => ({
          id: product.querySelector('id')?.textContent || (index + 1).toString(),
          name: product.querySelector('name')?.textContent || '',
          description: product.querySelector('description')?.textContent || '',
          price: parseFloat(product.querySelector('price')?.textContent || '0'),
          image: product.querySelector('image')?.textContent || '',
          available: product.querySelector('available')?.textContent === 'true',
          category: product.querySelector('category')?.textContent || '',
          bestseller: product.querySelector('bestseller')?.textContent === 'true'
        }));
      }

      // Upload to API if available
      try {
        for (const product of newProducts) {
          await fetch(`${API_URL}/api/products`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
          });
        }
        await fetchProducts();
      } catch (uploadErr) {
        console.warn('Failed to upload to API, using local data');
        setProducts(newProducts);
      }

      return newProducts;
    } catch (error) {
      console.error('Error importing products:', error);
      throw error;
    }
  };

  return {
    products,
    loading,
    error,
    refetch: fetchProducts,
    importProducts
  };
}