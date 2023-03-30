import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import {
    checkOwnership,
    getIdeaDetail,
    updateIdea,
} from "../../services/IdeaService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import ErrorIndicator from "../../components/Indicator/ErrorIndicator";
import { useAlert } from "../../contexts/AlertProvider";
import CategorySelection from "../../components/Select/CategorySelection";

const SubmissionPage = () => {
    const [isPageLoaded, setPageLoaded] = useState(false);
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const idea_id = pathname.split("/").pop();
    const { handleSuccess, handleFailure, setMessage } = useAlert();
    const categoryNameRef = useRef(null);

    useEffect(() => {
        const check = async () => {
            try {
                const response = await checkOwnership(idea_id);
                if (response.status === 200) {
                    setPageLoaded(true);
                }
            } catch (error) {
                if (error.response.status >= 400) {
                    navigate("/404");
                }
            }
        };
        check();
    }, [idea_id, navigate]);

    const queryClient = useQueryClient();
    const {
        isLoading,
        isError,
        error,
        data: submission,
    } = useQuery({
        queryKey: ["idea_edit", idea_id],
        queryFn: async () => {
            const res = await getIdeaDetail(idea_id);
            return res.data;
        },
        onSuccess: (data) => {
            setValue("category", data?.category?.id);
        },
        cacheTime: 0,
    });

    const mutation = useMutation({
        mutationFn: (updated_submission) =>
            updateIdea(updated_submission, idea_id),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["ideas"] });
            queryClient.invalidateQueries({ queryKey: ["submissions"] });
            queryClient.invalidateQueries({ queryKey: ["idea_detail"] });
            setMessage("Successfully updated your submission!");
            handleSuccess();
        },
        onError: () => {
            setMessage("Something go wrong");
            handleSuccess();
        },
    });

    const schema = yup.object({
        title: yup.string().required(),
        content: yup.string().required(),
    });

    const { register, control, handleSubmit, trigger, formState, setValue } =
        useForm({
            mode: "onSubmit",
            reValidateMode: "onChange",
            resolver: yupResolver(schema),
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
            .then((res) => res)
            .catch((err) => {
                if (err.response.status >= 400) {
                    setMessage(err.response.data.message);
                    handleFailure();
                }
            });
    };

    if (!isPageLoaded) return null;

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <Row className="my-3 justify-content-center">
                    <Col md={8}>
                        <h3 className="mb-3">Update Submission</h3>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Form.Group className="my-2" controlId="groupTitle">
                                <Form.Label as="h5">Title</Form.Label>
                                <Controller
                                    name="title"
                                    control={control}
                                    defaultValue={submission?.title}
                                    render={({
                                        field,
                                        fieldState: { invalid, error },
                                    }) => (
                                        <>
                                            <Form.Control
                                                {...field}
                                                as="textarea"
                                                rows={3}
                                                style={{ resize: "none" }}
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

                            <Form.Group
                                className="my-2"
                                controlId="groupContent"
                            >
                                <Form.Label as="h5">Content</Form.Label>
                                <Controller
                                    name="content"
                                    control={control}
                                    defaultValue={submission?.content}
                                    render={({ field, fieldState }) => (
                                        <Form.Control
                                            {...field}
                                            as="textarea"
                                            rows={10}
                                            style={{ resize: "none" }}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </Form.Group>

                            <Form.Group
                                className="my-2 d-flex align-items-center justify-content-between"
                                controlId="groupCheck"
                            >
                                <CategorySelection
                                    register={register}
                                    setValue={setValue}
                                    categoryNameRef={categoryNameRef}
                                    categoryName={submission?.category?.name}
                                />
                                {formState.errors && (
                                    <Form.Control.Feedback type="invalid">
                                        {formState.errors?.category}
                                    </Form.Control.Feedback>
                                )}

                                <Controller
                                    name="anonymous"
                                    control={control}
                                    defaultValue={
                                        // FAILING HERE BECAUSE AUTHOR ALWAYS GET AUTHOR DETAIL therefore always false
                                        submission?.user ? false : true
                                    }
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
                            </Form.Group>

                            <div className="d-flex justify-content-end">
                                <Button
                                    className="mt-3 me-3"
                                    variant="danger"
                                    onClick={() => navigate(-1)}
                                >
                                    Cancle
                                </Button>

                                <Button
                                    className="mt-3"
                                    variant="success"
                                    type="submit"
                                    disabled={
                                        !formState.isValid ||
                                        formState.isSubmitting ||
                                        !formState.isDirty ||
                                        formState.isSubmitSuccessful
                                    }
                                >
                                    {formState.isSubmitting
                                        ? "Saving..."
                                        : "Save"}
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            )}
        </>
    );
};

export default SubmissionPage;
