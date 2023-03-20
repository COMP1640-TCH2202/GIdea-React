import React from "react";
import { Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNav = ({ role }) => {
    return (
        <Stack gap={2}>
            <Row>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="outline-dark" as={Link} to=".">
                            Dashboard
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-grid gap-2">
                        <Button variant="outline-dark" as={Link} to="./ideas">
                            Ideas
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="d-grid gap-2">
                        <Button
                            variant="outline-dark"
                            as={Link}
                            to="./categories"
                        >
                            Categories
                        </Button>
                    </div>
                </Col>
            </Row>
            {role === "admin" && (
                <>
                    <Row>
                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="outline-dark"
                                    as={Link}
                                    to="./accounts"
                                >
                                    Accounts
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="outline-dark"
                                    as={Link}
                                    to="./departments"
                                >
                                    Departments
                                </Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="outline-dark"
                                    as={Link}
                                    to="./events"
                                >
                                    Events
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </>
            )}
        </Stack>
    );
};

export default SideNav;
