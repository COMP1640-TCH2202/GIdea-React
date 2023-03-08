import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

const PrivateRoutes = () => {
    const location = useLocation();
    const currentUser = getCurrentUser();

    return currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default PrivateRoutes;
