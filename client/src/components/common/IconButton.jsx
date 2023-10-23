import React from 'react'

const IconButton = ({text,icon,btnHander,type,active,additonalStyle}) => {
    return (
        <button 
            type={type}
            onClick={btnHander}
            className={`flex items-center ${active ? "bg-yellow-50 text-richblack-900" : "bg-richblack-700 text-richblack-5"}
                        rounded-md py-2 px-5 font-semibold cursor-pointer gap-x-2 ${additonalStyle}`}>
            <span>{text}</span>
            {icon}
        </button>
    )
}

export default IconButton
