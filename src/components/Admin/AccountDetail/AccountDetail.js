import { React, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import '../AccountDetail/AccountDetail.module.scss';
const AccountDetail = () => {
    const [account, setAccount] = useState();

    useEffect(() => {
        getAccount();
    }, []);

    const getAccount = () => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
            .then((res) => {
                setAccount(res.data);
            });
    }
    const { id } = useParams()
    return (
        <div style={{width: '70%'}} className='mx-auto'>
            {account && (
                <>
                    <h1 className='text-center'>Account Detail</h1>
                    <Form.Group className="mb-3 d-flex">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control type="text" value={account.name} readOnly ='false'/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={account.email} readOnly ='false'/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label>Address:</Form.Label>
                        <Form.Control type="text" value={account.address.street} readOnly ='false'/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={account.username} readOnly = 'false'/>
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex" >
                        <Form.Label>Company:</Form.Label>
                        <Form.Control type="text" value={account.company.name} />
                    </Form.Group>
                    <Button variant='success'>Update</Button>
                </>
            )}
        </div>
    );
}

export default AccountDetail;
