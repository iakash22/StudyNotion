import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimelineImage from '../../../assets/Images/TimelineImage.png'


const TimelineData = [
    {
        heading: "Leadership",
        description: "Fully committed to the success company",
        Logo: Logo1,
    },
    {
        heading: "Responsibility",
        description: "Students will always be our top priority",
        Logo: Logo2,
    },
    {
        heading: "Flexibility",
        description: "The ability to switch is an important skills",
        Logo: Logo3,
    },
    {
        heading: "Solve the problem",
        description: "Code your way to a solution",
        Logo: Logo4,
    },
]

const TimLineSection = () => {

    const checkIndex = (index) => {
        if (index == 0 || index == 1 || index == 2) return true;
        else return false;
    };

    return (
        <div className='flex flex-col lg:flex-row gap-20 mb-20 items-center'>
            <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-3'>
                {
                    TimelineData.map((data, index) => (
                        <div key={index} className='flex flex-col lg:gap-3'>
                            <div className='flex gap-6'>
                                <div className='w-[52px] h-[52px] bg-white rounded-full flex items-center 
                                                    justify-center shadow-[#00000012] shadow-[0_0_62px_0]'  >
                                    <img src={data.Logo} alt='TimeLineLogo' />
                                </div>

                                <div>
                                    <p className='text-lg font-semibold'>{data.heading}</p>
                                    <p className='text-base'>{data.description}</p>
                                </div>
                            </div>
                            <div>
                                {
                                    checkIndex(index) && (
                                        <div
                                            className='hidden lg:block h-14 border-dotted border-r border-r-richblack-100 
                                                            bg-richblack-400/0 w-[26px]'>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='relative w-fit h-fit shadow-blue-200 shadow-[0_0_30px_0]'>
                <img 
                    src={TimelineImage} 
                    alt="TimelineImage" 
                    className='shadow-white shadow-[20px_20px] object-cover h-[400px] lg:h-fit'
                />

                <div className='absolute lg:left-[50%] lg:bottom-0 lg:translate-x-[-50%] 
                                lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row 
                                flex-col text-white uppercase py-5 gap-4 lg:gap-0 lg:py-10'
                >
                    <div className='flex flex-row gap-5 items-center px-7 lg:px-14 uppercase lg:border-r border-caribbeangreen-300'>
                        <p className='text-3xl text-white font-bold w-[75px]'>10</p>
                        <p className='text-sm text-caribbeangreen-300 w-[75px]'>Years Experinces</p>
                    </div>
                    <div className='flex flex-row gap-5 items-center px-7 lg:px-14 uppercase'>
                        <p className='text-3xl text-white font-bold w-[75px]'>250</p>
                        <p className='text-sm text-caribbeangreen-300 w-[75px]'>Types of courses</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimLineSection
