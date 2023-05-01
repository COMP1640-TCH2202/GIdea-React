import React, { useMemo, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import EventTable from "../../components/Tables/DataTable";
import { useQuery } from "@tanstack/react-query";
import EventCanvas from "../../components/Canvas/EventCanvas";
import { getAllEvents, getCurrentEvent } from "../../services/EventService";
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
        queryKey: ["events", "current"],
        queryFn: getCurrentEvent,
        cacheTime: 0,
        staleTime: 15 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            <Card style={{ height: "160px" }}>
                <Card.Body className="d-flex flex-column justify-content-center">
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
            <hr className="my-3" />
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
            <div style={{ position: "relative" }} className="mb-2">
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
    const {
        isLoading,
        isError,
        error,
        data: events,
    } = useQuery({
        queryKey: ["events"],
        queryFn: async () => {
            const result = await getAllEvents();
            return result.data;
        },
        staleTime: 15 * 60 * 1000,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Open Date",
                accessor: "open_date",
            },
            {
                Header: "First Closure Date",
                accessor: "first_closure_date",
            },
            {
                Header: "Final Closure Date",
                accessor: "final_closure_date",
            },
            {
                Header: "No. Ideas",
                accessor: "ideas_count",
            },
            {
                Header: "Status",
                accessor: "status",
            },
        ],
        []
    );

    const dataArray = useMemo(() => events, [events]);

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <EventTable dataArray={dataArray} columns={columns} />
            )}
        </>
    );
};

export default EventManagement;
