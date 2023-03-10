import React, { useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaFilter, FaPen, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/CategoryService";
import CategoryTable from "../../components/Tables/DataTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import UpdateCanvas from "../../components/Canvas/UpdateCanvas";

const CategoryManagement = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const handleShowUpdate = () => setShowUpdate(!showUpdate);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
                minWidth: 15,
            },
            {
                Header: "Category Name",
                accessor: "name",
            },
            {
                id: "actions",
                width: 20,
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                            className="mx-2"
                            variant="outline-warning"
                            as={Link}
                            to={`${row.original.id}`}
                        >
                            <FaPen />
                        </Button>
                        <Button
                            variant="outline-danger"
                            className="mx-2"
                            onClick={() =>
                                alert(
                                    `Are you sure want to delete category: ${row.original.id}`
                                )
                            }
                        >
                            <FaTrash />
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );

    const {
        isLoading,
        isFetching,
        isError,
        data: categories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: () =>
            getAllCategories()
                .then((res) => res.data)
                .catch((error) => error),
        initialData: [],
    });

    return (
        <>
            <Row style={{ marginBottom: "1rem" }}>
                <h3 className="display-6">Category Management</h3>
            </Row>
            <Row>
                <Col>
                    <Button onClick={handleShowUpdate}>Add category</Button>
                </Col>
                <Col style={{ display: "flex" }}>
                    <SearchBar />
                </Col>
                <Col className="d-flex justify-content-end">
                    <Button>
                        <FaFilter />
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                <CategoryTable
                    columns={columns}
                    data={categories}
                    isError={isError}
                    isLoading={isLoading}
                    isFetching={isFetching}
                />
            </Row>

            <UpdateCanvas
                name={"category"}
                show={showUpdate}
                handleShow={handleShowUpdate}
            />
        </>
    );
};

export default CategoryManagement;
