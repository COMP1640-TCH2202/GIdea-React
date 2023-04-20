import React, { useState } from "react";
import { Button, Col, Row, Stack, Tab, Tabs } from "react-bootstrap";
import TableData from "../../components/Statistics/TableData";
import PieChart from "../../components/Statistics/PieChart";
import BarChart from "../../components/Statistics/BarChart";
import LineChart from "../../components/Statistics/LineChart";
import NumberBox from "../../components/Statistics/NumberBox";
import { getIdeasFact } from "../../services/StatisticsService";
import { useQuery } from "@tanstack/react-query";
import LoadingIndicator from "../../components/Indicator/LoadingIndicator";
import ErrorIndicator from "../../components/Indicator/ErrorIndicator";
import { FaFileExport } from "react-icons/fa";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [key, setKey] = useState("current");
    return (
        <>
            <div className="mb-3 d-flex justify-content-between">
                <p className="h2">Admin Dashboard</p>
                <Button variant="success" className="text-center" as={Link} to={`${process.env.REACT_APP_API_BASEURL}/api/ideas/export/1`} download>
                    <FaFileExport style={{ height: '100%', marginRight: 8 }} />
                    <span>Export CSV</span>
                </Button>
            </div>
            <Tabs
                activeKey={key}
                id="dashboard-tabs"
                className="mb-3"
                onSelect={(k) => setKey(k)}
                justify
            >
                <Tab eventKey="current" title="Current Event">
                    <CurrentEventDashboard />
                </Tab>

                <Tab eventKey="all" title="All Time">
                    Tab content for All time
                </Tab>
            </Tabs>
        </>
    );
};

const CurrentEventDashboard = () => {
    return (
        <>
            {/* <Row className="mb-3">
                <Col md={8}>Current event info</Col>
                <Col md={4}>Total number of ideas submitted</Col>
            </Row> */}
            <Row className="mb-3">
                <h5>Ideas submitted in past 7 days</h5>
                <Col style={{ height: "40vh" }}>
                    <LineChart />
                </Col>
            </Row>
            <Row className="mb-3">
                <IdeasSection />
            </Row>
            <Row className="mb-3">
                <Col xl={4} style={{ height: "30vh" }}>
                    <h5>Most used categorires</h5>
                    <PieChart />
                </Col>
                <Col xl={8} style={{ height: "30vh" }}>
                    <h5>Ideas Submitted by Departments</h5>
                    <BarChart />
                </Col>
            </Row>
        </>
    );
};

const IdeasSection = () => {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["stats_ideas_facts"],
        queryFn: getIdeasFact,
        staleTime: 10,
    });

    return (
        <>
            <h5>Latest Ideas</h5>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <>
                    <Col md={9}>
                        <TableData dt={data.data.latestIdeas} />
                    </Col>
                    <Col md={3}>
                        <Stack gap={3}>
                            <NumberBox
                                totalIdeas={data.data.totalIdeas}
                                topLiked={data.data.topLikedIdeas}
                                topDisliked={data.data.topDislikedIdeas}
                                topContributors={data.data.topContributors}
                            />
                        </Stack>
                    </Col>
                </>
            )}
        </>
    );
};

export default Dashboard;
