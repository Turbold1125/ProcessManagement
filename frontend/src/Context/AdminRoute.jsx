import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/userContext";

const AdminRoute = ({ children }) => {
  const { currentUser } = useContext(UserContext);

  if (currentUser?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
