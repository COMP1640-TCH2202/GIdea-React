import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { FcBusinessman } from "react-icons/fc";
import * as departmentService from '../../../services/DepartmentsService'
import * as accountService from '../../../services/AccountsService'
import '../AccountDetail/AccountDetail.module.scss';
const AccountDetail = () => {
    const { register, handleSubmit } = useForm()

    const [account, setAccount] = useState();
    const [departments, setDepartments] = useState({})
    const [updateForm, setUpdateForm] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        getAccount();
        getDepartments();

    }, [isUpdating]);

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
            })
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
        accountService.updateUser(id, request)
            .then((res) => {
                setAccount(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        setUpdateForm(!updateForm)
        setIsUpdating(false)
    };
    const { id } = useParams()
    const toggle = () => {
        setUpdateForm(() => !updateForm)
        setIsUpdating(true)
    }

    return (
        <div style={{ width: '70%' }} className='mx-auto'>
            <h1 className='text-center'>Account Detail</h1>
            <FcBusinessman fontSize='200px' />
            {account ? (updateForm ?
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name:</Form.Label>
                        <Form.Control type="text" placeholder='First name' {...register('first_name')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Last Name:</Form.Label>
                        <Form.Control type="text" placeholder='Last name' {...register('last_name')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" placeholder='Email' {...register('email')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Date Of Birth:</Form.Label>
                        <Form.Control type="date" placeholder='Enter DoB' {...register('dob')} required />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Gender:</Form.Label>
                        <Form.Check
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

                    <Form.Group className="mb-3" >
                        <Form.Label>Role:</Form.Label>
                        <Form.Select placeholder='Role' {...register('role')}>
                            <option value='admin'>admin</option>
                            <option value='coordinator'>coordinator</option>
                            <option value='manager'>manager</option>
                            <option value='staff'>staff</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Department:</Form.Label>
                        <Form.Select placeholder='Department' {...register('department')}>
                            {departments.map(department => {
                                return (
                                    <option value={department.id}>{department.name}</option>
                                )
                            })}
                        </Form.Select>
                    </Form.Group>
                    <Button type='submit' >Save</Button>
                </Form>
                : <>
                    <p className='mt-3'>
                        First Name: {account.first_name}
                    </p>
                    <p className='mt-3'>
                        Last Name: {account.last_name}
                    </p>
                    <p className='mt-3'>
                        Date of Birth: {account.dob}
                    </p>
                    <p className='mt-3'>
                        Gender: {account.gender}
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
