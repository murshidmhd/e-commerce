import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ fetchProducts, editProduct, setEditProduct }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    type: "",
    price: "",
    condition: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (editProduct) {
      setFormData({
        title: editProduct.title || "",
        author: editProduct.author || "",
        type: editProduct.type || "",
        price: editProduct.price || "",
        condition: editProduct.condition || "",
        imageUrl: editProduct.imageUrl || "",
      });
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await axios.put(
        `http://localhost:3000/listings/${editProduct.id}`,
        formData
      );
      setEditProduct(null);
    } else {
      await axios.post("http://localhost:3000/listings", formData);
    }

    // Reset form
    setFormData({
      title: "",
      author: "",
      type: "",
      price: "",
      condition: "",
      imageUrl: "",
    });

    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">
        {editProduct ? "Update Product" : "Add Product"}
      </h2>

      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="author"
        value={formData.author}
        onChange={handleChange}
        placeholder="Author"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="type"
        value={formData.type}
        onChange={handleChange}
        placeholder="Type"
        className="border p-2 mr-2"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="condition"
        value={formData.condition}
        onChange={handleChange}
        placeholder="Condition"
        className="border p-2 mr-2"
      />
      <input
        type="text"
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        className="border p-2 mr-2"
      />

      <button
        type="submit"
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        {editProduct ? "Update" : "Add"}
      </button>
      {editProduct && (
        <button
          type="button"
          onClick={() => setEditProduct(null)}
          className="ml-2 bg-gray-400 text-white px-3 py-1 rounded"
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default ProductForm;
