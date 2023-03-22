import React, { useEffect, useRef } from "react";
import { Col, Form, Row, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CommentList from "../Comments/CommentList";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitComment } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";

const isUpdated = (created_at, updated_at) => {
    let created_date = new Date(created_at);
    let updated_date = new Date(updated_at);

    return created_date === updated_date;
};

const IdeaDetail = () => {
    const {
        hash,
        state: { data: idea_data, author },
    } = useLocation();

    const commentInputEl = useRef();

    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            content: "",
            anonymous: false,
        },
    });

    const onSubmit = (data) => {
        const request = {
            content: data.content,
            anonymous: data.anonymous,
        };

        return mutation
            .mutateAsync(request)
            .then((res) => res.data)
            .catch((err) => {
                if (err.response.status >= 400) {
                    setMessage(err.response.data.message);
                    handleFailure();
                }
            });
    };

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: (comment) => submitComment(comment, idea_data.id),
        onSuccess: (res) => {
            queryClient.setQueryData(["comments", res.data.id], res.data);
            queryClient.invalidateQueries(["comments"]);
            setMessage(`Your comment has been submitted!`);
            handleSuccess();
            reset();
        },
    });

    useEffect(() => {
        if (hash === "#comments") {
            commentInputEl.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            commentInputEl.current?.focus();
        }
    }, [hash]);

    return (
        <>
            <Row className="my-3 justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h3">{idea_data.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                {author} <span>&bull;</span>{" "}
                                {idea_data.created_at}
                                {isUpdated(
                                    idea_data.created_at,
                                    idea_data.updated_at
                                ) && `Edited at: ${idea_data.updated_at}`}
                            </Card.Subtitle>
                            <Card.Text>{idea_data.content}</Card.Text>
                            <hr />
                            <Card.Text className="mt-2">
                                Document display here if has any
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className="mt-3">
                        <Card.Body>
                            <Form
                                className="mb-2"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <Form.Group>
                                    <Controller
                                        name="content"
                                        control={control}
                                        defaultValue=""
                                        rules={{ required: true }}
                                        render={({ field }) => (
                                            <Form.Control
                                                {...field}
                                                as="textarea"
                                                rows={4}
                                                ref={commentInputEl}
                                                placeholder="Comment your thought on this..."
                                                style={{
                                                    width: "100%",
                                                    resize: "none",
                                                }}
                                                size="lg"
                                            />
                                        )}
                                    />
                                </Form.Group>

                                <Form.Group
                                    className="my-1"
                                    controlId="groupCheck"
                                >
                                    <Controller
                                        name="anonymous"
                                        control={control}
                                        render={({ field }) => (
                                            <Form.Check
                                                type="checkbox"
                                                label={"Comment anonymously"}
                                                checked={!!field.value}
                                                onChange={field.onChange}
                                            />
                                        )}
                                    />
                                </Form.Group>

                                <Button
                                    className="mt-3"
                                    variant="outline-success"
                                    type="submit"
                                >
                                    Comment
                                </Button>
                            </Form>
                            <hr />
                            <CommentList idea_id={idea_data.id} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default IdeaDetail;
