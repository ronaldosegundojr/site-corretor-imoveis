import React, { useEffect, useState, createElement } from 'react';
import { Plus, Edit2, Trash2, Save, X, Download, Upload, Search } from 'lucide-react';
import { Button } from '../components/Button';
import productsData from '../data/products.json';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
  bestseller?: boolean;
}
export function Admin() {
  const [products, setProducts] = useState<Product[]>(productsData.products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const categories = ['Todos', 'Perfumes', 'Cabelos', 'Unhas', 'Pele', 'Maquiagem'];
  const emptyProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true,
    category: 'Perfumes',
    bestseller: false
  };
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });
  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormData({
      ...emptyProduct,
      id: String(Math.max(...products.map(p => parseInt(p.id) || 0)) + 1)
    });
  };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormData(product);
  };
  const handleSave = () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    if (isCreating) {
      setProducts([...products, formData]);
    } else if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? formData : p));
    }
    handleCancel();
  };
  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };
  const handleCancel = () => {
    setIsCreating(false);
    setEditingProduct(null);
    setFormData(emptyProduct);
  };
  const handleExport = () => {
    const dataStr = JSON.stringify({
      products
    }, null, 2);
    const dataBlob = new Blob([dataStr], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products.json';
    link.click();
  };
  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (json.products && Array.isArray(json.products)) {
            setProducts(json.products);
            alert('Produtos importados com sucesso!');
          } else {
            alert('Formato de arquivo inválido!');
          }
        } catch (error) {
          alert('Erro ao ler arquivo JSON!');
        }
      };
      reader.readAsText(file);
    }
  };
  return <div className="min-h-screen bg-golden-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-golden-dark text-white rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-serif font-bold text-golden-primary mb-2">
            Gerenciador de Produtos
          </h1>
          <p className="text-golden-light">
            Sistema de administração - Perfumaria Golden
          </p>
        </div>

        {/* Actions Bar */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md border-2 border-golden-light">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button onClick={handleCreate} className="shadow-md">
                <Plus className="w-5 h-5 mr-2" />
                Novo Produto
              </Button>
              <Button onClick={handleExport} variant="secondary" className="shadow-md">
                <Download className="w-5 h-5 mr-2" />
                Exportar JSON
              </Button>
              <label className="cursor-pointer">
                <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                <Button variant="outline" className="w-full shadow-md" onClick={() => {}}>
                  <Upload className="w-5 h-5 mr-2" />
                  Importar JSON
                </Button>
              </label>
            </div>
            <div className="text-sm text-golden-brown font-semibold">
              Total: {products.length} produtos
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-md border-2 border-golden-light">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden-primary w-5 h-5" />
              <input type="text" placeholder="Buscar produtos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" />
            </div>
            <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20">
              {categories.map(cat => <option key={cat} value={cat}>
                  {cat}
                </option>)}
            </select>
          </div>
        </div>

        {/* Form (Create/Edit) */}
        {(isCreating || editingProduct) && <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border-2 border-golden-primary">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-golden-dark">
                {isCreating ? 'Novo Produto' : 'Editar Produto'}
              </h2>
              <button onClick={handleCancel} className="p-2 hover:bg-golden-light rounded-lg transition-colors">
                <X className="w-6 h-6 text-golden-brown" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-golden-dark mb-2">
                  Nome do Produto *
                </label>
                <input type="text" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" placeholder="Ex: Golden Rose" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-golden-dark mb-2">
                  Preço (R$) *
                </label>
                <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({
              ...formData,
              price: parseFloat(e.target.value) || 0
            })} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" placeholder="99.90" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-golden-dark mb-2">
                  Descrição *
                </label>
                <textarea value={formData.description} onChange={e => setFormData({
              ...formData,
              description: e.target.value
            })} rows={3} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20 resize-none" placeholder="Descrição detalhada do produto..." />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-golden-dark mb-2">
                  URL da Imagem *
                </label>
                <input type="url" value={formData.image} onChange={e => setFormData({
              ...formData,
              image: e.target.value
            })} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" placeholder="https://images.unsplash.com/photo-..." />
                {formData.image && <img src={formData.image} alt="Preview" className="mt-3 w-32 h-32 object-cover rounded-lg border-2 border-golden-light" onError={e => e.currentTarget.style.display = 'none'} />}
              </div>

              <div>
                <label className="block text-sm font-semibold text-golden-dark mb-2">
                  Categoria *
                </label>
                <select value={formData.category} onChange={e => setFormData({
              ...formData,
              category: e.target.value
            })} className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20">
                  {categories.filter(c => c !== 'Todos').map(cat => <option key={cat} value={cat}>
                        {cat}
                      </option>)}
                </select>
              </div>

              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.available} onChange={e => setFormData({
                ...formData,
                available: e.target.checked
              })} className="w-5 h-5 text-golden-primary border-2 border-golden-light rounded focus:ring-2 focus:ring-golden-primary" />
                  <span className="text-sm font-semibold text-golden-dark">
                    Disponível
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.bestseller || false} onChange={e => setFormData({
                ...formData,
                bestseller: e.target.checked
              })} className="w-5 h-5 text-golden-primary border-2 border-golden-light rounded focus:ring-2 focus:ring-golden-primary" />
                  <span className="text-sm font-semibold text-golden-dark">
                    Mais Vendido
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={handleSave} className="flex-1">
                <Save className="w-5 h-5 mr-2" />
                Salvar
              </Button>
              <Button onClick={handleCancel} variant="outline" className="flex-1">
                Cancelar
              </Button>
            </div>
          </div>}

        {/* Products List */}
        <div className="bg-white rounded-xl shadow-md border-2 border-golden-light overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-golden-dark text-white">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Imagem
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Nome
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Categoria
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Preço
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-golden-light">
                {filteredProducts.map(product => <tr key={product.id} className="hover:bg-golden-cream transition-colors">
                    <td className="px-6 py-4">
                      <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded-lg border-2 border-golden-light" />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-golden-dark">
                        {product.name}
                      </div>
                      <div className="text-sm text-golden-brown line-clamp-1">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-golden-light text-golden-dark rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-golden-primary">
                      R$ {product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 justify-end">
                        <button onClick={() => handleEdit(product)} className="p-2 hover:bg-golden-light rounded-lg transition-colors" title="Editar">
                          <Edit2 className="w-5 h-5 text-golden-brown" />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 hover:bg-red-50 rounded-lg transition-colors" title="Excluir">
                          <Trash2 className="w-5 h-5 text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && <div className="text-center py-12 text-golden-brown">
              Nenhum produto encontrado
            </div>}
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
          <h3 className="text-lg font-serif font-bold text-golden-dark mb-3">
            📝 Como usar:
          </h3>
          <ul className="space-y-2 text-sm text-golden-brown">
            <li>
              • <strong>Criar:</strong> Clique em "Novo Produto" e preencha o
              formulário
            </li>
            <li>
              • <strong>Editar:</strong> Clique no ícone de lápis na linha do
              produto
            </li>
            <li>
              • <strong>Excluir:</strong> Clique no ícone de lixeira
              (confirmação necessária)
            </li>
            <li>
              • <strong>Exportar:</strong> Baixe o arquivo products.json
              atualizado
            </li>
            <li>
              • <strong>Importar:</strong> Carregue um arquivo products.json
              existente
            </li>
          </ul>
          <p className="mt-4 text-sm text-golden-brown">
            <strong>⚠️ Importante:</strong> Após fazer alterações, clique em
            "Exportar JSON" e substitua o arquivo{' '}
            <code className="bg-golden-light px-2 py-1 rounded">
              data/products.json
            </code>{' '}
            no projeto.
          </p>
        </div>
      </div>
    </div>;
}