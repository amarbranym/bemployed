"use client"
import Image from "next/image";
import avatarIcon from "@/images/avatar.png"
import { AiOutlineCamera, AiOutlineDelete } from "react-icons/ai";
import { LiaSpinnerSolid } from "react-icons/lia";
import { useFormikContext } from "formik";
import { useState } from "react";
const File_input = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [avatar, setAvatar] = useState<string>("")
  const inputId = `file-input-${props.name}`;
  const imageHandler = async (e: any) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        setFieldValue(props.name, avatar);
        setAvatar(avatar as string)
      }
    };
    fileReader.readAsDataURL(e.target.files[0]);
  };

  const handleDelete = () => {
    setAvatar("");
    setFieldValue(props.name, "");
  }
  return (
    <div className="w-full flex justify-center">
      <div className="relative">
        <div className="w-[20px] h-[20px] bg-gray-50 rounded-full absolute top-2 right-2 flex items-center justify-center cursor-pointer" onClick={handleDelete}>

          <AiOutlineDelete size={20} className="z-1" />

        </div>
        <Image
          // src={(user.avatar && user?.avatar?.url) || avatarIcon}
          src={avatar || avatarIcon}
          alt=""
          width={140}
          height={140}
          className={props.name === "photo" ? "w-[140px] h-[140px] cursor-pointer border-[3px] border-dark-400 rounded-md " : "w-[300px] h-[150px] cursor-pointer border-[3px] border-dark-400 rounded-md"}
        />
        <input
          type="file"
          name={props.name}
          id={inputId}
          className="hidden"
          onChange={imageHandler}
          accept="image/png,image/jpg,image/jpeg,image/webp"

        />
        <label htmlFor={inputId}>
          <div className="w-[30px] h-[30px] bg-gray-50 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
            {false ? (
              <LiaSpinnerSolid size={20} className="z-1 animate-spin" />
            ) : (
              <AiOutlineCamera size={20} className="z-1" />
            )}
          </div>
        </label>
      </div>
    </div>
  );
};

export default File_input;
