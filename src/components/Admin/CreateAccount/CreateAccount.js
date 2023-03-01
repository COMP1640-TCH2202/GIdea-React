import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from "../CreateAccount/CreateAccount.module.scss"

const CreateAccount = () => {
    return (
        <div className={styles.register_container}>
            <div className={styles.form_container}>
                <Form>
                    <h1 className={styles.register_heading}>Create account</h1>
                    <h2 className={styles.register_subHeading}>Sign in and start managing your ideas!</h2>
                    <Form.Group className="mb-5">
                        <Form.Select className={styles.form}>
                            <option value="admin">Admin</option>
                            <option value="qa">QA</option>
                            <option value="staff">Staff</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control className={styles.form} type="text" placeholder="Department" />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control className={styles.form} type="text" placeholder="Enter account" />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control className={styles.form} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-5">
                        <Form.Control className={styles.form} type="password" placeholder="Confirm password" />
                    </Form.Group>

                    <Form.Group className={clsx(styles.check_container, 'mb-3')} controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>

                    <Button className={styles.Button} type="submit">
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default CreateAccount;
