import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { getAllDepartments } from "../../../../services/DepartmentService";
import { useForm } from "react-hook-form";
import { createUser } from "../../../../services/AccountService";
import { useNavigate } from "react-router-dom";

const CreateFormView = ({schema}) => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        getDepartments();
    }, []);

    const getDepartments = () => {
        getAllDepartments().then((res) => {
            setDepartments(res.data);
        });
    };
    const validateAge = (e) => {
        const currentYear = new Date().getFullYear();
        const year = e.target.value.split("-")[0];
        const age = currentYear - year;
        if (age < 18) setError("Staff must be above 18 years old");
    };
    const onSubmit = (data) => {
        const request = {
            last_name: data.last_name,
            first_name: data.first_name,
            email: data.email,
            role: data.role,
            dob: data.dob,
            gender: data.gender,
            department_id: data.department_id,
        };
        console.log(request);
        createUser(request)
            .then((res) => {
                alert("Data Posted Successfully");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleReturn = () => navigate("/management/accounts");

    return (
        <>
            <Row className="d-flex justify-content-center">
                <Col xs={6}>
                    <Card body>
                        <Form
                            onSubmit={handleSubmit(onSubmit)}
                            className="p-3 d-grid gap-3"
                        >
                            <Row>
                                <Form.Group as={Col} xs={6}>
                                    <Form.Label>Last Name:</Form.Label>
                                    <Form.Control
                                        // className={styles.form}
                                        placeholder="Enter last name"
                                        name="last_name"
                                        required
                                        {...register("last_name")}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} xs={6}>
                                    <Form.Label>First Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter first name"
                                        name="first_name"
                                        required
                                        {...register("first_name")}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Label>Gender:</Form.Label>
                                <Form.Group>
                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Male"
                                        name="gender"
                                        value={1}
                                        {...register("gender")}
                                    />

                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Female"
                                        name="gender"
                                        value={2}
                                        {...register("gender")}
                                    />

                                    <Form.Check
                                        inline
                                        type="radio"
                                        label="Others"
                                        name="gender"
                                        value={0}
                                        {...register("gender")}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Date of Birth:</Form.Label>
                                    <Form.Control
                                        type="date"
                                        placeholder="Date of birth"
                                        name="dob"
                                        required
                                        {...register("dob")}
                                        onChange={validateAge}
                                    />
                                </Form.Group>
                                {error && (
                                    <h2 style={{ color: "red" }}>{error}</h2>
                                )}
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="e.g: johndoe@example.com"
                                        name="email"
                                        required
                                        {...register("email")}
                                    />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Role:</Form.Label>
                                    <Form.Select {...register("role")}>
                                        <option value="">-No-option-</option>
                                        <option value="staff">Staff</option>
                                        <option value="coordinator">
                                            QA Coordinator
                                        </option>
                                        <option value="manager">
                                            QA Manager
                                        </option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group>
                                    <Form.Label>Department:</Form.Label>
                                    <Form.Select
                                        placeholder="Department"
                                        {...register("department_id")}
                                    >
                                        {departments.map((department) => {
                                            return (
                                                <option
                                                    value={department.id}
                                                    key={department.id}
                                                >
                                                    {department.name}
                                                </option>
                                            );
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </Row>

                            <Row className="mt-5">
                                <Button variant="success" type="submit">
                                    Create Account
                                </Button>
                                <Button
                                    className="mt-3"
                                    variant="secondary"
                                    onClick={handleReturn}
                                >
                                    Return
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default CreateFormView;
