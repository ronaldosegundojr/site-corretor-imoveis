import { loadProducts, saveProducts } from './database.js';

// Produtos realistas para MVP da perfumaria
const mvpProducts = [
  // PERFUMES MASCULINOS
  {
    name: "Acqua di Giò pour Homme",
    description: "Fragrância marinha fresca com notas de bergamota, neroli e cedro. Perfeito para o homem moderno e sofisticado.",
    price: 389.90,
    category: "Perfumes Masculinos",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    stock: 15,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Giorgio Armani",
    tags: ["marinho", "fresco", "citrico"]
  },
  {
    name: "Bleu de Chanel",
    description: "Elegância atemporal com notas de grapefruit, incenso e gengibre. Uma fragrância única e inesquecível.",
    price: 599.90,
    category: "Perfumes Masculinos",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&q=80",
    stock: 12,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Chanel",
    tags: ["madeira", "ambar", "sofisticado"]
  },
  {
    name: "Sauvage Elixir",
    description: "Intensidade extrema com notas frescas de lavanda e um toque de baunilha. Poder e sedução em uma fragrância.",
    price: 450.00,
    category: "Perfumes Masculinos",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&q=80",
    stock: 8,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Dior",
    tags: ["lavanda", "baunilha", "intenso"]
  },
  
  // PERFUMES FEMININOS
  {
    name: "Chanel N°5",
    description: "O ícone da perfumaria. Notas de jasmim, rosa e sândalo em uma composição eterna e sofisticada.",
    price: 750.00,
    category: "Perfumes Femininos",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&q=80",
    stock: 10,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Chanel",
    tags: ["floral", "classico", "elegante"]
  },
  {
    name: "La Vie Est Belle",
    description: "A felicidade em uma fragrância. Notas de pêra, blackcurrant e jasmim com um toque de baunilha.",
    price: 320.00,
    category: "Perfumes Femininos",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068ec31?w=400&q=80",
    stock: 20,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Lancôme",
    tags: ["floral", "doce", "feliz"]
  },
  {
    name: "Good Girl",
    description: "Audácia e elegância em perfeita harmonia. Notas de amora, jasmim e baunilha com um toque de madeira.",
    price: 410.00,
    category: "Perfumes Femininos",
    image: "https://images.unsplash.com/photo-1583241800698-c5e4d9c9e8d7?w=400&q=80",
    stock: 18,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Carolina Herrera",
    tags: ["floral", "doce", "sedutor"]
  },

  // SHAMPOOS
  {
    name: "Shampoo Absolut Repair Gold",
    description: "Reparação intensa para cabelos danificados. Fórmula com quinoa dourada e proteínas para reconstrução completa.",
    price: 89.90,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1571875257727-256c39da42af?w=400&q=80",
    stock: 25,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "L'Oréal Professionnel",
    tags: ["reparador", "proteínas", "danificados"]
  },
  {
    name: "Shampoo Nutritive N°8",
    description: "Nutrição profunda para cabelos muito secos. Manteiga de karité e óleo de murumuru para maciez extrema.",
    price: 95.00,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1526947425960-9a44d19e2c4f?w=400&q=80",
    stock: 30,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Kérastase",
    tags: ["nutritivo", "seco", "maciez"]
  },
  {
    name: "Shampoo Silver",
    description: "Controle de amarelado para cabelos loiros e grisalhos. Pigmentos roxos que neutralizam tons indesejados.",
    price: 75.00,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    stock: 22,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Wella Professionals",
    tags: ["loiro", "anti-amarelado", "pigmentado"]
  },

  // CONDICIONADORES
  {
    name: "Condicionador Absolut Repair Gold",
    description: "Completa o tratamento reparador. Selagem das cutículas e reconstrução interna dos fios danificados.",
    price: 89.90,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&q=80",
    stock: 20,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "L'Oréal Professionnel",
    tags: ["reparador", "selagem", "reconstrutor"]
  },
  {
    name: "Condicionador Nutritive N°8",
    description: "Nutrição prolongada e brilho intenso. Fórmula leve que não pesa nos cabelos muito secos.",
    price: 95.00,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&q=80",
    stock: 18,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Kérastase",
    tags: ["nutritivo", "brilho", "leve"]
  },

  // TINTAS
  {
    name: "Tinta Koleston Perfect 6.0",
    description: "Cor loiro claro natural com amônia zero. Fórmula com lipogel para resultados vibrantes e duradouros.",
    price: 45.00,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    stock: 15,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Wella Professionals",
    tags: ["loiro", "amonia zero", "duradouro"]
  },
  {
    name: "Tinta INOA 4.0",
    description: "Castanho médio com tecnologia ODY S². Cor intensa e brilho superior com respeito à fibra capilar.",
    price: 52.00,
    category: "Cabelos",
    image: "https://images.unsplash.com/photo-1556228852-80a5f1b9c37d?w=400&q=80",
    stock: 12,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "L'Oréal Professionnel",
    tags: ["castanho", "sem amônia", "brilho"]
  },

  // MAQUIAGEM
  {
    name: "Base HD Liquid Foundation",
    description: "Cobertura alta e acabamento aveludado. Fórmula 24h com FPS 30 e resistência à água.",
    price: 125.00,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    stock: 30,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "Make Up For Ever",
    tags: ["base", "alta cobertura", "longa duração"]
  },
  {
    name: "Batom Rouge Signature",
    description: "Cor intensa e hidratação por 8 horas. Fórmula com óleo de jojoba e vitamina E para lábios macios.",
    price: 85.00,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1586495048133-b9c26b349f07?w=400&q=80",
    stock: 40,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "L'Oréal Paris",
    tags: ["batom", "hidratante", "longa duração"]
  },
  {
    name: "Paleta de Sombras Nude Stories",
    description: "12 tons nude matte e metálicos. Fórmula ultra pigmentada com efeito blur de poros.",
    price: 165.00,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    stock: 25,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Huda Beauty",
    tags: ["sombras", "nude", "pigmentado"]
  },
  {
    name: "Máscara de Cílios Volume Express",
    description: "Volume instantâneo e cílios definidos. Pincela curvado que capta até os menores cílios.",
    price: 45.00,
    category: "Maquiagem",
    image: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&q=80",
    stock: 35,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Maybelline New York",
    tags: ["cílios", "volume", "instantâneo"]
  },

  // PRODUTOS DE BELEZA FEMININA
  {
    name: "Sérum Vitamina C 20%",
    description: "Iluminação imediata e ação antioxidante. Ácido hialurônico e vitamina C pura para pele radiante.",
    price: 195.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    stock: 20,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "The Ordinary",
    tags: ["sérum", "vitamina C", "antioxidante"]
  },
  {
    name: "Creme Anti-Idade Retinol 0.5%",
    description: "Redução de rugas e linhas finas. Retinol estabilizado com poder de renovação celular.",
    price: 220.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    stock: 15,
    featured: true,
    outOfStock: false,
    available: true,
    brand: "SkinCeuticals",
    tags: ["anti-idade", "retinol", "rugos"]
  },
  {
    name: "Água Micellar Bioderma",
    description: "Limpeza suave sem enxágüe. Remove maquiagem e impurezas respeitando o pH da pele.",
    price: 85.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1556228852-80a5f1b9c37d?w=400&q=80",
    stock: 50,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Bioderma",
    tags: ["limpeza", "micelar", "sensível"]
  },
  {
    name: "Hidratante Facial FPS 60",
    description: "Proteção solar ampla e hidratação 24h. Textura leve oil-free com niacinamida.",
    price: 120.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    stock: 25,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "La Roche-Posay",
    tags: ["protetor solar", "hidratante", "FPS 60"]
  },
  {
    name: "Óleo Corporal Amêndoas Doce",
    description: "Hidratação profunda e maciez sedosa. Absorção rápida com vitamina E e óleo de argan.",
    price: 65.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&q=80",
    stock: 30,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Natura",
    tags: ["óleo", "hidratante", "corpo"]
  },
  {
    name: "Esfoliante Facial Enzimático",
    description: "Renovação suave sem microesferas. Enzimas de papaia e abacaxi para pele luminosa.",
    price: 95.00,
    category: "Cuidados com a Pele",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    stock: 22,
    featured: false,
    outOfStock: false,
    available: true,
    brand: "Kiehl's",
    tags: ["esfoliante", "enzimático", "renovação"]
  }
];

// Adicionar ID e timestamp em todos os produtos
const productsWithIds = mvpProducts.map((product, index) => ({
  ...product,
  id: (Date.now() + index).toString(),
  createdAt: new Date().toISOString()
}));

// Salvar no banco de dados
console.log(`🚀 Criando MVP com ${productsWithIds.length} produtos...`);
console.log('\n📦 Distribuição por categoria:');
const categories = {};
productsWithIds.forEach(product => {
  categories[product.category] = (categories[product.category] || 0) + 1;
});

Object.entries(categories).forEach(([category, count]) => {
  console.log(`   ${category}: ${count} produtos`);
});

console.log('\n💾 Salvando no banco de dados...');
saveProducts(productsWithIds);

console.log('\n✅ MVP criado com sucesso!');
console.log('\n🌟 Produtos em destaque:');
productsWithIds.filter(p => p.featured).forEach((product, i) => {
  console.log(`   ${i + 1}. ${product.name} - R$ ${product.price.toFixed(2)} (${product.category})`);
});

console.log('\n📊 Resumo MVP:');
console.log(`   • Total de produtos: ${productsWithIds.length}`);
console.log(`   • Categorias: ${Object.keys(categories).length}`);
console.log(`   • Produtos em destaque: ${productsWithIds.filter(p => p.featured).length}`);
console.log(`   • Valor total em estoque: R$ ${productsWithIds.reduce((sum, p) => sum + (p.price * p.stock), 0).toFixed(2)}`);