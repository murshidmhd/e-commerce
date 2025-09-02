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
            <div className="w-full h-90 aspect-[3/2] overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col flex-1 p-4">
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.author}</p>
              </div>

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
      <div className="text-center mt-8">
        <Link
          to="/shop"
          className="inline-block relative overflow-hidden bg-cyan-500 text-white font-semibold px-8 py-4 rounded-lg group"
        >
          <span className="relative z-10">View All Listings</span>
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
        </Link>
      </div>
    </section>
  );
};

export default ListingsPreview;
