import React from 'react'
import {HiChatBubbleLeftRight,HiGlobeEuropeAfrica} from 'react-icons/hi2';
import {IoCallSharp} from 'react-icons/io5';

const contactInfo = [
    {
        title : "Chat on us",
        icon : HiChatBubbleLeftRight,
        description : "Our friendly team is here to help.",
        details : "info@studynotion.com"
    },
    {
        title : "Visit us",
        icon : HiGlobeEuropeAfrica,
        description : "Come and say hello at our office HQ.",
        details : "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016"
    },
    {
        title : "Call us",
        icon : IoCallSharp,
        description : "Mon - Fri From 8am to 5pm",
        details : "+123 456 7869"
    },
];

const ContactInfo = () => {
    return (
        <div className='flex flex-col gap-6 rounded-xl bg-richblack-800 p-4 lg:p-6'>
            {
                contactInfo.map((data,index) => (
                    <div 
                        className='flex flex-col gap-[2px] p-3 text-sm text-richblack-200' 
                        key={index}
                    >
                        <div className='flex flex-row gap-3 items-center'>
                            <data.icon fontSize={25}/>
                            <p className='text-lg text-richblack-5 font-semibold'>{data.title}</p>
                        </div>
                        <p className='font-medium'>{data.description}</p>
                        <p className='font-semibold'>{data.details}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ContactInfo
