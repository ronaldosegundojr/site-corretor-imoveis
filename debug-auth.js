import http from 'http';

console.log('🔍 Testando fluxo completo de autenticação...\n');

// Passo 1: Login
const loginData = {
  email: 'admin@perfumaria.com',
  password: 'admin123'
};

const loginPostData = JSON.stringify(loginData);

console.log('1️⃣ Fazendo login...');

const loginOptions = {
  hostname: 'localhost',
  port: 3001,
  path: '/api/users/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(loginPostData)
  }
};

const loginReq = http.request(loginOptions, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    if (res.statusCode === 200) {
      const loginResponse = JSON.parse(data);
      const token = loginResponse.token;
      console.log('✅ Login bem-sucedido!');
      console.log('Token:', token.substring(0, 50) + '...');
      
      // Passo 2: Testar criação de produto com o token
      console.log('\n2️⃣ Testando criação de produto...');
      
      const newProduct = {
        name: 'Produto Teste Debug',
        description: 'Testando criação com token valido',
        price: 199.90,
        category: 'Perfumes Masculinos',
        image: 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
        stock: 10,
        featured: true,
        outOfStock: false,
        available: true
      };

      const productData = JSON.stringify(newProduct);

      const productOptions = {
        hostname: 'localhost',
        port: 3001,
        path: '/api/products',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token,
          'Content-Length': Buffer.byteLength(productData)
        }
      };

      console.log('Enviando requisição com Authorization:', 'Bearer ' + token.substring(0, 50) + '...');

      const productReq = http.request(productOptions, (res) => {
        let productResponse = '';
        res.on('data', chunk => productResponse += chunk);
        res.on('end', () => {
          console.log('Status criação:', res.statusCode);
          console.log('Response criação:', productResponse);
          
          if (res.statusCode === 201) {
            console.log('\n🎉 Tudo funcionando! O problema está no frontend.');
          } else {
            console.log('\n❌ Problema no backend ou no token.');
          }
        });
      });

      productReq.on('error', (err) => {
        console.log('Erro requisição produto:', err.message);
      });

      productReq.write(productData);
      productReq.end();
      
    } else {
      console.log('❌ Login falhou:', res.statusCode, data);
    }
  });
});

loginReq.on('error', (err) => {
  console.log('Erro login:', err.message);
});

loginReq.write(loginPostData);
loginReq.end();