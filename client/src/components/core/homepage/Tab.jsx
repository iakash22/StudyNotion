import React from 'react'

const Tab = ({course,tag, setTabSection}) => {
    return (
        <div className={`text-[16px] flex flex-row items-center px-7 py-[7px] cursor-pointer rounded-full gap-2
                        hover:bg-richblack-900 hover:text-richblack-5 transition-all duration-200 
                        ${tag === course.tag ? "bg-richblack-900 text-richblack-5" : ""}`}
            onClick={() => setTabSection(course.tag)}
        >            
            {course.tag}
        </div>
    )
}

export default Tab
