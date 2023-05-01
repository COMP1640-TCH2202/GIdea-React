import React from "react";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";
import { getUsersBy } from "../../../../services/AccountService";

const MembersSelect = ({ require = false, ...props }) => {
    const filterMembers = async (inputValue: string) => {
        const options = [];
        try {
            const result = await getUsersBy({ idleMembers: "staff" });
            result.data.map((staff) =>
                options.push({
                    value: staff.id,
                    label: `${staff.last_name} ${staff.first_name} (ID: ${staff.id})`,
                })
            );
        } catch (error) {
            props.setMessage("Can't get Staff data at the moment!");
            props.handleFailure();
        }
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadMemberOptions = (inputValue: string) =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterMembers(inputValue));
            }, 700);
        });

    return (
        <Controller
            name="members"
            control={props.control}
            rules={{ required: require }}
            render={({ field, fieldState: { invalid, error } }) => (
                <AsyncSelect
                    {...field}
                    value={field.value}
                    onChange={field.onChange}
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={loadMemberOptions}
                    isClearable={true}
                    placeholder="Add Staffs to department"
                />
            )}
        />
    );
};

export default MembersSelect;
