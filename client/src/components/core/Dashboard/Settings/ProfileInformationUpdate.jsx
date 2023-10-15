import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import IconButton from '../../../common/IconButton';
import { useNavigate } from 'react-router-dom';
import {profileDetailsUpdate} from '../../../../services/operations/SettingsAPI';

const genders = ["Male", "Female", "Non-Binary", "Prefer not to say", "Other"]


const ProfileInformationUpdate = () => {
    const { user } = useSelector(state => state.profile);
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors},
    } = useForm();

    const onSubmit = async(data) => {
        // console.log("data", data);
        try{
            await dispatch(profileDetailsUpdate(token,data));
        }
        catch(err){
            console.log("Error Massage", err);
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col rounded-md border-[1px] gap-y-6 my-10 border-richblack-700 
                        bg-richblack-800 p-8 px-12 text-richblack-5'>
                <h2 className='font-semibold text-lg text-richblack-5'>Profile Information</h2>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='firstName' className='text-sm'>First Name</label>
                        <input
                            type="text"
                            name='firstName'
                            id='firstName'
                            placeholder='Enter first name'
                            {...register("firstName", { required: true })}
                            defaultValue={user?.firstName}
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.firstName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your first name.</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='lastName' className='text-sm'>Last Name</label>
                        <input
                            type="text"
                            name='lastName'
                            id='lastName'
                            placeholder='Enter last name'
                            {...register('lastName', { required: true })}
                            defaultValue={user?.lastName}
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.lastName && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your last name.</span>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="dateOfBirth" className='text-sm'>Date of Birth</label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            id="dateOfBirth"
                            {...register("dateOfBirth", {
                                required: {
                                    value: true,
                                    message: "Please enter your Date of Birth.",
                                },
                                max: {
                                    value: new Date().toISOString().split("T")[0],
                                    message: "Date of Birth cannot be in the future.",
                                },
                            })}
                            defaultValue={user?.additionalDetails?.dateOfBirth}
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.dateOfBirth && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>{errors.dateOfBirth.message}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="gender" className='text-sm'>Gender</label>
                        <select
                            name="gender"
                            id="gender"
                            {...register("gender", { required: true })}
                            defaultValue={user?.additionalDetails?.gender}
                            className='text-richblack-5 w-full rounded-lg text-base p-4 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        >
                            {
                                genders.map((ele, i) => {
                                    return (
                                        <option key={i} value={ele}>
                                            {ele}
                                        </option>
                                    )
                                })
                            }
                        </select>
                        {
                            errors.gender && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>please enter your gender.</span>
                            )
                        }
                    </div>
                </div>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor='contactNumber' className='text-sm'>Contact Number</label>
                        <input
                            type="text"
                            name='contactNumber'
                            id='contactNumber'
                            placeholder='Enter contact number'
                            defaultValue={user?.additionalDetails?.contactNumber}
                            {...register('contactNumber', {
                                required: {
                                    value: true,
                                    message: "Please enter your Contact Number.",
                                },
                                maxLength: { value: 12, message: "Invalid Contact Number" },
                                minLength: { value: 10, message: "Invalid Contact Number" },
                            })
                            }
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)]
                        outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                        form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.contactNumber && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>{errors.contactNumber.message}</span>
                            )
                        }
                    </div>
                    <div className='flex flex-col gap-2 lg:w-[48%]'>
                        <label htmlFor="about" className='text-sm'>About</label>
                        <input
                            type="text"
                            name="about"
                            id="about"
                            placeholder='Enter Bio Detials'
                            {...register("about", { required: true })}
                            defaultValue={user?.additionalDetails?.about}
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.about && (
                                <span className='-mt-1 text-[12px] text-yellow-100'>Please enter your bio.</span>
                            )
                        }
                    </div>
                </div>
            </div >

            <div className='flex gap-2 justify-end'>
                <IconButton
                    text={"Cancel"}
                    btnHander={() => navigate('/dashboard/my-profile')}
                    active={false}
                />
                <IconButton
                    text={"Submit"}
                    type={"submit"}
                    active={true}
                />
            </div>
        </form>
    )
}

export default ProfileInformationUpdate
