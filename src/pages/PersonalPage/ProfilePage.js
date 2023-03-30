import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { FaPen } from "react-icons/fa";
import ProfileInfo from "../../components/Personal/ProfileInfo";
import SubmissionTable from "../../components/Personal/SubmissionTable";

const ProfilePage = () => {
    return (
        <Row>
            <Col md={4} className="my-3">
                <Card>
                    <Card.Header
                        as="h4"
                        className="d-flex justify-content-between align-items-center"
                    >
                        Profile Information
                        <FaPen className="clickable-icon" />
                    </Card.Header>
                    <Card.Body>
                        <ProfileInfo />
                    </Card.Body>
                </Card>
            </Col>
            <Col md={8} className="my-3">
                <Card>
                    <Card.Header as="h4">Submissions Pane</Card.Header>
                        <SubmissionTable />
                </Card>
            </Col>
        </Row>
    );
};

export default ProfilePage;
