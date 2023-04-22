import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import SideNav from "../components/SideNav/SideNav";
import { getCurrentUser } from "../utils/common";
import Header from "./Header";

const ManagementLayout = () => {
    const user = getCurrentUser();

    return (
        <>
            <Header user={user} />
            <Container fluid>
                <Row style={{ margin: "24px 0px" }}>
                    <Col sm={2}>
                        <SideNav role={user?.role} />
                    </Col>
                    <Col sm={true}>
                        <Container fluid>
                            <Row>
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

export const TabLayout = ({tabName}) => {
    return (
        <>
            <Row className="g-0 mb-1">
                <Col className="border border-success-subtle">
                    <h3 className="display-6">{tabName} Management</h3>
                </Col>
            </Row>
            <hr />
            <Outlet />
        </>
    );
};

export default ManagementLayout;
