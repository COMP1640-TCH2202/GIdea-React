import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";
import { genderOptions } from "../../../../dictionaries/Dictionaries";

const GenderRadio = ({ control, setValue, defaultGender }) => {
    const [selected, setSelected] = useState(defaultGender);

    const changeRadio = (e) => {
        setValue("gender", e.target.value, { shouldDirty: true });
        setSelected(e.target.value);
    };

    return (
        <Controller
            name="gender"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
                <>
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
                            />
                            <Form.Control.Feedback type="invalid">
                                {error?.message}
                            </Form.Control.Feedback>
                        </div>
                    ))}
                </>
            )}
        />
    );
};

export default GenderRadio;
