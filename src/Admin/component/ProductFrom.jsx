import React, { useState, useEffect } from "react";
import axios from "axios";

function ProductForm({ fetchProducts, editProduct, setEditProduct }) {
  const [formData, setFormData] = useState({ name: "", category: "", price: "" });

  useEffect(() => {
    if (editProduct) setFormData(editProduct);
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editProduct) {
      await axios.put(`http://localhost:3000/products/${editProduct.id}`, formData);
      setEditProduct(null);
    } else {
      await axios.post("http://localhost:3000/products", formData);
    }
    setFormData({ name: "", category: "", price: "" });
    fetchProducts();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="font-semibold mb-2">{editProduct ? "Update Product" : "Add Product"}</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="border p-2 mr-2"/>
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" className="border p-2 mr-2"/>
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="border p-2 mr-2"/>
      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        {editProduct ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default ProductForm;

