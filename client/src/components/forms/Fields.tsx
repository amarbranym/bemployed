"use client";
import React from "react";
import { Field, useField } from "formik";
import { EnvelopeIcon } from "@heroicons/react/16/solid";

const Form_Input = ({ ...props }) => {
  const [field] = useField(props.name);
  return (
    <>
      {["text","number"].includes(props.type) && <Field
        {...field}
        {...props}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-gray-300 placeholder:text-gray-400  focus:outline-none  disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6 px-4"
      />}
      {["email"].includes(props.type) && <div className="relative  rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
        </div>
        <Field
          {...field}
          {...props}
          placeholder="you@example.com"
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 px-4"
        />
      </div>}
      {
        ["textarea"].includes(props.type) && <textarea
          {...props}
          {...field}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6 px-4"
          defaultValue={''}
        />
      }
      {
        ["select"].includes(props.type) && (
          <select
            {
            ...props
            }
            {
            ...field
            }
            className=" block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300   sm:text-sm sm:leading-6"
          >
            {
              props.option?.map((item: any) => (
                <option key={item.value}>{item.label}</option>
              ))
            }
          </select>
        )
      }
    </>
  );
};

export default Form_Input;
