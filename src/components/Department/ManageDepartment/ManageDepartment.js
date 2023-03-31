import { React, useState, useEffect } from 'react';
import styles from '../ManageDepartment/ManageDepartment.module.scss'
import clsx from 'clsx';
import Modal from '../../Modal/Modal';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BsPencil, BsTrashFill } from "react-icons/bs";
import { getAllDepartments, deleteDepartment } from '../../../services/DepartmentService';




const ManageDepartment = () => {
    const selectedId = useRef(null)
    const [showModal, setShowModal] = useState(false)
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        viewAllDepartments();
    }, [])

    const viewAllDepartments = () => {
        getAllDepartments()
            .then((res) => {
                setDepartments(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleDelete = (id) => {
        deleteDepartment()
            .then((res) => {
                setDepartments(departments.filter(department => department.id !== id));
                setShowModal(false)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const toggle = () => {
        setShowModal(!showModal);
        console.log(showModal)
    }

    return (
        <>
        {showModal && <Modal title='Notification' content = 'Are you sure to delete this department ?' handleDelete = {handleDelete} modalShow = {setShowModal} id={selectedId.current}/>}
        <div className={clsx(styles.list_department, 'container')}>
            <h1 style={{ textAlign: 'center', marginTop: "2em" }}>Department Management</h1>
            <div className={styles.add_btn}>
                <Link to='./create-department'>Create new department</Link>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Coordinator name</th>
                        <th>Coordinator email</th>
                        <th>Number of member</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {departments.map((department, index) => {
                        return (
                            <tr key={index}>
                                <td data-label="department-name" className="fs-6">{department.name}</td>
                                <td data-label="coordinator-name" className="fs-6">{department.coordinator_name}</td>
                                <td data-label="coordinator-email" className="fs-6">{department.coordinator_email}</td>
                                <td data-label="number-of-member" className="fs-6">{department.number_of_members}</td>
                                <td data-label="status">Online</td>
                                <td>
                                    <Link to={`./${department.id}`}>
                                        <button className={styles.btn_edit}>
                                            <BsPencil />
                                        </button>
                                    </Link>
                                    <button className={styles.btn_delete} onClick={() => {
                                        selectedId.current = department.id
                                        toggle()
                                    }
                                        }>
                                        <BsTrashFill />
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                    
                </tbody>
            </table>
        </div>
    </>
    );
}
export default ManageDepartment;
