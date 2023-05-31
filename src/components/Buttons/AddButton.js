import React from "react";
import { Button } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";

const AddButton = ({ handler, ...props }) => {
    return (
        <Button variant="success" onClick={handler}>
            <FaPlus /> New Record
        </Button>
    );
};

export default AddButton;
