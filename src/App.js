import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Login from "./components/Login/Login";

import HomeLayout from "./layouts/HomeLayout";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";
import ManagementRoutes from "./routes/ManagementRoutes";
import ProfilePage from "./pages/ProfilePage";

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<PrivateRoutes />}>
                        <Route element={<HomeLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/profile" element={<ProfilePage />} />
                        </Route>
                        <Route
                            path="management/*"
                            element={<ManagementRoutes />}
                        />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </>
    );
}

export default App;
