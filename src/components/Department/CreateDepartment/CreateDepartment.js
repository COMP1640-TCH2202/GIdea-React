import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from "../CreateDepartment/CreateDepartment.module.scss"
import { useNavigate } from 'react-router-dom';
import { createDepartment } from '../../../services/DepartmentService';



const CreateDepartment = () => {

    const [inputData, setInputData] = useState({
        name: '',
        coordinator_name: ''
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        createDepartment()
        .then((res) => {
            alert("Data Posted Successfully")
            navigate('/manage-department')
        })
    }

    return (
            
        <div className="p-5 rounded square border border-success">
            <h1 className='text-center mb-5'>Create New Department</h1>
                <Form onSubmit={() => handleSubmit}>
                    <Form.Group className="mb-5 d-flex">
                    <Form.Label className="w-25 fs-4">Name:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            className="fs-5"
                            name='name'
                            required
                            onChange={e => setInputData({...inputData, name: e.target.value})}
                        />
                    </Form.Group>
                    <Form.Group className="mb-5 d-flex">
                    <Form.Label className="w-25 fs-4">Coordinator name:</Form.Label>
                        <Form.Control
                            type="text"
                            className="fs-5"
                            placeholder="Enter coordinator name"
                            name='coordinator_name'
                            required
                            onChange={e => setInputData({...inputData, coordinator_name: e.target.value})}
                        />
                    </Form.Group>
                    <Button className={styles.Button} type="submit">
                        Register
                    </Button>
                </Form>
            
        </div>
    );
}

export default CreateDepartment;
