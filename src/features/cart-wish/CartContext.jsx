import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  // ✅ Fetch cart on login/page load
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setCartItems(res.data.cart || []))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [userId]);

  // ✅ Add item to cart
  const addToCart = async (product) => {
    if (!userId) return;

    const exists = cartItems.find((item) => item.itemId === product.id);
    let updated;

    if (exists) {
      updated = cartItems.map((item) =>
        item.itemId === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updated = [
        ...cartItems,
        {
          itemId: product.id,
          title: product.title,
          price: product.price,
          quantity: 1,
        },
      ];
    }

    setCartItems(updated);
    await axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updated,
    });
  };

  // ✅ Remove item
  const removeFromCart = async (id) => {
    if (!userId) return;
    const updated = cartItems.filter((item) => item.itemId !== id);
    setCartItems(updated);
    await axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updated,
    });
  };

  // ✅ Update quantity
  const updateQuantity = async (id, newQty) => {
    if (!userId) return;

    if (newQty <= 0) {
      return removeFromCart(id);
    }

    const updated = cartItems.map((item) =>
      item.itemId === id ? { ...item, quantity: newQty } : item
    );
    setCartItems(updated);

    await axios.patch(`http://localhost:3000/users/${userId}`, {
      cart: updated,
    });
  };

  // ✅ Clear cart
  const clearCart = async () => {
    if (!userId) return;
    setCartItems([]);
    await axios.patch(`http://localhost:3000/users/${userId}`, { cart: [] });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
