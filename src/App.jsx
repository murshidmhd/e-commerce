import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Ragister";
import Navbar from "./features/auth/Navbar";
// import HomePage from "./components /Home";
import SlideShow from "./components /Home";
import Shop from "./features/products/Shop";
import AddListing from "./features/products/AddListing";
import Cart from "./features/cart-wish/Cart";
import ProtectedRoute from "./features/auth/PortectedRoute";
import Wishlist from "./features/cart-wish/Wish";
import OrderPage from "./features/products/OrderPage";
function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/register"];

  const showNavbar = !hideNavbar.includes(location.pathname);
  // console.log(showNavbar);
  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/" element={<SlideShow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/wishlist" element={<Wishlist />}></Route>
        <Route path="/order" element={<OrderPage />} />
      </Routes>
    </>
  );
}

export default App;
