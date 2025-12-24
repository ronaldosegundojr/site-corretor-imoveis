import { useState, useEffect } from 'react';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('perfumaria-golden-cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to load cart:', e);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('perfumaria-golden-cart', JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    console.log('useCart: addToCart called with product:', product.name);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        console.log('useCart: Product already in cart, increasing quantity');
        return prevCart.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      console.log('useCart: Adding new product to cart');
      return [...prevCart, {
        ...product,
        quantity: 1
      }];
    });

    // Open sidebar when product is added
    console.log('useCart: Opening sidebar');
    setIsSidebarOpen(true);
    console.log('useCart: Sidebar state set to true');
  };
  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => item.id === productId ? {
      ...item,
      quantity
    } : item));
  };
  const clearCart = () => {
    setCart([]);
  };
  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  const getItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };
  const openSidebar = () => {
    console.log('useCart: openSidebar called');
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    console.log('useCart: closeSidebar called');
    setIsSidebarOpen(false);
  };

  // Debug log for sidebar state changes
  useEffect(() => {
    console.log('useCart: isSidebarOpen changed to:', isSidebarOpen);
  }, [isSidebarOpen]);
  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isSidebarOpen,
    openSidebar,
    closeSidebar
  };
}