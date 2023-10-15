import React from 'react'
import { Link } from 'react-router-dom'

const LinkButton = ({text,toLink,active}) => {
    return (
        <Link to={toLink}>
            <div className={`text-sm cursor-pointer hover:text-richblack-50 transition-all duration-200
                            ${active ? "border-r border-richblack-700 px-3" : ""}`}
            >
                {text}
            </div>
        </Link>
    )
}

export default LinkButton
