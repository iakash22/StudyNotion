import React, { useState } from 'react'
import {FaUserFriends} from 'react-icons/fa';
import { ImTree } from "react-icons/im";

const Card = ({ course, index, selectCourse, setSelectCourse }) => {
    const first = "shadow-[10px_10px] shadow-yellow-50 bg-white text-richblack-25"
    const all = "bg-richblack-800";

    return (
        <div className={`w-[360px] lg:w-[30%] h-[300px] box-border cursor-pointer
                        ${selectCourse === course.heading ? first : all} transition-all duration-300`
        }
            onClick={() => setSelectCourse(course.heading)}
        >
            <div className='border-b-[2px] border-richblack-400 border-dashed h-[80%]  
                            flex flex-col gap-3 p-6'
            >
                <h3 className={`${selectCourse === course.heading ? "text-richblack-800" : "text-white"} transition-all duration-300 text-xl font-semibold`}>
                    {course.heading}
                </h3>
                <p className='text-richblack-400'>{course.description}</p>
            </div>
            <div className={`flex flex-row justify-between px-6 py-3 font-medium ${selectCourse === course.heading ? "text-blue-300" : "text-richblack-300"} transition-all duration-300`}>
                <div className='flex flex-row gap-2 items-center text-[16px]'>
                    <FaUserFriends />
                    <span>{course.level}</span>
                </div>
                <div className='flex flex-row gap-2 items-center text-[16px]'>
                    <ImTree />
                    <span>{course.lessionNumber}</span>
                </div>
            </div>
        </div>
    )
}

export default Card
