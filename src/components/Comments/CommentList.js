import React, { useState, useRef } from "react";
import {
    Card,
    Button,
    Form,
    CloseButton,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { FaReply } from "react-icons/fa";

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

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <Card border="light" style={{ width: "100%" }}>
            <Card.Body>
                <Card.Title as="p">
                    Author <span>&bull;</span> 20/12/2022
                </Card.Title>
                <Card.Text>Comment number {data}</Card.Text>
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
                                        name="reply"
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
                                                onKeyDown={handleEnterSubmit}
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
    );
};

const Comments = ({ data }) => {
    return data;
};

const CommentList = () => {
    const data = [];

    for (let i = 0; i <= 25; i++) data.push(<Comment data={i} />);

    return (
        <div className="overlay-scrollbar" style={{ height: 500 }}>
            <h5>1000 comments</h5>
            <Comments data={data} />
        </div>
    );
};

export default CommentList;
