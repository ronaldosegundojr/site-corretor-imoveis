import http from 'http';

console.log('🔍 Diagnosticando problema de sincronização...\n');

// 1. Testar se frontend está buscando produtos
setTimeout(() => {
  http.get('http://localhost:5173', (res) => {
    console.log('Status frontend:', res.statusCode);
    if (res.statusCode === 200) {
      console.log('✅ Frontend está rodando');
    } else {
      console.log('❌ Frontend não está respondendo');
    }
  }).on('error', err => console.log('❌ Erro frontend:', err.message));
}, 1000);

// 2. Testar API do frontend diretamente
setTimeout(() => {
  console.log('\n📊 Testando API do frontend...');
  const fetch = require('node-fetch');
  
  fetch('http://localhost:5173/api/products')
    .then(res => res.json())
    .then(data => {
      console.log('Produtos retornados ao frontend:', data.docs?.length || 0);
      data.docs?.forEach((product, i) => {
        if (i < 5) { // Mostrar apenas os 5 primeiros
          console.log(`  ${i + 1}. ${product.name} - ${product.available ? 'Disponível' : 'Indisponível'}`);
        }
      });
    })
    .catch(err => {
      console.log('❌ Erro ao buscar produtos no frontend:', err.message);
    });
}, 2000);

// 3. Verificar se há problema com categorias
setTimeout(() => {
  console.log('\n📦 Verificando categorias...');
  fetch('http://localhost:3001/api/categories')
    .then(res => res.json())
    .then(data => {
      console.log('Categorias disponíveis:', data.totalDocs);
      data.docs?.forEach((cat, i) => {
        console.log(`  ${i + 1}. ${cat.name}`);
      });
    })
    .catch(err => {
      console.log('❌ Erro ao buscar categorias:', err.message);
    });
}, 3000);

// 4. Diagnóstico final
setTimeout(() => {
  console.log('\n🎯 Possíveis causas do problema:');
  console.log('1️⃣ Verifique no console do navegador se há erros');
  console.log('2️⃣ Verifique na aba Network se as requisições estão sendo feitas');
  console.log('3️⃣ Limpe o cache do navegador (Ctrl+F5)');
  console.log('4️⃣ Verifique se o token de autenticação está válido');
  console.log('\n🌟 Acesse http://localhost:5173 e verifique manualmente');
}, 4000);