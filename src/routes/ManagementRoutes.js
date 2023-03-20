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
import ManageAccount from "../components/Admin/ManageAccount/ManageAccount";
import CreateAccount from "../components/Admin/CreateAccount/CreateAccount";
import AccountDetail from "../components/Admin/AccountDetail/AccountDetail";

const ManagementRoutes = () => {
    const location = useLocation();
    return (
        <Routes>
            <Route element={<ManagementLayout />}>
                <Route element={<ProtectedRoutes allowedRoles={["manager", "admin"]} />}>
                    <Route index element={<Dashboard />} />
                    <Route path="categories/*" element={<CategoryManagement />} />
                    <Route path="ideas/*" element={<IdeaManagement />}/>
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
                    <Route index element={<Dashboard />} />

                {/* Keep below line */}
                {/* <Route path="accounts/*" element={<AccountManagement />} /> */}
                <Route path="accounts">
                        <Route index element={<ManageAccount />} />
                        <Route path="create-account" element={<CreateAccount />} />
                        <Route path=":id" element={<AccountDetail />} />
                    </Route>
                    
                    <Route path="departments/*" element={<DepartmentManagement />} />
                    <Route path="events/*" element={<EventManagement />} />
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
