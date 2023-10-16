import React from 'react'
import GradientText from '../../common/GradientText';
import Banner1 from '../../../assets/Images/aboutus1.webp';
import Banner2 from '../../../assets/Images/aboutus2.webp';
import Banner3 from '../../../assets/Images/aboutus3.webp';

const BannerSection = () => {
    return (
        <div className='bg-richblack-700'>
            <div className='relative w-11/12 max-w-maxContent flex flex-col items-center text-center justify-between mx-auto text-white gap-10'>
                <div className='mx-auto py-20 text-4xl font-semibold w-[70%]'>
                    <h1 className=''>Driving Innovation in Online Education for a
                        <GradientText
                            text={"Brighter Future"}
                            color={"blue"}
                        />
                    </h1>
                    <p className='text-base mt-3 text-richblack-300 text-center w-[95%] mx-auto font-medium'>
                        Studynotion is at the forefront of driving innovation in online education.
                        We're passionate about creating a brighter future by offering cutting-edge courses,
                        leveraging emerging technologies, and nurturing a vibrant learning community.
                    </p>
                </div>
                <div className='sm:h-[70px] lg:h-[150px]'></div>
                <div className='absolute bottom-0 left-[50%] w-[100%] translate-x-[-50%] translate-y-[30%] grid 
                                grid-cols-3 gap-3 lg:gap-5'
                >
                    <img src={Banner1} alt="" />
                    <img src={Banner2} alt="" />
                    <img src={Banner3} alt="" />
                </div>
            </div>
        </div>
    )
}

export default BannerSection
