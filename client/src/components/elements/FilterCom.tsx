"use client"
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { filterOprators, formView } from '../forms/SchemaData'
import Button from '../ui/Button';
import { v4 as uuidv4 } from 'uuid';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface FilterComProps {
    filterQuery?: any,
    setFilterQuery?: React.Dispatch<React.SetStateAction<any>>
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    open: boolean
}
const FilterCom: React.FC<FilterComProps> = ({ filterQuery, setFilterQuery, setOpen, open }) => {
    const fields = formView.map((group: any) => {
        return group.type === "Basic" ? group.schema : []
    }).flat().filter((item) => ["text", "textarea", "email", "ref:strapi", "number", "date", "select"].includes(item.type))

    const [selectedField, setSelectedField] = useState<any>({});

    const [queryData, setQueryData] = useState<any>()


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        const id = uuidv4()

        if (name === "operatorFields") {
            setSelectedField(JSON.parse(value))
            setQueryData({ ...queryData, [name]: JSON.parse(value).name })
        } else {

            setQueryData({ ...queryData, [name]: value })
        }

    };

    const handleAddFilter = () => {
        const id = uuidv4()

        if (setFilterQuery) {
            setFilterQuery([...filterQuery, { id, ...queryData }]);
        }
        setOpen(false)
    };





    return (
        <Dialog open={open} onClose={() => setOpen(false)} as='div' className=' absolute w-[250px] top-56 left-44 bg-white border border-gray-100 shadow-lg px-4 py-2 rounded-md flex flex-col gap-2 '>
            <select onChange={handleChange} name='operatorFields' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none">

                {
                    fields?.map((item: any, index: number) => (
                        <option key={index} value={JSON.stringify(item)}>{item.label}</option>
                    ))
                }

            </select>

            {
                <select name='operator' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange}>
                    {
                        filterOprators?.filter(item => item?.fieldTypes?.includes(selectedField.type)).map((item: any, index: number) => (
                            <option key={index} value={item.value}>{item.label}</option>
                        ))
                    }
                </select>
            }

            {
                selectedField.type === "select" ? <select name='text' className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" onChange={handleChange} >
                    {
                        selectedField?.rules?.options?.map((item: any, index: any) => (
                            <option key={index} value={item}>{item.label}</option>
                        ))
                    }
                </select> : <input name='text' onChange={handleChange} className=" block  w-full rounded-md border-0 py-2 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6 focus:outline-none" type={["text", "ref:strapi", "email", "textareat"].includes(selectedField.type) ? "text" : selectedField.type} />
            }

            <div>
                <Button onClick={handleAddFilter} className='w-full text-blue-600 bg-blue-50 py-1 border border-blue-600 rounded-md hover:bg-white' >Add filter</Button>
            </div>

        </Dialog>
    )
}

export default FilterCom
