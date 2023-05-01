import React from "react";
import MainPage from "../components/MainPage/MainPage";
import SubmitIdeaForm from "../components/Idea/SubmitIdeaForm";
import { useQuery } from "@tanstack/react-query";
import { getCurrentEvent } from "../services/EventService";
import LoadingIndicator from "../components/Indicator/LoadingIndicator";
import NoEventCard from "../components/Cards/NoEventCard";
import ErrorIndicator from "../components/Indicator/ErrorIndicator";

const HomePage = () => {
    const {
        isLoading,
        isError,
        error,
        data: event,
    } = useQuery({
        queryKey: ["events", "current"],
        queryFn: getCurrentEvent,
        retry: 2,
        refetchOnWindowFocus: false,
    });

    return (
        <>
            {isLoading ? (
                <LoadingIndicator />
            ) : isError ? (
                <ErrorIndicator message={error.message} />
            ) : event.data === "" ? (
                <NoEventCard />
            ) : (
                <SubmitIdeaForm />
            )}

            <MainPage />
        </>
    );
};

export default HomePage;
