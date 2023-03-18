import React from "react";
import Idea from "../Idea/Idea";
import TimelinePagination from "./Pagination";

const Timeline = ({ data, ...props }) => {
    const ideaList = data;
    return (
        <>
            {ideaList.map((idea) => (
                <Idea data={idea} key={idea.id} />
            ))}
            <TimelinePagination {...props} />
        </>
    );
};

export default Timeline;
