import React from "react";
import AsyncSelect from "react-select/async";

const StyledSelect = ({
    field,
    fieldState: { invalid, error },
    trigger,
    fieldName,
    loadOptions,
    disabled,
}) => {
    return (
        <>
            <AsyncSelect
                {...field}
                value={field.value}
                onChange={(e) => {
                    field.onChange(e);
                    trigger(fieldName);
                }}
                cacheOptions
                defaultOptions
                loadOptions={loadOptions}
                isClearable={true}
                placeholder="Assign to a department"
                isDisabled={disabled}
                classNames={{
                    control: (state) =>
                        invalid ? "form-select is-invalid" : "form-select",
                    dropdownIndicator: (state) => "d-none",
                }}
            />
            <div className={`invalid-feedback ${invalid && "d-flex"}`}>
                {error?.message}
            </div>
        </>
    );
};

export default StyledSelect;
