/**
 * Utility to import products from CSV or XML files
 *
 * Usage:
 * - CSV: node utils/importProducts.js csv produtos.csv
 * - XML: node utils/importProducts.js xml produtos.xml
 */

import * as fs from 'fs';
import * as path from 'path';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
}

/**
 * Parse CSV file and convert to products array
 */
function parseCSV(filePath: string): Product[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  // Skip header
  const dataLines = lines.slice(1);
  const products: Product[] = dataLines.map(line => {
    // Simple CSV parser (handles basic cases)
    const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    return {
      id: values[0],
      name: values[1],
      description: values[2],
      price: parseFloat(values[3]),
      image: values[4],
      available: values[5].toLowerCase() === 'true',
      category: values[6]
    };
  });
  return products;
}

/**
 * Parse XML file and convert to products array
 */
function parseXML(filePath: string): Product[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const products: Product[] = [];

  // Simple XML parser using regex (for basic XML structure)
  const productMatches = content.matchAll(/<product>(.*?)<\/product>/gs);
  for (const match of productMatches) {
    const productXML = match[1];
    const getTagValue = (tag: string): string => {
      const regex = new RegExp(`<${tag}>(.*?)</${tag}>`, 's');
      const match = productXML.match(regex);
      return match ? match[1].trim() : '';
    };
    products.push({
      id: getTagValue('id'),
      name: getTagValue('name'),
      description: getTagValue('description'),
      price: parseFloat(getTagValue('price')),
      image: getTagValue('image'),
      available: getTagValue('available').toLowerCase() === 'true',
      category: getTagValue('category')
    });
  }
  return products;
}

/**
 * Generate products.json file
 */
function generateProductsJSON(products: Product[]): void {
  const output = {
    _comment: 'PERFUMARIA GOLDEN - CATÁLOGO DE PRODUTOS',
    _instructions: {
      como_adicionar_produto: 'Copie um produto existente e modifique os campos',
      campos_obrigatorios: ['id', 'name', 'description', 'price', 'image', 'available', 'category'],
      categorias_disponiveis: ['Perfumes', 'Cabelos', 'Unhas', 'Pele', 'Maquiagem'],
      formato_preco: 'Use ponto para decimais (ex: 199.90)',
      formato_imagem: 'URL completa da imagem (ex: https://...)',
      disponibilidade: 'true = disponível, false = indisponível'
    },
    products
  };
  const outputPath = path.join(__dirname, '..', 'data', 'products.json');
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✅ Arquivo gerado com sucesso: ${outputPath}`);
  console.log(`📦 Total de produtos importados: ${products.length}`);
}

/**
 * Main function
 */
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('❌ Uso: node importProducts.js [csv|xml] [arquivo]');
    console.error('Exemplo: node importProducts.js csv produtos.csv');
    process.exit(1);
  }
  const [format, filePath] = args;
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Arquivo não encontrado: ${filePath}`);
    process.exit(1);
  }
  try {
    let products: Product[];
    if (format.toLowerCase() === 'csv') {
      console.log('📄 Importando produtos do CSV...');
      products = parseCSV(filePath);
    } else if (format.toLowerCase() === 'xml') {
      console.log('📄 Importando produtos do XML...');
      products = parseXML(filePath);
    } else {
      console.error('❌ Formato inválido. Use "csv" ou "xml"');
      process.exit(1);
    }
    generateProductsJSON(products);
  } catch (error) {
    console.error('❌ Erro ao importar produtos:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}
export { parseCSV, parseXML, generateProductsJSON };