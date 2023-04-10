import React, { useMemo, useState } from "react";
import { Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DataTable from "../../components/Tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import EventCanvas from "../../components/Canvas/EventCanvas";
import { getCurrentEvent } from "../../services/EventService";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import ErrorIndicator from "../../components/Indicator/ErrorIndicator";

const EventManagement = () => {
    const [showCanvas, setShowCanvas] = useState(false);
    const handleShowCanvas = () => setShowCanvas(!showCanvas);

    const {
        isLoading,
        isError,
        error,
        data: event,
    } = useQuery({
        queryKey: ["current_event"],
        queryFn: getCurrentEvent,
        cacheTime: 0,
        staleTime: 15 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Card style={{ height: "160px" }}>
                <Card.Body className="d-flex flex-column">
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : isError ? (
                        <ErrorIndicator message={error.message} />
                    ) : event.data && event.data.status === "Opening" ? (
                        <CurrentEventInfo event={event.data} />
                    ) : (
                        <CreateEventButton
                            handleShowCanvas={handleShowCanvas}
                        />
                    )}
                </Card.Body>
            </Card>
            <EventsTable />

            <EventCanvas
                show={showCanvas}
                handleShowCanvas={handleShowCanvas}
            />
        </>
    );
};

const CurrentEventInfo = ({ event }) => {
    return (
        <Row className="d-flex">
            <div
                style={{ position: "relative" }}
                className="mb-2"
            >
                <span>Current Event Information:</span>
            </div>
            <Col xs={4} style={{ flex: 1 }}>
                <Card.Text>
                    Open Date:
                    <strong className="float-end">{event?.open_date}</strong>
                </Card.Text>
                <Card.Text className="mt-3">
                    Ideas Submitted:
                    <strong className="float-end">
                        {event.ideas_count ?? "NaN"}
                    </strong>
                </Card.Text>
            </Col>
            <Col xs={4} style={{ flex: 1 }}>
                <Card.Text>
                    First Closure Date:
                    <strong className="float-end">
                        {event?.first_closure_date}
                    </strong>
                </Card.Text>
                <Card.Text className="mt-3">
                    Final Closure Date:
                    <strong className="float-end">
                        {event?.final_closure_date}
                    </strong>
                </Card.Text>
            </Col>
        </Row>
    );
};

const CreateEventButton = ({ handleShowCanvas }) => {
    return (
        <>
            <p className="text-muted text-center">
                There are no event running at the moment, start a new one now to
                accept submissions.
            </p>
            <Button
                variant="success"
                style={{ width: "30rem", margin: "auto" }}
                className="my-1"
                onClick={handleShowCanvas}
            >
                Start a new event
            </Button>
        </>
    );
};

const EventsTable = () => {
    // const {} = useQuery({
    //     queryKey: ["events"],
    //     queryFn: getEvents
    // })

    const columns = useMemo(() => [
        {
            Header: "ID",
            assessor: "id",
        },
        {
            Header: "Open Date",
            assessor: "open_date",
        },
        {
            Header: "First Closure Date",
            assessor: "first_closure_date",
        },
        {
            Header: "Final Closure Date",
            assessor: "final_closure_date",
        },
        {
            Header: "No. Ideas",
            assessor: "ideas_count",
        },
    ]);

    const queryData = useMemo(() => [], []);

    return (
        // <DataTable
        //     data={queryData}
        //     columns={columns}
        // />
        <>Table</>
    );
};

const EventCreationForm = () => {
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
            .test(
                "beforeOpen",
                "Can't be before open date",
                (value, context) => {
                    if (context.parent.open_date !== "")
                        return (
                            value &&
                            new Date(value) >=
                                new Date(context.parent.open_date)
                        );
                    return true;
                }
            ),

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

    const onSubmit = (data) => {
        console.log("submit data: ", data);
        reset();
    };

    return (
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
                                This is the date the event will start accepting
                                submissions.
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
                    <Form.Label column="lg">First Closure Date *</Form.Label>
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
                            <Form.Text id="firstClosureDateHelpBlock1" muted>
                                The date the event will stop accepting
                                submissions (still accept comments).
                            </Form.Text>
                        </li>
                    </ul>
                </Form.Group>
                <hr className="my-3 mb-5" />
                <Form.Group controlId="groupFinalClosureDate">
                    <Form.Label column="lg">Final Closure Date</Form.Label>
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
                            <Form.Text id="finalClosureDateHelpBlock1" muted>
                                The date the event will stop accepting comments.
                            </Form.Text>
                        </li>
                        <li>
                            <Form.Text id="finalClosureDateHelpBlock2" muted>
                                If not specified, the event final closure date
                                will be set to 2 weeks after "First Closure
                                Date".
                            </Form.Text>
                        </li>
                    </ul>
                </Form.Group>
            </Stack>
            <Button
                className="mt-5 float-end"
                variant={formState.isValid ? "success" : "outline-success"}
                size="lg"
                type="submit"
                disabled={!formState.isValid || formState.isSubmitting}
            >
                {formState.isSubmitting ? "Creating..." : "Create Event"}
            </Button>
        </Form>
    );
};

export default EventManagement;
