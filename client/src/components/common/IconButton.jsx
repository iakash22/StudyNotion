import React from 'react'

const IconButton = ({ text, icon, btnHander, type, active, disabled, children, additonalStyle }) => {
    return (
        <button
            type={type}
            onClick={btnHander}
            disabled={disabled}
            className={`flex items-center ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-700 text-richblack-5"}
                        rounded-md py-2 px-5 font-semibold cursor-pointer gap-x-2 ${additonalStyle}`}>
            <span>{text}</span>
            {icon}
            {children}
        </button>
    )
}

export default IconButton
