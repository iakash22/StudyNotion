import React, { useState } from 'react'
import { AiOutlineEyeInvisible, AiOutlineEye, AiFillCheckCircle } from 'react-icons/ai'
import { BsArrowLeft } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authApi';
import Button from '../components/core/homepage/Button';
import { TypeAnimation } from 'react-type-animation';

const UpdatePassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);
    const [data, setData] = useState({ password: "", confirmPassword: "", token: "" });
    const [passwordUpdated, setPasswordUpdated] = useState(false);
    const loaction = useLocation();
    const dispatch = useDispatch();
    const { loading } = useSelector(state => state.auth);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => (
            {
                ...prev,
                [name]: value,
            }
        ));
    }

    const submitHander = (e) => {
        e.preventDefault();
        data.token = loaction.pathname.split('/').at(-1);
        dispatch(resetPassword(data, setPasswordUpdated));
    }
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            {
                loading ?
                    (
                        <div className='text-4xl'>
                            Loading
                            <TypeAnimation 
                                sequence={[
                                    '...',
                                    1200,
                                    ''
                                ]}
                                speed={30}
                                repeat={Infinity}
                                cursor={false}
                                omitDeletionAnimation={false}
                                style={{ fontSize: '2.65em',}}
                            />
                        </div>
                    )
                    :
                    (<div className='max-w-[500px] p-4 lg:p-8'>
                        <h1 className='text-[1.875rem] font-semibold leading-[2.375rem] text-richblack-5'>
                            {passwordUpdated ? 'Reset complete!' : 'Choose new Password'}
                        </h1>
                        <p className='my-4 text-[1.125rem] leading-[1.625rem] text-richblack-100'>
                            {passwordUpdated ?
                                `All done! We have sent an email to m***********@gmail.com to confirm`
                                :
                                'Almost done. Enter your new password and youre all set.'
                            }
                        </p>

                        {!passwordUpdated && <form onSubmit={submitHander} className='!mb-6'>
                            <label htmlFor="password" className='relative'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    New password
                                    <span className='text-pink-200'> *</span>
                                </p>
                                <input
                                    type={`${showPassword ? 'text' : 'password'}`}
                                    name="password"
                                    id="password"
                                    required
                                    value={data.password}
                                    onChange={changeHandler}
                                    autoComplete='new-password'
                                    placeholder='Enter Password'
                                    className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] bg-richblack-700
                                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                                form-shadow !pr-10'
                                />
                                {data.password && <span
                                    onClick={() => setShowPassword(!showPassword)}
                                    className='cursor-pointer text-richblack-25 absolute right-[3%] translate-y-[50%]'
                                >
                                    {
                                        showPassword ?
                                            <AiOutlineEyeInvisible fontSize={24}/>
                                            :
                                            <AiOutlineEye fontSize={24}/>
                                    }
                                </span>}
                            </label>
                            <label htmlFor="confirmPassword" className='relative mt-3 block'>
                                <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                                    Confirm new password
                                    <span className='text-pink-200'> *</span>
                                </p>
                                <input
                                    type={`${showCnfPassword ? 'text' : 'password'}`}
                                    required
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    value={data.confirmPassword}
                                    onChange={changeHandler}
                                    autoComplete='confirm-password'
                                    placeholder='Confirm Password'
                                    className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] bg-richblack-700
                                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                                form-shadow !pr-10'
                                />
                                {data.confirmPassword && <span
                                    onClick={() => setShowCnfPassword(!showCnfPassword)}
                                    className='cursor-pointer text-richblack-25 absolute right-[3%] translate-y-[50%]'
                                >
                                    {
                                        showCnfPassword ?
                                            <AiOutlineEyeInvisible fontSize={24}/>
                                            :
                                            <AiOutlineEye fontSize={24}/>
                                    }
                                </span>}
                            </label>

                            <div className='mt-6 grid grid-cols-1 lg:grid-rows-3 lg:grid-cols-2 gap-2 text-caribbeangreen-300'>
                                <p className='flex items-center gap-1'>
                                    <AiFillCheckCircle />
                                    one lowercase character
                                </p>
                                <p className='flex items-center gap-1'>
                                    <AiFillCheckCircle />
                                    one special character
                                </p>
                                <p className='flex items-center gap-1'>
                                    <AiFillCheckCircle />
                                    one uppercase character
                                </p>
                                <p className='flex items-center gap-1'>
                                    <AiFillCheckCircle />
                                    8 character minimum
                                </p>
                                <p className='flex items-center gap-1'>
                                    <AiFillCheckCircle />
                                    one number
                                </p>
                            </div>

                            <button
                                type="submit"
                                className='cursor-pointer mt-6 w-full rounded-lg p-3 bg-yellow-50
                                            font-medium text-richblack-900'
                            >
                                Reset Password
                            </button>
                        </form>}

                        {
                            passwordUpdated &&
                            <Button
                                text={'Return to login'}
                                toLink={'/login'}
                                active={true}
                            />
                        }
                        <div className='mt-6'>
                            <Link to={'/login'} className='flex flex-row gap-x-2 items-center text-richblack-5'>
                                <BsArrowLeft />
                                <p>Back To Login</p>
                            </Link>
                        </div>
                    </div >)
            }
        </div >
    )
}

export default UpdatePassword
