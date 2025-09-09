import React from "react";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") {
    return <Navigate to="/" />; // redirect if not admin
  }
  return children; // render admin page
}

export default AdminRoute;
