import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

const ProtectedRoutes = ({ allowedRoles }) => {
    const location = useLocation();
    const currentUser = getCurrentUser();

    return allowedRoles?.includes(currentUser?.role) ? (
            <Outlet />
        ) : (
            <Navigate to="/404" state={{ from: location }} replace />
        );
    
};

export default ProtectedRoutes;
