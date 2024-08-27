import { ArrowLongLeftIcon, ArrowLongRightIcon } from '@heroicons/react/20/solid';
import React from 'react';

interface PaginationProps {
    currentPage: number;
    setCurrentPage: (page: number) => void;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, totalPages }) => {

    const handleNextPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = (event: React.MouseEvent) => {
        event.preventDefault(); // Prevent default anchor behavior
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0">
            <div className="-mt-px flex w-0 flex-1">
                <button
                    className={`inline-flex items-center border-t-2 pr-1 pt-4 text-sm font-medium ${currentPage > 1 ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                >
                    <ArrowLongLeftIcon aria-hidden="true" className="mr-3 h-5 w-5" />
                    Previous
                </button>
            </div>
            <div className="hidden md:-mt-px md:flex">
                <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
            </div>
            <div className="-mt-px flex w-0 flex-1 justify-end">
                <button
                    className={`inline-flex items-center border-t-2 pl-1 pt-4 text-sm font-medium ${currentPage < totalPages ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700' : 'text-gray-300 cursor-not-allowed'}`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                >
                    Next
                    <ArrowLongRightIcon aria-hidden="true" className="ml-3 h-5 w-5" />
                </button>
            </div>
        </nav>
    );
}

export default Pagination;
