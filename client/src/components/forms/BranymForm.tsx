"use client"
import React, { useState } from 'react';
import { personalSchema, ContactSchema, qualificationSchema, experienceSchema, otherDetailSchema, documentSchema, FormData, AddressSchema } from "./SchemaData"
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';
import Button from '../ui/Button';
import { useCreateNewStudentMutation } from '@/redux/api/apiSlice';
import { connect } from 'http2';


const BranymForm = ({fields, onSubmit}:any) => {
    const [data, setData] = useState<any>({})
    const [createNewStudent] = useCreateNewStudentMutation()

    const formView = [
        {
            type: "Basic",
            schema: personalSchema,
            name: "personalDetails"
        },
        {
            type: "Component",
            schema: AddressSchema,
            name: "address"
        },
        {
            type: "RepeatableComponent",
            schema: ContactSchema,
            name: "Contact"
        },
        {
            type: "RepeatableComponent",
            schema: experienceSchema,
            name: "Experience"
        },
        {
            type: "RepeatableComponent",
            schema: qualificationSchema,
            name: "Qualification"
        },
        {
            type: "Basic",
            schema: otherDetailSchema,
            name: "otherDetails"
        },

    ]


    const handleData = (key: string) => {
        const func = (values: any) => { setData({ ...data, [key]: values }) }
        return func;
    }


    const handleSubmit = async () => {


        const transformData = (schema:FormData[], name:string, data:any) => {
            const obj:any = {}

            for (let index = 0; index < schema.length; index++) {
                const field:FormData = schema[index];
                if(Object.hasOwn(data || {}, field?.name)){
                    if(field.type === "ref:strapi"){
                        if(field?.multiple){
                            obj[`${field.name}`] = {
                                connect: data[`${field.name}`]?.map((value:any) => ({id: value["id"]}))
                            }
                        }
                        else{
                            obj[`${field.name}`] = {
                                connect: [{id:  data[`${field.name}`].id }]
                            }
                        }
                    }
                    else{
                        obj[`${field.name}`] =  data[`${field.name}`]
                    }
                }
                else{
                    
                }
            }

            return obj;
        }

        var submissionData:any = {}

        formView.map((value:any, index:number) => {
            const {schema = [], name = "", type}:{schema?: FormData[], type?: string, name?:string} = value
            if(type === "RepeatableComponent"){
                var newArr:any[] = []
                data[name]?.map((value:any) => {
                    newArr.push(transformData(schema, name, Object.hasOwn(value, "values") ? value["values"] : {}))
                })
                submissionData[name] = newArr
            }
            else if(type === "Component"){
                submissionData[name] = transformData(schema, name, data[name])
            }
            else if(type === "Basic"){
                submissionData = {...submissionData, ...transformData(schema, name, data[name])}
            }
        })


        // const submissionData = {
        //     FirstName: data?.personalDetails?.FirstName || "",
        //     LastName: data?.personalDetails?.LastName || "",
        //     Email: data?.personalDetails?.Email || "",
        //     FatherName: data?.personalDetails?.FatherName || "",
        //     DOB: data?.otherDetails?.DOB || "",
        //     Gender: data?.otherDetails?.Gender || "",
        //     MaritalStatus: data?.otherDetails?.MaritalStatus || "",
        //     Skills: {
        //         connect: data?.otherDetails?.Skills ? data?.otherDetails?.Skills?.map((skill: any) => ({ id: skill.id })) : []
        //     },
        //     IndustriesPreference: {
        //         connect: data?.otherDetails?.IndustriesPerference ? data?.otherDetails?.IndustriesPerference?.map((industry: any) => ({ id: industry.id })) : []
        //     },
        //     Address: {
        //         City: {
        //             connect: [{ id: data?.personalDetails?.City?.id || null }]
        //         },
        //         Street: data?.personalDetails?.Street || "",
        //         AddressType: data?.personalDetails?.addressType || ""
        //     },
        //     Contacts: data?.Contact ? data?.Contact.map((contact: any) => ({
        //         ...contact.values
        //     })) : [],
        //     qualification: data?.Qualification ? data?.Qualification.map((item: any) => ({
        //         school: {
        //             connect: [{ id: item?.values?.school?.id || null }]
        //         },
        //         qualification: {
        //             connect: [{ id: item?.values?.qualification?.id || null }]
        //         },
        //         Score: item.values.score || "",
        //         Year: item.values.year || ""
        //     })) : [],
        //     experience: data?.Experience ? data?.Experience.map((item: any) => ({
        //         Company: {
        //             connect: [{ id: item?.values?.company.id || null }]
        //         },
        //         Designation: {
        //             connect: [{ id: item?.values?.designation?.id || null }]
        //         },
        //         Duration: item?.values?.duration || 0
        //     })) : []
        // };

        console.log("data",submissionData);


        // await createNewStudent(submissionData)
    }

    return (
        <div className='flex flex-col gap-4'>

            {formView.map((formConfig, index) => (
                <div key={index}>
                    {["Basic", "Component"].includes(formConfig.type) && (
                        <BasicForm
                            fieldsSchema={formConfig.schema}
                            formValue={data[formConfig.name]}
                            setFormValue={handleData(formConfig.name)}
                        />
                    )}

                    {formConfig.type === "RepeatableComponent" &&
                        (
                            <RepeatableForm
                                formName={formConfig.name}
                                formValue={data[formConfig.name]}
                                setFormValue={handleData(formConfig.name)}
                                fieldsSchema={formConfig.schema}
                            />
                        )}
                </div>
            ))}

            {/* <BasicForm fieldsSchema={personalSchema} formValue={data["personalDetails"]} setFormValue={handleData("personalDetails")} />
            <RepeatableForm formName="Contact" formValue={data["contact"]} setFormValue={handleData("contact")} fieldsSchema={ContactSchema} />
            <RepeatableForm formName="Experience" formValue={data["experience"]} setFormValue={handleData("experience")} fieldsSchema={experienceSchema} />
            <RepeatableForm formName="Qualification" formValue={data["qualification"]} setFormValue={handleData("qualification")} fieldsSchema={qualificationSchema} />
            <BasicForm fieldsSchema={otherDetailSchema} formValue={data["otherDetails"]} setFormValue={handleData("otherDetails")} /> */}
            <div>
                <Button size="md" bg="solid" type='button' onClick={handleSubmit} >Submit</Button>
            </div>
        </div>
    );
};


export default BranymForm;
