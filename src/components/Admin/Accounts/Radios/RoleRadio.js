import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { roleOptions } from "../../../../dictionaries/Dictionaries";
import { Form } from "react-bootstrap";

const RoleRadio = ({ control, setValue, trigger, initialRole = null }) => {
    const [selected, setSelected] = useState(initialRole);

    const changeRadio = (e) => {
        setValue("role", e.target.value, {
            shouldDirty: true,
            shouldValidate: true,
        });
        setSelected(e.target.value);
        trigger(["role", "department_id"]);
    };

    return (
        <Controller
            name="role"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
                <div>
                    {roleOptions.map((option) => (
                        <div key={option.value} className="d-inline">
                            <Form.Check
                                {...field}
                                inline
                                type="radio"
                                value={option.value}
                                onChange={changeRadio}
                                checked={selected === option.value}
                                label={option.label}
                                isInvalid={invalid}
                            />
                        </div>
                    ))}
                    <div className={`invalid-feedback ${invalid && "d-flex"}`}>
                        {error?.message}
                    </div>
                </div>
            )}
        />
    );
};

export default RoleRadio;
