import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function ProductForm({
  setShowForm,
  fetchProducts,
  editProduct,
  setEditProduct,
}) {
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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        {editProduct ? "Update Product" : "Add Product"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Author"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          placeholder="Type"
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          placeholder="Condition"
          className="border p-2 rounded"
        />
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => {
            setShowForm(false);
            toast.success("Product added.");
          }}
        >
          {editProduct ? "Update" : "Add"}
        </button>
        {editProduct  && (
          <button
            type="button"
            onClick={() => {
              setEditProduct(null);
              setShowForm(false);
            }}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
