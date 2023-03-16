import React from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/common";

const PublicRoutes = () => {
    const location = useLocation();
    const currentUser = getCurrentUser();

    return !currentUser ? (
        <Outlet />
    ) : (
        <Navigate to="/" state={{ from: location }} replace />
    );
};

export default PublicRoutes;
