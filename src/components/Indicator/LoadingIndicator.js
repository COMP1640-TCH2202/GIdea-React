import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingIndicator = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <Spinner animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h5>Fetching your data...</h5>
        </div>
    );
};

export default LoadingIndicator;
