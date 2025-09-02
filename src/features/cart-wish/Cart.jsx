import React from "react";
import { useCart } from "./CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          🛒 My Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 mb-6">Your cart is empty</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl transition"
              >
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-lg">
                  Image
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-center mb-2">
                  Price: ${item.price * item.quantity}
                </p>
                <p className="text-gray-600 text-center mb-4">
                  Quantity: {item.quantity}
                </p>

                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                  >
                    +
                  </button>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    -
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item)}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="text-center mt-6 space-y-4">
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="px-6 py-3 bg-gray-700 text-white rounded-xl hover:bg-gray-800 transition font-medium"
            >
              Clear Cart
            </button>

            {/* Place Order Button */}
            <button
              onClick={() => alert("Order placed successfully!")}
              className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition font-medium"
            >
              Place Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
