import React from 'react';
import BannerSection from '../components/core/aboutPage/BannerSection';
import TextSection from '../components/core/aboutPage/TextSection';
import StorySection from '../components/core/aboutPage/StorySection';
import InfoSection from '../components/core/aboutPage/InfoSection';
import LearningSection from '../components/core/aboutPage/LearningSection';
import ReviewSliderSection from '../components/common/ReviewSliderSection'
import Footer from '../components/common/Footer';

const About = () => {
    return (
        <div className=''>
            <BannerSection />
            <TextSection />
            <StorySection />
            <InfoSection />
            <LearningSection />
            <ReviewSliderSection />
            <Footer />
        </div>
    )
}

export default About
