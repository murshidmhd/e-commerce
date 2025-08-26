import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Ragister";
import Navbar from "./features/auth/Navbar";
// import HomePage from "./components /Home";
import SlideShow from "./components /Home";
import Shop from "./features/products/Shop";
import AddListing from "./features/products/AddListing";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/shop" element={<Shop />} />
        <Route path="/addlisting" element={<AddListing />} />
        <Route path="/" element={<SlideShow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
