"use client"
import React, { useEffect, useState } from 'react'
import MasterForm from './MasterForm'
import { FormData, formView } from "./SchemaData"
import { useCreateNewStudentMutation, useGetStudentQuery } from '@/redux/api/apiSlice'

const BranymForm = ({ slug }: { slug?: string | undefined }) => {

    const { data: studentData, isLoading, error } = useGetStudentQuery(slug!, {
        skip: !slug,  // Skip the API call if slug is not provided
    });

    const [createNewStudent] = useCreateNewStudentMutation()
    const [data, setData] = useState<any>({})

    const convertRef = (refData: any, field: any) => {
        if (Array.isArray(refData?.data)) {
            return refData?.data.map((value: any) => ({
                id: value?.id,
                value: value?.attributes[field],
                label: value?.attributes[field]
            }))
        }
        else return {
            id: refData?.data?.id,
            value: refData?.data?.attributes[field],
            label: refData?.data?.attributes[field],
        }
    }

    const populateData = (view: any[], initialData?: any) => {
        var obj: any = {}

        for (let i = 0; i < view.length; i++) {

            const { schema, type, name }: { schema: FormData[], type: string, name: string } = view[i];

            if (type === "Basic") {
                obj[`${name}`] = {}

                for (let k = 0; k < schema.length; k++) {
                    const field = schema[k];
                    if (field.type === "ref:strapi") {
                        if (field.multiple) {
                            obj[`${name}`][`${field.name}`] = convertRef(initialData[`${field.name}`], field.rules?.field)
                        } else {
                            obj[`${name}`][`${field.name}`] = initialData[`${field.name}`]
                        }
                    }
                    else {
                        obj[`${name}`][`${field.name}`] = initialData[`${field.name}`]
                    }
                }

            }

            else if (type === "Component") {
                obj[`${name}`] = {}
                for (let k = 0; k < schema.length; k++) {
                    const field = schema[k];
                    if (field.type === "ref:strapi") {
                        obj[`${name}`][`${field.name}`] = convertRef(initialData[`${name}`][`${field.name}`], field.rules?.field)
                    }
                    else {
                        obj[`${name}`][`${field.name}`] = initialData[`${name}`][`${field.name}`]
                    }
                }
            }

            else {
                obj[`${name}`] = []
                for (let i = 0; i < initialData[`${name}`]?.length; i++) {
                    const element = initialData[`${name}`][i];
                    obj[`${name}`][i] = { id: element?.id }
                    for (let k = 0; k < schema.length; k++) {
                        const field = schema[k];
                        if (field.type === "ref:strapi") {
                            obj[`${name}`][i][`${field.name}`] = convertRef(Object.hasOwn(element || {}, field.name) ? element[`${field.name}`] : { data: null }, field.rules?.field)
                        }
                        else
                            obj[`${name}`][i][`${field.name}`] = Object.hasOwn(element || {}, field.name) ? element[`${field.name}`] : null;
                    }
                }
            }

        }

        setData(obj)
    }

    useEffect(() => {
        if (studentData) {
            populateData(formView, studentData?.data?.attributes)
        }
    }, [studentData])

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
                                connect: [{ id: data[`${field.name}`]?.id }]
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
                    newArr.push(transformData(schema, name, value))
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
        console.log("data ", data);
        await createNewStudent({ id: slug, data: submissionData })
    }

    return (
        <MasterForm data={data} fields={formView} setData={setData} onSubmit={handleSubmit} />
    )
}

export default BranymForm
