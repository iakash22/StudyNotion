import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import countryCode from '../../assets/data/countrycode.json';
import {contactusEndpoint} from '../../services/Apis';
import apiConnector from '../../services/apiConnector';
import {FiLoader} from 'react-icons/fi'

const initialData = {
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    phoneNumber: "",
};


const ContactForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset(initialData);
        }
    }, [reset, isSubmitSuccessful]);

    const onSubmit = async (data) => {
        // console.log("conatact data :", data);
        setLoading(true);
        try{
            const result = await apiConnector('POST', contactusEndpoint.CONTACT_US_API, data);
            console.log("contact us result :", result);
        }catch(err){
            console.log("ERROR MESSAGE from contact us - ", err.message)
        }
        // setTimeout(() => {
            setLoading(false);
        // },2000);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col gap-7'
        >
            <div className='flex flex-col lg:flex-row gap-5'>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='firstName' className='label-style'>First Name</label>
                    <input
                        type="text"
                        name='firstName'
                        id='firstName'
                        placeholder='Enter first name'
                        {...register('firstName', { required: true })}
                        className='form-style'
                    />
                    {errors.firstName && <span className='error-style'>Please enter your first name</span>}
                </div>
                <div className='flex flex-col gap-2 lg:w-[48%]'>
                    <label htmlFor='lastName' className='label-style'>Last Name</label>
                    <input
                        type="text"
                        name='lastName'
                        id='lastName'
                        placeholder='Enter last name'
                        {...register('lastName', { required: true })}
                        className='form-style'
                    />
                    {errors.lastName && <span className='error-style'>Please enter your last name</span>}
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="email">Email Address</label>
                <input
                    type="email"
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    {...register("email", { required: true })}
                    className='form-style'
                />
                {errors.email && <span className='error-style'>Please enter your email</span>}
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="phoneNumber" className='label-style'>Phone Number</label>
                <div className='flex gap-5  w-[100%]'>
                    <div className='flex w-[81px] flex-col gap-2'>
                        <select
                            name="dropdown"
                            id="dropdown"
                            className='rounded-lg bg-richblack-700 px-3 py-[0.89rem] text-[16px] leading-[24px] text-richblack-5 shadow-[0_1px_0_0] shadow-white/50 placeholder:text-richblack-400 focus:outline-none;'
                            {...register("countryCode", {required : true})}
                        >
                            {
                                countryCode.map((data, index) => (
                                    <option
                                        value={data.code}
                                        key={index}

                                    >
                                        {data.code} - {data.country}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className='w-[calc(100%-90px)] flex flex-col gap-2'>
                        <input 
                            type="text" 
                            name="phoneNumber"
                            id='phoneNumber'
                            placeholder='12345  67890'
                            {...register('phoneNumber', {
                                required : {value : true, message:"Please enter your phone number"},
                                maxLength : {value : 12, message : "Invalid phone number"},
                                minLength : {value : 8, message : "Invalid phone number"}
                            })}
                            className='form-style'
                        />
                    </div>
                </div>
                {errors.phoneNumber && <span className='error-style'>{errors.phoneNumber.message}</span>}
            </div>

            <div className='flex flex-col gap-2'>
                <label htmlFor="message">Message</label>
                <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="7"
                    placeholder='Enter your message here'
                    {...register("message", { required: true })}
                    className='form-style'
                />
                {errors.message && <span className='error-style'>Please enter your message</span>}
            </div>

            <button
                type='submit'
                className='rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
                            transition-all duration-200 hover:scale-95 hover:shadow-none  disabled:bg-richblack-500 sm:text-[16px] flex items-center justify-center gap-1'
            >
                <span>{loading ? "Sending..." : "Send Message"}</span>
                {loading && <FiLoader className='text-2xl text-richblack-500 animate-spin duration-1000'/>}
            </button>
        </form>
    )
}

export default ContactForm;
