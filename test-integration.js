import axios from 'axios';

const API_URL = 'http://localhost:3001';

async function testIntegration() {
  console.log('🔍 Testando integração Backend-Frontend...\n');

  try {
    // 1. Verificar se backend está online
    console.log('1. Verificando backend...');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('✅ Backend online:', healthResponse.data.message);

    // 2. Listar produtos existentes
    console.log('\n2. Listando produtos...');
    const productsResponse = await axios.get(`${API_URL}/api/products`);
    const products = productsResponse.data.docs;
    console.log(`✅ Encontrados ${products.length} produtos:`);
    
    products.forEach((product, index) => {
      console.log(`   ${index + 1}. ${product.name} - R$${product.price}`);
    });

    // 3. Adicionar produto de teste
    console.log('\n3. Adicionando produto de teste...');
    const newProduct = {
      name: 'Perfume Golden Integration Test',
      description: 'Produto adicionado para testar integração',
      price: 299.90,
      category: 'Perfumes Masculinos',
      image: 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
      stock: 15,
      featured: true,
      outOfStock: false,
      available: true
    };

    const createResponse = await axios.post(`${API_URL}/api/products`, newProduct);
    console.log('✅ Produto adicionado:', createResponse.data.name);

    // 4. Verificar se produto foi adicionado
    console.log('\n4. Verificando produto adicionado...');
    const updatedProductsResponse = await axios.get(`${API_URL}/api/products`);
    const updatedProducts = updatedProductsResponse.data.docs;
    console.log(`✅ Total de produtos após adição: ${updatedProducts.length}`);

    const addedProduct = updatedProducts.find(p => p.name === newProduct.name);
    if (addedProduct) {
      console.log('✅ Produto encontrado na lista:', addedProduct.name);
    } else {
      console.log('❌ Produto não encontrado na lista');
    }

    // 5. Testar endpoint individual
    console.log('\n5. Testando endpoint individual...');
    const productResponse = await axios.get(`${API_URL}/api/products/${addedProduct.id}`);
    console.log('✅ Produto individual:', productResponse.data.name);

    console.log('\n🎉 Integração testada com sucesso!');
    console.log('\n📱 URLs para teste manual:');
    console.log(`   Backend: ${API_URL}/admin`);
    console.log(`   Frontend: http://localhost:5173`);
    console.log(`   API: ${API_URL}/api/products`);

  } catch (error) {
    console.error('❌ Erro na integração:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Solução: Inicie o backend com "npm run server"');
    }
  }
}

testIntegration();