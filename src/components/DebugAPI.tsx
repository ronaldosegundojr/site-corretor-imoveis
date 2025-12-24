import { useState, useEffect } from 'react';

// Componente de teste para debug
export function DebugAPI() {
  const [apiStatus, setApiStatus] = useState('Verificando...');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testAPI = async () => {
      try {
        const apiUrl = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';
        console.log('🔍 Testando API em:', apiUrl);
        
        const response = await fetch(`${apiUrl}/api/products`);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('✅ API funcionando! Produtos:', data.docs.length);
        
        setApiStatus('✅ API Conectada');
        setProducts(data.docs);
        setError(null);
      } catch (err) {
        console.error('❌ Erro na API:', err);
        setApiStatus('❌ API Falhou');
        setError(err.message);
        setProducts([]);
      }
    };

    testAPI();
  }, []);

  return (
    <div className="fixed top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-golden-primary z-50 max-w-sm">
      <h3 className="font-bold text-golden-dark mb-2">🔍 Debug API</h3>
      <p className="text-sm mb-2">Status: {apiStatus}</p>
      {error && <p className="text-xs text-red-600 mb-2">Erro: {error}</p>}
      <p className="text-xs text-golden-brown">Produtos: {products.length}</p>
      <div className="text-xs text-gray-500 mt-2">
        <p>URL: {import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001'}</p>
      </div>
    </div>
  );
}