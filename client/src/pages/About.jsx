import React from 'react'
import {TbLoader3} from 'react-icons/tb';

const About = () => {
    return (
        <div className='text-4xl my-auto gap-5 font-bold flex items-center flex-col'>
            About under maintance
            <TbLoader3 className='animate-spin text-blue-300 text-8xl' />
        </div>
    )
}

export default About
