import { React, useState, useEffect } from 'react';
import styles from '../ManageAccount/ManageAccount.module.scss'
import clsx from 'clsx';
import Modal from '../../Modal/Modal';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrashFill } from "react-icons/bs";

import axios from 'axios';


const ManageAccount = () => {
    const selectedId = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        viewAllAccounts();
    }, [])

    const viewAllAccounts = () => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((res) => {
                setAccounts(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = (id) => {
        axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setAccounts(accounts.filter(account => account.id !== id));
                setShowModal(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const toggle = () => {
        setShowModal(!showModal);
        console.log(showModal)
    }

    return (
        <>
        {showModal && <Modal title='Notification' content = 'Are you sure to delete this account ?' handleDelete = {handleDelete} modalShow = {setShowModal} id={selectedId.current}/>}
        <div className={clsx(styles.list_account, 'container')}>
            <h1 style={{ textAlign: 'center', marginTop: "2em" }}>Account Management</h1>
            <div className={styles.add_btn}>
                <Link to='./create-account'>Create new account</Link>
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
                                    <Link to={`./${account.id}`}>
                                        <button className={styles.btn_edit}>
                                            <BsPencil />
                                        </button>
                                    </Link>
                                    <button className={styles.btn_delete} onClick={() => {
                                        selectedId.current = account.id
                                        toggle()
                                    }
                                        }>
                                        <BsTrashFill />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    </>
    );
}
export default ManageAccount;
