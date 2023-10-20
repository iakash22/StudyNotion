import React from 'react'
import ContactInfo from '../components/core/contactPage/ContactInfo';
import ContactForm from '../components/common/ContactForm';
import ReviewSliderSection from '../components/common/ReviewSliderSection';
import Footer from '../components/common/Footer';

const Contact = () => {
    return (
        <div>
            <div className='mx-auto mt-20 flex w-11/12 max-w-max text-white gap-10 flex-col justify-between lg:flex-row'>
                <div className='lg:w-[40%]'>
                    <ContactInfo />
                </div>
                <div className='lg:w-[60%]'>
                    <div className='border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-3 flex-col'>
                        <h1 className='text-4xl font-semibold text-richblack-5 leading-10'>Got a Idea? We've got the skills.<br /> Let's team up</h1>
                        <p>Tell us more about yourself and what you're got in mind.</p>
                        <div className='mt-7 text-richblack-5'>
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </div>
            <ReviewSliderSection />
            <Footer />
        </div>
    )
}

export default Contact;
