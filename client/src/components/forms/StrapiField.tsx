import React, { useEffect, useRef, useState } from 'react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useSelector } from 'react-redux';
import { useGetOptionsQuery } from '@/redux/student/studentApi';


const StrapiField = ({ ...props }) => {
    // const [field] = useField(props?.name);
    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState<any>("");
    const [selectedValue, setSelectedValue] = useState<any>(null);
    const [values, setValues] = useState<any>(null)
    const { data, refetch } = useGetOptionsQuery({ searchValue, model: props.rules.model }, { refetchOnMountOrArgChange: true });

    async function transformData(optionData: any) {
        return optionData && optionData?.map((item: any) => ({
            label: item.attributes[props.rules.field],
            value: item.attributes[props.rules.field]
        }));
    }

    async function getOptions() {
        const options = await transformData(data?.data);
        return options;
    }

    useEffect(() => {
        getOptions().then((option: any) => {
            setValues(option)
        });
    }, [data])



    const inputRef = useRef<any>();
    const handleInputClick = (e: any) => {
        setShowMenu(!showMenu);
    };

    useEffect(() => {
        const handler = (e: any) => {
            if (inputRef.current && !inputRef.current.contains(e.target)) {
                setShowMenu(false);

            }
        };

        window.addEventListener("click", handler);
        return () => {
            window.removeEventListener("click", handler);
        };
    });



    const isSelected = (option: any) => {
        if (!selectedValue) {
            return false;
        }
        return selectedValue.value === option.value;
    };

    const onItemClick = (option: any) => {
        setSelectedValue(option);
        setSearchValue(option?.label);
        setShowMenu(!showMenu)
    };

    return (
        <div ref={inputRef} className=' relative '>
            <div className="relative  rounded-md shadow-sm" onClick={handleInputClick} >
                <input
                    // {...field}
                    name={props.name}

                    type="text"
                    onChange={(e: any) => setSearchValue(e.target.value)}
                    value={searchValue}
                    className="block w-full px-4 rounded-md border-0 py-1.5 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  focus:outline-none  sm:text-sm sm:leading-6"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                    <ChevronDownIcon aria-hidden="true" className="h-5 w-5  text-gray-400" />
                </div>
            </div>
            {showMenu &&
                <ul role="list" className=" w-full   max-h-[20rem] overflow-y-auto absolute z-40 mt-2  origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                    {
                        values.length > 0 ? values.map((item: any, index: any) => (
                            <li key={index + 1} onClick={() => onItemClick(item)} className={` hover:bg-gray-100 cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 ${isSelected(item) && "bg-gray-100"}`}>{item.label}</li>

                        )) :
                            <li className=" text-center  cursor-pointer block px-4 py-8 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"><button className='text-blue-400 py-1 px-4 border  border-blue-300 rounded-md '>add this item</button></li>
                    }

                </ul>
            }

        </div >
    )
}

export default StrapiField
