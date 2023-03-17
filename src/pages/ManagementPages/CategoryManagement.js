import React, { useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../services/CategoryService";
import CategoryTable from "../../components/Tables/DataTable";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategoryCanvas from "../../components/Canvas/CategoryCanvas";
import TrashButton from "../../components/Buttons/TrashButton";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";

const CategoryManagement = () => {
    const [showUpdate, setShowUpdate] = useState(false);
    const handleShowUpdate = () => setShowUpdate(!showUpdate);

    const {
        isLoading,
        isFetching,
        isError,
        data: categories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: getAllCategories,
    });

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
                        <TrashButton
                            id={row.original.id}
                            resourceName={row.original.name}
                            resourceType={"categories"}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const queryData = useMemo(() => categories, [categories]);

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                    Something go terribly wrong!
                </div>
            )}
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
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <CategoryTable
                        columns={columns}
                        queryData={queryData}
                        isError={isError}
                        isLoading={isLoading}
                        isFetching={isFetching}
                    />
                )}
            </Row>

            <CategoryCanvas
                name={"category"}
                show={showUpdate}
                handleShow={handleShowUpdate}
            />
        </>
    );
};

export default CategoryManagement;
