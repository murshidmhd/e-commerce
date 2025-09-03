import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductFrom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/products").then((res) => {
      setProducts(res.data);
    });
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Manage Products</h1>
      <ProductForm
        fetchProducts={fetchProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      <table className="w-full bg-white shadow rounded mt-6">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.category}</td>
              <td className="p-2">₹{p.price}</td>
              <td className="p-2">
                <button
                  onClick={() => setEditProduct(p)}
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductList;
