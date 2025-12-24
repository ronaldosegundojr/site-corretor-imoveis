import { useState, useEffect, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, Download, Upload, Search, Eye, EyeOff, Image as ImageIcon, Users, Tag, UserPlus } from 'lucide-react';
import { Button } from '../components/Button';
import { productsAPI, categoriesAPI, usersAPI } from '../services/api';
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
  category: string;
  bestseller?: boolean;
  outOfStock?: boolean;
  showWhenOutOfStock?: boolean;
  stock?: number;
  featured?: boolean;
  brand?: string;
  tags?: Array<{ tag: string }>;
}

export function Admin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
    loadCategories();
    loadUsers();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoriesAPI.getAll();
      const categoryNames = ['Todos', ...response.data.docs.map((cat: any) => cat.name)];
      setCategories(categoryNames);
      setAvailableCategories(response.data.docs.map((cat: any) => cat.name));
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  const loadUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data.docs);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll();
      setProducts(response.data.docs || []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  };
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todos');
  const [filterStock, setFilterStock] = useState('Todos');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [categories, setCategories] = useState(['Todos']);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'users'>('products');
  const stockFilters = ['Todos', 'Disponível', 'Fora de Estoque', 'Fora de Estoque (Visível)'];
  const emptyProduct: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    image: '',
    available: true,
    category: 'Perfumes',
    bestseller: false,
    outOfStock: false,
    showWhenOutOfStock: false,
    stock: 0,
    featured: false,
    brand: '',
    tags: []
  };
  const [formData, setFormData] = useState<Product>(emptyProduct);
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'Todos' || product.category === filterCategory;
    let matchesStock = true;
    if (filterStock === 'Disponível') {
      matchesStock = product.available && !product.outOfStock;
    } else if (filterStock === 'Fora de Estoque') {
      matchesStock = product.outOfStock === true;
    } else if (filterStock === 'Fora de Estoque (Visível)') {
      matchesStock = product.outOfStock === true && product.showWhenOutOfStock === true;
    }
    return matchesSearch && matchesCategory && matchesStock;
  });
  const handleCreate = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormData(emptyProduct);
  };

  const handleCreateCategory = async () => {
    const categoryName = prompt('Digite o nome da nova categoria:');
    if (categoryName && categoryName.trim()) {
      try {
        await categoriesAPI.create({ name: categoryName.trim() });
        loadCategories(); // Recarregar categorias
        alert('Categoria criada com sucesso!');
      } catch (error) {
        console.error('Erro ao criar categoria:', error);
        alert('Erro ao criar categoria: ' + (error.response?.data?.error || error.message));
      }
    }
  };

  const handleCreateUser = () => {
    const firstName = prompt('Nome do usuário:');
    const lastName = prompt('Sobrenome do usuário:');
    const email = prompt('Email do usuário:');
    const password = prompt('Senha do usuário:');
    const role = prompt('Role do usuário (admin/user):', 'user');

    if (firstName && lastName && email && password && role) {
      createUser({
        firstName,
        lastName,
        email,
        password,
        role: role === 'admin' ? 'admin' : 'user'
      });
    }
  };

  const createUser = async (userData: any) => {
    try {
      await usersAPI.create(userData);
      loadUsers(); // Recarregar usuários
      alert('Usuário criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário: ' + (error.response?.data?.error || error.message));
    }
  };
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormData(product);
  };
  const handleSave = async () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    // Lógica de validação: se está fora de estoque, não pode estar disponível
    if (formData.outOfStock) {
      formData.available = false;
    }

    try {
      if (isCreating) {
        const response = await productsAPI.create(formData);
        const newProduct = response.data || response;
        setProducts([...products, newProduct]);
      } else if (editingProduct) {
        const response = await productsAPI.update(editingProduct.id, formData);
        const updatedProduct = response.data || response;
        setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
      }
      handleCancel();
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto: ' + (error.response?.data?.error || error.message));
    }
  };
  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        await productsAPI.delete(id);
        setProducts(products.filter(p => p.id !== id));
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
        alert('Erro ao deletar produto!');
      }
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadingImage(true);
      try {
        const response = await productsAPI.uploadImage(file);
        const imageUrl = `http://localhost:3001${response.data.url}`;
        setFormData({
          ...formData,
          image: imageUrl
        });
      } catch (error) {
        console.error('Erro ao fazer upload:', error);
        alert('Erro ao fazer upload da imagem!');
      } finally {
        setUploadingImage(false);
      }
    }
  };
  const getStockStatus = (product: Product) => {
    if (product.outOfStock) {
      if (product.showWhenOutOfStock) {
        return {
          text: 'Fora de Estoque (Visível)',
          color: 'bg-orange-100 text-orange-700'
        };
      }
      return {
        text: 'Fora de Estoque',
        color: 'bg-red-100 text-red-700'
      };
    }
    if (product.available) {
      return {
        text: 'Disponível',
        color: 'bg-green-100 text-green-700'
      };
    }
    return {
      text: 'Indisponível',
      color: 'bg-gray-100 text-gray-700'
    };
  };
  const getStockCount = () => {
    const available = products.filter(p => p.available && !p.outOfStock).length;
    const outOfStock = products.filter(p => p.outOfStock).length;
    const outOfStockVisible = products.filter(p => p.outOfStock && p.showWhenOutOfStock).length;
    return {
      available,
      outOfStock,
      outOfStockVisible
    };
  };
  const stockCount = getStockCount();

  if (loading) {
    return <div className="min-h-screen bg-golden-cream py-8 flex items-center justify-center">
      <div className="text-golden-primary text-xl">Carregando produtos...</div>
    </div>;
  }

  return <div className="min-h-screen bg-golden-cream py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-golden-dark text-white rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-serif font-bold text-golden-primary mb-2">
            Painel Administrativo
          </h1>
          <p className="text-golden-light">
            Sistema de administração - Perfumaria Golden
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl p-2 mb-6 shadow-md border-2 border-golden-light">
          <div className="flex space-x-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'products'
                  ? 'bg-golden-primary text-white'
                  : 'text-golden-dark hover:bg-golden-light'
              }`}
            >
              <Tag className="w-4 h-4 inline mr-2" />
              Produtos
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'categories'
                  ? 'bg-golden-primary text-white'
                  : 'text-golden-dark hover:bg-golden-light'
              }`}
            >
              <Tag className="w-4 h-4 inline mr-2" />
              Categorias
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'bg-golden-primary text-white'
                  : 'text-golden-dark hover:bg-golden-light'
              }`}
            >
              <Users className="w-4 h-4 inline mr-2" />
              Usuários
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <>
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
                    <Button variant="outline" className="w-full shadow-md">
                      <Upload className="w-5 h-5 mr-2" />
                      Importar JSON
                    </Button>
                  </label>
                </div>
                <div className="text-sm text-golden-brown font-semibold space-y-1">
                  <div>Total: {products.length} produtos</div>
                  <div className="text-xs space-y-0.5">
                    <div className="text-green-700">
                      ✓ Disponíveis: {stockCount.available}
                    </div>
                    <div className="text-red-700">
                      ✗ Fora de Estoque: {stockCount.outOfStock}
                    </div>
                    <div className="text-orange-700">
                      👁️ Visíveis sem estoque: {stockCount.outOfStockVisible}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-xl p-6 mb-6 shadow-md border-2 border-golden-light">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-golden-primary w-5 h-5" />
                  <input 
                    type="text" 
                    placeholder="Buscar produtos..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    className="w-full pl-10 pr-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" 
                  />
                </div>
                <select 
                  value={filterCategory} 
                  onChange={e => setFilterCategory(e.target.value)} 
                  className="px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20"
                >
                  {categories.map(cat => 
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  )}
                </select>
                <select 
                  value={filterStock} 
                  onChange={e => setFilterStock(e.target.value)} 
                  className="px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20"
                >
                  {stockFilters.map(filter => 
                    <option key={filter} value={filter}>
                      {filter}
                    </option>
                  )}
                </select>
              </div>
            </div>

            {/* Form (Create/Edit) */}
            {(isCreating || editingProduct) && (
              <div className="bg-white rounded-xl p-6 mb-6 shadow-lg border-2 border-golden-primary">
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
                    <input 
                      type="text" 
                      value={formData.name} 
                      onChange={e => setFormData({
                        ...formData,
                        name: e.target.value
                      })} 
                      className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" 
                      placeholder="Ex: Golden Rose" 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-golden-dark mb-2">
                      Preço (R$) *
                    </label>
                    <input 
                      type="number" 
                      step="0.01" 
                      value={formData.price} 
                      onChange={e => setFormData({
                        ...formData,
                        price: parseFloat(e.target.value) || 0
                      })} 
                      className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20" 
                      placeholder="99.90" 
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-golden-dark mb-2">
                      Descrição *
                    </label>
                    <textarea 
                      value={formData.description} 
                      onChange={e => setFormData({
                        ...formData,
                        description: e.target.value
                      })} 
                      rows={3} 
                      className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20 resize-none" 
                      placeholder="Descrição detalhada do produto..." 
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-golden-dark mb-2">
                      Imagem do Produto *
                    </label>
                    <div className="space-y-3">
                      {/* Upload de arquivo local */}
                      <div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          variant="outline"
                          className="w-full"
                          disabled={uploadingImage}
                        >
                          <ImageIcon className="w-5 h-5 mr-2" />
                          {uploadingImage ? 'Fazendo Upload...' : 'Escolher Imagem Local'}
                        </Button>
                      </div>
                      
                      {/* URL manual */}
                      <div>
                        <input
                          type="url"
                          value={formData.image}
                          onChange={e => setFormData({
                            ...formData,
                            image: e.target.value
                          })}
                          className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20"
                          placeholder="Ou cole URL da imagem: https://..."
                        />
                      </div>
                      
                      {/* Preview */}
                      {formData.image && (
                        <div className="flex items-center space-x-3 p-3 bg-golden-cream rounded-lg">
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded-lg border-2 border-golden-light"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="flex-1">
                            <p className="text-sm text-golden-dark font-medium">Preview</p>
                            <p className="text-xs text-golden-brown truncate">{formData.image}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-golden-dark mb-2">
                      Categoria *
                    </label>
                    <select 
                      value={formData.category} 
                      onChange={e => setFormData({
                        ...formData,
                        category: e.target.value
                      })} 
                      className="w-full px-4 py-3 border-2 border-golden-light rounded-lg focus:outline-none focus:border-golden-primary focus:ring-2 focus:ring-golden-primary/20"
                    >
                      {categories.filter(c => c !== 'Todos').map(cat => 
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      )}
                    </select>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={formData.bestseller || false} 
                        onChange={e => setFormData({
                          ...formData,
                          bestseller: e.target.checked
                        })} 
                        className="w-5 h-5 text-golden-primary border-2 border-golden-light rounded focus:ring-2 focus:ring-golden-primary" 
                      />
                      <span className="text-sm font-semibold text-golden-dark">
                        Mais Vendido
                      </span>
                    </label>
                  </div>

                  {/* Stock Management Section */}
                  <div className="md:col-span-2 bg-golden-cream p-4 rounded-lg border-2 border-golden-primary">
                    <h3 className="text-lg font-serif font-bold text-golden-dark mb-4">
                      📦 Controle de Estoque
                    </h3>

                    <div className="space-y-4">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.outOfStock || false} 
                          onChange={e => {
                            const isOutOfStock = e.target.checked;
                            setFormData({
                              ...formData,
                              outOfStock: isOutOfStock,
                              available: !isOutOfStock,
                              showWhenOutOfStock: isOutOfStock ? formData.showWhenOutOfStock : false
                            });
                          }} 
                          className="w-5 h-5 text-red-600 border-2 border-golden-light rounded focus:ring-2 focus:ring-red-500 mt-0.5" 
                        />
                        <div>
                          <span className="text-sm font-semibold text-golden-dark block">
                            Produto Fora de Estoque
                          </span>
                          <span className="text-xs text-golden-brown">
                            Marque se o produto não tem estoque disponível
                          </span>
                        </div>
                      </label>

                      {formData.outOfStock && (
                        <label className="flex items-start gap-3 cursor-pointer ml-8 p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
                          <input 
                            type="checkbox" 
                            checked={formData.showWhenOutOfStock || false} 
                            onChange={e => setFormData({
                              ...formData,
                              showWhenOutOfStock: e.target.checked
                            })} 
                            className="w-5 h-5 text-orange-600 border-2 border-orange-300 rounded focus:ring-2 focus:ring-orange-500 mt-0.5" 
                          />
                          <div>
                            <span className="text-sm font-semibold text-orange-900 block flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Mostrar Produto no Site (mesmo sem estoque)
                            </span>
                            <span className="text-xs text-orange-700">
                              O produto aparecerá no site com badge "Fora de
                              Estoque" mas não poderá ser adicionado ao carrinho
                            </span>
                          </div>
                        </label>
                      )}

                      {!formData.outOfStock && (
                        <label className="flex items-start gap-3 cursor-pointer ml-8 p-3 bg-green-50 rounded-lg border-2 border-green-200">
                          <input 
                            type="checkbox" 
                            checked={formData.available} 
                            onChange={e => setFormData({
                              ...formData,
                              available: e.target.checked
                            })} 
                            className="w-5 h-5 text-green-600 border-2 border-green-300 rounded focus:ring-2 focus:ring-green-500 mt-0.5" 
                          />
                          <div>
                            <span className="text-sm font-semibold text-green-900 block">
                              Disponível para Venda
                            </span>
                            <span className="text-xs text-green-700">
                              Produto pode ser adicionado ao carrinho
                            </span>
                          </div>
                        </label>
                      )}
                    </div>
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
              </div>
            )}

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
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        Visibilidade
                      </th>
                      <th className="px-6 py-4 text-right text-sm font-semibold">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-golden-light">
                    {filteredProducts.map(product => {
                      const status = getStockStatus(product);
                      return (
                        <tr key={product.id} className="hover:bg-golden-cream transition-colors">
                          <td className="px-6 py-4">
                            <img 
                              src={product.image} 
                              alt={product.name} 
                              className="w-16 h-16 object-cover rounded-lg border-2 border-golden-light" 
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
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
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${status.color}`}>
                              {status.text}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-center">
                            {product.outOfStock ? 
                              product.showWhenOutOfStock ? 
                                <Eye className="w-5 h-5 text-orange-600 inline" aria-label="Visível no site" /> : 
                                <EyeOff className="w-5 h-5 text-gray-400 inline" aria-label="Oculto no site" />
                            : 
                              <Eye className="w-5 h-5 text-green-600 inline" aria-label="Visível no site" />
                            }
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2 justify-end">
                              <button 
                                onClick={() => handleEdit(product)} 
                                className="p-2 hover:bg-golden-light rounded-lg transition-colors" 
                                aria-label="Editar"
                              >
                                <Edit2 className="w-5 h-5 text-golden-brown" />
                              </button>
                              <button 
                                onClick={() => handleDelete(product.id)} 
                                className="p-2 hover:bg-red-50 rounded-lg transition-colors" 
                                aria-label="Excluir"
                              >
                                <Trash2 className="w-5 h-5 text-red-600" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12 text-golden-brown">
                  Nenhum produto encontrado
                </div>
              )}
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
              <h3 className="text-lg font-serif font-bold text-golden-dark mb-3">
                📝 Como usar o Controle de Estoque:
              </h3>
              <ul className="space-y-2 text-sm text-golden-brown">
                <li>
                  • <strong>Produto Fora de Estoque:</strong> Marque quando o
                  produto não tiver estoque
                </li>
                <li>
                  • <strong>Mostrar no Site:</strong> Produtos fora de estoque podem
                  ser exibidos com badge informativo
                </li>
                <li>
                  • <strong>Ocultar do Site:</strong> Produtos fora de estoque sem a
                  opção "Mostrar" ficam completamente ocultos
                </li>
                <li>
                  • <strong>Disponível:</strong> Apenas produtos com estoque e
                  marcados como disponíveis podem ser comprados
                </li>
              </ul>
               <div className="mt-4 p-4 bg-orange-50 border-2 border-orange-200 rounded-lg">
                 <p className="text-sm text-orange-900 font-semibold mb-2">
                   💡 Dica:
                 </p>
                 <p className="text-sm text-orange-800">
                   Use "Mostrar no Site" para produtos que voltarão em breve ao
                   estoque. Isso mantém o interesse dos clientes e permite que eles
                   vejam o produto mesmo sem poder comprar no momento.
                 </p>
               </div>
             </div>
           </>
        )}

        {/* Categories Tab */}
        {activeTab === 'categories' && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border-2 border-golden-light">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-golden-dark">
                🏷️ Gerenciar Categorias
              </h2>
              <Button onClick={handleCreateCategory}>
                <Plus className="w-5 h-5 mr-2" />
                Nova Categoria
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCategories.map((category, index) => (
                <div key={index} className="p-4 bg-golden-cream rounded-lg border-2 border-golden-light">
                  <div className="font-semibold text-golden-dark flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    {category}
                  </div>
                  <div className="text-sm text-golden-brown mt-1">
                    {products.filter(p => p.category === category).length} produtos
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
              <p className="text-sm text-blue-900 font-semibold mb-2">
                💡 Dica:
              </p>
              <p className="text-sm text-blue-800">
                As categorias criadas ficam disponíveis no formulário de produtos e na página de produtos da loja.
              </p>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-xl p-6 mb-6 shadow-md border-2 border-golden-light">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-golden-dark">
                👥 Gerenciar Usuários
              </h2>
              <Button onClick={handleCreateUser}>
                <UserPlus className="w-5 h-5 mr-2" />
                Novo Usuário
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-golden-dark text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Nome
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Função
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-golden-light">
                  {users.map((user, index) => (
                    <tr key={user.id} className="hover:bg-golden-cream transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-golden-dark">
                          {user.firstName} {user.lastName}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-golden-brown">
                        {user.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          user.role === 'admin' 
                            ? 'bg-purple-100 text-purple-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {user.role === 'admin' ? 'Admin' : 'Usuário'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                          Ativo
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 p-4 bg-purple-50 rounded-lg border-2 border-purple-200">
              <p className="text-sm text-purple-900 font-semibold mb-2">
                🔐 Tipos de Usuário:
              </p>
              <ul className="text-sm text-purple-800 space-y-1">
                <li>• <strong>Admin:</strong> Acesso total ao painel administrativo</li>
                <li>• <strong>Usuário:</strong> Acesso limitado (em desenvolvimento)</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>;
  }