import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import {
    deleteDepartment,
    getAllDepartments,
} from "../../services/DepartmentService";
import TrashButton from "../../components/Buttons/TrashButton";
import { Col, Row } from "react-bootstrap";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import DepartmentTable from "../../components/Tables/DataTable";
import EditButton from "../../components/Buttons/EditButton";
import { useNavigate } from "react-router-dom";
import AddButton from "../../components/Buttons/AddButton";

const DepartmentManagement = () => {
    const {
        isLoading,
        isError,
        data: departments,
    } = useQuery({
        queryKey: ["departments"],
        queryFn: async () => {
            const response = await getAllDepartments();
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
                Header: "Department Name",
                accessor: "name",
                width: 220,
            },
            {
                Header: "Coordinator",
                accessor: (row) => row?.coordinator?.name ?? "Not Assigned",
                id: "coordinator",
                width: 220,
            },
            {
                Header: "Coordinator Email",
                accessor: (row) => row?.coordinator?.email ?? "",
                id: "coordinator_email",
                width: 240,
            },
            {
                Header: "Members",
                accessor: "number_of_members",
                disableGlobalFilter: true,
                width: 120,
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
                            title="Delete Department"
                            message={
                                <>
                                    <p className="text-danger fs-4">Danger! </p>
                                    <p className="text-danger fs-6">
                                        Every members in{" "}
                                        <b>{row.original.name}</b> will be
                                        detached!
                                    </p>
                                </>
                            }
                            invalidateQueries={["departments"]}
                            deleteFn={deleteDepartment}
                        />
                    </div>
                ),
                disableGlobalFilter: true,
            },
        ],
        []
    );

    const dataArray = useMemo(() => departments, [departments]);

    const navigate = useNavigate();
    const addBtnHandler = () => navigate("create");

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-5">
                    Something go terribly wrong!
                </div>
            )}
            <Row className="mb-3">
                <Col>
                    <AddButton handler={addBtnHandler} />
                </Col>
            </Row>
            <Row>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    <DepartmentTable columns={columns} dataArray={dataArray} />
                )}
            </Row>
        </>
    );
};

export default DepartmentManagement;
