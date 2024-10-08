import { useField, useFormikContext } from 'formik';
import React, { useContext } from 'react'

const SelectField = ({ ...props }) => {
    const [field] = useField(props.name);
    const { setFieldValue } = useFormikContext<any>(); // Correctly destructure useFormikContext

    // Handle change event
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;

        // Check if the selected value is "Choose here"
        if (selectedValue === "Choose here") {
          setFieldValue(props.name, '');  // Or skip setting value if desired
        } else {
          setFieldValue(props.name, selectedValue);  // Set formik field value
        } // Set formik field value
    };

    return (
        <select
            {
            ...props
            }
            {
            ...field
            }
            onChange={handleChange}
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
