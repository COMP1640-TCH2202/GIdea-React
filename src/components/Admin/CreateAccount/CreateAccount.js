
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../CreateAccount/CreateAccount.module.scss"
import { useNavigate } from 'react-router-dom';
import * as accountService from '../../../services/AccountsService'



const CreateAccount = () => {
    const [error, setError] = useState(null)
    const [inputData, setInputData] = useState({
        id: null,
        first_name: '',
        last_name: '',
        email: '',
        password: 'password',
        role: '',
        department: null,
        gender: '',
        dob: ''
    });
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
    }

    const navigate = useNavigate();

    const handleEmailChange = (e) => {
        if (!isValidEmail(e.target.value)) {
            setError('Email is invalid')
        } else {
            setError(null)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        accountService.createUser(inputData)
            .then((res) => {
                alert("Data Posted Successfully")
                navigate('/manage-account')
                console.log(inputData)
            })
    }

    return (
        <div className={styles.register_container}>
            <div className={styles.form_container}>
                <div className={styles.form_normal}>
                    <Form onSubmit={() => handleSubmit}>
                        <h1 className={styles.register_heading}>Create account</h1>
                        <h2 className={styles.register_subHeading}>Sign in and start managing your ideas!</h2>
                        <Row>
                            <Col>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        className={styles.form}
                                        name='first_name'
                                        required
                                        onChange={e => setInputData({ ...inputData, first_name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        className={styles.form}
                                        placeholder="Enter last name"
                                        name='last_name'
                                        required
                                        onChange={e => setInputData({ ...inputData, last_name: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        type='date'
                                        className={styles.form}
                                        placeholder="Date of birth"
                                        name='dob'
                                        required
                                        onChange={e => setInputData({ ...inputData, dob: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        type='email'
                                        className={styles.form}
                                        placeholder="Enter email"
                                        name='email'
                                        required
                                        onChange={() => handleEmailChange}
                                    />
                                </Form.Group>
                                {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                                {/* <Form.Group className="mb-5">
                        <Form.Control 
                        className={styles.form} 
                        type="password" 
                        placeholder="Password" 
                        required
                        onChange={e => setInputData({...inputData, password: e.target.value})}
                        />
                    </Form.Group> */}
                                <Form.Group className="mb-5">
                                    <Form.Select className={styles.form}>
                                        <option value="admin">Admin</option>
                                        <option value="coordinator">QA Coordinator</option>
                                        <option value="staff">Staff</option>
                                        <option value="manager">QA Manager</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-5">
                                    <Form.Control
                                        className={styles.form}
                                        placeholder="Department"
                                        onChange={e => setInputData({ ...inputData, department: e.target.value })}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button className={styles.Button} type="submit">
                            Register
                        </Button>
                    </Form>
                </div>

                <div className={styles.form_small}>
                    <Form onSubmit={() => handleSubmit}>
                        <h1 className={styles.register_heading}>Create account</h1>
                        <h2 className={styles.register_subHeading}>Sign in and start managing your ideas!</h2>
                        <Form.Group className="mb-5">
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                className={styles.form}
                                name='first_name'
                                required
                                onChange={e => setInputData({ ...inputData, first_name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                className={styles.form}
                                placeholder="Enter last name"
                                name='last_name'
                                required
                                onChange={e => setInputData({ ...inputData, last_name: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                type='date'
                                className={styles.form}
                                placeholder="Date of birth"
                                name='dob'
                                required
                                onChange={e => setInputData({ ...inputData, dob: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                type='email'
                                className={styles.form}
                                placeholder="Enter email"
                                name='email'
                                required
                                onChange={() => handleEmailChange}
                            />
                        </Form.Group>
                        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                        <Form.Group className="mb-5">
                            <Form.Select className={styles.form}>
                                <option value="admin">Admin</option>
                                <option value="coordinator">QA Coordinator</option>
                                <option value="staff">Staff</option>
                                <option value="manager">QA Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Control
                                className={styles.form}
                                placeholder="Department"
                                onChange={e => setInputData({ ...inputData, department: e.target.value })}
                            />
                        </Form.Group>
                        <Button className={styles.Button} type="submit">
                            Register
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default CreateAccount;
