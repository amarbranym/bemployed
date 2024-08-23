import React from "react";
import Label from "./Label";
import Fields from "./Fields";
import { Field, useField, ErrorMessage } from "formik";

interface Props {
  label: string;
  name: string;
  cols: number | string;
  row: number,

}

const FormFields: React.FC<Props> = (_props: any) => {

  const { label, cols, row, ...props }: any = _props

  return (
    <div className={`col-span-${cols} row-span-${row} my-auto `}>
      <Label label={label} name={props.name} />
      <Fields {...props} />
      <ErrorMessage name={props.name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  );
};


export default FormFields;
