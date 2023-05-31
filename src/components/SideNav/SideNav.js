import React, { useState } from "react";
import { Row, Col, Stack, Navbar, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
    MdDashboard,
    MdFolder,
    MdPeople,
    MdHouse,
    MdCalendarMonth,
} from "react-icons/md";
import { BsChevronBarDown } from "react-icons/bs";

const SideNav = ({ role }) => {
    const { pathname } = useLocation();
    const currentTab = pathname.split("/").at(2);
    const [tab, setTab] = useState(currentTab);

    const changeTab = (value) => {
        setTab(value);
    };

    const styleRemoveBorderRadius = {
        borderRadius: 0,
    };

    return (
        <>
            <Navbar className="p-0" collapseOnSelect expand="md">
                <div className="d-grid d-sm-none p-2 w-100 border-bottom">
                    <Navbar.Toggle
                        aria-controls="navigation"
                        as="button"
                        size="sm"
                        variant="success"
                        className="d-flex justify-content-between align-items-center border-0 text-gi-white"
                        style={{ backgroundColor: "transparent" }}
                        type="button"
                    >
                        <span>Management</span>
                        <BsChevronBarDown />
                    </Navbar.Toggle>
                </div>

                <Navbar.Collapse
                    id="navigation"
                    className="justify-content-center justify-content-lg-start"
                >
                    <Nav>
                        <Stack>
                            <Row>
                                <Col>
                                    <div className="d-grid">
                                        <Nav.Link
                                            eventKey="dashboard"
                                            className="text-gi-white border-0 fs-5 text-center text-lg-start"
                                            style={styleRemoveBorderRadius}
                                            variant="outline-light"
                                            as={Link}
                                            to="./dashboard"
                                            active={tab === "dashboard"}
                                            onClick={() =>
                                                changeTab("dashboard")
                                            }
                                        >
                                            <MdDashboard />
                                            <span className="ms-1 d-inline d-sm-none d-lg-inline">
                                                Dashboard
                                            </span>
                                        </Nav.Link>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className="d-grid">
                                        <Nav.Link
                                            eventKey="category"
                                            className="text-gi-white border-0 fs-5 text-center text-lg-start"
                                            style={styleRemoveBorderRadius}
                                            variant="outline-light"
                                            as={Link}
                                            to="./categories"
                                            active={tab === "categories"}
                                            onClick={() =>
                                                changeTab("categories")
                                            }
                                        >
                                            <MdFolder />
                                            <span className="ms-1 d-inline d-sm-none d-lg-inline">
                                                Categories
                                            </span>
                                        </Nav.Link>
                                    </div>
                                </Col>
                            </Row>
                            {role === "admin" && (
                                <>
                                    <Row>
                                        <Col>
                                            <div className="d-grid">
                                                <Nav.Link
                                                    eventKey="account"
                                                    className="text-gi-white border-0 fs-5 text-center text-lg-start"
                                                    style={
                                                        styleRemoveBorderRadius
                                                    }
                                                    variant="outline-light"
                                                    as={Link}
                                                    to="./accounts"
                                                    active={tab === "accounts"}
                                                    onClick={() =>
                                                        changeTab("accounts")
                                                    }
                                                >
                                                    <MdPeople />
                                                    <span className="ms-1 d-inline d-sm-none d-lg-inline">
                                                        Accounts
                                                    </span>
                                                </Nav.Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-grid">
                                                <Nav.Link
                                                    eventKey="department"
                                                    className="text-gi-white border-0 fs-5 text-center text-lg-start"
                                                    style={
                                                        styleRemoveBorderRadius
                                                    }
                                                    variant="outline-light"
                                                    as={Link}
                                                    to="./departments"
                                                    active={
                                                        tab === "departments"
                                                    }
                                                    onClick={() =>
                                                        changeTab("departments")
                                                    }
                                                >
                                                    <MdHouse />
                                                    <span className="ms-1 d-inline d-sm-none d-lg-inline">
                                                        Departments
                                                    </span>
                                                </Nav.Link>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div className="d-grid">
                                                <Nav.Link
                                                    eventKey="event"
                                                    className="text-gi-white border-0 mb-3 fs-5 text-center text-lg-start"
                                                    style={
                                                        styleRemoveBorderRadius
                                                    }
                                                    variant="outline-light"
                                                    as={Link}
                                                    to="./events"
                                                    active={tab === "events"}
                                                    onClick={() =>
                                                        changeTab("events")
                                                    }
                                                >
                                                    <MdCalendarMonth />
                                                    <span className="ms-1 d-inline d-sm-none d-lg-inline">
                                                        Events
                                                    </span>
                                                </Nav.Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </Stack>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

            {/* <Offcanvas
                id="sidenav"
                tabindex="-1"
                responsive="md"
                className="bg-gi-teal"
            >
                <Offcanvas.Header
                    closeButton
                    closeVariant="white"
                    className="border-bottom"
                    data-bs-dismiss="offcanvas"
                    aria-label="Close"
                    data-bs-target="#sidenav"
                >
                    <Offcanvas.Title className="text-gi-white">
                        Management Options
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Stack>
                        <Row>
                            <Col>
                                <div className="d-grid">
                                    <Button
                                        className="border border-0 fs-5 text-center text-lg-start"
                                        style={styleRemoveBorder}
                                        variant="outline-light"
                                        as={Link}
                                        to="./dashboard"
                                        active={tab === "dashboard"}
                                        onClick={() => changeTab("dashboard")}
                                    >
                                        <MdDashboard />
                                        <span className="ms-1 d-none d-lg-inline">
                                            Dashboard
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-grid">
                                    <Button
                                        className="border-0 fs-5 text-center text-lg-start"
                                        style={styleRemoveBorder}
                                        variant="outline-light"
                                        as={Link}
                                        to="./categories"
                                        active={tab === "categories"}
                                        onClick={() => changeTab("categories")}
                                    >
                                        <MdFolder />
                                        <span className="ms-1 d-none d-lg-inline">
                                            Categories
                                        </span>
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        {role === "admin" && (
                            <>
                                <Row>
                                    <Col>
                                        <div className="d-grid">
                                            <Button
                                                className="border-0 fs-5 text-center text-lg-start"
                                                style={styleRemoveBorder}
                                                variant="outline-light"
                                                as={Link}
                                                to="./accounts"
                                                active={tab === "accounts"}
                                                onClick={() =>
                                                    changeTab("accounts")
                                                }
                                            >
                                                <MdPeople />
                                                <span className="ms-1 d-none d-lg-inline">
                                                    Accounts
                                                </span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="d-grid">
                                            <Button
                                                className="border-0 fs-5 text-center text-lg-start"
                                                style={styleRemoveBorder}
                                                variant="outline-light"
                                                as={Link}
                                                to="./departments"
                                                active={tab === "departments"}
                                                onClick={() =>
                                                    changeTab("departments")
                                                }
                                            >
                                                <MdHouse />
                                                <span className="ms-1 d-none d-lg-inline">
                                                    Departments
                                                </span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <div className="d-grid">
                                            <Button
                                                className="border-0 fs-5 text-center text-lg-start"
                                                style={styleRemoveBorder}
                                                variant="outline-light"
                                                as={Link}
                                                to="./events"
                                                active={tab === "events"}
                                                onClick={() =>
                                                    changeTab("events")
                                                }
                                            >
                                                <MdCalendarMonth />
                                                <span className="ms-1 d-none d-lg-inline">
                                                    Events
                                                </span>
                                            </Button>
                                        </div>
                                    </Col>
                                </Row>
                            </>
                        )}
                    </Stack>
                </Offcanvas.Body>
            </Offcanvas> */}
        </>
    );
};

export default SideNav;
