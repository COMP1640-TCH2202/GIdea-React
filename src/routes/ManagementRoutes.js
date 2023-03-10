import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ManagementLayout from "../layouts/ManagementLayout";
import Dashboard from "../pages/ManagementPages/Dashboard";
import CategoryManagement from "../pages/ManagementPages/CategoryManagement";
import IdeaManagement from "../pages/ManagementPages/IdeaManagement";
import AccountManagement from "../pages/ManagementPages/AccountManagement";
import DepartmentManagement from "../pages/ManagementPages/DepartmentManagement";
import ProtectedRoutes from "./ProtectedRoutes";

const ManagementRoutes = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route element={<ManagementLayout />}>
                <Route
                    element={
                        <ProtectedRoutes allowedRoles={["manager", "admin"]} />
                    }
                >
                    <Route index element={<Dashboard />} />
                    <Route
                        path="categories/*"
                        element={<CategoryManagement />}
                    />
                    <Route path="ideas/*" element={<IdeaManagement />}/>
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/404"
                                state={{ from: location }}
                                replace
                            />
                        }
                    />
                </Route>

                <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
                    <Route index element={<Dashboard />} />
                    <Route path="accounts/*" element={<AccountManagement />} />
                    <Route path="departments/*" element={<DepartmentManagement />} />
                    <Route
                        path="*"
                        element={
                            <Navigate
                                to="/404"
                                state={{ from: location }}
                                replace
                            />
                        }
                    />
                </Route>
            </Route>
        </Routes>
    );
};

export default ManagementRoutes;
