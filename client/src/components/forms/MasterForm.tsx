"use client"
import React, { useState } from 'react';
import RepeatableForm from './RepeatableForm';
import BasicForm from './BasicForm';
import Button from '../ui/Button';


interface MasterFormProps {
    fields: any[],
    setData: React.Dispatch<React.SetStateAction<any>>,
    data: any,
    onSubmit: any

}

const MasterForm: React.FC<MasterFormProps> = ({ fields, onSubmit, data, setData }) => {
    const handleData = (key: string) => {
        const func = (values: any) => { setData({ ...data, [key]: values }) }
        return func;
    }
    return (
        <div className='flex flex-col gap-4'>
            {fields?.map((formConfig: any, index: any) => (
                <div key={index}>
                    {["Basic", "Component"].includes(formConfig.type) && (
                        <BasicForm
                            fieldsSchema={formConfig.schema}
                            formValue={data[formConfig.name]}
                            setFormValue={handleData(formConfig.name)}
                        />
                    )}

                    {formConfig.type === "RepeatableComponent" &&
                        (
                            <RepeatableForm
                                formName={formConfig.name}
                                formValue={data[formConfig.name]}
                                setFormValue={handleData(formConfig.name)}
                                fieldsSchema={formConfig.schema}
                            />
                        )}
                </div>
            ))}
            <div>
                <Button size="md" bg="solid" type='button' onClick={onSubmit} >Submit</Button>
            </div>
        </div>
    );
};


export default MasterForm;
