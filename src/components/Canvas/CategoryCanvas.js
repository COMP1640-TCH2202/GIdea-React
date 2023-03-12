import React from "react";
import { Offcanvas, Form, Button, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createCategory } from "../../services/CategoryService";

const schema = yup.object({
    name: yup.string().required("Please provide a name for this category"),
});

const CategoryCanvas = ({ name, ...props }) => {
    const {
        control,
        handleSubmit,
        setError,
        reset,
        formState: { isSubmitting },
    } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        const request = {
            name: data.name,
        };
        console.log("inside: ", isSubmitting);
        return createCategory(request)
            .then((res) => {
                reset({ name: "" });
                props.handleShow();
            })
            .catch((err) => {
                if (err.response.status === 400) {
                    setError("root.serverError", {
                        type: err.response.status,
                        message: err.response.data.message,
                    });
                }
                setError("name", {
                    message: err.response.data.message,
                });
            });
    };

    return (
        <Offcanvas
            show={props.show}
            onHide={props.handleShow}
            placement={"end"}
            backdrop="static"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Add new {name}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3">
                        <Form.Label>Category Name</Form.Label>
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
                                        placeholder="New Category"
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
                        onClick={props.handleShow}
                    >
                        Close
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default CategoryCanvas;
