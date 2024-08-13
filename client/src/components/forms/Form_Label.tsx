import React from "react";

interface FormLabelProps {
  name: string;
  label: string;
}

const FormLabel: React.FC<FormLabelProps> = ({ name, label }) => {
  return (
    <label
      htmlFor={name}
      className="block text-[16px] font-medium text-[#000000]"
    >
      {label}
    </label>
  );
};

export default FormLabel;
