import React from "react";
import Header from "./Header";
import { getCurrentUser } from "../utils/common";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
    const user = getCurrentUser();

    return (
        <div className="app">
            <div className="app-header bg-gi-green">
                <Header user={user} />
            </div>
            <div className="app-content">
                <Outlet />
            </div>
        </div>
    );
};

export default AppLayout;
