import React from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { submitIdea } from "../services/IdeaService";
import { useAlert } from "../contexts/AlertProvider";

const schema = yup.object({
    title: yup.string().required(),
    content: yup.string().required(),
});

const HomePage = () => {
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const { control, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            content: "",
            anonymous: false,
        },
    });

    const mutation = useMutation({
        mutationFn: (idea) => submitIdea(idea),
        onSuccess: (res) => {
            setMessage(`Your post ${res.data.id} has been submitted!`);
            handleSuccess();
            reset();
        },
    });

    const onSubmit = (data) => {
        const request = {
            title: data.title,
            content: data.content,
            anonymous: data.anonymous,
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
            <div className="p-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-3">
                All submissions are currently posted by user with id 6 because
                authentication is temporary disabled.
            </div>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-2">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Control
                                {...field}
                                id="title"
                                placeholder="Give it a title"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Form.Group>

                <Form.Group className="my-2">
                    <Controller
                        name="content"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Form.Control
                                {...field}
                                id="content"
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

                <Form.Group className="my-1">
                    <Controller
                        name="anonymous"
                        control={control}
                        render={({ field }) => (
                            <Form.Check
                                id="anonymous"
                                type="checkbox"
                                label={"Submit anonymously"}
                                checked={!!field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                </Form.Group>

                <Button
                    className="mt-3"
                    variant="success"
                    type="submit"
                    disabled={!formState.isValid || formState.isSubmitting}
                >
                    {formState.isSubmitting ? "Submitting..." : "Submit"}
                </Button>
            </Form>
        </>
    );
};

export default HomePage;
