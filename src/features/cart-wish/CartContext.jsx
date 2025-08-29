import { createContext, useContext } from "react";
import { useItemList } from "./useItemList";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { items, addItem, removeItem, clearItem, setItems } = useItemList([]);

  const addToCart = (item) => {
    const exists = items.find((i) => i.id === item.id);
    if (exists) {
      const updated = items.map((i) =>
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setItems(updated);
    } else {
      addItem({ ...item, quantity: 1 });
    }
  };

  const removeFromCart = (id) => {
    removeItem(id);
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    const updated = items.map((i) => (i.id === id ? { ...i, quantity } : i));
    setItems(updated);
  };

  const clearCart = () => {
    clearItem();
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
