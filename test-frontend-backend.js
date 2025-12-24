import http from 'http';

console.log('Testando integração Frontend-Backend...\n');

// Testar se backend está respondendo
const testBackend = () => {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3001/api/products', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const products = JSON.parse(data);
          console.log('✅ Backend respondendo com', products.totalDocs, 'produtos');
          resolve(products);
        } catch (err) {
          console.log('❌ Erro ao parsear resposta do backend');
          reject(err);
        }
      });
    }).on('error', err => {
      console.log('❌ Backend não está respondendo');
      reject(err);
    });
  });
};

// Testar se frontend está rodando
const testFrontend = () => {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:5173', (res) => {
      console.log('✅ Frontend respondendo em http://localhost:5173');
      resolve(true);
    }).on('error', err => {
      console.log('❌ Frontend não está respondendo');
      reject(err);
    });
  });
};

// Executar testes
const runTests = async () => {
  try {
    console.log('1. Testando backend...');
    await testBackend();
    
    console.log('\n2. Testando frontend...');
    await testFrontend();
    
    console.log('\n🎉 Integração funcionando!');
    console.log('📊 Backend: http://localhost:3001');
    console.log('🛍️ Frontend: http://localhost:5173');
    console.log('🔗 Admin: http://localhost:3001/admin');
    
  } catch (error) {
    console.log('\n❌ Erro nos testes:', error.message);
  }
};

runTests();