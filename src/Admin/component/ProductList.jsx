import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:3000/listings");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/listings/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-6">
      {/* Form Section */}
      <div className="mb-8">
        <ProductForm
          fetchProducts={fetchProducts}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Products List</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-lg rounded-xl p-4 border border-gray-200 flex flex-col items-center"
          >
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-32 h-32 object-cover rounded-lg mb-3"
            />
            <h3 className="font-semibold text-lg text-gray-900">
              {product.title}
            </h3>
            <p className="text-gray-600 text-sm">
              by {product.author} ({product.type})
            </p>
            <p className="text-gray-800 font-medium mt-1">₹{product.price}</p>
            <span className="text-xs text-gray-500 mt-1">
              Condition: {product.condition}
            </span>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setEditProduct(product)}
                className="px-4 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
