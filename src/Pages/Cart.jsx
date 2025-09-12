// src/pages/Cart.jsx
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../features/context/CartContext";
import toast from "react-hot-toast";
import EmptyCart from "../components /EmptyCart";
import CartItem from "../components /CartItem";
import CartSummary from "../components /CartSummery";

const LoadingState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
    <div className="text-center space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0"></div>
      </div>
      <p className="text-xl font-semibold text-gray-700">Loading your cart...</p>
    </div>
  </div>
);

const ErrorState = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-50">
    <div className="text-center space-y-6 max-w-md mx-auto p-8">
      <div className="text-6xl">⚠️</div>
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-800">Something went wrong</h3>
        <p className="text-gray-600">{error}</p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
      >
        Try Again
      </button>
    </div>
  </div>
);

function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    error,
    loading,
  } = useCart();

  const navigate = useNavigate();

  const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  }, [updateQuantity]);

  const handleRemoveItem = useCallback((item) => {
    removeFromCart(item);
    toast.success(`📚 "${item.title || item.name}" removed from cart`);
  }, [removeFromCart]);

  const handleClearCart = useCallback(() => {
    if (window.confirm('Are you sure you want to clear your entire cart?')) {
      clearCart();
      toast.success('🗑️ Cart cleared successfully');
    }
  }, [clearCart]);

  const handlePlaceOrder = useCallback(async () => {
    try {
      toast.success('🎉 Redirecting to checkout...');
      navigate("/orderdetails");
    } catch (err) {
      console.error("Error placing order", err);
      toast.error("Something went wrong while placing order");
    }
  }, [navigate]);

  if (loading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Shopping Cart
          </h1>
          {cartItems.length > 0 && (
            <p className="text-xl text-gray-600">
              {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
          <div className="flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <CartSummary
                cartItems={cartItems}
                onClearCart={handleClearCart}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
