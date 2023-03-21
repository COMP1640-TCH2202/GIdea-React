import React from "react";
import { Button, Form } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitIdea } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";

const schema = yup.object({
    title: yup
        .string()
        .required(),
    content: yup.string().required(),
});

const SubmitIdeaForm = () => {
    const { handleSuccess, handleFailure, setMessage, setPathLink } =
        useAlert();

    const { control, handleSubmit, reset, trigger, formState } =
        useForm({
            mode: "onSubmit",
            reValidateMode: "onChange",
            resolver: yupResolver(schema),
            defaultValues: {
                title: "",
                content: "",
                anonymous: false,
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
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="my-2" controlId="groupTitle">
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

                <Form.Group className="my-2" controlId="groupContent">
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

                <Form.Group className="my-1" controlId="groupCheck">
                    <Controller
                        name="anonymous"
                        control={control}
                        render={({ field }) => (
                            <Form.Check
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

export default SubmitIdeaForm;
