import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useRef } from "react";
import {
    Card,
    Button,
    Form,
    CloseButton,
    OverlayTrigger,
    Tooltip,
    Spinner,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaReply } from "react-icons/fa";
import { useAlert } from "../../contexts/AlertProvider";
import { getIdeaComments, submitComment } from "../../services/IdeaService";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import LoadingIndicator from "../Indicator/LoadingIndicator";

const closeReplyToolTip = (props) => {
    return (
        <Tooltip id="button-tooltip" {...props}>
            Clear and close reply
        </Tooltip>
    );
};

const Comment = ({ data }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const replyCommentEl = useRef();
    const author = data.user
        ? `${data.user.first_name} ${data.user.first_name}`
        : "Anonymous";

    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            reply_content: "",
            anonymous: false,
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (reply) => submitComment(reply, data.idea_id),
        onSuccess: (res) => {
            queryClient.setQueryData(["comments", res.data.id], res.data);
            queryClient.invalidateQueries(["comments"]);
            setMessage("Your reply has been submitted");
            handleSuccess();
            reset();
            handleCloseReply();
        },
    });

    const onSubmit = (dt) => {
        const request = {
            content: dt.reply_content,
            anonymous: dt.anonymous,
            parent_id: data.id, // send the id of the replying to comment
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

    const handleOpenReply = () => {
        setReplyOpen(!replyOpen);
        replyCommentEl.current?.focus();
    };

    const handleCloseReply = () => {
        setReplyOpen(false);
        reset();
    };

    const handleEnterSubmit = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(onSubmit)();
        }
    };

    return (
        <>
            <Card
                border="secondary"
                style={{ width: "100%", marginBottom: "1rem" }}
            >
                <Card.Body>
                    <Card.Title as="p">
                        {author} <span>&bull;</span> {data.created_at}
                    </Card.Title>
                    <Card.Text>{data.content}</Card.Text>
                    <div>
                        <Button
                            size="sm"
                            variant="outline-success"
                            onClick={handleOpenReply}
                        >
                            <FaReply /> Reply
                        </Button>

                        {replyOpen && (
                            <OverlayTrigger
                                placement="top"
                                delay={{ show: 250, hide: 400 }}
                                overlay={closeReplyToolTip}
                            >
                                <CloseButton
                                    className="float-end"
                                    aria-label="Hide"
                                    onClick={handleCloseReply}
                                />
                            </OverlayTrigger>
                        )}

                        {replyOpen && (
                            <>
                                <Form className="mt-2">
                                    <Form.Group>
                                        <Controller
                                            name="reply_content"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: true }}
                                            render={({ field }) => (
                                                <Form.Control
                                                    {...field}
                                                    as="textarea"
                                                    rows={2}
                                                    autoFocus
                                                    ref={replyCommentEl}
                                                    placeholder="Reply to author"
                                                    style={{
                                                        width: "100%",
                                                        resize: "none",
                                                    }}
                                                    onKeyDown={
                                                        handleEnterSubmit
                                                    }
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
                                </Form>
                            </>
                        )}
                    </div>
                </Card.Body>
            </Card>
            <ul
                style={{
                    paddingLeft: "1.5rem",
                    borderLeft: "1px solid lightgray",
                }}
            >
                <Comments comments={data.replies} />
            </ul>
        </>
    );
};

const Comments = ({ comments }) => {
    return (
        <div>
            {comments.map((comment) => (
                <Comment data={comment} key={comment.id} />
            ))}
        </div>
    );
};

const CommentList = ({ idea_id }) => {
    const {
        isLoading,
        isFetching,
        isError,
        error,
        data: comments,
    } = useQuery({
        queryKey: ["comments", idea_id],
        queryFn: () => getIdeaComments(idea_id),
    });

    return (
        <div className="overlay-scrollbar" style={{ height: 500 }}>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <>
                    <h5 className="mb-3">Discussions</h5>
                    <Comments comments={comments.data} />

                    {isFetching && (
                        <div className="d-flex justify-content-center align-items-center blur-overlay">
                            <Spinner
                                animation="border"
                                role="status"
                                variant="secondary"
                            >
                                <span className="visually-hidden">
                                    Loading comment...
                                </span>
                            </Spinner>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CommentList;
