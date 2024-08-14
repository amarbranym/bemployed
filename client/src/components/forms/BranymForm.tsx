"use client"
import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { personalSchema, ContactSchema } from "./SchemaData"
import FormField from './FormField';
import { useDispatch, useSelector } from 'react-redux';
import RepeatableForm from './RepeatableForm';
const initialValues: { [key: string]: string } = {};

personalSchema.forEach((field) => {
    initialValues[`${field.name}`] = '';
});

const BranymForm = () => {
    const [contact, setContact] = useState<any>([]);

    const handleSubmit = (values: any) => {
        console.log('Form data:', values);
    };


    return (
        <>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2 ">
                    {personalSchema.map((field: any, index:any) => (
                        <FormField key={index} {...field} />
                    ))}
                </Form>
            </Formik>

            <RepeatableForm formName="Contact" formValue={contact} setFormValue={setContact} fieldsSchema={ContactSchema} />

        </>
    );
};

export default BranymForm;
