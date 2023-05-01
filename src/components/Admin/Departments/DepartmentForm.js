import React from "react";
import * as yup from "yup";
import EditFormView from "./Forms/EditFormView";
import CreateFormView from "./Forms/CreateFormView";

const DepartmentForm = ({ action, id }) => {
    const schema = yup.object({
        name: yup
            .string()
            .trim()
            .required("Please provide a name for this department")
            .matches(/^[A-z ]+$/, "Invalid Name")
            .max(30, "Try choosing a shorter name"),
    });
    return (
        <>
            {action === "create" && <CreateFormView schema={schema} />}
            {action === "edit" && <EditFormView schema={schema} />}
        </>
    );
};

export default DepartmentForm;
