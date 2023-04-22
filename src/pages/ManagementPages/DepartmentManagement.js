import { useQuery } from "@tanstack/react-query";
import React, { useMemo, useState } from "react";
import {
    deleteDepartment,
    getAllDepartments,
} from "../../services/DepartmentService";
import TrashButton from "../../components/Buttons/TrashButton";
import { Button, Col, Row } from "react-bootstrap";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import DepartmentTable from "../../components/Tables/DataTable";
import DepartmentCanvas from "../../components/Canvas/DepartmentCanvas";
import EditButton from "../../components/Buttons/EditButton";
import AddButton from "../../components/Buttons/AddButton";
import { Link } from "react-router-dom";

const DepartmentManagement = () => {
    const {
        isLoading,
        isFetching,
        isError,
        data: departments,
    } = useQuery({
        queryKey: ["departments"],
        queryFn: getAllDepartments,
    });

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Department Name",
                accessor: "name",
            },
            {
                Header: "Coordinator",
                accessor: (row) => row.coordinator_name ?? "Not Assigned",
                id: "coordinator",
            },
            {
                Header: "Coordinator Email",
                accessor: "coordinator_email",
            },
            {
                Header: "Members",
                accessor: "number_of_members",
            },
            {
                id: "actions",
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <EditButton
                            id={row.original.id}
                            resourceType="department"
                            action="Update"
                            variant="outline-warning"
                        />

                        <TrashButton
                            id={row.original.id}
                            resourceType={"department"}
                            message={`You are about to delete department ${row.original.name}, please confirm...`}
                            invalidateQueries={["departments"]}
                            deleteFn={deleteDepartment}
                        />
                    </div>
                ),
            },
        ],
        []
    );

    const queryData = useMemo(() => departments, [departments]);

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3">
                    Something go terribly wrong!
                </div>
            )}
            <Row className="mt-4">
                <Col>
                    <SearchBar />
                </Col>
                <Col>
                    <Button
                        variant="success"
                        className="float-end"
                        as={Link}
                        to="create"
                    >
                        Add Department
                    </Button>
                    {/* <AddButton
                        variant="success"
                        resourceType="departmeƒnt"
                        text="Add Department"
                        action="Add"
                        classes="float-end"
                    /> */}
                </Col>
            </Row>
            <Row className="mt-5">
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <DepartmentTable
                        columns={columns}
                        queryData={queryData}
                        isError={isError}
                        isLoading={isLoading}
                        isFetching={isFetching}
                    />
                )}
            </Row>

            {/* <DepartmentCanvas
                action={"Add new"}
                show={showCanvas}
                handleShow={handleShowCanvas}
            /> */}
        </>
    );
};

export default DepartmentManagement;
