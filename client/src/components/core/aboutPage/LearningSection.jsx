import React from 'react'
import GradientText from '../../common/GradientText'
import Button from '../../common/Button';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../../common/ContactForm';

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningSection = () => {
    const navigate = useNavigate();
    return (
        <div className='max-w-maxContent mx-auto w-11/12 mt-20 flex flex-col justify-between text-white gap-10'>
            <div className='grid mx-auto xl:w-fit grid-cols-1 xl:grid-cols-4 mb-12 w-[350px]'>
                {LearningGridArray.map((card, i) => {
                    return (
                        <div
                            key={i}
                            className={`${i === 0 && "xl:col-span-2 xl:h-[294px]"}  ${card.order % 2 === 1
                                ? "bg-richblack-700 h-[294px]"
                                : card.order % 2 === 0
                                    ? "bg-richblack-800 h-[294px]"
                                    : "bg-transparent"
                                } ${card.order === 3 && "xl:col-start-2"}  `}
                        >
                            {card.order < 0 ? (
                                <div className="xl:w-[90%] flex flex-col gap-3 pb-10 xl:pb-0">
                                    <div className="text-4xl font-semibold ">
                                        {card.heading}
                                        <GradientText text={card.highlightText} color={"blue"} />
                                    </div>
                                    <p className="text-richblack-300 font-medium">
                                        {card.description}
                                    </p>

                                    <div className="w-fit mt-2">
                                        <Button text={card.BtnText} active={true} linkto={card.BtnLink} />
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 flex flex-col gap-8">
                                    <h1 className="text-richblack-5 text-lg">{card.heading}</h1>

                                    <p className="text-richblack-300 font-medium">
                                        {card.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className='mx-auto'>
                <h1 className='text-center text-4xl font-semibold'>Get in Touch</h1>
                <p className='text-center text-richblack-300 mt-3'>We'd love to here for you, Please fill out this form.</p>
                <ContactForm />
            </div>
        </div>
    )
}

export default LearningSection
