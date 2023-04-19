import React, { useMemo } from "react";
import { Table } from "react-bootstrap";
import { useTable } from "react-table";

const TableData = ({ key, dt }) => {
    const columns = useMemo(
        () => [
            {
                Header: "Title",
                accessor: "title",
            },
            {
                Header: "Author",
                accessor: (row) => row.user?.full_name ?? "Anonymous",
                id: "author",
            },
            {
                Header: "Category",
                accessor: "category.name",
            },
            {
                Header: "Votes",
                accessor: "votes",
            },
            {
                Header: "Posted at",
                accessor: "created_at",
            },
        ],
        []
    );

    const data = useMemo(() => dt, [dt]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({
            columns,
            data,
        });

    return (
        <Table size="sm" striped bordered hover {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render("Header")}
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
                                    <td {...cell.getCellProps()}>
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
};

export default TableData;
