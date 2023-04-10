import React from "react";
import { Button, Form, Offcanvas, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAlert } from "../../contexts/AlertProvider";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent } from "../../services/EventService";

const schema = yup.object({
    open_date: yup
        .mixed()
        .notRequired()
        .test("openDate", "Can't be before today", (value) =>
            value ? new Date(value) >= new Date() : true
        ),

    first_closure_date: yup
        .mixed()
        .test("isEmpty", "Required field", (value) => value && value !== "")
        .test(
            "beforeToday",
            "Can't be before today",
            (value) => value && new Date(value) > new Date()
        )
        .test("beforeOpen", "Can't be before open date", (value, context) => {
            if (context.parent.open_date !== "")
                return (
                    value &&
                    new Date(value) >= new Date(context.parent.open_date)
                );
            return true;
        }),

    final_closure_date: yup
        .mixed()
        .notRequired()
        .test(
            "finalDate",
            "Final closure date can't be before first closure date",
            (value, context) =>
                value
                    ? new Date(value) >=
                      new Date(context.parent.first_closure_date)
                    : true
        ),
});

const EventCanvas = ({ show, handleShowCanvas }) => {
    const { handleSuccess, handleFailure, setMessage } = useAlert();

    const { control, handleSubmit, reset, formState } = useForm({
        mode: "onChange",
        reValidateMode: "onChange",
        resolver: yupResolver(schema),
        defaultValues: {
            open_date: "",
            first_closure_date: "",
            final_closure_date: "",
        },
    });

    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (event) => {
            createEvent(event);
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries(["events"], { exact: true });
            queryClient.invalidateQueries(["current_event"], { exact: true });
            setMessage("New Event created!");
            handleSuccess();
            reset();
            handleShowCanvas();
        },
    });

    const onSubmit = (data) => {
        const request = {
            first_closure_date: data.first_closure_date,
            ...(data.open_date !== "" && {
                open_date: data.open_date,
            }),
            ...(data.final_closure_date !== "" && {
                final_closure_date: data.final_closure_date,
            }),
        };
        return mutation.mutateAsync(request).catch((err) => {
            setMessage(err.response.data.message);
            handleFailure();
            reset();
            handleShowCanvas();
        });
    };

    return (
        <Offcanvas
            show={show}
            onHide={handleShowCanvas}
            placement={"end"}
            backdrop="static"
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Start new event</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Stack>
                        <Form.Group controlId="groupOpenDate">
                            <Form.Label column="lg">Open Date</Form.Label>
                            <Controller
                                name="open_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Form.Control
                                            {...field}
                                            className="p-3 pe-4"
                                            value={field.value}
                                            onChange={field.onChange}
                                            type="datetime-local"
                                            isInvalid={fieldState.invalid}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldState?.error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                            <ul>
                                <li>
                                    <Form.Text id="openDateHelpBlock1" muted>
                                        This is the date the event will start
                                        accepting submissions.
                                    </Form.Text>
                                </li>
                                <li>
                                    <Form.Text id="openDateHelpBlock2" muted>
                                        If not specified, the event will start
                                        immediately after creation.
                                    </Form.Text>
                                </li>
                            </ul>
                        </Form.Group>
                        <hr className="my-3 mb-5" />
                        <Form.Group controlId="groupFirstClosureDate">
                            <Form.Label column="lg">
                                First Closure Date *
                            </Form.Label>
                            <Controller
                                name="first_closure_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Form.Control
                                            {...field}
                                            className="p-3 pe-4"
                                            value={field.value}
                                            onChange={field.onChange}
                                            type="datetime-local"
                                            isInvalid={fieldState.invalid}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldState?.error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                            <ul>
                                <li>
                                    <Form.Text
                                        id="firstClosureDateHelpBlock1"
                                        muted
                                    >
                                        The date the event will stop accepting
                                        submissions (still accept comments).
                                    </Form.Text>
                                </li>
                            </ul>
                        </Form.Group>
                        <hr className="my-3 mb-5" />
                        <Form.Group controlId="groupFinalClosureDate">
                            <Form.Label column="lg">
                                Final Closure Date
                            </Form.Label>
                            <Controller
                                name="final_closure_date"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <>
                                        <Form.Control
                                            {...field}
                                            className="p-3 pe-4"
                                            value={field.value}
                                            onChange={field.onChange}
                                            type="datetime-local"
                                            isInvalid={fieldState.invalid}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {fieldState?.error?.message}
                                        </Form.Control.Feedback>
                                    </>
                                )}
                            />
                            <ul>
                                <li>
                                    <Form.Text
                                        id="finalClosureDateHelpBlock1"
                                        muted
                                    >
                                        The date the event will stop accepting
                                        comments.
                                    </Form.Text>
                                </li>
                                <li>
                                    <Form.Text
                                        id="finalClosureDateHelpBlock2"
                                        muted
                                    >
                                        If not specified, the event final
                                        closure date will be set to 2 weeks
                                        after "First Closure Date".
                                    </Form.Text>
                                </li>
                            </ul>
                        </Form.Group>
                    </Stack>
                    <Button
                        className="mt-5 float-end"
                        variant={
                            formState.isValid ? "success" : "outline-success"
                        }
                        size="lg"
                        type="submit"
                        disabled={!formState.isValid || formState.isSubmitting}
                    >
                        {formState.isSubmitting
                            ? "Creating..."
                            : "Create Event"}
                    </Button>
                </Form>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default EventCanvas;
