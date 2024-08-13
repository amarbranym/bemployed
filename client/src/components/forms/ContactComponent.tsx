"use client"
import React, { useState } from 'react';
import { Formik, Form, FieldArray } from 'formik';
import FormFields from './FormFields';
import DeleteIcons from '../icons/DeleteIcons';
import PlusIcon from '../icons/PlusIcon';
import { ContactData, personalData } from './FileldData';

const ContactComponent = ({insideField}:any) => {
    const initialValues: { [key: string]: string } = {};
    const [value, setValue] = useState<any>([]);

    ContactData.forEach((field: any) => {
        initialValues[field.name] = '';
    });

    const handleSubmit = (values: any) => {


    };

    return (
        <div className='mt-2 border rounded-md'>
            <div className='px-4 h-10 flex justify-between items-center bg-blue-50'>
                <h4>Contact</h4>
                <span><DeleteIcons className='size-4' /></span>
            </div>
            <Formik initialValues={initialValues} onSubmit={handleSubmit} className=" ">
                <Form className="p-6 grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2  ">
                    {ContactData.map((field: any, index: any) => (
                        <FormFields key={index} {...field} />
                    ))}
                    <div className='col-span-12 px-4 h-14 flex justify-center items-center cursor-pointer '>
                        <button type='submit' className='flex items-center  text-blue-600'><PlusIcon className='size-6' /> Add an entery </button>
                    </div>
                </Form>
            </Formik>

            
          
        </div>
    )
}

export default ContactComponent
