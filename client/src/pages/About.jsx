import React from 'react';
import BannerSection from '../components/core/aboutPage/BannerSection';
import TextSection from '../components/core/aboutPage/TextSection';
import StorySection from '../components/core/aboutPage/StorySection';
import InfoSection from '../components/core/aboutPage/InfoSection';
import LearningSection from '../components/core/aboutPage/LearningSection';
import Footer from '../components/common/Footer';

const About = () => {
    return (
        <div className=''>
            <BannerSection />
            <TextSection />
            <StorySection />
            <InfoSection />
            <LearningSection />
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
                {/* Reviws from Other Learner */}
                <h1 className="text-center text-4xl font-semibold mt-8">
                    Reviews from other learners
                </h1>
                {/* <ReviewSlider /> */}
            </div>

            <Footer />
        </div>
    )
}

export default About
