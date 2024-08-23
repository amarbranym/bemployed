"use client"
import React, { useState } from 'react'
import MasterForm from './MasterForm'
import { FormData, formView } from "./SchemaData"

const BranymForm = () => {
    const [data, setData] = useState<any>({})
    const handleSubmit = async () => {
        const transformData = (schema: FormData[], name: string, data: any) => {
            const obj: any = {}

            for (let index = 0; index < schema.length; index++) {
                const field: FormData = schema[index];
                if (Object.hasOwn(data || {}, field?.name)) {
                    if (field.type === "ref:strapi") {
                        if (field?.multiple) {
                            obj[`${field.name}`] = {
                                connect: data[`${field.name}`]?.map((value: any) => ({ id: value["id"] }))
                            }
                        }
                        else {
                            obj[`${field.name}`] = {
                                connect: [{ id: data[`${field.name}`].id }]
                            }
                        }
                    }
                    else {
                        obj[`${field.name}`] = data[`${field.name}`]
                    }
                }
                else {

                }
            }

            return obj;
        }

        var submissionData: any = {}

        formView.map((value: any, index: number) => {
            const { schema = [], name = "", type }: { schema?: FormData[], type?: string, name?: string } = value
            if (type === "RepeatableComponent") {
                var newArr: any[] = []
                data[name]?.map((value: any) => {
                    newArr.push(transformData(schema, name, Object.hasOwn(value, "values") ? value["values"] : {}))
                })
                submissionData[name] = newArr
            }
            else if (type === "Component") {
                submissionData[name] = transformData(schema, name, data[name])
            }
            else if (type === "Basic") {
                submissionData = { ...submissionData, ...transformData(schema, name, data[name]) }
            }
        })
        console.log("data", submissionData);
        // await createNewStudent(submissionData)

    }


    console.log("data",formView)

    return (
        <MasterForm data={data} fields={formView} setData={setData} onSubmit={handleSubmit} />
    )
}

export default BranymForm
