import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import styles from "../Navbar/Navbar.module.scss"
import ManageAccount from '../Admin/ManageAccount/ManageAccount';
const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
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
                    <Link to ="/manage-account">ManageAccount</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
