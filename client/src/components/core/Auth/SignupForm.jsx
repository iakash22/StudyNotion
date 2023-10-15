import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp} from '../../../services/operations/authApi';
import { setSignupData } from '../../../redux/slices/AuthSlice';
import {ACCOUNT_TYPE} from '../../../utils/Constants';

const initialState = {
    firstName: "", lastName: "", email: "",
    password: "", confirmPassword: "",
}

const SignupForm = () => {
    const navigate = useNavigate();
    const { loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [AccountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
    const [showPwd1, setShowPwd1] = useState(true);
    const [showPwd2, setShowPwd2] = useState(true);
    const [formdata, setFormData] = useState(initialState);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    function submitHandler(event) {
        event.preventDefault();
        if(formdata.password != formdata.confirmPassword){
            return toast.error('Password does not match confirm password');
        }
        const signupData = {
            ...formdata,
            accountType : AccountType,
        }
        dispatch(setSignupData(signupData));
        dispatch(sendOtp(formdata.email,navigate));

        setFormData(initialState);
        setAccountType(ACCOUNT_TYPE.STUDENT);
    }
    return (
        <div>
            {
                loading ? (<div>
                    Loading...
                </div>) : (
                    <>
                        <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full
                            max-w-max drop-shadow-[0_1.5px_rgba(255,255,255,0.25)]'
                        >
                            <button onClick={() => { setAccountType(ACCOUNT_TYPE.STUDENT) }} className={` ${AccountType === ACCOUNT_TYPE.STUDENT ? 'bg-richblack-900 shadow-inner shadow-blue-100' : 'bg-transparent'} bg-richblack-900 text-richblack-5 py-2 px-5 rounded-full
                transition-all duration-200`}>
                                Student
                            </button>
                            <button onClick={() => { setAccountType(ACCOUNT_TYPE.INSTRUCTOR) }} className={`${AccountType === ACCOUNT_TYPE.INSTRUCTOR ? 'bg-richblack-900 shadow-inner shadow-blue-100' : 'bg-transparent'} text-richblack-5 py-2 px-5 rounded-full
                transition-all duration-200`}>
                                Instructor
                            </button>
                        </div>

                        <form onSubmit={submitHandler} className='flex flex-col w-full gap-y-4'>
                            <div className='flex gap-x-4'>
                                <label className='w-full'>
                                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>First name <sup className=' text-pink-200'>*</sup></p>
                                    <input type='text' required
                                        name='firstName'
                                        value={formdata.firstName}
                                        onChange={changeHandler}
                                        placeholder='Enter first name'
                                        className=' bg-richblack-700 border border-richblack-700 rounded-[0.5rem] text-richblack-5 w-full p-[12px] 
                                        drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] outline-none'
                                    />
                                </label>
                                <label className='w-full'>
                                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Last Name <sup className=' text-pink-200'>*</sup></p>
                                    <input type='text' required
                                        name='lastName'
                                        value={formdata.lastName}
                                        onChange={changeHandler}
                                        placeholder='Enter last name'
                                        className=' bg-richblack-700 border border-richblack-700 rounded-[0.5rem] outline-none 
                                        text-richblack-5 w-full p-[12px] drop-shadow-[0_1.5px_rgba(255,255,255,0.5)]'
                                    />
                                </label>
                            </div>
                            <label className='w-full'>
                                <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Email Address <sup className=' text-pink-200'>*</sup></p>
                                <input type='text' required
                                    name='email'
                                    value={formdata.email}
                                    onChange={changeHandler}
                                    placeholder='Enter email address'
                                    className=' bg-richblack-700 border border-richblack-700 rounded-[0.5rem] outline-none 
                                    text-richblack-5 w-full p-[12px] drop-shadow-[0_1.5px_rgba(255,255,255,0.5)]'
                                />
                            </label>
                            <div className='flex gap-x-4'>
                                <label className=' relative w-full'>
                                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Create Password <sup className=' text-pink-200'>*</sup></p>
                                    <input type={!showPwd1 ? 'text' : 'password'} required
                                        name='password'
                                        value={formdata.password}
                                        onChange={changeHandler}
                                        placeholder='Enter Password'
                                        className=' bg-richblack-700 border border-richblack-700 rounded-[0.5rem] outline-none 
                                        text-richblack-5 w-full p-[12px] drop-shadow-[0_1.5px_rgba(255,255,255,0.5)]'
                                    />
                                    {formdata.password  && <span className=' absolute top-[38px] right-3 cursor-pointer'
                                        onClick={() => (
                                            setShowPwd1(!showPwd1)
                                        )}>
                                        {!showPwd1 ? (<AiOutlineEyeInvisible fontSize={24} />) : (< AiOutlineEye fontSize={24} />)}
                                    </span>}
                                </label>
                                <label className='w-full relative'>
                                    <p className='text-[0.875rem] text-richblack-5 leading-[1.375rem] mb-1'>Confirm Password <sup className=' text-pink-200'>*</sup></p>
                                    <input type={!showPwd2 ? 'text' : 'password'} required
                                        name='confirmPassword'
                                        value={formdata.confirmPassword}
                                        onChange={changeHandler}
                                        placeholder='Confirm Password'
                                        className=' bg-richblack-700 border border-richblack-700 rounded-[0.5rem] text-richblack-5 
                                        w-full p-[12px] drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] outline-none'
                                    />
                                    {formdata.confirmPassword  && <span className=' absolute top-[38px] right-3 cursor-pointer'
                                        onClick={() => (
                                            setShowPwd2(!showPwd2)
                                        )}>
                                        {!showPwd2 ? (<AiOutlineEyeInvisible fontSize={24} />) : (< AiOutlineEye fontSize={24} />)}
                                    </span>}
                                </label>
                            </div>

                            <button className='bg-yellow-50 py-[8px] px-[12px] rounded-[8px]
                    text-richblack-900 font-medium mt-6'>
                                Create Account
                            </button>
                        </form>
                    </>
                )
            }
        </div>
    )
}

export default SignupForm;