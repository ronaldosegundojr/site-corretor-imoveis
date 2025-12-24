import axios from 'axios';

const API_URL = import.meta.env.VITE_PAYLOAD_URL || 'http://localhost:3001';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adicionar token de autenticação se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('perfumaria_golden_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Produtos
export const productsAPI = {
  getAll: () => api.get('/api/products'),
  getById: (id: string) => api.get(`/api/products/${id}`),
  create: (data: any) => api.post('/api/products', data),
  update: (id: string, data: any) => api.put(`/api/products/${id}`, data),
  delete: (id: string) => api.delete(`/api/products/${id}`),
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    
    return api.post('/api/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

// Categorias
export const categoriesAPI = {
  getAll: () => api.get('/api/categories'),
  create: (data: any) => api.post('/api/categories', data),
};

// Usuários
export const usersAPI = {
  getAll: () => api.get('/api/users'),
  create: (data: any) => api.post('/api/users', data),
};

// Autenticação
export const authAPI = {
  login: (email: string, password: string) => 
    api.post('/api/users/login', { email, password }),
  logout: () => {
    localStorage.removeItem('perfumaria_golden_admin_token');
  },
  getMe: () => api.get('/api/users/me'),
};

export default api;