import React from "react";
import { useWishlist } from "./WishListContext";
import { useCart } from "./CartContext";

function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item); // Add item to cart
    removeFromWishlist(item.id); // Remove item from wishlist
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-extrabold mb-8 border-b pb-4 text-gray-800">
        Your Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-500 italic mt-20">
          Your wishlist is empty.
        </p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {wishlistItems.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-6"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-28 rounded-lg object-cover shadow-sm"
                  />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 mt-1">{item.author}</p>
                    <p className="mt-2 text-indigo-600 font-semibold text-lg">
                      {item.type === "sale" && `₹${item.price}`}
                      {item.type === "donation" && "Free"}
                      {item.type === "bogo" && "BOGO"}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="px-4 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 font-semibold transition"
                  >
                    Remove
                  </button>
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="px-4 py-1 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 font-semibold transition"
                  >
                    Move to Cart
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            onClick={clearWishlist}
            className="mt-8 w-full bg-red-600 text-white py-3 rounded-md hover:bg-red-700 transition font-bold"
          >
            Clear Wishlist
          </button>
        </>
      )}
    </div>
  );
}

export default Wishlist;
