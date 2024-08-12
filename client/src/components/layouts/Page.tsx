import clsx from 'clsx';
import React, { ReactNode } from 'react';

interface PageProps {
    size?: 'A3' | 'A4' | 'A5';
    layout?: 'portrait' | 'landscape';
    children: ReactNode;
    className?: string,
    CandidateId?:number | string
}

const Page: React.FC<PageProps> = ({ size, layout = 'portrait', children, className, CandidateId }) => {
    return (
        <div className={clsx("page -z-10 relative ", className)} data-size={size} data-layout={layout}>
            {children}
            <footer className=' absolute bottom-0   w-full px-6 py-4 '>
                <div className='flex  justify-between items-center'>

                    <span>Candidate Id: {CandidateId}</span> <span className='h-[1px] bg-black w-[50%]'></span> <span className='font-bold'>Powered by Bemployed</span>
                </div>
            </footer>
        </div>
    );
};

export default Page;
