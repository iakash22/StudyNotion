import React, { useEffect, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs';
import { GiBackwardTime } from 'react-icons/gi';
import OtpInput from 'react-otp-input';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp,signup } from '../services/operations/authApi';

const VerifyEmail = () => {
    const [otp, setOtp] = useState('');
    const { signupData, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if(!signupData){
            // navigate('/signup');
        }
    },[]);

    const submitHandler = (e) => {
        e.preventDefault();
        const {
                firstName,
                lastName,
                accountType,
                email,
                password,
                confirmPassword,
            } = signupData;
            console.log("OTP : ", otp);
        dispatch(signup(firstName,lastName,accountType,email,password,confirmPassword,otp,navigate));
    }

    return (
        <div className='grid place-items-center min-h-[calc(100vh-3.5rem)]'>
            <div className='max-w-[500px] p-4 lg:p-8'>
                <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>Verify email</h1>
                <p className='my-4 text-lg leading-[1.625rem] text-richblack-100'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={submitHandler}>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={
                            <span className='w-5'></span>
                        }
                        renderInput={
                            (props) =>
                                <input
                                    {...props}
                                    placeholder='-'
                                    className='text-richblack-5 rounded-lg text-lg bg-richblack-800 
                                                drop-shadow-[0px_1.5px_rgba(255,255,250,0.3)]'
                                />
                        }
                        inputStyle={{width:"57.33px", height:"48px"}}
                        inputType='tel'
                    />
                    <button 
                        type='submit'
                        className='w-full bg-yellow-50 mt-6 rounded-lg p-3 text-richblack-900 text-base font-semibold'
                    >
                        Verify email
                    </button>
                </form>
                <div className='mt-6 w-full flex items-center justify-between'>
                    <div>
                        <Link to={'/login'} className='flex flex-row gap-x-2 items-center text-richblack-5'>
                            <BsArrowLeft />
                            <span>Back to login</span>
                        </Link>
                    </div>
                    <div className='flex flex-row gap-x-1 items-center text-blue-100 cursor-pointer'
                        onClick={
                                    () => dispatch(sendOtp(signupData.email,navigate))
                                }
                        >
                        <GiBackwardTime className='text-2xl'/>
                        <span className='text-[16px]'>Resend it</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail
