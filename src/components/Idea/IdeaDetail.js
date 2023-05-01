import React, { useEffect, useRef } from "react";
import { Col, Form, Row, Card, Button, ListGroup } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import CommentList from "../Comments/CommentList";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIdeaDetail, submitComment } from "../../services/IdeaService";
import { useAlert } from "../../contexts/AlertProvider";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import ErrorIndicator from "../Indicator/ErrorIndicator";

const isUpdated = (created_at, updated_at) =>
    new Date(created_at) === new Date(updated_at);

const IdeaDetail = () => {
    const { hash, pathname } = useLocation();

    const navigate = useNavigate();

    const commentInputEl = useRef();

    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const idea_id = pathname.split("/").pop();

    const queryClient = useQueryClient();
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["idea_detail", idea_id],
        initialData: () => {
            queryClient
                .getQueriesData(["ideas"])
                ?.data?.data?.find((idea) => idea.id === parseInt(idea_id));
            queryClient
                .getQueriesData(["submissions"])
                ?.data?.data?.find((sub) => sub.id === parseInt(idea_id));
        },
        queryFn: async () => {
            const res = await getIdeaDetail(idea_id);
            return res.data;
        },
        refetchOnWindowFocus: false,
    });

    const mutation = useMutation({
        mutationFn: (comment) => submitComment(comment, data.id),
        onSuccess: (res) => {
            queryClient.setQueryData(["comments", res.data.id], res.data);
            queryClient.invalidateQueries(["comments"]);
            setMessage(`Your comment has been submitted!`);
            handleSuccess();
            reset();
        },
    });

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
                {isLoading ? (
                    <LoadingIndicator />
                ) : isError ? (
                    <ErrorIndicator message={error.message} />
                ) : (
                    <Col md={8}>
                        <Card style={{ minHeight: 600 }}>
                            <Card.Body>
                                <Card.Title
                                    as="h5"
                                    className="d-flex justify-content-between"
                                >
                                    <div>{data.title}</div>
                                    <div>
                                        {data.is_author && (
                                            <FaPen
                                                className="clickable-icon"
                                                onClick={() =>
                                                    navigate(
                                                        `/profile/submissions/${data.id}`
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                    {data?.user?.full_name ?? "Anonymous"}{" "}
                                    <span>&bull;</span> {data.created_at}
                                    {isUpdated(
                                        data.created_at,
                                        data.updated_at
                                    ) && `Edited at: ${data.updated_at}`}
                                </Card.Subtitle>
                                <Card.Text className="mt-4">
                                    {data.content}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="bg-transparent">
                                <ListGroup variant="flush">
                                    {data.documents.map((doc) => (
                                            <ListGroup.Item key={doc.id}>
                                                <Card.Link
                                                    className="mt-2"
                                                    href={`${process.env.REACT_APP_API_BASEURL}/api/documents/${doc.slug}`}
                                                    target="_blank"
                                                >
                                                    {doc.file_original_name}
                                                </Card.Link>
                                            </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Card.Footer>
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
                                                    label={
                                                        "Comment anonymously"
                                                    }
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
                                <CommentList idea_id={data.id} />
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
        </>
    );
};

export default IdeaDetail;
