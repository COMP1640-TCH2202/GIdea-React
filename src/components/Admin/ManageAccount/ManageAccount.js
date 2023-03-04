import { React, useState, useEffect } from 'react';
import styles from '../ManageAccount/ManageAccount.module.scss'
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import axios from 'axios';

const ManageAccount = () => {
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        viewAllAccounts();
    }, [])

    const viewAllAccounts =  () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setAccounts(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

   const handleDelete = (id, e) => {
    console.log("delete clciked")
            axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setAccounts(accounts.filter(account => account.id !== id));
                console.log(id)
            })
            .catch((err) => {
                console.log(err);
            })
    }
    
    return (
        <div className={styles.list_account}>
            <Navbar />
            <h1 style={{ textAlign: 'center', marginTop: "2em" }}>Account Management</h1>
            <div className={styles.add_btn}>
                <Link to='/create-account'>Create new account</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.map((account, index) => {
                        return (
                            <tr key={index}>
                                <td data-label="account-name">{account.name}</td>
                                <td data-label="role">{account.email}</td>
                                <td data-label="department">{account.username}</td>
                                <td data-label="status">Online</td>
                                <td>
                                    <button className={styles.btn_view}>
                                        <BiDetail/>
                                    </button>
                                    <Link to = {`detail/${account.id}`}>
                                    <button className={styles.btn_edit}>
                                        <BsPencil />
                                    </button>
                                    </Link>
                                    <button className={styles.btn_delete} onClick = {() => handleDelete(account.id)}>
                                        <BsTrashFill />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>

    );
}

export default ManageAccount;
