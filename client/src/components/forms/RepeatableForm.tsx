"use client"
import React, { useEffect, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import FormField from './FormField';
import DeleteIcons from '../icons/DeleteIcons';
import Button from '../ui/Button';
import PlusIcon from '../icons/PlusIcon';

interface RepeatableFormProps {
    formName: string;
    formValue: any; // Can be a more specific type if you know the structure
    setFormValue: React.Dispatch<React.SetStateAction<any>>; // Can be more specific with a known structure
    fieldsSchema: any;
}

const RepeatableForm: React.FC<RepeatableFormProps> = ({ formName, formValue, setFormValue, fieldsSchema }) => {

    const [expanded, setExpanded] = useState<string | false>();

    const initialValues: { [key: string]: string } = {};
    fieldsSchema.forEach((field: any) => {
        initialValues[field.name] = '';
    });
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const addForm = () => {
        const uniqueId = uuidv4();
        setFormValue([...formValue, { id: uniqueId, values: { ...initialValues } }]);
        setExpanded(uniqueId)
    };

    const handleFormSubmit = (values: any, id: string) => {

        setFormValue(formValue.map((edu: any) => {
            if (edu.id === id) {
                return { ...edu, values };
            }
            return edu;
        }));
        setExpanded(false)
    };

    const removeForm = (id: string) => {
        setFormValue(formValue.filter((edu: any) => edu.id !== id));
    };

    useEffect(() => {
        const id = uuidv4()
        setFormValue([...formValue, { id: id, values: { ...initialValues } }]);
        setExpanded(id)
    }, [])

    return (
        <div className='border mt-4 rounded-md px-6'>
            <div className='py-4 text-xl'>
                <h1>{formName}</h1>
            </div>

            <div className='flex flex-col gap-2   '>
                {formValue.map((edu: any) => (
                    <div key={edu.id}>
                        <Accordion expanded={expanded === edu.id} onChange={handleChange(edu.id)} sx={{ boxShadow: "none", paddingY: "0px", border: "1px solid black" }}>
                            <AccordionSummary sx={{ borderRadius: "10px", display: expanded === edu.id ? "none" : "flex", justifyContent: "space-between", alignItems: "center" }} >

                                <h4 className=' w-full text-lg  block '>
                                    {edu?.values.number || edu?.values.countryCode || edu?.values.Type}
                                </h4>
                                {/* <AiFillEye className='h-8 w-6 ' /> */}

                            </AccordionSummary>
                            <AccordionDetails>
                                <Formik
                                    initialValues={edu.values}
                                    onSubmit={(values) => handleFormSubmit(values, edu.id)}
                                >

                                    <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2">
                                        {fieldsSchema.map((field: any, index: any) => (
                                            <FormField key={index} {...field} />
                                        ))}
                                        <div className=' col-span-12 flex justify-between  '>
                                            <div>
                                                <Button type='submit' className=" block" >
                                                    Save
                                                </Button>
                                            </div>
                                            <Button type='button' onClick={() => removeForm(edu.id)}>
                                                <DeleteIcons className='size-6' />

                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
            <div className='py-2 '>
                <Button type='button' className="!flex items-center mx-auto" onClick={addForm}>
                    <PlusIcon className="size-6" /> Professional Experience
                </Button>
            </div>
        </div>
    );
};

export default RepeatableForm;
