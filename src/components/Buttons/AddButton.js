import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import DepartmentCanvas from '../Canvas/DepartmentCanvas';
import { FaPlusCircle } from 'react-icons/fa';

const AddButton = (props) => {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(!show);

    return (
        <>
            <Button
                variant={props.variant}
                className={props.classes}
                onClick={handleShow}
                size={props.size}
            >
                {props.text ?? <FaPlusCircle />}
            </Button>

            {props.resourceType === "department" && (
                <DepartmentCanvas show={show} handleShow={handleShow} {...props} />
            )}
            
        </>
    );
}

export default AddButton