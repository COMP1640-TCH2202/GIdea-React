import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ManagementLayout from "../layouts/ManagementLayout";
import Dashboard from "../pages/ManagementPages/Dashboard";
import CategoryManagement from "../pages/ManagementPages/CategoryManagement";
import IdeaManagement from "../pages/ManagementPages/IdeaManagement";
import AccountManagement from "../pages/ManagementPages/AccountManagement";
import DepartmentManagement from "../pages/ManagementPages/DepartmentManagement";
import EventManagement from "../pages/ManagementPages/EventManagement";
import ProtectedRoutes from "./ProtectedRoutes";
import DepartmentForm from "../components/Admin/Departments/DepartmentForm";
import AccountForm from "../components/Admin/Accounts/AccountForm";
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
                    <Route path="dashboard" element={<Dashboard />} />

                    <Route path="categories">
                        <Route index element={<CategoryManagement />} />
                    </Route>

                    <Route path="ideas" element={<IdeaManagement />} />

                    <Route
                        path="/*"
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
                    <Route path="accounts">
                        <Route index element={<AccountManagement />} />
                        <Route
                            path="create"
                            element={<AccountForm action="create" />}
                        />
                        <Route
                            path=":accId/edit"
                            element={<AccountForm action="edit" />}
                        />
                    </Route>

                    <Route path="departments">
                        <Route index element={<DepartmentManagement />} />
                        <Route
                            path="create"
                            element={<DepartmentForm action="create" />}
                        />
                        <Route
                            path=":deptId/edit"
                            element={<DepartmentForm action="edit" />}
                        />
                    </Route>

                    <Route path="events" element={<EventManagement />} />

                    <Route
                        path="/*"
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
