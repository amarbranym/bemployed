import clsx from 'clsx'
import React, { ReactNode } from 'react'

const Button = ({ children, className, ...props }: any) => {
    return (
        <button {...props} className="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{children}</button>
    )
}

export default Button
