import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const EditButton = (props) => {
    const navigate = useNavigate();
    const handleNavigate = (to) => navigate(to);

    return (
        <>
            <Button
                variant={props.variant}
                className="mx-2"
                onClick={() => handleNavigate(`${props.id}/edit`)}
                size={props.size}
            >
                {props.text ?? <FaEdit />}
            </Button>
        </>
    );
};

export default EditButton;
