"use client";
import React from "react";
import { Field, useField } from "formik";

const Form_Input = ({ ...props }) => {
  const [field] = useField(props.name);
  return (
    <Field
      {...field}
      {...props}
      className=" py-2 border  rounded px-4 w-full mt-2 bg-[#E2E2E2]"
    />
  );
};

export default Form_Input;
