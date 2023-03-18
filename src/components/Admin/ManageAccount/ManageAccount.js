import React, { useState, useEffect, useRef } from 'react';
import styles from '../ManageAccount/ManageAccount.module.scss'
import clsx from 'clsx';
import Modal from '../../Modal/Modal';
import Navbar from '../../Navbar/Navbar';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrashFill } from "react-icons/bs";
import * as accountService from "../../../services/AccountsService"


const ManageAccount = () => {
    const selectedId = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [accounts, setAccounts] = useState([]);
    useEffect(() => {
        viewAllAccounts();
    }, [])

    const viewAllAccounts = () => {
       accountService.getAllUsers()
            .then((res) => {
                console.log(res)
                setAccounts(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = (id) => {
        accountService.deleteUser(id)
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
            {showModal && <Modal title='Notification' content='Are you sure to delete this account ?' handleDelete={handleDelete} modalShow={setShowModal} id={selectedId.current} />}
            <Navbar />
            <div className={clsx(styles.list_account, 'container')}>
                <h1 style={{ textAlign: 'center', marginTop: "2em" }}>Account Management</h1>
                <div className={styles.add_btn}>
                    <Link to='./create-account'>Create new account</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Department</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((account, index) => {
                            return (
                                <tr key={index}>
                                    <td data-label="account-id">{account.id}</td>
                                    <td data-label="account-first-name">{account.first_name}</td>
                                    <td data-label="account-last-name">{account.last_name}</td>
                                    <td data-label="email">{account.email}</td>
                                    <td data-label="department">{account.department}</td>
                                    <td data-label="role">{account.role}</td>
                                    <td>
                                        <button className={styles.btn_edit} onClick={() => window.location.href = `/management/accounts/${account.id}`}>
                                            <BsPencil />
                                        </button>
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
