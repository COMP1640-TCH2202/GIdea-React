import React from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";

const NumberBox = ({ key, ...props }) => {
    return (
        <>
            <Card border="success">
                <Card.Header className="bg-success text-light">Total Ideas Submitted</Card.Header>
                <Card.Body className="text-center text-success-emphasis h1 my-3">{props.totalIdeas} ideas</Card.Body>
            </Card>
            <Card bg="success" border="success" text="light">
                <Card.Header>Top Liked ideas</Card.Header>
                <ListGroup variant="flush">
                    {props.topLiked.map((idea) => (
                        <ListGroup.Item key={idea.id} action as="li">
                            <div className="d-flex justify-content-between">
                                {idea.title}
                                <Badge bg="success">{idea.vote_count}</Badge>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card bg="success" border="success" text="light">
                <Card.Header>Top Disliked ideas</Card.Header>
                <ListGroup variant="flush">
                    {props.topDisliked.map((idea) => (
                        <ListGroup.Item key={idea.id} action as="li">
                            <div className="d-flex justify-content-between">
                                {idea.title}
                                <Badge bg="danger">{idea.vote_count}</Badge>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
            <Card bg="success" border="success" text="light">
                <Card.Header>Top Contributors</Card.Header>
                <ListGroup variant="flush">
                    {props.topContributors.map((author) => (
                        <ListGroup.Item key={author.id} action as="li">
                            <div className="d-flex justify-content-between">
                                {author.last_name} {author.first_name}
                                <Badge bg="warning">
                                    {author.ideas_count} ideas
                                </Badge>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
        </>
    );
};

export default NumberBox;
