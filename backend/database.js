import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

// Garantir que o diretório data existe
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
  fs.mkdirSync(path.join(process.cwd(), 'data'), { recursive: true });
}

// Carregar produtos do arquivo
const loadProducts = () => {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, 'utf8');
      return JSON.parse(data);
    } else {
      // Criar arquivo inicial com produtos padrão
      const initialProducts = [
        {
          id: '1',
          name: 'Perfume Teste Inicial',
          description: 'Produto inicial para demonstração',
          price: 199.90,
          category: 'Perfumes Masculinos',
          image: 'https://images.unsplash.com/photo-1523296848231-263a9c2a7a5a',
          stock: 10,
          featured: true,
          outOfStock: false,
          available: true,
          createdAt: new Date().toISOString()
        }
      ];
      saveProducts(initialProducts);
      return initialProducts;
    }
  } catch (error) {
    console.error('Erro ao carregar produtos:', error);
    return [];
  }
};

// Salvar produtos no arquivo
const saveProducts = (products) => {
  try {
    const data = JSON.stringify(products, null, 2);
    fs.writeFileSync(DATA_FILE, data, 'utf8');
    return true;
  } catch (error) {
    console.error('Erro ao salvar produtos:', error);
    return false;
  }
};

export { loadProducts, saveProducts };