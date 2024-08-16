"use client"
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ImportFile = ({ ...props }) => {

  return (
    <div className=" w-full border  bg-red-50 h-48 ">
      <input
        type="file"
        accept="image/png,image/jpg,image/jpeg,image/webp"
      />
    </div>
  );
};

export default ImportFile;
