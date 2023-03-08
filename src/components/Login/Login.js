import 'bootstrap/dist/css/bootstrap.min.css';
import clsx from 'clsx'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import styles from "../Login/Login.module.scss"
import Navbar from '../Navbar/Navbar';

function Login() {
    return (
        <div className={styles.login_container}>
            <Navbar/>
            <div className={styles.form_container}>
                <Form>
                    <h1 className={styles.login_heading}>Log in</h1>
                    <Form.Group className="mb-4" controlId="formBasicEmail">
                        <Form.Control className={styles.Control} type="text" placeholder="Enter account name" />
                    </Form.Group>

                    <Form.Group className="mb-5" controlId="formBasicPassword">
                        <Form.Control className={styles.Control} type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className={clsx(styles.check_container, 'mb-3')} controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    <Button className={styles.Button} type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>


    )
}

export default Login