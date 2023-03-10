import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ user }) => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    GreenIdea
                </Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                </Nav>
                <Nav>
                    <NavDropdown
                        title={`${user?.lastName} ${user?.firstName}`}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="/profile">
                            My Account
                        </NavDropdown.Item>
                        {user?.role === "staff" ? (
                            <NavDropdown.Item as={Link} to="/submission">
                                My Submissions
                            </NavDropdown.Item>
                        ) : (
                            <NavDropdown.Item as={Link} to="/management">
                                App Management
                            </NavDropdown.Item>
                        )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item
                            as={Button}
                            onClick={() => alert("logged out")}
                        >
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
