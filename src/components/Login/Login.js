import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import styles from "../Login/Login.module.scss";
import { useForm, Controller } from "react-hook-form";
import { login } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from "../../utils/common";

function Login() {
    const navigate = useNavigate();

    const {
        control,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data) => {
        const request = {
            email: data.email,
            password: data.password,
        };

        //Because login() return a Promise so we have to resolve it
        //can also use await
        login(request)
            .then((result) => {
                const user = {
                    lastName: result.data.user.last_name,
                    firstName: result.data.user.first_name,
                    role: result.data.user.role,
                };
                setCurrentUser(user);
                navigate("/");
            })
            .catch((error) => {
                if (error.response.status === 400) {
                    setError("root.serverError", {
                        type: error.response.status,
                        message: error.response.data.message,
                    });
                }
                setError("email", {
                    message: error.response.data.errors?.email,
                });
                setError("password", {
                    message: error.response.data.errors?.password,
                });
            });
    };

    return (
        <div className={styles.login_container}>
            <div className={styles.form_container}>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <h1 className={styles.login_heading}>Log in</h1>

                    <Form.Group className="mb-4">
                        <Controller
                            name="email"
                            control={control}
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <>
                                    <Form.Control
                                        {...field}
                                        id="email"
                                        className={styles.Control}
                                        label="Email"
                                        type="text"
                                        placeholder="Enter account name"
                                        value={field.value}
                                        onChange={field.onChange}
                                        isInvalid={invalid}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error?.message}
                                    </Form.Control.Feedback>
                                </>
                            )}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Controller
                            name="password"
                            control={control}
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <>
                                    <Form.Control
                                        {...field}
                                        id="password"
                                        className={styles.Control}
                                        label="Email"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={field.value}
                                        onChange={field.onChange}
                                        isInvalid={invalid}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {error?.message}
                                    </Form.Control.Feedback>
                                </>
                            )}
                        />
                    </Form.Group>

                    <Form.Group
                        className={clsx(styles.check_container, "mb-3")}
                        controlId="formBasicCheckbox"
                    >
                        <Form.Check type="checkbox" label="Remember me" />
                    </Form.Group>
                    {errors.root?.serverError?.type === 400 && (
                        <p style={{ color: "red" }}>
                            {errors?.root?.serverError?.message}
                        </p>
                    )}
                    <Button className={styles.Button} type="submit">
                        Login
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Login;
