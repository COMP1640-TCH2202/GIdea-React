import React, { useState } from "react";
import "../Idea/Idea.scss";

import { GoArrowUp, GoArrowDown } from "react-icons/go";
import { BsFillChatFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Link, useNavigate } from "react-router-dom";
import { voteIdea } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";
import { Card, Col, Row } from "react-bootstrap";
import { numFormatter, timesAgoFormatter } from "../../utils/common";
import { FaEye } from "react-icons/fa";

const VoteSection = ({ idea_id, vote_value, votes }) => {
    const [currentVotes, setCurrentVotes] = useState(votes);
    const [vote, setVote] = useState(vote_value);
    const { handleFailure, setMessage } = useAlert();

    const handleVote = (value) => {
        let sendingVote = vote;
        if (value === vote) {
            setCurrentVotes(votes - vote_value);
            setVote(0);
            sendingVote = 0;
        } else {
            if (value > 0 && vote < 0) {
                setCurrentVotes(currentVotes + value + 1);
            } else if (value < 0 && vote > 0) {
                setCurrentVotes(currentVotes + value - 1);
            } else {
                setCurrentVotes(currentVotes + value);
            }
            setVote(value);
            sendingVote = value;
        }
        sendVoteRequest(sendingVote);
    };

    const resetVoteStatus = () => {
        setCurrentVotes(votes);
        setVote(vote_value);
    };

    const sendVoteRequest = async (sendingVote) => {
        try {
            const request = {
                vote: sendingVote,
            };
            await voteIdea(request, idea_id);
        } catch (error) {
            console.log(error);
            setMessage("Some problems occurred, please try again");
            handleFailure();
            resetVoteStatus();
        }
    };

    return (
        <div className="voteSection d-flex flex-column flex-wrap align-content-center">
            <div className="voteArrow">
                <GoArrowUp
                    className={vote === 1 ? "upvotedArrow" : ""}
                    onClick={() => handleVote(1)}
                />
            </div>
            <div className="voteNumber">{numFormatter(currentVotes)}</div>
            <div className="voteArrow">
                <GoArrowDown
                    className={vote === -1 ? "downvotedArrow" : ""}
                    onClick={() => handleVote(-1)}
                />
            </div>
        </div>
    );
};

const Idea = ({ data }) => {
    const {
        id: idea_id,
        title,
        content,
        comment_closed,
        created_at,
        user = null,
        is_author = false,
        votes,
        vote_value = null,
        category = null,
        views = 0,
        comments_count = 0
    } = data;

    const author_name = user
        ? `${user.last_name} ${user.first_name}`
        : "Anonymous";

    const navigate = useNavigate();

    const handleNavigate = () =>
        navigate(`./i/${idea_id}`, {
            state: { data: data, author: author_name },
        });

    return (
        <Card className={`mb-3 ${is_author ? "owned-idea" : ""}`}>
            <Row className="d-flex g-0">
                <Col xs={2} md={1} className="d-flex">
                    <Card.Body className="px-0 text-center">
                        <VoteSection
                            idea_id={idea_id}
                            vote_value={vote_value}
                            votes={votes}
                        />
                    </Card.Body>
                </Col>
                <Col xs={10} md={11} className="d-flex flex-column">
                    <Card.Body className="clickable" onClick={handleNavigate}>
                        <Card.Title>{title}</Card.Title>
                        <Card.Subtitle className="mb-3 text-muted">
                            {author_name} <span>&bull;</span>{" "}
                            {timesAgoFormatter(created_at)}
                            <span className="mx-2">|</span>
                            <div className="d-inline fs-6">
                                <FaEye />
                                <span className="ms-2">{views}</span>
                            </div>
                        </Card.Subtitle>
                        <Card.Subtitle className="mb-2">
                            <Badge
                                bg="info"
                                as={Link}
                                style={{ textDecoration: "none" }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    navigate("/404");
                                }}
                            >
                                category: {category.name}
                            </Badge>
                        </Card.Subtitle>
                        <Card.Text className="cutoff-text">{content}</Card.Text>
                    </Card.Body>
                    <Card.Footer style={{ backgroundColor: "inherit" }}>
                        <Button
                            as={Link}
                            to={`./i/${idea_id}#comments`}
                            state={{ data: data, author: author_name }}
                            className={`ideaBtn ${
                                comment_closed && "not-allowed-pointer"
                            }}`}
                            variant="success"
                            disabled={comment_closed}
                        >
                            <BsFillChatFill
                                style={{
                                    fontSize: "24px",
                                    paddingRight: "8px",
                                }}
                            />
                            <span>Comments</span>
                        </Button>
                        <span className="ms-3 text-muted">{comments_count} discussions going on</span>
                    </Card.Footer>
                </Col>
            </Row>
        </Card>
    );
};

export default Idea;
