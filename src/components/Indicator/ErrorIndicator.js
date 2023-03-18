import React from "react";

const ErrorIndicator = ({message}) => {
    return (
        <div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
            {message}
        </div>
    );
};

export default ErrorIndicator;
