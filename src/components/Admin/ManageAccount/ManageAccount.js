import React from 'react';
import styles from '../ManageAccount/ManageAccount.module.scss'
import Navbar from '../../Navbar/Navbar';
import { Routes,Route,Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import CreateAccount from '../CreateAccount/CreateAccount';
const ManageAccount = () => {
    return (
        <div>
            <h1 style={{ textAlign: 'center', marginTop: "2em" }}>Account Management</h1>
            <div className={styles.add_btn}>
                <Link to='/create-account'>Create new account</Link>
            </div>
            <div><i class="fa fa-pencil" aria-hidden="true"></i> </div>
            <table>
                <thead>
                    <tr>
                        <th>Account Name</th>
                        <th>Role</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td data-label = "account-name">Hieu Do</td>
                        <td data-label = "role">Staff</td>
                        <td data-label = "department">Computing</td>
                        <td data-label = "status">Online</td>
                        <td>
                            <button>
                                {/* <i class="fa fa-pencil" aria-hidden="true"></i> */}
                                </button>
                            <button><i class="fa fa-trash" aria-hidden="true"></i></button>
                        </td>
                    </tr>
                    <tr>
                        <td data-label = "account-name">Hieu Do</td>
                        <td data-label = "role">Staff</td>
                        <td data-label = "department">Computing</td>
                        <td data-label = "status">Online</td>
                        <td>
                            
                        </td>
                    </tr>
                    <tr>
                        <td data-label = "account-name">Hieu Do</td>
                        <td data-label = "role">Staff</td>
                        <td data-label = "department">Computing</td>
                        <td data-label = "status">Online</td>
                        <td>
                            
                        </td>
                    </tr>                
                </tbody>
            </table>
            <Routes>
                <Route path='/create-account' element={<CreateAccount />} />
            </Routes>
        </div>
        
    );
}

export default ManageAccount;
