
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from "../CreateAccount/CreateAccount.module.scss";
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as accountService from '../../../services/AccountsService'
import * as departmentService from '../../../services/DepartmentsService'



const CreateAccount = () => {
    const { register, handleSubmit } = useForm()

    const [error, setError] = useState(null)
    const [departments, setDepartments] = useState([])
    useEffect(() => {
        getDepartments();

    }, []);

    const getDepartments = () => {
        departmentService.getAllDepartments()
            .then((res) => {
                setDepartments(res.data)
            })
    }
    const validateAge = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 18) setError("Staff must be above 18 years old");
    }
    const onSubmit = (data) => {
        const request = {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            role: data.role,
            dob: data.dob,
            gender: data.gender,
            department_id: data.department
        }
        console.log(request)
        accountService.createUser(request)
            .then((res) => {
                alert("Data Posted Successfully")
            })
            .catch((err) => {
                console.log(err)
            })

    }

    return (
        <div>
            <div className="border">
                <Form onSubmit={handleSubmit(onSubmit)} className='p-3'>
                    <h1 className='mb-3 text-center'>Create account</h1>
                    <Row>
                        <Form.Group as={Col}>
                            <Form.Label>First Name:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter first name"
                                className={styles.form}
                                name='first_name'
                                required
                                {...register('first_name')}
                            />
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Label>Last Name:</Form.Label>
                            <Form.Control
                                className={styles.form}
                                placeholder="Enter last name"
                                name='last_name'
                                required
                                {...register('last_name')}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Label>Gender:</Form.Label>
                    <Form.Group className="mb-3 d-flex justify-content-start" >
                        <Form.Check
                            className='mx-2'
                            type='radio'
                            label='Male'
                            name='gender'
                            value={1}
                            {...register('gender')}
                        />

                        <Form.Check
                            type='radio'
                            label='Female'
                            name='gender'
                            value={2}
                            {...register('gender')}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Date of Birth:</Form.Label>
                        <Form.Control
                            type='date'
                            className={styles.form}
                            placeholder="Date of birth"
                            name='dob'
                            required
                            {...register('dob')}
                            onChange={validateAge}
                        />
                    </Form.Group>
                    {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                    <Form.Group className="mb-4">
                        <Form.Control
                            type='email'
                            className={styles.form}
                            placeholder="Enter email"
                            name='email'
                            required
                            {...register('email')}
                        />
                    </Form.Group>
                    <Row className='mb-3'>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Select className={styles.form} {...register('role')}>
                                <option value="admin">Admin</option>
                                <option value="coordinator">QA Coordinator</option>
                                <option value="staff">Staff</option>
                                <option value="manager">QA Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col} className="mb-3">
                            <Form.Select className={styles.form} placeholder='Department' {...register('department')}>
                                {departments.map((department) => {
                                    return (
                                        <option value={department.id}>{department.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Button type="submit">
                        Register
                    </Button>
                </Form>
            </div>

            {/* <div className={styles.form_small}>
                    <Form onSubmit={handleSubmit}>
                        <h1 className={styles.register_heading}>Create account</h1>
                        <h2 className={styles.register_subHeading}>Sign in and start managing your ideas!</h2>
                        <Form.Group className="mb-3">
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
                                onChange={e => setInputData({ ...inputData, email: e.target.value })}
                            />
                        </Form.Group>
                        {error && <h2 style={{ color: 'red' }}>{error}</h2>}
                        <Form.Group className="mb-5">
                            <Form.Select className={styles.form} onChange={e => setInputData({ ...inputData, role: e.target.value })}>
                                <option value="admin">Admin</option>
                                <option value="coordinator">QA Coordinator</option>
                                <option value="staff">Staff</option>
                                <option value="manager">QA Manager</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-5">
                            <Form.Select className={styles.form} placeholder='Department' onChange={e => setInputData({ ...inputData, department: e.target.value })}>
                                {departments.map(department => {
                                    return (
                                        <option value={department.id}>{department.name}</option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
                        <Button className={styles.Button} type="submit">
                            Register
                        </Button>
                    </Form>
                </div> */}

        </div>
    );
}

export default CreateAccount;
