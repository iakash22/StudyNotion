import React from 'react'
import frameImg from '../../../assets/Images/frame.png'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import { FcGoogle } from 'react-icons/fc'
const Template = ({ des1, des2, image, title, formType, setIsLoggedIn }) => {
    return (
        <div className='flex w-11/12 max-w-maxContent flex-col-reverse py-12 mx-auto gap-x-12 
                        gap-y-12 justify-between md:flex-row md:gap-y-0 md-gap-x-12'
        >
            <div className='mx-auto text-white w-11/12 max-w-[450px] md:mx-0'>

                <h1 className='font-semibold text-richblack-5 text-[1.875rem] leading-[2.375rem]'>{title}</h1>
                <p className='text-[1.125rem] leading-[1.625rem] mt-4'>
                    <span className=' text-richblack-100'>{des1}</span>
                    <br />
                    <span className='text-blue-100 italic font-edu-sa font-bold'>{des2}</span>
                </p>
                {formType === 'signup' ?
                    (< SignupForm setIsLoggedIn={setIsLoggedIn} />) :
                    (< LoginForm setIsLoggedIn={setIsLoggedIn} />)
                }

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='h-[1px] w-full bg-richblack-700'></div>
                    <p className=' bg-richblack-700 font-medium leading-[1.375rem]'>OR</p>
                    <div className='h-[1px] w-full bg-richblack-700'></div>
                </div>

                <button className='flex items-center text-richblack-100 bg-richblack-800
                                    justify-center w-full rounded-[8px] font-medium border border-richblack-700
                                    px-[12px] py-[8px] gap-x-2 mt-6 '
                >
                    <FcGoogle />
                    <p>Sign Up with Google</p>
                </button>
            </div>

            <div className='relative mx-auto max-w-[450px] w-11/12 md:mx-0'>
                <img src={frameImg} alt='frameImg' width={558} height={504} loading='lazy'
                    className='' />
                <img src={image} alt='students' width={558} height={504} loading='lazy'
                    className=' absolute -top-4 right-4 z-10' />
            </div>
        </div>
    )
}

export default Template