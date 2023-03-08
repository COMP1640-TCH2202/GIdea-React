import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = () => {
    return (
        <Form style={{width: "100%"}}>
            <Form.Group>
                <Form.Control placeholder="Search..." />
            </Form.Group>
        </Form>
    );
};

export default SearchBar;
