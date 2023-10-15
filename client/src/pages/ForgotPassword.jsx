import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getPasswordResetToken } from '../services/operations/authApi'; 

const ForgotPassword = () => {
    const {loading} = useSelector(state => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("submit");
        dispatch(getPasswordResetToken(email, setEmailSent));
    }
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    <div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            {emailSent ? "Check your email" : "Reset your password"}
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {
                                emailSent ?
                                    `We have sent the reset email to ${email}`
                                    :
                                    "Have no fear. We'll email you instructions to reset your password. If you dont have access to your email we can try account recovery"
                            }
                        </p>
                        <form onSubmit={submitHandler}>
                            {
                                !emailSent && (
                                    <label className='w-full'>
                                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                            Email Address
                                            <span className='text-pink-200'> *</span>
                                        </p>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={email}
                                            placeholder='Enter your email address'
                                            onChange={e => setEmail(e.target.value)}
                                            className='w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] bg-richblack-700
                                                    outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                                    text-black form-shadow'
                                        />
                                    </label>
                                )
                            }
                            <button type='submit' className='mt-6 w-full rounded-lg bg-yellow-50 py-3 px-3 font-medium text-richblack-900'>
                                {emailSent ? "Resend Email" : "Reset Password"}
                            </button>
                        </form>

                        <div className='mt-6 flex items-center justify-between'>
                            <Link to={'/login'} className='flex flex-row gap-x-2 items-center text-richblack-5'>
                                <BsArrowLeft />
                                <p>Back To Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
