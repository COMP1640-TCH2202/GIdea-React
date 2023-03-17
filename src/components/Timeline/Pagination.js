import React from "react";
import Pagination from "react-bootstrap/Pagination";

const TimelinePagination = ({ meta, handleSetPage }) => {
    let isPageOutOfRange;

    return (
        <Pagination className="d-flex justify-content-center">
            {meta.links.slice(1, -1).map((page) => {
                const currentPage = page.label * 1;
                if (
                    currentPage === 1 ||
                    currentPage === meta.last_page ||
                    Math.abs(page.label - meta.current_page) <= 2
                ) {
                    isPageOutOfRange = false;
                    return (
                        <Pagination.Item
                            key={page.label}
                            active={page.active}
                            onClick={() => handleSetPage(page.label)}
                        >
                            {page.label}
                        </Pagination.Item>
                    );
                }
                if (!isPageOutOfRange) {
                    isPageOutOfRange = true;
                    return <Pagination.Ellipsis key={"ellipsis"} />;
                }
                return null;
            })}
        </Pagination>
    );
};

export default TimelinePagination;
