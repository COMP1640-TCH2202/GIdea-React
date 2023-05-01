import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller, useForm } from 'react-hook-form';
import { useAlert } from '../../contexts/AlertProvider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createDepartment } from '../../services/DepartmentService';
import { Button, Form, Offcanvas, Spinner } from 'react-bootstrap';


const schema = yup.object({
    name: yup.string().required("Please provide a name for this department"),
});

const DepartmentCanvas = ({action, show, handleShow}) => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const { handleSuccess, setMessage } = useAlert();
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (category) => createDepartment(category),
        onSuccess: (res) => {
            queryClient
                .invalidateQueries(["departments"], { exact: true })
                .then(() => {
                    handleShow();
                    setMessage(`Department ${res?.data?.name} is created`);
                    handleSuccess();
                });
        },
    });

    const onSubmit = (data) => {
        // const request = {
        //     name: data.name,
        // };
        // return mutation
        //     .mutateAsync(request)
        //     .then((res) => {
        //         reset({ name: "" });
        //         handleShow();
        //     })
        //     .catch((err) => {
        //         if (err.response.status === 400) {
        //             setError("root.serverError", {
        //                 type: err.response.status,
        //                 message: err.response.data.message,
        //             });
        //         }
        //         setError("name", {
        //             message: err.response.data.message,
        //         });
        //     });
    };

    return (
        <Offcanvas
            show={show}
            onHide={handleShow}
            placement={"end"}
            backdrop="static"
            style={{width: '30vw'}}
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{action} Department</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Department Name</Form.Label>
                        <Controller
                            name="name"
                            control={control}
                            render={({
                                field,
                                fieldState: { invalid, error },
                            }) => (
                                <>
                                    <Form.Control
                                        {...field}
                                        id="name"
                                        placeholder="e.g.: Marketting, Human Resource"
                                        autoFocus
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
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSubmitting}
                    >
                        Save{" "}
                        {isSubmitting && (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                        )}
                    </Button>
                    <Button
                        className="mx-2"
                        variant="secondary"
                        onClick={handleShow}
                    >
                        Close
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default DepartmentCanvas