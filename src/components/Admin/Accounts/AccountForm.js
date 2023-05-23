import React from "react";
import * as yup from "yup";
import CreateFormView from "./Forms/CreateFormView";
import EditFormView from "./Forms/EditFormView";

const AccountForm = ({ action }) => {
    const schema = yup.object({
        last_name: yup.string().trim().required("Last name is required"),
        first_name: yup.string().trim().required("First name is required"),
        email: yup
            .string()
            .email("Not a correct email")
            .required("An email is required"),
        gender: yup
            .string()
            .typeError("Wrong format")
            .required("Gender is required"),
        dob: yup
            .mixed()
            .test("isEmpty", "Required field", (value) => value && value !== "")
            .test(
                "afterToday",
                "Date of Birth can't be after today",
                (value) => value && new Date(value) < new Date()
            )
            .test("checkAge", "The user is not over 18", (value) => {
                const year = new Date().getFullYear();
                const age = new Date(value).getFullYear();
                return year - age >= 18;
            }),
        role: yup.string().required("A role is required"),
        department_id: yup.mixed().when("role", {
            is: (value) => value === "manager",
            then: () => yup.mixed().notRequired(),
            otherwise: () =>
                yup
                    .mixed()
                    .test(
                        "isEmpty",
                        "A user need to be assigned to a department",
                        (value) => value && value !== ""
                    ),
        }),
    });
    return (
        <>
            {action === "create" && <CreateFormView schema={schema} />}
            {action === "edit" && <EditFormView schema={schema} />}
        </>
    );
};

export default AccountForm;
