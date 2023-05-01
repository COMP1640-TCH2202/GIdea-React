import React from "react";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { getUsersBy } from "../../../../services/AccountService";

const CoordinatorSelect = (props) => {
    const filterCoordinator = async (inputValue: string) => {
        const options = [];
        try {
            const result = await getUsersBy({ role: "coordinator" });
            const data = result.data;
            data.map((coordinator) =>
                options.push({
                    value: coordinator.id,
                    label: `${coordinator.last_name} ${coordinator.first_name}`,
                    isDisabled:
                        coordinator?.department_id !== null &&
                        coordinator.department_id !== props.departmentId,
                })
            );
        } catch (error) {
            props.setMessage("Can't get Coordinator data at the moment!");
            props.handleFailure();
        }
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadCoordinatorOptions = (inputValue: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterCoordinator(inputValue));
            }, 700);
        });

    return (
        <Controller
            name="coordinator"
            control={props.control}
            render={({ field, fieldState: { invalid, error } }) => (
                <AsyncSelect
                    {...field}
                    value={field.value}
                    // onChange={field.onChange}
                    onChange={(e) => {
                        field.onChange(e);
                        props.validationTrigger("coordinator");
                    }}
                    cacheOptions
                    defaultOptions
                    loadOptions={loadCoordinatorOptions}
                    isClearable={true}
                    placeholder="Assign a Coordinator"
                />
            )}
        />
    );
};

export default CoordinatorSelect;
