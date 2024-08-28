"use client"
import React, { useMemo, useState } from 'react'
import { filterOprators, operators } from '../forms/SchemaData'

const FilterCom = () => {
    const [selectedFieldType, setSelectedFieldType] = useState('String');
    // Filter operators based on selected field type
    const filteredOperators = useMemo(() => {
        return filterOprators?.filter((operator) =>
            operator.fieldTypes.includes(selectedFieldType)
        );
    }, [selectedFieldType, filterOprators]);

    const handleSelectChange = (e: any) => {
        const selectedOption = operators.find((item) => item.label === e.target.value);
        if (selectedOption) {
            console.log(selectedOption)
            setSelectedFieldType(selectedOption.value); // Set item.value
        }
    };

    return (
        <div className='absolute w-1/4 top-10 bg-white border border-gray-100 shadow-lg px-4 py-2 rounded-md flex flex-col gap-2 '>
            <select onChange={handleSelectChange} className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none">
                {
                    operators?.map((item: any, index: number) => (
                        <option key={index}>{item.label}</option>
                    ))
                }
            </select>
            <select className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none">
                {
                    filteredOperators?.map((item: any, index: number) => (
                        <option key={index}>{item.label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default FilterCom
