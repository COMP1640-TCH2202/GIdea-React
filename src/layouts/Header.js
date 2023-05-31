import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/UserService";
import { clearUser } from "../utils/common";

const Header = ({ user }) => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await logout();
            if (response.status < 400) {
                clearUser();
                queryClient.clear();
                navigate("/login");
            }
        } catch (error) {
            alert(error.response.status, ": ", error.response.data);
        }
    };

    return (
        <>
            <Navbar expand="lg" style={{ height: "72px" }}>
                <Container fluid>
                    <Navbar.Brand
                        className="fs-3 ms-2 me-auto text-gi-white"
                        as={Link}
                        to="/"
                    >
                        GreenIdea
                    </Navbar.Brand>
                    <NavDropdown
                        title={`${user?.lastName} ${user?.firstName}`}
                        id="nav-dropdown"
                        align="end"
                    >
                        <NavDropdown.Item as={Link} to="/profile">
                            My Account
                        </NavDropdown.Item>
                        {["admin", "manager"].includes(user?.role) && (
                            <NavDropdown.Item
                                as={Link}
                                to="/management/dashboard"
                            >
                                App Management
                            </NavDropdown.Item>
                        )}
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Button} onClick={handleLogout}>
                            Logout
                        </NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
