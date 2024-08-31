import React from 'react'
import { PlusIcon } from '@heroicons/react/16/solid'
import Button from '../ui/Button';
interface Props {
    handleToggleSidebar?: (open: boolean) => void;
}
const DataNotFound: React.FC<Props> = ({ handleToggleSidebar }) => {
    return (
        <div className=' my-40 '>
            <div className='text-center'>
                <h1 className="text-2xl  font-bold leading-10 ">No Data Available</h1>
                <p className='text-xl '>
                    There is no data to show you right now.
                </p>
            </div>
        </div>
    )
}

export default DataNotFound
