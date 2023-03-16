import React from "react";
import { Pagination } from "react-bootstrap";

const MyPagination = (props) => {
    let isPageOutOfRange;
    return (
        <Pagination className="d-flex justify-content-end">
            <Pagination.First
                onClick={() => props.gotoPage(0)}
                disabled={!props.canPreviousPage}
            />
            <Pagination.Prev
                onClick={() => props.previousPage()}
                disabled={!props.canPreviousPage}
            />

            {props.pageOptions.map((page) => {
                if (
                    page === 0 ||
                    page === props.pageCount - 1 ||
                    Math.abs(page - props.pageIndex) <= 2
                ) {
                    isPageOutOfRange = false;
                    return (
                        <Pagination.Item
                            key={page}
                            active={page === props.pageIndex}
                            onClick={() => props.gotoPage(page)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    );
                }

                if (!isPageOutOfRange) {
                    isPageOutOfRange = true;
                    return <Pagination.Ellipsis key={"ellipsis"} />;
                }
                return null;
            })}

            <Pagination.Next
                onClick={() => props.nextPage()}
                disabled={!props.canNextPage}
            />
            <Pagination.Last
                onClick={() => props.gotoPage(props.pageCount - 1)}
                disabled={!props.canNextPage}
            />
        </Pagination>
    );
};

export default MyPagination;
