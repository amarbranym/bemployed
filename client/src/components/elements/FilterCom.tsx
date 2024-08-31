"use client"
import React, { useState } from 'react'
import { filterOprators, formView } from '../forms/SchemaData'
import Button from '../ui/Button';
import { v4 as uuidv4 } from 'uuid';
import { CloseButton } from '@headlessui/react';

interface FilterComProps {
    filterQuery?: any,
    setFilterQuery?: React.Dispatch<React.SetStateAction<any>>
}
const FilterCom: React.FC<FilterComProps> = ({ filterQuery, setFilterQuery }) => {
    const fields = formView.map((group: any) => {
        return group.type === "Basic" ? group.schema : []
    }).flat().filter((item) => ["text", "textarea", "email", "ref:strapi", "number", "date", "select"].includes(item.type))

    const [selectedField, setSelectedField] = useState<any>({});

    const [queryData, setQueryData] = useState<any>({
        operatorFields: "",
        operator: ""
    })


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        if (name === "operatorFields") {
            setSelectedField(JSON.parse(value))
            setQueryData({ ...queryData, [name]: JSON.parse(value).name })
        } else if (name === "operator") {
            setQueryData({ ...queryData, [name]: JSON.parse(value).value, "operatorName": JSON.parse(value).label })

        } else {
            setQueryData({ ...queryData, [name]: value })
        }

    };

    const handleAddFilter = () => {
        const id = uuidv4()
        if (setFilterQuery) {
            setFilterQuery([...filterQuery, { id, ...queryData }]);
        }
    };


    return (
        <div className=' flex flex-col gap-2'>
            <select onChange={handleChange} name='operatorFields' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none">
                <option disabled selected>Choose Field</option>
                {
                    fields?.map((item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                    ))
                }

            </select>

            {
                <select name='operator' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange}>
                    <option disabled selected>Choose Operator</option>
                    {
                        filterOprators?.filter(item => item?.fieldTypes?.includes(selectedField.type)).map((item: any, index: number) => (
                            <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                        ))
                    }
                </select>
            }

            <>{(queryData["operator"] && queryData["operatorFields"]) && <>
                {
                    selectedField.type === "select" ? <select name='text' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange} >
                        <option disabled selected>Choose Value</option>
                        {
                            selectedField?.rules?.options?.map((item: any, index: any) => (
                                <option key={index} value={item.label}>{item.label}</option>
                            ))
                        }
                    </select> : <input name='text' onChange={handleChange} className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" type={["text", "ref:strapi", "email", "textareat"].includes(selectedField.type) ? "text" : selectedField.type} />
                }
            </>}</>

            {(queryData["operator"] && queryData["operatorFields"] && queryData?.text) && <div>
                <CloseButton onClick={handleAddFilter} className='w-full text-blue-600 bg-blue-50 py-1 border border-blue-600 rounded-md hover:bg-white' >Add filter</CloseButton>
            </div>}

        </div>
    )
}

export default FilterCom
