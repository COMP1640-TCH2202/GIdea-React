import React from "react";
import { Row, Col, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const SideNav = ({ role }) => {
    return (
        <Stack gap={2}>
            {role === "manager" && (
                <>
                    <Row>
                        <Col>
                            <div className="d-grid gap-2">
                                <Button
                                    variant="outline-dark"
                                    as={Link}
                                    to="manager"
                                >
                                    Dashboard
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
                                    to="manager/ideas"
                                >
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
                                    to="manager/categories"
                                >
                                    Categories
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
