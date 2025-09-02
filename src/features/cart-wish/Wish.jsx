import React from "react";
import { useWishlist } from "./WishListContext";

function Wishlist() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-800 mb-6 text-center">
          My Wishlist
        </h2>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 mb-6">
            Your wishlist is empty.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center hover:shadow-xl transition"
              >
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400 text-lg">
                  Image
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  {item.name}
                </h3>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="mt-auto bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="w-full mb-4 bg-gray-700 text-white py-3 rounded-xl hover:bg-gray-800 transition font-medium"
          >
            Clear Wishlist
          </button>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
