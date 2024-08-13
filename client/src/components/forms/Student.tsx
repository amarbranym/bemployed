"use client"
import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import { personalData } from "./FileldData"
import FormFields from './FormFields';
import Button from '../ui/Button';
import { useGetCitiesQuery } from '@/redux/student/studentApi';
import ContactComponent from './ContactComponent';
import { useDispatch, useSelector } from 'react-redux';
import { setContact } from '@/redux/student/studentSlice';
import { ContactData } from './FileldData';
import DeleteIcons from '../icons/DeleteIcons';
import PlusIcon from '../icons/PlusIcon';
import ContactCom from './ContactCom';
const initialValues: { [key: string]: string } = {};
personalData.forEach((field) => {
    initialValues[field.name] = '';
});

const Student = () => {
    const dispatch = useDispatch()
    const { contacts } = useSelector((state: any) => state.student)
    const handleSubmit = (values: any) => {
        console.log('Form data:', values);
    };
    return (
        <>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2 ">
                    {personalData.map((field, index) => (
                        <FormFields key={index} {...field} />
                    ))}
                    {/* <div className='col-span-12'>
                        <Button type='submit' bg='solid' rounded='md' size='lg'>
                            Save
                        </Button>
                    </div> */}
                </Form>
            </Formik>
            
                <ContactCom />

        </>
    );
};

export default Student;
