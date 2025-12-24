import http from 'http';

// Testar criação de produto
const newProduct = {
  name: 'Perfume Teste API',
  description: 'Perfume criado via teste de API',
  price: 199.90,
  category: 'Perfumes Masculinos',
  image: 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
  stock: 10,
  featured: true,
  outOfStock: false,
  available: true
};

console.log('Testando criação de produto...');

const postData = JSON.stringify(newProduct);

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
  console.log(`Status: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Resposta:', data);
    
    // Verificar produtos após criação
    setTimeout(() => {
      console.log('\nVerificando produtos após criação...');
      http.get('http://localhost:3001/api/products', (res) => {
        let productsData = '';
        res.on('data', (chunk) => {
          productsData += chunk;
        });
        res.on('end', () => {
          console.log('Produtos atualizados:', productsData);
        });
      });
    }, 1000);
  });
});

req.on('error', (err) => {
  console.error('Erro na requisição:', err.message);
});

req.write(postData);
req.end();