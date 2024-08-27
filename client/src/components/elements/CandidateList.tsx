import React from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
const CandidateList = ({ candidate }: any) => {
    return (
        <ul role="list" className="divide-y divide-gray-100">
            {candidate?.map((item: any) => (
                <li key={item.attributes.id} className="flex justify-between gap-x-6 py-5">
                    <div className="flex min-w-0 gap-x-4">
                        <div className='h-12 w-12 rounded-full bg-gray-200 overflow-auto '>
                            {/* <img alt="" src={item.imageUrl} className=" flex-none rounded-full " /> */}
                        </div>
                        <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">{item.attributes.FirstName} {item.attributes.LastName}</p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.attributes.Email}</p>
                        </div>
                    </div>
               
                    <Menu as="div" className="relative flex-none ">
                        <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                            <span className="sr-only">Open options</span>
                            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5" />
                        </MenuButton>
                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                        >
                            <MenuItem>
                                <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                    Edit<span className="sr-only">, {item.attributes.FristName}</span>
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a href="#" className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50">
                                    Delete<span className="sr-only">, {item.attributes.FirstName}</span>
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </li>
            ))}
        </ul>
    )
}

export default CandidateList
