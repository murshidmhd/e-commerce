import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Ragister";
import Navbar from "./components /layout/Navbar";
// import HomePage from "./components /Home";
import SlideShow from "./Pages/Home";
import Shop from "./Pages/Shop";
import AddListing from "./features/products/AddListing";
import Cart from "./features/cart-wish/Cart";
import ProtectedRoute from "./features/auth/PortectedRoute";
import Wishlist from "./features/cart-wish/Wish";
import OrderPage from "./features/products/OrderPage";
import Profile from "./features/auth/Profile";
import OrderDetails from "./features/products/OrderDetails";
import ViewDetails from "./features/products/ViewDetails"
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
        <Route path="/profile" element={<Profile />}></Route>
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
        <Route path="/order/:id" element={<ViewDetails />}></Route>
        <Route path="/orderdetails" element={<OrderDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
