import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../cart-wish/CartContext";
import { useNavigate } from "react-router-dom";
import { useWishlist } from "../cart-wish/WishListContext";
function Shop() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { addToWishlist } = useWishlist();

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    axios
      .get("http://localhost:3000/listings")
      .then((res) => {
        setListing(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load listing.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-16 text-lg text-gray-500">Loading...</p>
    );
  }
  if (error) {
    return <p className="text-center mt-16 text-red-500 text-lg">{error}</p>;
  }
  const handleAddToCart = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (isLoggedIn) {
      return addToCart;
    } else {
      navigate("/login");
    }
  };
  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        Shop All Books
      </h1>

      <div className="flex flex-col lg:flex-row gap-5 mb-12 bg-indigo-50 rounded-xl p-6 items-center shadow-md">
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/2 px-5 py-3 border border-indigo-300 rounded-lg placeholder-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 text-gray-900 font-semibold transition"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-semibold text-indigo-700 bg-white cursor-pointer transition"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="donation">Free/Donation</option>
          <option value="bogo">BOGO Offers</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-5 py-3 rounded-lg border border-indigo-300 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-semibold text-indigo-700 bg-white cursor-pointer transition"
        >
          <option value="newest">Newest First</option>
          <option value="title">Title A–Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <button
          onClick={() => alert("Add book page coming soon!")}
          className="px-6 py-3 rounded-lg border border-indigo-300 font-semibold text-indigo-700 bg-white hover:bg-indigo-600 hover:text-white transition shadow"
        >
          Add Book
        </button>
      </div>

      {/* <div className="mb-6 text-gray-800 text-right text-sm font-medium tracking-wide">
        Showing{" "}
        {
          listing
            .filter(
              (item) =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.author.toLowerCase().includes(search.toLowerCase())
            )
            .filter((item) =>
              selectedType === "all" ? true : item.type === selectedType
            ).length
        }{" "}
        of {listing.length} books
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {listing
          .filter(
            (item) =>
              item.title.toLowerCase().includes(search.toLowerCase()) ||
              item.author.toLowerCase().includes(search.toLowerCase())
          )
          .filter((item) =>
            selectedType === "all" ? true : item.type === selectedType
          )
          .sort((a, b) => {
            if (sortBy === "price-low") return a.price - b.price;
            if (sortBy === "price-high") return b.price - a.price;
            if (sortBy === "title") return a.title.localeCompare(b.title);
            return b.id - a.id;
          })
          .map((item) => (
            <div
              key={item.id}
              className="flex flex-col border rounded-2xl bg-white shadow-md hover:shadow-xl p-6 transition-shadow duration-300"
            >
              <div className="w-full aspect-[3/4] mb-5 overflow-hidden rounded-2xl shadow-inner">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <h2 className="font-semibold text-xl mb-2 text-gray-900 truncate">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-3">{item.author}</p>

              <div className="flex justify-between items-center mb-6">
                <span className="text-xs px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full font-semibold">
                  {item.condition}
                </span>
                {item.type === "sale" && (
                  <span className="text-lg font-bold text-indigo-600">
                    ₹{item.price}
                  </span>
                )}
                {item.type === "donation" && (
                  <span className="text-lg font-bold text-green-600">Free</span>
                )}
                {item.type === "bogo" && (
                  <span className="text-lg font-bold text-yellow-600">
                    BOGO
                  </span>
                )}
              </div>

              <div className="flex gap-4 mt-auto">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold"
                >
                  Add to Cart
                </button>
                <button
                  className="flex-1 bg-pink-500 text-white py-3 rounded-xl hover:bg-pink-600 transition font-semibold"
                  onClick={() => addToWishlist(item)}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shop;
