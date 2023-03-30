import React, { useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitIdea } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";
import CategorySelection from "../Select/CategorySelection";
import { Link } from "react-router-dom";

const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
    category: yup.string().required(),
    confirm: yup.bool().oneOf([true]),
});

const SubmitIdeaForm = () => {
    const { handleSuccess, handleFailure, setMessage, setPathLink } =
        useAlert();

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

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (idea) => submitIdea(idea),
        onSuccess: (res) => {
            queryClient.setQueryData(["ideas", res.data.id], res.data);
            queryClient.invalidateQueries(["ideas"]);
            setMessage(`Your post has been submitted!`);
            setPathLink(`./profile/submissions/${res.data.id}`);
            handleSuccess();
            categoryNameRef.current.innerHTML = "Choose Category";
            reset();
        },
    });

    const onSubmit = (data) => {
        const request = {
            title: data.title,
            content: data.content,
            anonymous: data.anonymous,
            category_id: data.category,
        };
        return mutation
            .mutateAsync(request)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response.status === 400) {
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

                <Form.Group className="my-3" controlId="groupCategory">
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
