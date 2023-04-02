import React, { useState } from "react";
import "../MainPage/MainPage.scss";
import { AiFillStar } from "react-icons/ai";
import { BsRocketTakeoffFill, BsFire } from "react-icons/bs";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedIdeas } from "../../services/IdeaService";
import Timeline from "../Timeline/Timeline";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import { Spinner } from "react-bootstrap";

const MainPage = () => {
    const [page, setPage] = useState(1);
    const handleSetPage = (page) => setPage(page);

    const {
        isLoading,
        isFetching,
        isError,
        error,
        data: ideas,
    } = useQuery({
        queryKey: ["ideas", page],
        queryFn: () => getPaginatedIdeas(page),
        keepPreviousData: true,
    });

    return (
        <>
            <div className="container mt-5">
                <div className="ideaSortOptions my-3 bg-secondary-subtle">
                    <div className="optionList p-3">
                        <button className="optionBtn">
                            <AiFillStar className="optionIcon" />
                            Popular
                        </button>
                        <button className="optionBtn">
                            <BsRocketTakeoffFill className="optionIcon" />
                            Most View
                        </button>
                        <button className="optionBtn">
                            <BsFire className="optionIcon" />
                            New
                        </button>
                    </div>
                </div>
                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator message={error.message} />
                ) : (
                    <>
                        <Timeline
                            data={ideas.data.data}
                            meta={ideas.data.meta}
                            links={ideas.data.links}
                            handleSetPage={handleSetPage}
                        />

                        {isFetching && (
                            <Spinner
                                animation="border"
                                role="status"
                                variant="secondary"
                                style={{
                                    position: "fixed",
                                    bottom: 20,
                                    left: 20,
                                }}
                            >
                                <span className="visually-hidden">
                                    Loading page...
                                </span>
                            </Spinner>
                        )}
                    </>
                )}
            </div>
        </>
    );
};

export default MainPage;
