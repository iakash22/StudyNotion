import React from 'react'

const info = [
    {
        title : "5K",
        desc : "Active Students"
    },
    {
        title : "10+",
        desc : "Mentors"
    },
    {
        title : "200+",
        desc : "Courses"
    },
    {
        title : "50+",
        desc : "Awards"
    }
];

const InfoSection = () => {
    return (
        <div className='bg-richblack-700'>
            <div className='flex flex-col gap-10 text-white w-11/12 max-w-maxContent mx-auto'>
                <div className='grid grid-cols-2 md:grid-cols-4 text-center'>
                    {
                        info.map((data,index) => (
                            <div 
                                key={index}
                                className='flex flex-col py-10'
                            >
                                <p className=' text-3xl font-bold text-richblack-5'>{data.title}</p>
                                <p className='text-base font-semibold text-richblack-500'>{data.desc}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default InfoSection
