import React from "react";
import { Table, Row, Col } from "react-bootstrap";
import {
    useFlexLayout,
    useGlobalFilter,
    usePagination,
    useSortBy,
    useTable,
} from "react-table";
import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "../Pagination/Pagination";
import { BsDatabaseSlash } from "react-icons/bs";
import SearchBar from "../SearchBar/SearchBar";
import "./DataTable.scss";

const DataTable = ({ columns, dataArray, shouldPaginate = true }) => {
    const defaultColumn = React.useMemo(
        () => ({
            width: 200,
        }),
        []
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        headers,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex, globalFilter },
        preGlobalFilteredRows,
        setGlobalFilter,
    } = useTable(
        {
            columns,
            data: dataArray,
            initialState: { pageIndex: 0, pageSize: 10 },
            autoResetPage: false,
            defaultColumn,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useFlexLayout
        // useBlockLayout
    );

    return (
        <>
            <div className="filter-options mb-3">
                <SearchBar
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                />
            </div>

            <div className="table-wrapper">
                <Table bordered hover {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => (
                            <tr
                                className="bg-gi-teal text-gi-white"
                                {...headerGroup.getHeaderGroupProps()}
                            >
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
                        {page.length === 0 && (
                            <tr
                                style={{ height: 400, verticalAlign: "middle" }}
                            >
                                <td
                                    colSpan={headers.length}
                                    className="text-center text-muted"
                                >
                                    <BsDatabaseSlash style={{ fontSize: 80 }} />
                                    <h4 className="mt-3">No data found</h4>
                                </td>
                            </tr>
                        )}
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
            </div>

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
