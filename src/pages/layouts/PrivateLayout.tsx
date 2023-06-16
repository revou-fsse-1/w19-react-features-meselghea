import React, { useMemo } from "react";
import { Navigate, Outlet, } from "react-router-dom";


const PrivateLayout: React.FC = () => {
  const token = window.sessionStorage.getItem('token');
  const isAuth = useMemo(() => !!token, [token]);
  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateLayout