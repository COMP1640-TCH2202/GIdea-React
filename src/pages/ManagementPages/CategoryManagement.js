import React, { useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import {
    deleteCategory,
    getAllCategories,
} from "../../services/CategoryService";
import CategoryTable from "../../components/Tables/DataTable";
import CategoryCanvas from "../../components/Canvas/CategoryCanvas";
import TrashButton from "../../components/Buttons/TrashButton";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import AddButton from "../../components/Buttons/AddButton";

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
                width: 80,
            },
            {
                Header: "Category Name",
                accessor: "name",
                width: 300,
            },
            {
                Header: "Ideas",
                accessor: "ideas_count",
                disableGlobalFilter: true,
                width: 150,
            },
            {
                id: "actions",
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
                disableGlobalFilter: true,
                width: 150,
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
            <Row className="mb-3">
                <Col>
                    <AddButton handler={handleShowUpdate} />
                </Col>
            </Row>
            <Row>
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
