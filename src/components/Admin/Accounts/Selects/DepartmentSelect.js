import React from "react";
import { Controller } from "react-hook-form";
import { getAllDepartments } from "../../../../services/DepartmentService";
import StyledSelect from "../../../Select/StyledSelect";
import { useAlert } from "../../../../contexts/AlertProvider";

const DepartmentSelect = ({ control, ...props }) => {
    const { handleFailure, setMessage } = useAlert();

    const filterDepartment = async (inputValue) => {
        const options = [];
        try {
            const result = await getAllDepartments();
            const data = result.data;
            data.map((dept) =>
                options.push({
                    value: dept.id,
                    label: dept.name,
                })
            );
        } catch (error) {
            setMessage("Can't get departments data at the moment!");
            handleFailure();
        }

        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadDepartmentOptions = (inputValue) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterDepartment(inputValue));
            }, 700);
        });

    return (
        <Controller
            name="department_id"
            control={control}
            render={({ field, fieldState }) => (
                <StyledSelect
                    field={field}
                    fieldState={fieldState}
                    fieldName="department_id"
                    loadOptions={loadDepartmentOptions}
                    {...props}
                />
            )}
        />
    );
};

export default DepartmentSelect;
