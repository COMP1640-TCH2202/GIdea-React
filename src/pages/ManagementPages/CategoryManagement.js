import React, { useMemo, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import {
    deleteCategory,
    getAllCategories,
} from "../../services/CategoryService";
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
        isError,
        data: categories,
    } = useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            const response = await getAllCategories();
            return response.data;
        },
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
                Header: "Ideas",
                accessor: "ideas_count"
            },
            {
                id: "actions",
                width: 20,
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <TrashButton
                            id={row.original.id}
                            title={"Delete category"}
                            message={
                                <p>
                                    Do you want to delete{" "}
                                    <b>{row.original.name}</b> category?
                                </p>
                            }
                            invalidateQueries={["categories"]}
                            deleteFn={deleteCategory}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const dataArray = useMemo(() => categories, [categories]);

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                    Something go terribly wrong!
                </div>
            )}
            <Row>
                <Col className="d-flex justify-content-end">
                    <SearchBar />
                    <Button
                        className="ms-5"
                        variant="success"
                        onClick={handleShowUpdate}
                    >
                        Add category
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <CategoryTable columns={columns} dataArray={dataArray} />
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
