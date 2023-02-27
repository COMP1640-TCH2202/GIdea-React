import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link } from 'react-router-dom';
import styles from "../Login/Login.module.scss"
import clsx from 'clsx'
const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="">Navbar</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <div className='search_container'>
                        <form>
                            <label>
                            </label>
                            <input class="form-control mr-sm-2" type="search" placeholder="" aria-label="Search" />
                        </form>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
