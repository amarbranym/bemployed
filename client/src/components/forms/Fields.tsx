"use client";
import React from "react";
import { Field, useField } from "formik";
import { EnvelopeIcon } from "@heroicons/react/16/solid";
import StrapiField from "./StrapiField";
import SelectField from "./SelectField";
import ImportFile from "./ImportFileField";

const Form_Input = ({ ...props }) => {
  const [field] = useField(props.name);
  return (
    <>

      {["text", "number"].includes(props.type) && <Field
        {...field}
        {...props}
        className="input-text"
      />}

      {["email"].includes(props.type) && (
        <div className="relative  rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </div>
          <Field
            {...field}
            {...props}
            placeholder="you@example.com"
            className="input-email"
          />
        </div>)
      }



      {
        ["textarea"].includes(props.type) && <textarea
          {...props}
          {...field}
          className="input-text"
        />
      }


      {
        ["select"].includes(props.type) && <SelectField {...props} />

      }


      {
        ["ref:strapi"].includes(props.type) && (
          <StrapiField
            {
            ...props
            }
          />
        )
      }
      {
        ["file"].includes(props.type) && (
          <ImportFile
            {
            ...props
            }
          />
        )
      }
    </>
  );
};

export default Form_Input;
