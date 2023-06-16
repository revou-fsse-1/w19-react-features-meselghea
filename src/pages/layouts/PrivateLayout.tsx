import React, { useMemo } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  const token = window.sessionStorage.getItem("token");
  const isTokenValid = useMemo(() => {
    if (token) {
      const expirationDate = parseInt(token.split("_")[4]);
      if (expirationDate < new Date().getHours()) {
        sessionStorage.removeItem("token");
        window.location.href = "/";
      }
      return true;
    }
    return false; 
  }, [token]);

  return isTokenValid ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateLayout;