import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { genderOptions } from "../../../../dictionaries/Dictionaries";

const GenderRadio = ({ control, setValue, trigger, initialGender = null }) => {
    const [selected, setSelected] = useState(initialGender);

    const changeRadio = (e) => {
        setValue("gender", e.target.value, { shouldDirty: true });
        setSelected(e.target.value);
        trigger("gender");
    };

    return (
        <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
                <div>
                    {genderOptions.map((option) => (
                        <div key={option.value} className="d-inline">
                            <Form.Check
                                {...field}
                                inline
                                type="radio"
                                value={option.value}
                                onChange={changeRadio}
                                checked={parseInt(selected) === option.value}
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

export default GenderRadio;
