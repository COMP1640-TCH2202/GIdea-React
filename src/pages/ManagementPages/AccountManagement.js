import React, { useMemo } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "../../services/AccountService";
import EditButton from "../../components/Buttons/EditButton";
import TrashButton from "../../components/Buttons/TrashButton";
import AccountTable from "../../components/Tables/DataTable";
import { dateFormatter } from "../../utils/common";
import AddButton from "../../components/Buttons/AddButton";

const AccountManagement = () => {
    const {
        isLoading,
        isError,
        data: accounts,
    } = useQuery({
        queryKey: ["accounts"],
        queryFn: async () => {
            const response = await getAllUsers();
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
                Header: "Name",
                accessor: (row) => `${row.last_name} ${row.first_name}`,
                id: "name",
                width: 220,
            },
            {
                Header: "Email",
                accessor: "email",
                width: 240,
            },
            {
                Header: "Gender",
                accessor: "gender",
                disableGlobalFilter: true,
                width: 100,
            },
            {
                Header: "Date of Birth",
                accessor: (row) => dateFormatter(row.dob, "en-UK"),
                disableGlobalFilter: true,
            },
            {
                Header: "Role",
                accessor: (row) =>
                    row.role.charAt(0).toUpperCase() + row.role.slice(1),
                disableGlobalFilter: true,
                width: 140,
            },
            {
                Header: "Department",
                accessor: (row) => row.department ?? "Not Assigned",
                disableGlobalFilter: true,
                width: 160,
            },
            {
                Header: "Added At",
                accessor: (row) => {
                    return row.created_at
                        ? dateFormatter(row.created_at, "en-UK", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                          })
                        : "NaN";
                },
                disableGlobalFilter: true,
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
                            title="Delete Account"
                            message={
                                <>
                                    <p className="fs-6">
                                        Are you sure want to delete this member?
                                    </p>
                                </>
                            }
                            invalidateQueries={["accounts"]}
                            deleteFn={deleteUser}
                        />
                    </div>
                ),
                disableGlobalFilter: true,
                width: 140,
            },
        ],
        []
    );

    const dataArray = useMemo(() => accounts, [accounts]);

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
                    <AccountTable columns={columns} dataArray={dataArray} />
                )}
            </Row>
        </>
    );
};

export default AccountManagement;
