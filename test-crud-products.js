import http from 'http';

const API_BASE = 'http://localhost:3001/api';

// Teste completo de CRUD de produtos
const testProductCRUD = async () => {
  console.log('🧪 Testando CRUD de Produtos...\n');
  
  // 1. CREATE - Criar produto
  console.log('1️⃣ TESTE CREATE');
  const newProduct = {
    name: 'Produto CRUD Teste',
    description: 'Produto criado para teste de CRUD',
    price: 149.90,
    category: 'Cuidados com a Pele',
    image: 'https://images.unsplash.com/photo-1556228852-80a5f1b9c37d',
    stock: 25,
    featured: false,
    outOfStock: false,
    available: true
  };
  
  try {
    const createdProduct = await makeRequest('POST', '/products', newProduct);
    console.log('✅ Produto criado:', createdProduct.name, '(ID:', createdProduct.id, ')');
    
    const productId = createdProduct.id;
    
    // 2. READ - Ler produto específico
    console.log('\n2️⃣ TESTE READ (by ID)');
    const readProduct = await makeRequest('GET', `/products/${productId}`);
    console.log('✅ Produto lido:', readProduct.name);
    
    // 3. UPDATE - Atualizar produto
    console.log('\n3️⃣ TESTE UPDATE');
    const updateData = {
      name: 'Produto CRUD Teste - ATUALIZADO',
      price: 179.90,
      stock: 30
    };
    
    const updatedProduct = await makeRequest('PUT', `/products/${productId}`, updateData);
    console.log('✅ Produto atualizado:', updatedProduct.name, '(Preço: R$', updatedProduct.price, ')');
    
    // 4. DELETE - Deletar produto
    console.log('\n4️⃣ TESTE DELETE');
    await makeRequest('DELETE', `/products/${productId}`);
    console.log('✅ Produto deletado (ID:', productId, ')');
    
    // 5. Verificar se produto foi realmente deletado
    console.log('\n5️⃣ VERIFICAÇÃO DE DELETE');
    try {
      await makeRequest('GET', `/products/${productId}`);
      console.log('❌ ERRO: Produto ainda existe após delete!');
    } catch (error) {
      console.log('✅ Produto confirmado como deletado');
    }
    
    console.log('\n🎉 Todos os testes CRUD de produtos passaram!');
    
  } catch (error) {
    console.log('❌ Erro no teste CRUD:', error.message);
  }
};

// Função auxiliar para fazer requisições HTTP
const makeRequest = (method, path, data = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: `/api${path}`,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    if (data) {
      const postData = JSON.stringify(data);
      options.headers['Content-Length'] = Buffer.byteLength(postData);
    }
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = responseData ? JSON.parse(responseData) : {};
            resolve(parsedData);
          } catch (err) {
            reject(new Error('Erro ao parsear resposta'));
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${responseData}`));
        }
      });
    });
    
    req.on('error', (err) => {
      reject(err);
    });
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
};

// Executar testes
testProductCRUD();