import React from "react";
import "../Idea/Idea.scss";

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import {
    BsFillChatFill,
    BsFillShareFill,
    BsFillSaveFill,
} from "react-icons/bs";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

const Idea = ({ data }) => {
    const {
        id,
        title,
        content,
        comment_closed,
        created_at,
        user = null,
    } = data;

    const author_name = user
        ? `${user.last_name} ${user.first_name}`
        : "Anonymous";

    const navigate = useNavigate();
    const handleNavigate = () =>
        navigate(`./i/${id}`, { state: { data: data, author: author_name } });

    return (
        <div className="ideaContainer" id={id}>
            <div className="voteSection">
                <div className="upvote">
                    <GoArrowUp />
                </div>
                <div className="voteNumber">100</div>
                <div className="downvote">
                    <GoArrowDown />
                </div>
            </div>
            <div className="ideaContent" onClick={handleNavigate}>
                <div>{author_name}</div>
                <div className="publishedTime">{created_at}</div>
                <div className="titleSection">
                    <h3 className="ideaTitle">{title}</h3>
                </div>
                <div className="ideaDetail cutoff-text">
                    {" "}
                    {content}
                    {/*  Show Idea Content (img, paragraph)  */}
                </div>
            </div>
            <div className="btn-group">
                <Button
                    as={Link}
                    to={`./i/${id}#comments`}
                    state={{ data: data, author: author_name }}
                    className={`ideaBtn ${comment_closed && "not-allowed-pointer"}}`}
                    disabled={comment_closed}
                >
                    <BsFillChatFill
                        style={{ fontSize: "24px", paddingRight: "8px" }}
                    />
                    Comments
                </Button>
                <button className="ideaBtn">
                    <BsFillShareFill
                        style={{ fontSize: "24px", paddingRight: "8px" }}
                    />
                    Share
                </button>
                <button className="ideaBtn">
                    <BsFillSaveFill
                        style={{ fontSize: "24px", paddingRight: "8px" }}
                    />
                    Save
                </button>
            </div>
        </div>
    );
};

export default Idea;
