import { useCart } from "./CartContext";
import React from "react";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  return (
    <div className="container mx-auto p-8 max-w-3xl bg-white rounded-lg shadow-md">
      <h1 className="text-3xl mb-8 font-extrabold tracking-wide text-gray-800 border-b pb-4">
        Your Cart
      </h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500 text-lg italic mt-20">
          Your cart is empty.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item.itemId} className="flex justify-between items-center py-6">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                  >
                    −
                  </button>
                  <button
                    onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                    className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                  >
                    +
                  </button>
                  <button
                    className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 transition font-semibold"
                    onClick={() => removeFromCart(item.itemId)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-right font-extrabold text-xl text-gray-900 mt-8">
            Total : ₹
            {cartItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0
            )}
          </div>
          <button
            onClick={clearCart}
            className="mt-8 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold tracking-wide"
          >
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
