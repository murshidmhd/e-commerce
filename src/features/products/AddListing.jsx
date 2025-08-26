// src/components/AddListing.jsx
import React, { useState } from "react";
import axios from "axios";

const initialForm = {
  title: "",
  author: "",
  type: "sale",        // sale | donation | bogo
  price: 0,            // ignored for donation
  condition: "Good",   // e.g. New, Like New, Good, Acceptable
  imageUrl: ""
};

const AddListing = () => {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState(null);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === "price" ? +value : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/listings", form);
      setStatus("Listing added successfully!");
      setForm(initialForm);
    } catch {
      setStatus("Failed to add listing.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Listing</h2>
      {status && <p className="mb-4 text-green-600">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1">Author</label>
          <input
            name="author"
            value={form.author}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="sale">Sale</option>
              <option value="donation">Donation</option>
              <option value="bogo">BOGO Offer</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block mb-1">
              Price {form.type === "donation" ? "(ignored)" : ""}
            </label>
            <input
              name="price"
              type="number"
              min="0"
              value={form.price}
              onChange={handleChange}
              disabled={form.type === "donation"}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div>
          <label className="block mb-1">Condition</label>
          <select
            name="condition"
            value={form.condition}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option>New</option>
            <option>Like New</option>
            <option>Very Good</option>
            <option>Good</option>
            <option>Acceptable</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Cover Image URL</label>
          <input
            name="imageUrl"
            value={form.imageUrl}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
