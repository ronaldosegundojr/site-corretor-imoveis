import { useEffect, useState, createContext, useContext } from 'react';
import type { ReactNode } from 'react';
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}
interface CartContextType {
  cart: CartItem[];
  isSidebarOpen: boolean;
  addToCart: (product: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
  openSidebar: () => void;
  closeSidebar: () => void;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export function CartProvider({
  children
}: {
  children: ReactNode;
}) {
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
    console.log('CartContext: addToCart called with product:', product.name);
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        console.log('CartContext: Product already in cart, increasing quantity');
        return prevCart.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1
        } : item);
      }
      console.log('CartContext: Adding new product to cart');
      return [...prevCart, {
        ...product,
        quantity: 1
      }];
    });
    // Open sidebar when product is added
    console.log('CartContext: Opening sidebar');
    setIsSidebarOpen(true);
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
    console.log('CartContext: openSidebar called');
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    console.log('CartContext: closeSidebar called');
    setIsSidebarOpen(false);
  };
  // Debug log for sidebar state changes
  useEffect(() => {
    console.log('CartContext: isSidebarOpen changed to:', isSidebarOpen);
  }, [isSidebarOpen]);
  const value: CartContextType = {
    cart,
    isSidebarOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    openSidebar,
    closeSidebar
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCartContext() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCartContext must be used within a CartProvider');
  }
  return context;
}