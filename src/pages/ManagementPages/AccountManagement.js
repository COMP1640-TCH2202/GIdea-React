import React, { useMemo } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import { useQuery } from "@tanstack/react-query";
import { deleteUser, getAllUsers } from "../../services/AccountService";
import EditButton from "../../components/Buttons/EditButton";
import TrashButton from "../../components/Buttons/TrashButton";
import AccountTable from "../../components/Tables/DataTable";
import { dateFormatter } from "../../utils/common";
import SearchBar from "../../components/SearchBar/SearchBar";

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
            },
            {
                Header: "Name",
                accessor: (row) => `${row.last_name} ${row.first_name}`,
                id: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Gender",
                accessor: "gender",
            },
            {
                Header: "Date of Birth",
                accessor: (row) => dateFormatter(row.dob, "en-UK"),
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Department",
                accessor: (row) => row.department ?? "Not Assigned",
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
            },
        ],
        []
    );

    const dataArray = useMemo(() => accounts, [accounts]);

    return (
        <>
            {isError && (
                <div className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-5">
                    Something go terribly wrong!
                </div>
            )}
            <Row className="mt-4">
                <Col className="d-flex justify-content-end">
                    <SearchBar />
                    <Button
                        variant="success"
                        className="ms-5"
                        as={Link}
                        to="create"
                    >
                        Add Account
                    </Button>
                </Col>
            </Row>
            <Row className="mt-5">
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
