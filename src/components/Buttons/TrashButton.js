import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import DeleteModal from "../Modals/DeleteModal";

const TrashButton = (props) => {
    const [showModal, setShowModal] = useState(false);
    const handleShowModal = () => setShowModal(!showModal);

    return (
        <>
            <Button
                variant="outline-danger"
                className="mx-2"
                onClick={handleShowModal}
                size={props.size}
            >
                <FaTrash />
            </Button>

            <DeleteModal
                show={showModal}
                onHide={handleShowModal}
                {...props}
            />
        </>
    );
};

export default TrashButton;
