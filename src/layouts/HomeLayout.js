import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
    return (
        <Container>
            <Row>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
};

export default HomeLayout;
