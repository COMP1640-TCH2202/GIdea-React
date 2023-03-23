import { React, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { FcBusinessman } from "react-icons/fc";
import * as departmentService from '../../../services/DepartmentsService'
import * as accountService from '../../../services/AccountsService'
import '../AccountDetail/AccountDetail.module.scss';
const AccountDetail = () => {
    const navigate = useNavigate()

    const [account, setAccount] = useState();
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [department, setDepartment] = useState('')
    const [departments, setDepartments] = useState('')

    useEffect(() => {
        getAccount();
        getDepartments();
        
    }, []);

    const getAccount = () => {
        accountService.getUserById(id)
            .then((res) => {
                setAccount(res.data);
            });
    }
    const getDepartments = () => {
        departmentService.getAllDepartments()
            .then((res) => {
                setDepartments(res.data)
                console.log(res.data)
            })
    }
    const { id } = useParams()
    const [updateForm, setUpdateForm] = useState(false)
    const toggle = () => {
        setUpdateForm(() => !updateForm)
    }

    const handleUpdate = async (data) => {
        const request = {
            firstName: data.first_name,
            lastName: data.last_name,
            email: data.email,
            role: data.role,
            department: data.department
        }
        accountService.updateUser(id, request)
            .then((res) => {
                
            })
        
    }
    return (
        <div style={{ width: '70%' }} className='mx-auto'>
            <h1 className='text-center'>Account Detail</h1>
            <FcBusinessman fontSize='200px' />
            {account ? (updateForm ?
                <>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" value={firstName} onChange = {(e) => setFirstName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="email" value={lastName} onChange = {(e) => setLastName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="text" value={email} onChange = {(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Role:</Form.Label>
                        <Form.Select value={role} onChange = {(e)=> setRole(e.target.value)}>
                           <option>admin</option>
                           <option>coordinator</option>
                           <option>manager</option>
                           <option>staff</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Department:</Form.Label>
                        <Form.Select value={department} onChange = {(e)=> setDepartment(e.target.value)}>
                           {departments.map(department => {
                            return (
                                <option>{department.name}</option>
                            )
                           })}
                        </Form.Select>
                    </Form.Group>
                    <Button variant='success' onClick={() => handleUpdate()}>Save</Button>
                </> : <>
                    <p className='mt-3'>
                        First Name: {account.first_name}
                    </p>
                    <p className='mt-3'>
                        Last Name: {account.last_name}
                    </p>
                    <p className='mt-3'>
                        Email: {account.email}
                    </p>
                    <p className='mt-3'>
                        Role: {account.role}
                    </p>
                    <p className='mt-3'>
                        Department: {account.department != null ? account.department : 'None'}
                    </p>
                    <Button variant='success' onClick={() => toggle()}>Update</Button>
                </>)
                : null
            }
        </div>
    );
}

export default AccountDetail;
