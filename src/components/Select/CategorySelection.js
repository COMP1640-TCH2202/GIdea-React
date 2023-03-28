import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import { getAllCategories } from "../../services/CategoryService";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import LoadingIndicator from "../Indicator/LoadingIndicator";

const CategorySelection = ({
    register,
    setValue,
    categoryNameRef,
    categoryName,
}) => {
    const [searchTerm, setSearchTerm] = useState("");

    const {
        isLoading,
        isError,
        error,
        data: categories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

    const handleSelect = (eKey, e) => {
        categoryNameRef.current.innerHTML = e.target.textContent;
        setValue("category", eKey, { shouldValidate: true, shouldDirty: true });
    };

    return (
        <>
            <input {...register("category")} style={{ display: "none" }} />

            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="success" ref={categoryNameRef}>
                    {categoryName ?? "Choose Category"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>
                        <Form.Control
                            placeholder="Type to filter..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                        />
                    </Dropdown.Header>
                    <Dropdown.Divider />

                    {isLoading ? (
                        <LoadingIndicator />
                    ) : isError ? (
                        <ErrorIndicator message={error.message} />
                    ) : (
                        <>
                            {categories.data.map((category) => (
                                <Dropdown.Item
                                    key={category.id}
                                    eventKey={category.id}
                                    value={category.name}
                                >
                                    {category.name}
                                </Dropdown.Item>
                            ))}
                        </>
                    )}
                </Dropdown.Menu>
            </Dropdown>
        </>
    );
};
export default CategorySelection;
