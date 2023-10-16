import React from 'react'
import GradientText from '../../common/GradientText'

const TextSection = () => {
    return (
        <div className='border-b border-richblack-700'>
            <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between 
                            gap-10 text-richblack-500'
            >
                <div className='h-[100px]'></div>
                <div className='text-xl md:text-4xl font-semibold mx-auto py-5 pb-20 text-center text-white'>
                    We are passionate about revolutionizing the way we learn. Our innovative platform
                    <GradientText
                        text={"combines technology"}
                        color={"blue"}
                    />
                    ,
                    <GradientText
                        text={"expertise"}
                        color={"orange"}
                    />
                    , and community to create an
                    <GradientText
                        text={"unparalleled educational experience."}
                        color={"orange"}
                    />
                </div>
            </div>
        </div>
    )
}

export default TextSection;
