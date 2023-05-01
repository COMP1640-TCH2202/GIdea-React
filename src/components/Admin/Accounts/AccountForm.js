import React from "react";
import * as yup from "yup";
import CreateFormView from "./Forms/CreateFormView";
import EditFormView from "./Forms/EditFormView";

const AccountForm = ({ action }) => {
    const schema = yup.object({
        last_name: yup
            .string()
            .trim()
            .required("Last name is required")
            .max(30, "Try choosing a shorter name"),
        first_name: yup.string().trim().required(),
        email: yup.string().email('Not a correct email'),
    });
    return (
        <>
            {action === "create" && <CreateFormView schema={schema} />}
            {action === "edit" && <EditFormView schema={schema} />}
        </>
    );
};

export default AccountForm;
