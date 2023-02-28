import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import styles from "../Navbar/Navbar.module.scss"
const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className={styles.nav_logo}>
                <Link className="navbar-brand" to="">GreenIdea</Link>
                </div>
                <div className={styles.search_container}>
                    <form>
                        <label>
                        </label>
                        <input class="form-control mr-sm-2" type="search" placeholder="Search in GreenIdea" aria-label="Search" />
                    </form>
                </div>
                <div className={styles.nav_icons}>
                    <span className={styles.nav_icon}>Icon 1</span>
                    <span className={styles.nav_icon}>Icon 2 </span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
