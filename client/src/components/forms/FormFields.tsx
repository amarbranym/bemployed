import React from "react";
import FormLabel from "./Form_Label";
import FormField from "./FormField";
interface Props {
  label: string;
  name: string;
  cols: number | string;
  row: number,

}

const FormFields: React.FC<Props> = ({ label, cols, row, ...props }) => {
  return (
    <div className={`col-span-${cols} row-span-${row} my-auto `}>
      <FormLabel label={label} name={props.name} />
      <FormField {...props} />
    </div>
  );
};


export default FormFields;
