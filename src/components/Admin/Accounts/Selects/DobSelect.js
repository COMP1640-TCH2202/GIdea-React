import React from "react";
import { Form } from "react-bootstrap";
import { Controller } from "react-hook-form";

const DobSelect = ({ control }) => {
    return (
        <Controller
            name="dob"
            control={control}
            render={({ field, fieldState: { invalid, error } }) => (
                <>
                    <Form.Control
                        {...field}
                        value={field.value}
                        onChange={field.onChange}
                        type="date"
                        isInvalid={invalid}
                    />
                    <Form.Control.Feedback type="invalid">
                        {error?.message}
                    </Form.Control.Feedback>
                </>
            )}
        />
    );
};

export default DobSelect;
