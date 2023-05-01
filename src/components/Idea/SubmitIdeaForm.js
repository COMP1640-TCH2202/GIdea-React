import React, { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitIdea, uploadDocuments } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";
import CategorySelection from "../Select/CategorySelection";
import { Link } from "react-router-dom";

const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    category: yup.string().required(),
    files: yup
        .mixed()
        .notRequired()
        .test("fileSize", "The file is too large", (value) =>
            value ? value[0].size <= 5000000 : true
        ),
    confirm: yup.bool().oneOf([true]),
});

const SubmitIdeaForm = () => {
    const {
        handleSuccess,
        handleFailure,
        handleWarning,
        setMessage,
        setPathLink,
    } = useAlert();

    const categoryNameRef = useRef(null);

    const {
        register,
        control,
        handleSubmit,
        reset,
        trigger,
        formState,
        setValue,
    } = useForm({
        mode: "onSubmit",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            content: "",
            anonymous: false,
            category: "",
            confirm: false,
        },
    });

    const clearFields = () => {
        reset();
        categoryNameRef.current.innerHTML = "Choose Category";
    };

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (idea) => submitIdea(idea),
        onSuccess: (res) => {
            queryClient.setQueryData(["ideas", res.data.id], res.data);
            queryClient.invalidateQueries(["ideas"]);
        },
    });

    const onSubmit = (data, e) => {
        e.preventDefault();

        const request = {
            title: data.title,
            content: data.content,
            anonymous: data.anonymous,
            category_id: data.category,
        };
        return mutation
            .mutateAsync(request)
            .then(async (res) => {
                if (data.files) {
                    try {
                        const formData = new FormData();
                        formData.append("files", data.files[0]);
                        await uploadDocuments(formData, res.data.id);
                    } catch (error) {
                        setMessage(
                            `We couldn't upload your documents at the moment, please try again later`
                        );
                        handleWarning();
                    }
                }
                setMessage(`Your post has been submitted!`);
                setPathLink(`./profile/submissions/${res.data.id}`);
                handleSuccess();
                clearFields();
                return res.data;
            })
            .catch((err) => {
                if (err.response.status >= 400) {
                    setMessage(err.response.data.message);
                    handleFailure();
                }
            });
    };
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-3" controlId="groupTitle">
                    <Controller
                        name="title"
                        control={control}
                        defaultValue=""
                        render={({ field, fieldState: { invalid, error } }) => (
                            <>
                                <Form.Control
                                    {...field}
                                    placeholder="Give it a title"
                                    onChange={(e) => {
                                        field.onChange(e);
                                        if (error) trigger("title");
                                    }}
                                    isInvalid={invalid}
                                    maxLength={200}
                                />
                                {error && (
                                    <Form.Control.Feedback type="invalid">
                                        {error?.message}
                                    </Form.Control.Feedback>
                                )}
                            </>
                        )}
                    />
                </Form.Group>

                <Form.Group className="my-3" controlId="groupContent">
                    <Controller
                        name="content"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Control
                                {...field}
                                as="textarea"
                                rows={5}
                                placeholder="Tell me what are you thinking?"
                                style={{ resize: "none" }}
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Form.Group>

                <Form.Group
                    className="my-3 d-flex justify-content-between"
                    controlId="groupCategory"
                >
                    <Row className="g-0" style={{ width: "100%" }}>
                        <Col md={3} className="mb-3 mb-md-0">
                            <CategorySelection
                                register={register}
                                setValue={setValue}
                                categoryNameRef={categoryNameRef}
                            />
                            {formState.errors && (
                                <Form.Control.Feedback type="invalid">
                                    {formState.errors?.category}
                                </Form.Control.Feedback>
                            )}
                        </Col>
                        <Col>
                            <Controller
                                name="files"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Form.Control
                                            value={field.value?.filename}
                                            onChange={(e) =>
                                                field.onChange(e.target?.files)
                                            }
                                            isInvalid={fieldState.invalid}
                                            type="file"
                                            accept=".pdf, .doc, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldState.error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                            <Form.Text id="fileHelperText" muted>
                                File import is limited to 5MB. Accepted formats
                                are: doc, docx, dot, pdf.
                            </Form.Text>
                        </Col>
                    </Row>
                </Form.Group>

                <Form.Group
                    className="my-3 d-flex align-items-center justify-content-between"
                    controlId="groupCheck"
                >
                    <Controller
                        name="confirm"
                        control={control}
                        render={({ field }) => (
                            <Form.Check>
                                <Form.Check.Input
                                    type="checkbox"
                                    checked={!!field.value}
                                    onChange={field.onChange}
                                />
                                <Form.Check.Label>
                                    By submitting idea, you agree to our{" "}
                                    <Link to="/tnc">Terms & Conditions</Link>
                                </Form.Check.Label>
                            </Form.Check>
                        )}
                    />

                    <div className="d-flex align-items-center justify-content-end">
                        <Controller
                            name="anonymous"
                            control={control}
                            render={({ field }) => (
                                <Form.Check
                                    type="switch"
                                    label={"Anonymous"}
                                    reverse
                                    checked={!!field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        <Button
                            className="ms-3"
                            variant="success"
                            type="submit"
                            disabled={
                                !formState.isValid || formState.isSubmitting
                            }
                        >
                            {formState.isSubmitting
                                ? "Submitting..."
                                : "Submit"}
                        </Button>
                    </div>
                </Form.Group>
            </Form>
        </>
    );
};

export default SubmitIdeaForm;
