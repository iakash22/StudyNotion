import React from 'react';
import HighlightText from './HighlightText';
import Know_your_progress from '../../../assets/Images/Know_your_progress.svg';
import Compare_with_others from '../../../assets/Images/Compare_with_others.svg';
import Plan_your_lessons from '../../../assets/Images/Plan_your_lessons.svg';
import Button from './Button';

const LearningLanguageSection = () => {
    return (
        <div className='flex flex-col items-center gap-3 my-10'>
            <div className='text-center text-4xl font-semibold max-md:mt-10 '>
                Your swiss knife for
                <HighlightText text={"learning any language"} />
            </div>

            <div className='text-center text-richblack-700 leading-6 text-base mx-auto font-medium lg:w-[70%] mt-3'>
                Using spin making learning multiple languages easy. with 20+ languages
                realistic voice-over, progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
                <img
                    src={Know_your_progress}
                    alt="img"
                    className='object-contain lg:-mr-32'
                />
                <img
                    src={Compare_with_others}
                    alt="img"
                    className='object-contain lg:-mb-10 lg:-mt-0 -mt-12'
                />
                <img
                    src={Plan_your_lessons}
                    alt="img"
                    className='object-contain lg:-ml-36 lg:-mt-5 -mt-16'
                />
            </div>

            <div className='my-3'>
                <Button
                    text={"Learn More"}
                    active={true}
                    toLink={"/signup"}
                />
            </div>
        </div>
    )
}

export default LearningLanguageSection;
