import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../cart/CartContext";

function Shop() {
const {addToCart} = useCart()

  const [listing, setListing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  // Fetch listings from backend
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

  // Function to add item to cart or increase quantity

  if (loading) {
    return (
      <p className="text-center mt-16 text-lg text-gray-500">Loading...</p>
    );
  }
  if (error) {
    return <p className="text-center mt-16 text-red-500 text-lg">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Shop All Books</h1>

      <div className="flex flex-col lg:flex-row gap-4 mb-8 bg-gray-50 p-4 rounded-lg items-center">
        <input
          type="text"
          placeholder="Search by title or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Types</option>
          <option value="sale">For Sale</option>
          <option value="donation">Free/Donation</option>
          <option value="bogo">BOGO Offers</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="newest">Newest First</option>
          <option value="title">Title A–Z</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>

        <button
          onClick={() => alert("Add book page coming soon!")}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Add Book
        </button>
      </div>

      <div className="mb-4 text-gray-600 text-right">
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
              className="flex flex-col border rounded-lg bg-white shadow-sm hover:shadow-lg p-5 transition-shadow duration-200"
            >
              {/* Book Cover */}
              <div className="w-full aspect-[3/4] mb-4 overflow-hidden rounded">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Book Info */}
              <h2 className="font-bold text-lg mb-1">{item.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{item.author}</p>
              {/* Condition and Price/Offer */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs px-2 py-1 bg-gray-100 rounded">
                  {item.condition}
                </span>
                {item.type === "sale" && (
                  <span className="text-indigo-600 font-semibold">
                    ₹{item.price}
                  </span>
                )}
                {item.type === "donation" && (
                  <span className="text-green-600 font-semibold">Free</span>
                )}
                {item.type === "bogo" && (
                  <span className="text-yellow-600 font-semibold">BOGO</span>
                )}
              </div>
              {/* Cart and Wishlist Buttons */}
              <div className="flex gap-3 mt-auto">
                <button
                  onClick={() => addToCart(item)}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
                >
                  Add to Cart
                </button>
                <button className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition">
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
