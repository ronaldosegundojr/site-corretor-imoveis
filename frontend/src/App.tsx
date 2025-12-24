import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartSidebar } from './components/CartSidebar';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { Cart } from './pages/Cart';
import { DeliveryInfo } from './pages/DeliveryInfo';
import { PaymentInfo } from './pages/PaymentInfo';
import { Admin } from './pages/Admin';
import { CartProvider, useCartContext } from './contexts/CartContext';
function AppContent() {
  const cart = useCartContext();
  return <div className="flex flex-col min-h-screen bg-golden-cream">
      <Header cartItemCount={cart.getItemCount()} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/delivery" element={<DeliveryInfo />} />
          <Route path="/payment" element={<PaymentInfo />} />
          <Route path="/admin" element={<ProtectedRoute>
                <Admin />
              </ProtectedRoute>} />
        </Routes>
      </main>
      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={cart.isSidebarOpen} onClose={cart.closeSidebar} cart={cart.cart} onUpdateQuantity={cart.updateQuantity} onRemove={cart.removeFromCart} total={cart.getTotal()} />
    </div>;
}
export function App() {
  return <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>;
}