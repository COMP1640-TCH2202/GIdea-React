import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

const ProtectedRoutes = ({ allowedRole }) => {
    const location = useLocation();
    const currentUser = getCurrentUser();

    return currentUser?.role === allowedRole ? (
        <Outlet />
    ) : (
        <Navigate to="/404" state={{ from: location }} replace />
    );
};

export default ProtectedRoutes;
