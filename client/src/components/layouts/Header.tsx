"use client"
import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import RightArrow from '../icons/RightArrow'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './Logo'

const Header = () => {
    const [studentId, setStudentId] = useState<number | "">('');
    const router = useRouter();
    const pathname = usePathname();

    const updateURLWithId = (id: number) => {
        const newPath = pathname.replace(/\/[^/]+$/, `/${id}`);
        router.push(newPath);
    };

    const handleSearch = () => {
        if (studentId !== '' && studentId > 0) {
            updateURLWithId(studentId);
        }
    };

    const handleIncrement = () => {
        const currentId = parseInt(pathname.split('/').pop() || '0', 10);
        if (!isNaN(currentId)) {
            const newId = currentId + 1;
            setStudentId(newId);
            updateURLWithId(newId);
        }
    };

    const handleDecrement = () => {
        const currentId = parseInt(pathname.split('/').pop() || '0', 10);
        if (!isNaN(currentId) && currentId > 1) {
            const newId = currentId - 1;
            setStudentId(newId);
            updateURLWithId(newId);
        }
    };

    const handleInputChange = (e: any) => {
        const value = e.target.value;
        const numberValue = value === '' ? '' : parseInt(value, 10);
        setStudentId(numberValue);
    };
    return (
        <header className=' sticky top-0 bg-white py-3 px-4 flex items-center justify-between border-b print:hidden'>
            <div className='text-2xl font-bold mt-1'>
                <Logo />
            </div>
            <div className='flex gap-4'>
                <Button onClick={handleDecrement}><RightArrow className='size-4 rotate-180 ' /> </Button>
                <Button onClick={handleIncrement}><RightArrow className='size-4 ' /></Button>

                <input
                    id="search"
                    name="search"
                    placeholder='Enter student id'
                    onChange={(e: any) => setStudentId(e.target.value)}
                    type="number"
                    className="px-4 block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <Button onClick={handleSearch} >Search</Button>
            </div>
        </header>
    )
}

export default Header
