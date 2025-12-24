import http from 'http';

console.log('Testando autenticação e usuários...\n');

// Testar login
const testLogin = async () => {
  console.log('1️⃣ TESTE DE LOGIN');
  
  const loginData = {
    email: 'admin@perfumaria.com',
    password: 'admin123'
  };
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(loginData);
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          console.log('✅ Login bem-sucedido!');
          console.log('   User:', response.user.email);
          console.log('   Role:', response.user.role);
          console.log('   Token:', response.token.substring(0, 50) + '...');
          resolve(response.token);
        } else {
          console.log('❌ Falha no login:', res.statusCode, data);
          reject(new Error('Login failed'));
        }
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ Erro na requisição:', err.message);
      reject(err);
    });
    
    req.write(postData);
    req.end();
  });
};

// Testar acesso protegido sem token
const testProtectedAccess = async () => {
  console.log('\n2️⃣ TESTE DE ACESSO PROTEGIDO (SEM TOKEN)');
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: 'Produto Não Autorizado',
      price: 99.90,
      category: 'Teste'
    });
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 401) {
          console.log('✅ Acesso negado corretamente (sem token)');
          resolve();
        } else {
          console.log('❌ Deveria ser 401, mas foi:', res.statusCode);
          reject(new Error('Should be 401'));
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

// Testar acesso protegido com token
const testAuthorizedAccess = async (token) => {
  console.log('\n3️⃣ TESTE DE ACESSO PROTEGIDO (COM TOKEN)');
  
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      name: 'Produto Autorizado',
      description: 'Criado com token válido',
      price: 149.90,
      category: 'Perfumes Teste',
      stock: 5,
      featured: false,
      outOfStock: false,
      available: true
    });
    
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/products',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Length': Buffer.byteLength(postData)
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 201) {
          const product = JSON.parse(data);
          console.log('✅ Produto criado com autorização!');
          console.log('   Nome:', product.name);
          console.log('   ID:', product.id);
          resolve(product);
        } else {
          console.log('❌ Falha:', res.statusCode, data);
          reject(new Error('Failed with token'));
        }
      });
    });
    
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
};

// Testar endpoint /me
const testMeEndpoint = async (token) => {
  console.log('\n4️⃣ TESTE ENDPOINT /ME');
  
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: '/api/users/me',
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const user = JSON.parse(data);
          console.log('✅ Endpoint /me funcionando!');
          console.log('   User:', user.email);
          console.log('   Role:', user.role);
          resolve();
        } else {
          console.log('❌ Falha:', res.statusCode, data);
          reject(new Error('/me failed'));
        }
      });
    });
    
    req.on('error', reject);
    req.end();
  });
};

// Executar todos os testes
const runAuthTests = async () => {
  try {
    console.log('🧪 Iniciando testes de autenticação...\n');
    
    const token = await testLogin();
    await testProtectedAccess();
    const product = await testAuthorizedAccess(token);
    await testMeEndpoint(token);
    
    console.log('\n🎉 Todos os testes de autenticação passaram!');
    console.log('\n📋 Resumo:');
    console.log('   ✅ Login funcionando');
    console.log('   ✅ Proteção sem token');
    console.log('   ✅ Acesso com token');
    console.log('   ✅ Endpoint /me');
    console.log('\n🔗 Acesse o painel admin: http://localhost:3001/admin');
    console.log('👤 Use: admin@perfumaria.com / admin123');
    
  } catch (error) {
    console.log('\n❌ Erro nos testes:', error.message);
  }
};

// Aguardar o servidor iniciar
setTimeout(runAuthTests, 3000);