import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import styles from "../Navbar/Navbar.module.scss"
import { RiAccountCircleFill } from "react-icons/ri";
// import { AiFillCaretDown } from "react-icons/ai"
import { MdNotifications } from "react-icons/md"
import { Dropdown } from 'react-bootstrap';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className={styles.nav_logo}>
                    <Link className="navbar-brand" to="/">GreenIdea</Link>
                </div>
                <div className={styles.search_container}>
                    <form>
                        <label>
                        </label>
                        <input class="form-control mr-sm-2" type="search" placeholder="Search in GreenIdea" aria-label="Search" />
                    </form>
                </div>
                <div className={styles.nav_icons}>
                    <button className={styles.nav_notification}>
                        <MdNotifications style={{ fontSize: '24px' }} />
                    </button>
                    <Dropdown>
                        <Dropdown.Toggle className={styles.nav_profile}>
                            <RiAccountCircleFill style={{ fontSize: '24px' }} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Link className={styles.sub_item} to="/manage-account">Users Management</Link>
                            <Link className={styles.sub_item} to="/">Logout</Link>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
