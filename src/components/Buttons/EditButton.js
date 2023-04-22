import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";
import DepartmentCanvas from "../Canvas/DepartmentCanvas";

const EditButton = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    return (
        <>
            <Button
                variant={props.variant}
                className="mx-2"
                onClick={handleShow}
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
