"use client"
import React, { useEffect, useState } from 'react';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import { AiFillEye, AiOutlinePlus } from "react-icons/ai";
import { Formik, Form } from 'formik';
import { v4 as uuidv4 } from 'uuid';
import { ContactData } from './FileldData';
import { Button } from '@mui/material';
import FormFields from './FormFields';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcons from '../icons/DeleteIcons';
const initialValues: { [key: string]: string } = {};
ContactData.forEach((field: any) => {
    initialValues[field.name] = '';
});


const Experience: React.FC = () => {
    const [contact, setContact] = useState<any>([]);
    const dispatch = useDispatch()

    const [expanded, setExpanded] = useState<string | false>();

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };
    const addContact = () => {
        const uniqueId = uuidv4();
        setContact([...contact, { id: uniqueId, values: { ...initialValues } }]);
        setExpanded(uniqueId)
    };

    const handleFormSubmit = (values: any, id: string) => {

        setContact(contact.map((edu: any) => {
            if (edu.id === id) {
                return { ...edu, values };
            }
            return edu;
        }));
        setExpanded(false)
    };

    const removeContact = (id: string) => {
        setContact(contact.filter((edu: any) => edu.id !== id));
    };

    useEffect(() => {
        const id = uuidv4()
        setContact([...contact, { id: id, values: { ...initialValues } }]);
        setExpanded(id)
    }, [])

    return (
        <AccordionDetails className='border mt-4 rounded-md px-6'>
            <div className='py-4 text-xl'>
                <h1>Contact</h1>
            </div>

            <div className='flex flex-col gap-2 border  '>
                {contact.map((edu: any) => (
                    <div key={edu.id}>
                        <Accordion expanded={expanded === edu.id} onChange={handleChange(edu.id)} sx={{ boxShadow: "none", paddingY: "0px", border: "1px solid black" }}>
                            <AccordionSummary sx={{ borderRadius: "10px", display: expanded === edu.id ? "none" : "flex", justifyContent: "space-between", alignItems: "center" }} >

                                <h4 className=' w-full text-lg  block '>
                                    {edu?.values.number || edu?.values.countryCode || edu?.values.Type}
                                </h4>
                                <AiFillEye className='h-8 w-6 ' />

                            </AccordionSummary>
                            <AccordionDetails>
                                <Formik
                                    initialValues={edu.values}
                                    onSubmit={(values) => handleFormSubmit(values, edu.id)}
                                >
                                      
                                    <Form className="grid gap-4 grid-flow-row-dense grid-cols-12 grid-rows-2">
                                        {ContactData.map((field: any, index) => (
                                            <FormFields key={index} {...field} />
                                        ))}
                                        <div className=' col-span-12 flex justify-between '>

                                            <Button variant="contained" type='submit' >
                                                Save
                                            </Button>
                                            <Button type='button' onClick={() => removeContact(edu.id)}>
                                                <DeleteIcons className='size-6'/>

                                            </Button>
                                        </div>
                                    </Form>
                                </Formik>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ))}
            </div>
            <div className='mt-4 text-center'>
                <Button type='button' onClick={addContact}>
                    <AiOutlinePlus className='h-6 w-6' /> Professional Experience
                </Button>
            </div>
        </AccordionDetails>
    );
};

export default Experience;
