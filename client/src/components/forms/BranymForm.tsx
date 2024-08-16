"use client"
import React, { useState } from 'react';
import { personalSchema, ContactSchema, qualificationSchema, experienceSchema, otherDetails, } from "./SchemaData"
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';


const BranymForm = () => {
    const [contact, setContact] = useState<any>([]);
    const [qualification, setQualification] = useState<any>([]);
    const [experience, setExperience] = useState<any>([]);

    return (
        <div className='flex flex-col gap-4'>
            <BasicForm fieldsSchema={personalSchema} />
            <RepeatableForm formName="Contact" formValue={contact} setFormValue={setContact} fieldsSchema={ContactSchema} />
            <RepeatableForm formName="Qualification" formValue={qualification} setFormValue={setQualification} fieldsSchema={qualificationSchema} />
            <RepeatableForm formName="Experience" formValue={experience} setFormValue={setExperience} fieldsSchema={experienceSchema} />
            <BasicForm fieldsSchema={otherDetails} />

        </div>
    );
};


export default BranymForm;
