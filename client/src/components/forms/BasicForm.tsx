import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import FormFields from './FormField';
interface BasicFromProps {
    formValue: any; // Can be a more specific type if you know the structure
    setFormValue: React.Dispatch<React.SetStateAction<any>>; // Can be more specific with a known structure
    fieldsSchema: any;
}
const BasicForm: React.FC<BasicFromProps> = ({ fieldsSchema, setFormValue, formValue = {} }) => {

    const initialValues: { [key: string]: string } = {};

    fieldsSchema.forEach((field: any) => {
        initialValues[`${field.name}`] = '';
    });

    return (
        <Formik 
            initialValues={initialValues} 
            enableReinitialize
            onSubmit={() => { }}  
            validate={(values) => {setFormValue(values)}}
        >
            <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2 ">
                {fieldsSchema.map((field: any, index: any) => (
                    <FormFields key={index} {...field} />
                ))}
            </Form>
        </Formik >
    )
}

export default BasicForm
