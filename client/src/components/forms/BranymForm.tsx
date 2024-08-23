"use client"
import React, { useState } from 'react';
import { personalSchema, ContactSchema, qualificationSchema, experienceSchema, otherDetailSchema, documentSchema } from "./SchemaData"
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';
import Button from '../ui/Button';
import { useCreateNewStudentMutation } from '@/redux/api/apiSlice';


const BranymForm = () => {
    const [data, setData] = useState<any>({})
    const [createNewStudent] = useCreateNewStudentMutation()
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
            name: "Contact"
        },
        {
            type: "Repeatable",
            schema: experienceSchema,
            name: "Experience"
        },
        {
            type: "Repeatable",
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


    const handleSubmit = async() => {
        const submissionData = {
            ...data.personalDetails,
            Contacts: data.Contact || [],
            Experiences: data.Experience || [],
            qualifications: data.Qualification || [],
            ...data.otherDetails,
            Documents: []
        };
        await createNewStudent(submissionData)
    }

    return (
        <div className='flex flex-col gap-4'>

            {formView.map((formConfig, index) => (
                <div key={index}>
                    {formConfig.type === "Basic" && (
                        <BasicForm
                            fieldsSchema={formConfig.schema}
                            formValue={data[formConfig.name]}
                            setFormValue={handleData(formConfig.name)}
                        />
                    )}

                    {formConfig.type === "Repeatable" &&
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
