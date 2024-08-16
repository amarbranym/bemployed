import { Form, Formik } from 'formik'
import React from 'react'
import FormFields from './FormField';
import { useSelector } from 'react-redux';

const BasicForm = ({ fieldsSchema }: any) => {

    const initialValues: { [key: string]: string } = {};

    fieldsSchema.forEach((field: any) => {
        initialValues[`${field.name}`] = '';
    });
    const handleSubmit = (values: any) => {
        console.log('Form data:', values);
    };
    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} >
            <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2 ">
                {fieldsSchema.map((field: any, index: any) => (
                    <FormFields key={index} {...field} />
                ))}
            </Form>
        </Formik>
    )
}

export default BasicForm
