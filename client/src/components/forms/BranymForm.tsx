"use client"
import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { personalSchema, ContactSchema, qualificationSchema, experienceSchema } from "./SchemaData"
import FormField from './FormField';
import { useDispatch, useSelector } from 'react-redux';
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';
import SelectField from '../ui/SelectField';


const BranymForm = () => {
    const [contact, setContact] = useState<any>([]);
    const [qualification, setQualification] = useState<any>([]);
    const [experience, setExperience] = useState<any>([]);

    return (
        <>
            <div className='w-1/2 mt-4'>
                <SelectField />

            </div>
            <BasicForm fieldsSchema={personalSchema} />
            <RepeatableForm formName="Contact" formValue={contact} setFormValue={setContact} fieldsSchema={ContactSchema} />
            <RepeatableForm formName="Qualification" formValue={qualification} setFormValue={setQualification} fieldsSchema={qualificationSchema} />
            <RepeatableForm formName="Experience" formValue={experience} setFormValue={setExperience} fieldsSchema={experienceSchema} />


        </>
    );
};


export default BranymForm;
