import React from 'react';
import '../Modal/Modal.scss'
import { Button } from 'react-bootstrap';

const Modal = ({id, title, content, handleDelete, modalShow}) => {
    return (
        <>
            <div className='overlay'>
                <div className='modalContainer'>
                    <div className='title'>
                        <h1>{title}</h1>
                        <button className='closeBtn' onClick={() => modalShow(false)}>X</button>
                    </div>
                    <div className='content'>
                        <h1>{content}</h1>
                    </div>
                    <div className='btnContainer'>
                        <Button variant='success' onClick={() => handleDelete(id)}>Yes</Button>
                        <Button variant='secondary' onClick={() => modalShow(false)}>No</Button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
