import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Ragister";
import Navbar from "./features/auth/Navbar";
// import HomePage from "./components /Home";
import SlideShow from "./components /Home";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<SlideShow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
