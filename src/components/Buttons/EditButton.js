import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import DepartmentCanvas from "../Canvas/DepartmentCanvas";
import { useNavigate } from "react-router-dom";

const EditButton = (props) => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const handleShow = () => setShow(!show);
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

            {props.resourceType === "department"  && (
                <DepartmentCanvas show={show} handleShow={handleShow} {...props} />
            )}
        </>
    );
};

export default EditButton;
