import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Ragister";
import Navbar from "./components /layout/Navbar";
// import HomePage from "./components /Home";
import SlideShow from "./Pages/Home";
import Shop from "./Pages/Shop";
import AddListing from "./features/products/AddListing";
import Cart from "./Pages/Cart";
import ProtectedRoute from "./features/auth/PortectedRoute";
import Wishlist from "./Pages/Wish";
import OrderPage from "./features/products/OrderPage";
import Profile from "./features/auth/Profile";
import OrderDetails from "./features/products/OrderDetails";
import ViewDetails from "./features/products/ViewDetails";
import { Toaster } from "react-hot-toast";
import PaymentPage from "./features/products/PaymentPage";
import AdminPage from "./Admin/Pages/AdminPage";

function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/register","/admin"];

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
        <Route path="paymentpage" element={<PaymentPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          // Default options for all toasts
          className: "",
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "10px",
            padding: "12px 16px",
          },
          success: {
            style: {
              background: "#22c55e", // green
              color: "white",
            },
          },
          error: {
            style: {
              background: "#ef4444", // red
              color: "white",
            },
          },
        }}
      />{" "}
    </>
  );
}

export default App;
