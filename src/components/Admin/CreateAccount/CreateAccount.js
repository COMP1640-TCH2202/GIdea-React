import axios from 'axios';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from "../CreateAccount/CreateAccount.module.scss"
import { useNavigate } from 'react-router-dom';




const CreateAccount = () => {

    const [inputData, setInputData] = useState({
        name: '',
        email: '',
        username: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://jsonplaceholder.typicode.com/users', inputData)
        .then((res) => {
            alert("Data Posted Successfully")
            navigate('/manage-account')
        })
    }

    return (

        <div className={styles.register_container}>
            <div className={styles.form_container}>
                <Form onSubmit={() => handleSubmit}>
                    <h1 className={styles.register_heading}>Create account</h1>
                    <h2 className={styles.register_subHeading}>Sign in and start managing your ideas!</h2>
                    {/* <Form.Group className="mb-5">
                    <Form.Select className={styles.form}>
                        <option value="admin">Admin</option>
                        <option value="qa">QA</option>
                        <option value="staff">Staff</option>
                    </Form.Select>
                </Form.Group> */}
                    <Form.Group className="mb-5">
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            className={styles.form}
                            name='name'
                            required
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control
                            type="email"
                            className={styles.form}
                            placeholder="Enter email"
                            name='email'
                            required
                            onChange={e => setInputData({...inputData, email: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control
                            type="text"
                            className={styles.form}
                            placeholder="Enter username"
                            name='email'
                            required
                            onChange={e => setInputData({...inputData, username: e.target.value})} 
                        />
                    </Form.Group>
                    {/* <Form.Group className="mb-5">
                    <Form.Control className={styles.form} type="password" placeholder="Confirm password" />
                </Form.Group> */}

                    <Form.Group className={clsx(styles.check_container, 'mb-3')} controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    <Button className={styles.Button} type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateAccount;
