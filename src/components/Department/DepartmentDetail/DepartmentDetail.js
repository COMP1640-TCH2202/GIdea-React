import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { FcBusinessman } from "react-icons/fc";
import * as departmentService from '../../../services/DepartmentsService'
import '../DepartmentDetail/DepartmentDetail.module.scss';
import { getDetailDepartment } from '../../../services/DepartmentService';

const DepartmentDetail = () => {
    const { register, handleSubmit } = useForm()


    const [departments, setDepartments] = useState({})
    const [updateForm, setUpdateForm] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        getDepartment();

    }, [isUpdating]);

    const getDepartment = () => {
        departmentService.getUserById(id)
            .then((res) => {
                setDepartments(res.data);
            });
    }
    const onSubmit = (data) => {
        const request = {
            name: data.name,
            coordinator_name: data.coordinator_name,
            coordinator_email: data.coordinator_email,
            number_of_members: data.number_of_members
        }
        console.log(request)
        departmentService.updateUser(id, request)
            .then((res) => {
                setDepartments(res.data)
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
        <div className='p-5 mx-auto rounded square border border-success'>
            <h1 className='text-center mb-5'>Department Detail</h1>
            <FcBusinessman fontSize='200px' />
            {departments ? (updateForm ?
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label> Name:</Form.Label>
                        <Form.Control type="text" placeholder='Name' {...register('name')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Coordinator Name:</Form.Label>
                        <Form.Control type="text" placeholder='Coordinator name' {...register('coordinator_name')} />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Coordinator Email:</Form.Label>
                        <Form.Control type="email" placeholder='Coordinator email' {...register('Coordinator email')} />
                    </Form.Group> 

                    <Form.Group className="mb-3" >
                        <Form.Label>Number of name:</Form.Label>
                        <Form.Control type="number" placeholder='Number of members' {...register('number_of_members')} />
                    </Form.Group>
                    <Button type='submit' >Save</Button>
                </Form>
                : <>
                    <p className='mt-3'>
                        Name: {departments.name}
                    </p>
                    <p className='mt-3'>
                        Coordinator Name: {departments.coordianator_name}
                    </p>
                    <p className='mt-3'>
                        Coordinator Email: {departments.coordinator_email}
                    </p>
                    <p className='mt-3'>
                        Number of members: {departments.number_of_members}
                    </p>
                    <Button variant='success' onClick={() => toggle()}>Update</Button>
                </>)
                : null
            }
        </div>
    );
}

export default DepartmentDetail;
