import React from "react";
import FormInputFields from "./Form_Input";
import ContactComponent from "./ContactComponent";
import Select from 'react-select';

const FormField = ({ ...props }) => {
  return (
    <>
      {["text", "number", "richtext"].includes(props.type) && (
        <FormInputFields {...props} />
      )}
      {/* {["contact"].includes(props.type) && <ContactComponent insideField={props.insideField} />} */}
      {["select"].includes(props.type) && (
        <Select
          // className="basic-single"
          classNamePrefix="select"
          defaultValue={props.selectOption[0]}
          isClearable={true}
          isSearchable={true}
          className="basic-multi-select"
          name="color"
          options={props.selectOption}
        />
      )}

    </>
  );
};

export default FormField;
