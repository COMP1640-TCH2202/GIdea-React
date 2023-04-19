import "./App.scss";
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
import ProfilePage from "./pages/PersonalPage/ProfilePage";
import SubmissionPage from "./pages/PersonalPage/SubmissionPage";
import { useAlert } from "./contexts/AlertProvider";
import { ToastContainer, Toast } from "react-bootstrap";
import IdeaDetail from "./components/Idea/IdeaDetail";
import TermsPage from "./pages/TermsPage";

const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 1000 * 15 } },
});

function App() {
    const { openSuccess, openFailure, openWarning, message, close } = useAlert();

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
                    <Toast.Body>
                        {message}{" "}
                    </Toast.Body>
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
                <Toast
                    show={openWarning}
                    autohide={true}
                    delay={3000}
                    onClose={close}
                    className="align-items-center text-bg-warning border-0"
                >
                    <Toast.Body>{message}</Toast.Body>
                </Toast>
            </ToastContainer>

            <QueryClientProvider client={queryClient}>
                <Routes>
                    <Route element={<PublicRoutes />}>
                        <Route path="/login" element={<Login />} />
                    </Route>

                    <Route element={<PrivateRoutes />}>
                        <Route element={<HomeLayout />}>
                            <Route index element={<HomePage />} />
                            <Route path="/tnc" element={<TermsPage />} />
                            <Route path="/profile">
                                <Route index element={<ProfilePage />} />
                                <Route
                                    path="submissions/:id"
                                    element={<SubmissionPage />}
                                />
                            </Route>
                            <Route path="/i/:id" element={<IdeaDetail />} />
                        </Route>
                        <Route
                            path="management/*"
                            element={<ManagementRoutes />}
                        />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </>
    );
}

export default App;
