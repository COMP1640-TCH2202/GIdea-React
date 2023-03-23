import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "react-bootstrap";
import ErrorIndicator from "../Indicator/ErrorIndicator";
import LoadingIndicator from "../Indicator/LoadingIndicator";
import { getLoggedInUser } from "../../services/UserService";

const ProfileInfo = () => {
    const {
        isLoading,
        isError,
        error,
        data: user,
    } = useQuery({
        queryKey: ["auth_user"],
        queryFn: getLoggedInUser,
    });

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : (
                <>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Full Name:</span>
                        <span>
                            {user?.data?.last_name} {user?.data?.first_name}
                        </span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Gender:</span>
                        <span>{user?.data?.gender}</span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Date of Birth:</span>
                        <span>{user?.data?.dob}</span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Email:</span>
                        <span>{user?.data?.email}</span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Password:</span>
                        <span>{user?.data?.password}</span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Department:</span>
                        <span>{user?.data?.department ?? "None"}</span>
                    </Card.Text>
                    <Card.Text
                        as="div"
                        className="h6 d-flex justify-content-between mb-3"
                    >
                        <span>Role:</span>
                        <span>
                            {user?.data?.role.charAt(0).toUpperCase() +
                                user?.data?.role.slice(1) ?? "Not specifed"}
                        </span>
                    </Card.Text>
                </>
            )}
        </>
    );
};

export default ProfileInfo;
