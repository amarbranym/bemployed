"use client"
import { useState } from "react";
import DeleteIcons from "../icons/DeleteIcons";
import Button from "../ui/Button";
import { useFormikContext } from "formik";
import { PhotoIcon } from "@heroicons/react/16/solid";
const ImportFile = ({ ...props }) => {
  const inputId = `file-input-${props?.name}`;
  const [avatar, setAvatar] = useState<string>("")
  const { setFieldValue } = useFormikContext<any>();
  const imageHandler = async (e: React.ChangeEvent<any>,) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        await setAvatar(avatar as string);
        await setFieldValue(props.name, avatar);
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleDelete = () => {
    setAvatar("");
    setFieldValue(props.name, "");
  }
  return (
    <div className="  rounded-md w-full border h-40 flex justify-center items-center  ">
      {!avatar ? <label htmlFor={inputId} className="  cursor-pointer h-full  w-full bg-gray-50 relative flex justify-center items-center ">
        <input
          id={inputId}
          type="file"
          onChange={imageHandler}
          name={props.name}
          className="hidden"
          accept="image/png,image/jpg,image/jpeg,image/webp"
        />
        <div className="flex flex-col items-center">
          <PhotoIcon className="size-6" />
          <span className="text-sm">Click to add  an assesst</span>
        </div>

      </label> : (<div className="inline-block relative">
        <img src={avatar} alt="" className=" h-40 object-cover" />
        <div className="  absolute bottom-0 right-0">
          <Button size="sm" bg="white" onClick={handleDelete} >
            <DeleteIcons className='size-4' />
          </Button>
        </div>
      </div>)}

    </div>
  );
};

export default ImportFile;
