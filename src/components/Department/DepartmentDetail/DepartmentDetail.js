/* eslint-disable react-hooks/exhaustive-deps */
import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../DepartmentDetail/DepartmentDetail.module.scss';
import { getDetailDepartment } from '../../../services/DepartmentService';

const DepartmentDetail = () => {
    const [department, setDepartment] = useState();

    useEffect(() => {
        getDepartment();
    }, []);
    console.log(department)

    const { id } = useParams()
    console.log(id)
    const  getDepartment  =  () =>   {
        getDetailDepartment(id)
            .then((res) => {
                setDepartment(res.data);
            });
    }
    return (
        <div  className='p-5 mx-auto rounded square border border-success'>
            {department && (
                <>
                    <h1 className='text-center mb-5'>Department Detail</h1>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label className="w-25 fs-4">Name:</Form.Label>
                        <Form.Control type="text" className="fs-5"  placeholder={department.name}  />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label className="w-25 fs-4">Coordinator name:</Form.Label>
                        <Form.Control type="text" className="fs-5"  placeholder={department.coordinator_name}/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label className="w-25 fs-4">Coordinator email:</Form.Label>
                        <Form.Control type="email" className="fs-5" placeholder={department.coordinator_email}/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label className="w-25 fs-4">Number of members:</Form.Label>
                        <Form.Control type="number" className="fs-5"  placeholder={department.number_of_members}/>
                    </Form.Group>
                    <Button variant='success'>Update</Button>
                </>
            )}
        </div>
    );
}

export default DepartmentDetail;
