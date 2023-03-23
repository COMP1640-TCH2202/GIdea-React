import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserSubmission } from "../../services/UserService";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import { useFlexLayout, useSortBy, useTable } from "react-table";
import { FaSort, FaSortUp, FaSortDown, FaPen, FaTrash } from "react-icons/fa";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./SubmissionTable.module.scss";

const SubmissionTable = () => {
    const {
        isLoading,
        isError,
        error,
        data: submissions,
    } = useQuery({
        queryKey: ["submissions"],
        queryFn: getUserSubmission,
    });

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
                // maxWidth: 1,
                // width: 1
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: ({ row }) => (
                    <Link to={`/i/${row.original.id}`}>
                        {row.original.title}
                    </Link>
                ),
                // maxWidth: 5,
                // width: 5
            },
            {
                Header: "Created at",
                accessor: "created_at",
                // maxWidth: 2,
                // width: 2,
            },
            // {
            //     Header: "Comments",
            //     accessor: "comments_count",
            // },
            {
                id: "actions",
                Cell: ({ row }) => (
                    <div onClick={(e) => e.stopPropagation()}>
                        <Button
                            as={Link}
                            to={`./submissions/${row.original.id}`}
                            size="sm"
                            variant="outline-primary"
                            className="mx-1"
                        >
                            <FaPen />
                        </Button>
                        <Button
                            size="sm"
                            variant="outline-danger"
                            className="mx-1"
                        >
                            <FaTrash />
                        </Button>
                    </div>
                ),
                // maxWidth: 1,
                // width: 1,
            },
        ],
        []
    );

    const queryData = useMemo(() => submissions, [submissions]);

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <DataTable columns={columns} queryData={queryData} />
            )}
        </>
    );
};

const DataTable = ({ columns, queryData }) => {
    const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
        useTable(
            {
                columns,
                data: queryData.data,
            },
            useSortBy,
            useFlexLayout
        );

    return (
        <div className={styles.tableFixedHead}>
            <Table size="sm" responsive="md" bordered {...getTableProps()}>
                <thead style={{ background: "none" }}>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span style={{ position: "absolute" }}>
                                        {column.isSorted ? (
                                            column.isSortedDesc ? (
                                                <SortButtonDown />
                                            ) : (
                                                <SortButtonUp />
                                            )
                                        ) : (
                                            <SortButtonUnsorted />
                                        )}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <td
                                            {...cell.getCellProps()}
                                            className="text-truncate p-0"
                                        >
                                            {cell.render("Cell")}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

const SortButtonUnsorted = () => {
    return <FaSort style={{ opacity: 0 }} />;
};
const SortButtonUp = () => {
    return <FaSortUp />;
};
const SortButtonDown = () => {
    return <FaSortDown />;
};

export default SubmissionTable;
