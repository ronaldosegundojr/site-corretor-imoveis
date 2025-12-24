// Teste para verificar se o frontend está consumindo a API
console.log('🔍 Verificando configuração do frontend...');

// Verificar variável de ambiente
const apiUrl = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';
console.log('📡 API URL:', apiUrl);

// Testar conexão com a API
fetch(`${apiUrl}/api/products`)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('✅ API respondendo com sucesso!');
    console.log('📦 Produtos encontrados:', data.docs.length);
    data.docs.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - R$${product.price}`);
    });
  })
  .catch(error => {
    console.error('❌ Erro ao conectar com API:', error.message);
    console.log('💡 Verifique se o backend está rodando em:', apiUrl);
  });

// Verificar se está usando fallback
console.log('⚠️ Se os produtos não mudarem, pode estar usando fallback JSON local');