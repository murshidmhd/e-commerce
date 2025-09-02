import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:3000/users/${userId}`)
        .then((res) => setCartItems(res.data.cart || []))
        .catch((err) => console.error("error fetching cart ", err));
    }
  }, [userId]);

  const saveCartToServer = async (updatedCart) => {
    try {
      await axios.patch(`http://localhost:3000/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (err) {
      console.error("error saving cart:", err);
    }
  };

  const addToCart = async (product) => {
    let updatedCart;
    const exists = cartItems.find((item) => item.id === product.id);

    if (exists) {
      updatedCart = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cartItems, { ...product, quantity: 1 }];
    }

    setCartItems(updatedCart);
    await saveCartToServer(updatedCart);
  };
  const removeFromCart = async (product) => {
    const updatedCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updatedCart);
    await saveCartToServer(updatedCart);
  };
  const updateQuantity = async (id, newQty) => {
    let updatedCart;
    if (newQty <= 0) {
      updatedCart = cartItems.filter((item) => item.id !== id);
    } else {
      updatedCart = cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      );
    }

    setCartItems(updatedCart);
    await saveCartToServer(updatedCart);
  };
  const clearCart = async () => {
    setCartItems([]);
    await saveCartToServer([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider, CartContext };

export const useCart = () => useContext(CartContext);

/* this is for we dont right in all section like this 
const {cartItems , addToCart} = useContext(CartContext);*/
