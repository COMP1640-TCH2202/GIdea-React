import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {
    return (
        <Form className="d-inline-block" style={{width: "20vw"}}>
            <Form.Group>
                <Form.Control placeholder="Search..." />
            </Form.Group>
        </Form>
    );
};

export default SearchBar;
