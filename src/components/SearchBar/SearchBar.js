import React from "react";
import { Form } from "react-bootstrap";
import { useAsyncDebounce } from "react-table";

const SearchBar = ({
    preGlobalFilteredRows,
    globalFilter,
    setGlobalFilter,
}) => {
    const count = preGlobalFilteredRows.length;
    const [value, setValue] = React.useState(globalFilter);
    const onChange = useAsyncDebounce((value) => {
        setGlobalFilter(value || undefined);
    }, 300);

    return (
        <Form.Group>
            <Form.Control
                className="search-bar"
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChange(e.target.value);
                }}
                placeholder={`Search ${count} records...`}
            />
        </Form.Group>
    );
};

export default SearchBar;
