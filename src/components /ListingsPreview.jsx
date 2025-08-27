// src/components/ListingsPreview.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListingsPreview = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/listings?_limit=12 ")
      .then((res) => setListings(res.data))
      .catch(() => setError("Failed to load listings."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-10">Loading…</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Listings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
        {listings.map((item) => (
          <Link
            key={item.id}
            to={`/listings/${item.id}`}
            className="flex flex-col h-full border rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white"
          >
            {/* 1. Fixed aspect ratio box for all covers */}
            <div className="w-full h-90 aspect-[3/2] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            {/* 2. Make the text section flex so footer sticks down */}
            <div className="flex flex-col flex-1 p-4">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.author}</p>
              </div>
              {/* 3. Footer always at bottom */}
              <div className="mt-auto flex items-center justify-between text-xs text-gray-500">
                <div>
                  {item.type === "sale" && (
                    <span className="text-indigo-600 font-bold">
                      ₹{item.price}
                    </span>
                  )}
                  {item.type === "donation" && (
                    <span className="text-green-600 font-semibold">Free</span>
                  )}
                  {item.type === "bogo" && (
                    <span className="text-yellow-600 font-semibold">
                      BOGO Offer
                    </span>
                  )}
                </div>
                <span>{item.condition}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="text-center mt-6">
        <Link
          to="/shop"
          className="inline-block bg-cyan-400 text-white px-5 py-2 rounded hover:bg-cyan-500"
        >
          View All Listings
        </Link>
      </div>
    </section>
  );
};

export default ListingsPreview;
