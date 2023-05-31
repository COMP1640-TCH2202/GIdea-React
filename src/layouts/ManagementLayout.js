import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { getCurrentUser } from "../utils/common";

const ManagementLayout = () => {
    const user = getCurrentUser();

    return (
        <>
            <Container fluid className="h-100">
                <Row
                    className="d-block d-sm-flex"
                    style={{ height: "inherit" }}
                >
                    <Col sm={1} lg={2} className="g-0 bg-gi-teal">
                        <SideNav role={user?.role} />
                    </Col>

                    <Col sm={11} lg={10}>
                        <Container>
                            <Row className="pt-4">
                                <Col>
                                    <Outlet />
                                </Col>
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default ManagementLayout;
