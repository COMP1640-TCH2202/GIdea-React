import React from "react";
import MainPage from "../components/MainPage/MainPage";
import SubmitIdeaForm from "../components/Idea/SubmitIdeaForm";

const HomePage = () => {
    return (
        <>
            <SubmitIdeaForm />
            <MainPage />
        </>
    );
};

export default HomePage;
