import React, { useEffect, useRef } from "react";
import { Col, Form, Row, Card, Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CommentList from "../Comments/CommentList";
import { Controller, useForm } from "react-hook-form";

const IdeaDetail = () => {
    const { hash } = useLocation();
    const commentInputEl = useRef();

    useEffect(() => {
        if (hash === "#comments") {
            commentInputEl.current?.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
            commentInputEl.current?.focus();
        }
    }, [hash]);

    const { control, handleSubmit, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        reset();
    };

    return (
        <>
            <Row className="mt-3 justify-content-center">
                <Col md={8}>
                    <Card>
                        <Card.Body>
                            <Card.Title as="h3">Title</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">
                                Author <span>&bull;</span> 20/12/2022 (Edited
                                at: 10/3/2023)
                            </Card.Subtitle>
                            <Card.Text>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit. Aenean pellentesque lectus nec
                                diam sodales fringilla. Maecenas luctus nisi
                                nulla, nec viverra dolor dictum a. Integer vitae
                                elementum sapien, quis suscipit tellus.
                                Pellentesque faucibus odio at erat dapibus
                                vestibulum. Nam elementum nisi ac libero
                                pretium, at ultrices felis scelerisque. Nulla in
                                sem elementum, gravida magna vel, rhoncus metus.
                                Suspendisse pharetra quam quis varius dignissim.
                                Orci varius natoque penatibus et magnis dis
                                parturient montes, nascetur ridiculus mus.
                                Vivamus nisl metus, vehicula sit amet convallis
                                non, gravida vitae augue. Maecenas eleifend,
                                sapien non finibus fermentum, nunc orci lobortis
                                ante, sit amet convallis leo nibh at diam.
                                Nullam interdum pharetra enim, non ornare urna
                                pellentesque sed. Maecenas consequat commodo
                                turpis, et interdum arcu egestas at. Integer
                                aliquet tristique elit, non luctus est interdum
                                eget. Nunc convallis tristique diam, at sodales
                                orci auctor et. Pellentesque vel aliquam ante.
                                Donec non consectetur tellus. Nulla convallis
                                neque at urna commodo viverra. Aenean vestibulum
                                dapibus magna vitae fringilla. Vivamus vulputate
                                felis nec diam finibus faucibus. Fusce egestas
                                nulla sit amet libero mattis, quis sollicitudin
                                neque rutrum. In quis est at erat gravida
                                tincidunt. Mauris in dignissim sem. Maecenas non
                                porta libero. Etiam vitae velit consectetur,
                                dapibus mauris eu, porta risus. Praesent mi
                                nisl, ultrices blandit malesuada eget, faucibus
                                et mi. Cras sed velit mi. Pellentesque volutpat
                                tellus lacus, sit amet posuere mi accumsan sit
                                amet. Phasellus id vehicula mi. Duis nisi elit,
                                interdum ut aliquam in, aliquam a dui. Quisque
                                pellentesque odio in velit maximus porttitor.
                                Praesent vulputate ligula at sem vehicula
                                porttitor.
                            </Card.Text>
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
                                        name="comment"
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
                                <Button
                                    className="mt-3"
                                    variant="outline-success"
                                    type="submit"
                                >
                                    Comment
                                </Button>
                            </Form>
                            <hr />
                            <CommentList />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default IdeaDetail;
