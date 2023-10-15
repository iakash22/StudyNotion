import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import HighlightText from '../components/core/homepage/HighlightText';
import Button from '../components/core/homepage/Button';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from '../components/core/homepage/CodeBlocks';
import Tab from '../components/core/homepage/Tab';
import Card from '../components/core/homepage/Card';
import { HomePageExplore } from '../assets/data/homepage-explore';
import TimLineSection from '../components/core/homepage/TimLineSection';
import LearningLanguageSection from '../components/core/homepage/LearningLanguageSection';
import Instructor from '../assets/Images/Instructor.png';
import Footer from '../components/common/Footer';
import {FiLoader} from 'react-icons/fi';

const Home = () => {
    return (
        <div>
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <Footer />
        </div>
    )
}


const SectionOne = () => {
    const [data, setData] = useState(HomePageExplore[0].courses);
    const [tag, setTag] = useState("Free");
    const [selectCourse, setSelectCourse] = useState(HomePageExplore[0].courses[0].heading);

    const setTabSection = (value) => {
        setTag(value);
        const courseData = HomePageExplore.filter((data) => data.tag === value);
        setData(courseData[0].courses);
        setSelectCourse(courseData[0].courses[0].heading);
    };


    return (
        <div className='relative flex flex-col w-11/12 max-w-maxContent text-white mx-auto 
                        gap-8 items-center justify-between'
        >
            <Link to={"/signup"}>
                <div className='mt-16  p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                                transition-all duration-200 hover:scale-95 w-fit group drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]
                                hover:drop-shadow-none
                '>
                    <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px] transition-all
                                    duration-200 group-hover:bg-richblack-900
                    '>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='text-4xl text-center font-semibold'>
                Empower Your Future with
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className='mt-3 w-[90%] text-center text-lg font-bold text-richblack-300'>
                With our online coding courses, you can learn at your own pace,
                from anywhere in the world, and get access to a wealth of resources,
                including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex flex-row gap-7 mt-8'>
                <Button text={"Learn More"} active={true} toLink={"/signup"} />
                <Button text={"Book a Demo"} active={false} toLink={"/login"} />
            </div>

            <div className='mx-3 my-7 shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video className='shadow-[20px_20px_rgba(255,255,255)]'
                    loop
                    autoPlay
                    muted
                >
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            <div>
                <CodeBlocks
                    position={"lg:flex-row"}
                    headingText={
                        <div className='text-4xl font-semibold'>
                            Unlock your
                            <HighlightText text={"coding potential "} />
                            with our online courses.
                        </div>
                    }
                    paraText={
                        `Our courses are designed and taught by industry
                        experts who have years of experience in coding and
                        are passionate about sharing their knowledge with you.`
                    }
                    btnText1={<div className='flex items-center gap-2'>Try it Yourself <FaArrowRight /></div>}
                    btntext2={"Learn More"}
                    codeBlocks={`<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>this is Mypage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one/">One</a><a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>\n</body>`}
                    codeColor={"text-yellow-25"}
                    codeblur={"code-block1"}
                />
            </div>
            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    headingText={
                        <div className='text-4xl font-semibold lg:w-[50%]'>
                            Start
                            <HighlightText text={"coding in seconds "} />
                        </div>
                    }
                    paraText={
                        `Go ahead, give it a try. Our hands-on learning
                        environment means you'll be writing real code from
                        your very first lesson.`
                    }
                    btnText1={<div className='flex items-center gap-2'>Continue Lesson <FaArrowRight /></div>}
                    btntext2={"Learn More"}
                    codeBlocks={`import React from 'react'\nimport Button from './Button';\nimport { TypeAnimation } from 'react-type-animation';\nimport { FaArrowRight } from 'react-icons/fa'\n\nconst Home = () => {\nreturn (\n<div> Home </div>\n)\n}\nexport default Home;`}
                    codeColor={"text-white"}
                    codeblur={"code-block2"}
                />
            </div>

            <div>
                <div className='text-4xl text-center font-semibold my-10'>
                    Unlock the
                    <HighlightText text={"Power of Code"} />

                    <p className='text-richblack-300 text-lg font-bold mt-1'>
                        Learn to Build Anything You Can Imagine
                    </p>
                </div>
            </div>

            <div className='hidden w-max lg:flex mx-auto bg-richblack-800 text-richblack-200 p-1
                            font-medium rounded-full gap-5 -mt-5 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'
            >
                {
                    HomePageExplore.map((course, index) => (
                        <Tab course={course} key={index} tag={tag} setTabSection={setTabSection} />
                    ))
                }
            </div>

            <div className='hidden lg:block lg:h-[200px]'></div>
            <div className='flex flex-row lg:absolute lg:flex-nowrap flex-wrap justify-center gap-10 lg:gap-0
                            lg:justify-between w-full lg:px-0 px-3 lg:mb-0 mb-7 text-black lg:bottom-0 
                            lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]
            '>
                {
                    data.map((course, index) => (
                        <Card course={course} key={index} index={index} selectCourse={selectCourse} setSelectCourse={setSelectCourse} />
                    ))
                }
            </div>


        </div>
    )
}
const SectionTwo = () => {
    return (
        <div className=' text-richblack-700 bg-pure-greys-5 '>
            <div className='bgHome h-[310px]'>
                <div className='flex flex-col item-center justify-between w-11/12 max-w-maxContent gap-5 mx-auto'>
                    <div className='h-[210px]'></div>
                    <div className='flex flex-row gap-7 justify-center text-white'>
                        <Button
                            text={
                                <span className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight />
                                </span>
                            }
                            active={true}
                            toLink={"signup"}
                        />
                        <Button
                            text={"Learn More"}
                            active={false}
                            toLink={"login"}
                        />
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center lg:justify-between w-11/12 max-w-maxContent mx-auto gap-8 '>
                <div className='flex flex-row gap-5 lg:mt-20 mb-12 justify-between'>
                    <div className='text-4xl font-semibold w-[45%]'>
                        Get the skills you need for a
                        <HighlightText text={"job that is in demand."} />
                    </div>

                    <div className='flex flex-col gap-10 w-[37%] items-start'>
                        <div className='text-[16px]'>
                            The modern StudyNotion is the dictates its own terms. Today,
                            to be a competitive specialist requires more than professional skills.
                        </div>
                        <Button
                            text={"Learn More"}
                            active={true}
                            toLink={"signup"}
                        />
                    </div>
                </div>

                <div>
                    <TimLineSection />
                </div>

                <div>
                    <LearningLanguageSection />
                </div>
            </div>
        </div>
    )
}
const SectionThree = () => {
    return (
        <div className='relative flex flex-col mx-auto my-20 w-11/12 max-w-maxContent bg-richblack-900
                        items-center justify-center gap-8 text-white'
        >
            <div className='flex lg:flex-row flex-col items-center gap-20'>
                <div className='lg:w-[50%]' >
                    <img
                        src={Instructor}
                        alt="img"
                        className='shadow-white shadow-[-20px_-20px]'
                    />
                </div>
                <div className='lg:w-[50%] flex gap-10 flex-col items-start'>
                    <h1 className='text-4xl font-semibold lg:w-[50%]'>
                        Become an
                        <HighlightText text={"instructor"} />
                    </h1>
                    <p className='text-base font-medium text-richblack-300 text-justify w-[90%]'>
                        Instructors from around the world teach millions
                        of students on StudyNotion. We provide the tools and
                        skills to teach what you love.
                    </p>
                    <Button
                        text={
                            <div className='flex items-center gap-2'>
                                Start Teaching Today
                                <FaArrowRight />
                            </div>
                        }
                        active={true}
                        toLink={"/signup"}
                    />
                </div>
            </div>

            <div className='text-center text-4xl mt-8 font-semibold'>
                Reviews from other learners
            </div>

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

export default Home;
