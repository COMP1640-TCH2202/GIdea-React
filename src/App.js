import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "./components/Login/Login";

import ManagementLayout from "./layouts/ManagementLayout";
import HomeLayout from "./layouts/HomeLayout";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import ManagerPage from "./pages/ManagerPages/ManagerPage";
import CoordinatorPage from "./pages/CoordinatorPage";
import AdminPage from "./pages/AdminPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CategoryManagement from "./pages/ManagerPages/CategoryManagement";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route element={<HomeLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="*" element={<NotFoundPage />} />
                    </Route>
                    <Route element={<ManagementLayout />}>
                        <Route
                            element={<ProtectedRoutes allowedRole={"admin"} />}
                        >
                            <Route path="/admin" element={<AdminPage />} />
                        </Route>

                        <Route
                            element={
                                <ProtectedRoutes allowedRole={"manager"} />
                            }
                        >
                            <Route path="/manager">
                                <Route index element={<ManagerPage />} />
                                <Route
                                    path="categories"
                                    element={<CategoryManagement />}
                                />
                            </Route>
                        </Route>

                        <Route
                            element={
                                <ProtectedRoutes allowedRole={"coordinator"} />
                            }
                        >
                            <Route
                                path="/coordinator"
                                element={<CoordinatorPage />}
                            />
                        </Route>
                    </Route>
                </Routes>
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </>
    );
}

export default App;
