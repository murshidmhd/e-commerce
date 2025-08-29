import { createContext, useContext } from "react";
import { useItemList } from "./useItemList";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const { items, addItem, removeItem, clearItem } = useItemList([]);

  const addToWishlist = (item) => {
    addItem(item);
  };

  const removeFromWishlist = (id) => {
    removeItem(id);
  };

  const clearWishlist = () => {
    clearItem();
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems: items,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
