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
            <div className="timeline-pagination mt-5">
                <TimelinePagination {...props} />
            </div>
        </>
    );
};

export default Timeline;
