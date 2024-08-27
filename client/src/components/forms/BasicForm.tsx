import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import FormFields from './FormField';
import * as Yup from 'yup';
interface BasicFromProps {
    formValue: any;
    setFormValue: React.Dispatch<React.SetStateAction<any>>;
    fieldsSchema: any;
}
const BasicForm: React.FC<BasicFromProps> = ({ fieldsSchema, setFormValue, formValue = {} }) => {

    const initialValues: { [key: string]: any } = {};
    const validationSchemaFields: { [key: string]: any } = {};

    fieldsSchema.forEach((field: any) => {
        if (field?.multiple) {
            initialValues[`${field.name}`] = formValue[`${field.name}`] ? formValue[`${field.name}`] : [];
        }
        else {
            initialValues[`${field.name}`] = formValue[`${field.name}`] ? formValue[`${field.name}`] : '';
        }
        if (field?.required) {
            validationSchemaFields[`${field.name}`] = Yup.string().required(`${field.label || field.name} is required`);
        }
    });

    const validationSchema = Yup.object().shape(validationSchemaFields);

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            onSubmit={() => { }}
            validate={(values) => { setFormValue(values) }}
            validationSchema={validationSchema}
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
