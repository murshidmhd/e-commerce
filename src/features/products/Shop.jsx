import React, { use, useEffect, useState } from "react";
import axios from "axios";

function Shop() {
  const [lsiting, setListing] = useState([]);
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
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p className="text-red-500"> {error} </p>;
  }
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Shop All Books</h1>
      <input
        type="text"
        placeholder="Search by title or author…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded mb-4 w-full"
      />
      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="all">All Types</option>
        <option value="sale">For Sale</option>
        <option value="donation">Free/Donation</option>
        <option value="bogo">BOGO Offers</option>
      </select>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        <option value="newest">Newest First</option>
        <option value="title">Title A–Z</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
      </select>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lsiting
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
            <div key={item.id} className="border p-4">
              <h1 className="font-semibold"> {item.title} </h1>
              <p className="text-sm">{item.author}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Shop;
