import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import { usePagination, useSortBy, useTable } from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";

const DataTable = ({ columns, queryData, isError, isLoading, isFetching }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    } = useTable(
        {
            columns,
            data: queryData.data,
            initialState: { pageIndex: 0, pageSize: 5 },
            autoResetPage: false,
        },
        useSortBy,
        usePagination
    );

    return (
        <>
            <Table responsive striped bordered hover {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th
                                    {...column.getHeaderProps(
                                        column.getSortByToggleProps()
                                    )}
                                >
                                    {column.render("Header")}
                                    <span>
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
                    {page.map((row, i) => {
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
            <Row className="mt-3">
                <Col>
                    <Pagination
                        canNextPage={canNextPage}
                        canPreviousPage={canPreviousPage}
                        gotoPage={gotoPage}
                        pageOptions={pageOptions}
                        pageCount={pageCount}
                        pageIndex={pageIndex}
                        previousPage={previousPage}
                        nextPage={nextPage}
                    />
                </Col>
            </Row>
        </>
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

export default DataTable;
