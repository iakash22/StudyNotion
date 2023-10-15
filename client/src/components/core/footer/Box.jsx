import React from 'react'
import LinkButton from './LinkButton';

const Box = ({heading, data}) => {
    return (
        <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
            <div className='text-base text-richblack-50 font-semibold'>{heading}</div>
            <div className='flex flex-col gap-2 mt-2'>
                {
                    data.map((link, index) => (
                        <LinkButton
                            key={index}
                            text={link.title}
                            toLink={link.link}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Box
