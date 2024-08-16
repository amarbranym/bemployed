import { useField } from 'formik';
import React from 'react'

const SelectField = ({ ...props }) => {
    const [field] = useField(props.name);

    return (
        <select
            {
            ...props
            }
            {
            ...field
            }
            className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none"
        >
            {
                props?.rules?.options?.map((item: any) => (
                    <option key={item.value}>{item.label}</option>
                ))
            }
        </select>
    )
}

export default SelectField
