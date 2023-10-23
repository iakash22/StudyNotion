import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getUserEnrolledCourses } from '../../../services/operations/courseDetailsApi';
import ProgressBar from "@ramonak/react-progress-bar";
import { BsThreeDotsVertical } from 'react-icons/bs'
import {useNavigate} from 'react-router-dom';

const EnrolledCourses = () => {
    const { token } = useSelector(state => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);
    const navigate = useNavigate();

    const fetchEnrolledCourse = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
        } catch (err) {
            console.log("Unable to fetch enrolled courses");
        }
    }
    useEffect(() => {
        fetchEnrolledCourse();
    }, []);
    return (
        <div className='mx-auto w-11/12 max-w-maxContent lg:max-w-[1000px] py-10'>
            <div className='text-3xl text-richblack-50'>Enrolled Courses</div>
            {
                !enrolledCourses ?
                    (
                        <div className='grid h-[10vh] w-full place-content-center text-richblack-5 text-2xl font-semibold'>
                            Loading...
                            <div className="spinner"></div>
                        </div>
                    ) : (
                        !enrolledCourses.length ?
                            (
                                <p className='grid h-[10vh] w-full place-content-center text-richblack-5'>
                                    You have not enrolled in any course yet.
                                </p>
                            ) : (
                                <div className='my-8 text-richblack-5'>
                                    <div className='flex rounded-t-lg bg-richblack-500'>
                                        <p className='w-[45%] px-5 py-3'>Course Name</p>
                                        <p className='w-1/4 px-2 py-3'>Durations</p>
                                        <p className='flex-1 px-2 py-3'>Progress</p>
                                        <p></p>
                                    </div>

                                    {
                                        enrolledCourses.map((course, index) => {
                                            return (
                                                <div key={index} className={`flex items-center border border-richblack-700 ${enrolledCourses.length - 1 === index ? "rounded-b-lg" : "rounded-none"}`}>
                                                    <div
                                                        className='flex w-[45%] cursor-pointer items-center gap-4 px-5 py-3'
                                                        onClick={() => {
                                                            navigate(
                                                                `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                                                            )
                                                        }}
                                                    >
                                                        <img src={course?.thumbnail} className="h-14 w-14 rounded-lg object-cover" />
                                                        <div className='flex max-w-xs flex-col gap-2'>
                                                            <p className='font-semibold'>{course?.courseName}</p>
                                                            <p className='text-xs text-richblack-300'>{course?.CourseDescription}</p>
                                                        </div>
                                                    </div>
                                                    <div className='w-1/4 px-2 py-3'>{course?.totalDuration || "2hr 30 mins"}</div>
                                                    <div className='flex w-1/5 flex-col gap-2 px-2 py-3'>
                                                        <p>Progress : {course?.progressPercentage || 0}</p>
                                                        <ProgressBar
                                                            completed={course?.progressPercentage || 0}
                                                            height='8px'
                                                            isLabelVisible={false}
                                                        />
                                                    </div>
                                                    <div className='w-[8%] flex items-center justify-end'>
                                                        <BsThreeDotsVertical fontSize={24} />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                    )
            }
        </div>
    )
}

export default EnrolledCourses
