import React from 'react'
const GradientText = ({text,color}) => {
    return (
        <span className={` 
                        ${color === "blue" ? "bg-gradient-to-b from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]" : ""} 
                        ${color === "red" ? "bg-gradient-to-br from-[#833AB4] via-[#fd1d1d] to-[#FCB045]" : "" }
                        ${color === "orange" ? " bg-gradient-to-b from-[#FF512F] to-[#F09819]" : ""}
                        text-transparent bg-clip-text font-bold`}
        >
            {" "+text}
        </span>
    )
}

export default GradientText;
