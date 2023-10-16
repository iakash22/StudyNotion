import React from 'react'
import GradientText from '../../common/GradientText'
import FoundingStory from '../../../assets/Images/FoundingStory.png';

const StorySection = () => {
    return (
        <div className='mx-auto flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-richblack-500'>
            <div className='flex flex-col items-center gap-10 lg:flex-row justify-between'>
                <div className='my-24 lg:w-[50%] flex flex-col gap-10'>
                    <h1 className='text-4xl'>
                        <GradientText
                            text={"Our Founding Story"}
                            color={"red"}
                        />
                    </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        Our e-learning platform was born out of a shared vision and passion for transforming education.
                        It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible,
                        flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                    </p>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems.
                        We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries.
                        We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                    </p>
                </div>
                <div>
                    <img
                        src={FoundingStory}
                        alt=""
                        className='shadow-[0_0_20px_0px] shadow-[#FC6767]'
                    />
                </div>
            </div>

            <div className='flex flex-col items-center lg:gap-10 lg:flex-row justify-between'>
                <div className='my-24 flex flex-col lg:w-[40%] gap-10'>
                    <h1 className='text-4xl lg:w-[70%]'>
                        <GradientText
                            text={"Our Vision"}
                            color={"orange"}
                        />
                    </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn.
                        Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology
                        with engaging content, fostering a dynamic and interactive learning experience.
                    </p>
                </div>
                <div className='my-24 flex flex-col lg:w-[40%] gap-10'>
                    <h1 className='lg:w-[70%] text-4xl'>
                        <GradientText
                            text={"Our Mission"}
                            color={"blue"}
                        />
                    </h1>
                    <p className='text-base font-medium text-richblack-300 lg:w-[95%]'>
                        Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners,
                        where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in
                        an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions,
                        and networking opportunities.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default StorySection
