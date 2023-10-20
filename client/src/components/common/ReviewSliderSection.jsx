import React from 'react'
import {FiLoader} from 'react-icons/fi'

const ReviewSliderSection = () => {
    return (
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
            {/* Reviws from Other Learner */}
            <h1 className="text-center text-4xl font-semibold mt-8">
                Reviews from other learners
            </h1>
            {/* <ReviewSlider /> */}

            <div className='tex-white'>
                <div className='h-40 flex flex-col mt-3 items-center gap-5 text-richblack-600 text-3xl '>
                    Under Maintenance
                    <FiLoader 
                        className='text-4xl text-blue-200 animate-spin duration-1000'
                    />
                </div>
            </div>
        </div>
    )
}

export default ReviewSliderSection
