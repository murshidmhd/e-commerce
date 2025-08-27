import { createContext, useState, useContext } from "react";
const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItem] = useState([]);
  //   return <CartContext.provider value={{}}>{Children}</CartContext.provider>;
  const addToCart = (item) => {
    setCartItem((prv) => {
      const exists = prv.find((i) => i.id === item.id);
      if (exists) {
        return prv.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: i.quantity + 1,
              }
            : i
        );
      }
      return [...prv, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItem((prv) => prv.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItem((prv) =>
      prv.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity,
            }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItem([]);
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
};
