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
import { useAlert } from "./contexts/AlertProvider";
import { ToastContainer, Toast } from "react-bootstrap";
import CreateAccount from "./components/Admin/CreateAccount/CreateAccount";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

function App() {
    const { openSuccess, openFailure, message, close } = useAlert();

    return (
        <>
            <ToastContainer position="top-center" style={{ marginTop: 16 }}>
                <Toast
                    show={openSuccess}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-success border-0"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
                <Toast
                    show={openFailure}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-danger border-0"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <QueryClientProvider client={queryClient}>
                <Routes>
                    
                    <Route path="/login" element={<Login />} />
                    <Route path="create-account" element={<CreateAccount/>} />
                    <Route element={<HomeLayout />}>
                        <Route index element={<HomePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </Route>
                    <Route path="management/*" element={<ManagementRoutes />} />


                    {/* Comment out to disable authentication process */}
                    {/* <Route element={<PublicRoutes />}>
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
                    </Route> */}
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ReactQueryDevtools initialIsOpen />
            </QueryClientProvider>
        </>
    );
}

export default App;
