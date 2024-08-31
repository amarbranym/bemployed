import React, { useState } from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useDeleteStudentMutation, useGetCandidateListMutation } from '@/redux/api/apiSlice'
import { boolean } from 'yup'
import Confirmation from './ConfirmationModel'
const CandidateList = ({ candidate, onChange }: any) => {

    return (
        <>
        <ul role="list" className="divide-y divide-gray-100">
            {candidate?.map((item: any) => (
                <li key={item?.id} >
                    <Link href={`/student/${item?.id}`} className="flex justify-between gap-x-6 py-5">
                        <div className="flex min-w-0 gap-x-4">
                            <div className='h-12 w-12 rounded-full bg-gray-200 overflow-auto '>
                                {/* <img alt="" src={item.imageUrl} className=" flex-none rounded-full " /> */}
                            </div>
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">{item.attributes.FirstName} {item.attributes.LastName}</p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{item.attributes.Email}</p>
                            </div>
                        </div>

                    </Link>
                </li>
            ))}
        </ul>
        </>
    )
}

export default CandidateList
