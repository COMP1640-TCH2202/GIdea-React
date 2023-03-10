import React from "react";
import { Container, Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/UserService";
import { clearUser } from "../utils/common";

const Header = ({ user }) => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await logout();
            if (response.status < 400) {
                clearUser();
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.status, ": ", error.response.data);
        }
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    GreenIdea
                </Navbar.Brand>
                <Nav>
                    <NavDropdown
                        title={`${user?.lastName} ${user?.firstName}`}
                        id="basic-nav-dropdown"
                    >
                        <NavDropdown.Item as={Link} to="profile">
                            My Account
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Button} onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
