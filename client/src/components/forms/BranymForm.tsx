"use client"
import React, { useState } from 'react';
import { personalSchema, ContactSchema, qualificationSchema, experienceSchema, otherDetailSchema, documentSchema } from "./SchemaData"
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';
import Button from '../ui/Button';


const BranymForm = () => {

    // const [contact, setContact] = useState<any>([]);
    // const [qualification, setQualification] = useState<any>([]);
    // const [experience, setExperience] = useState<any>([]);
    // const [personalDetails, setPersonalDetails] = useState<any>(null);
    // const [otherdetails, setOtherdetails] = useState<any>(null)
    // const [docuements, setDocuments] = useState<any>(null)

    const formView = [
        {
            type: "Basic",
            schema: personalSchema,
            name: "personalDetails"
        },
        {
            type: "Repeatable",
            schema: ContactSchema,
            name: "contact"
        },
        {

        }
    ]

    const [data, setData] = useState<any>({})

    const handleData = (key:string) => {
        const func = (values:any) => {setData({...data, [key]: values})}
        return func;
    }

    const handleSubmit = () => {
        
        console.log("data", data)
    }

    return (
        <div className='flex flex-col gap-4'>
            <BasicForm fieldsSchema={personalSchema} formValue={data["personalDetails"]} setFormValue={handleData("personalDetails")} />
            <RepeatableForm formName="Contact" formValue={data["contact"]} setFormValue={handleData("contact")} fieldsSchema={ContactSchema} />
            <RepeatableForm formName="Experience" formValue={data["experience"]} setFormValue={handleData("experience")} fieldsSchema={experienceSchema} />
            <RepeatableForm formName="Qualification" formValue={data["qualification"]} setFormValue={handleData("qualification")} fieldsSchema={qualificationSchema} />
            <BasicForm fieldsSchema={otherDetailSchema} formValue={data["otherDetails"]} setFormValue={handleData("otherDetails")} />
            {/* <BasicForm fieldsSchema={documentSchema} formValue={data["contact"]} setFormValue={handleData("contact")} /> */}
            <div>
                <Button size="md" bg="solid" type='button' onClick={handleSubmit} >Submit</Button>
            </div>
        </div>
    );
};


export default BranymForm;
