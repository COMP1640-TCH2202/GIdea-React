import React, { useState, useContext, createContext } from "react";

const AlertContext = createContext();

export const useAlert = () => {
    return useContext(AlertContext);
};

export const AlertProvider = ({ children }) => {
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openFailure, setOpenFailure] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [message, setMessage] = useState("");
    const [pathLink, setPathLink] = useState("")

    const handleSuccess = () => {
        setOpenSuccess(true);
    };

    const handleFailure = () => {
        setOpenFailure(true);
    };

    const handleWarning = () => {
        setOpenWarning(true);
    };

    const close = () => {
        setOpenSuccess(false);
        setOpenFailure(false);
        setOpenWarning(false);
    };

    return (
        <AlertContext.Provider
            value={{
                openSuccess,
                openFailure,
                openWarning,
                message,
                pathLink,
                handleSuccess,
                handleFailure,
                handleWarning,
                setMessage,
                setPathLink,
                close,
            }}
        >
            {children}
        </AlertContext.Provider>
    );
};
