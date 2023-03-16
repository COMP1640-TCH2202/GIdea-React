import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import { getCurrentUser } from "../utils/common";

const HomeLayout = () => {
    const user = getCurrentUser();
    return (
        <>
        <Header user={user} />
            <Container>
                <Row>
                    <Col>
                        <Outlet />
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default HomeLayout;
