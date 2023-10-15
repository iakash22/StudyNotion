import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import IconButton from '../../../common/IconButton';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {passwordChange} from '../../../../services/operations/SettingsAPI';

const PasswordUpdate = () => {
    const [currentPasswordHide, setCurrentPasswordHide] = useState(false);
    const [newPasswordHide, setNewPasswordHide] = useState(false);
    const navigate = useNavigate();
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Data : ", data);
        dispatch(passwordChange(token,{...data, confirmNewPassword : data.newPassword}));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-richblack-5 max-w-[1000px] my-10 flex flex-col gap-y-6 p-8 px-12
                            border-[1px] border-richblack-700 rounded-md bg-richblack-800'
            >
                <h1 className='font-semibold text-lg text-richblack-5'>
                    Password
                </h1>
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className='relative lg:w-[48%] flex flex-col gap-2'>
                        <label htmlFor="currentPassword" className='text-sm'>Current Password</label>
                        <input
                            type={currentPasswordHide ? "type" : "password"}
                            name='currentPassword'
                            {...register("currentPassword", { 
                                required: {value : true, message : "please enter your current password"} ,
                                minLength : {value : 6, message : "New current is length invalid"},
                                maxLength : {value : 12, message : "New current is length invalid"},
                            })}
                            placeholder='Enter current password'
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.currentPassword && (
                                <span className='-mt-1 text-yellow-5 text-xs'>{errors.currentPassword.message}</span>
                            )
                        }
                        <span className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                            onClick={() => setCurrentPasswordHide(!currentPasswordHide)}
                        >
                            {
                                currentPasswordHide ? <AiOutlineEyeInvisible fontSize={24}/> : < AiOutlineEye fontSize={24}/>
                            }
                        </span>
                    </div>
                    <div className='relative lg:w-[48%] flex flex-col gap-2'>
                        <label htmlFor="newPassword" className='text-sm'>New Password</label>
                        <input
                            type={newPasswordHide ? "type" : "password"}
                            name='newPassword'
                            placeholder='Enter new password'
                            {...register("newPassword", { 
                                required: {value : true, message : "please enter your new password"} ,
                                minLength : {value : 6, message : "New Password is length invalid"},
                                maxLength : {value : 12, message : "New Password is length invalid"},
                            })}
                            className='text-richblack-5 w-full rounded-lg text-base p-3 drop-shadow-[0_1.5px_rgba(255,255,255,0.5)] 
                                outline-2 outline-solid outline-transparent outline-offset-2 leading-6 placeholder:text-richblack-300
                                form-shadow !pr-10 bg-richblack-700'
                        />
                        {
                            errors.newPassword && (
                                <span className='-mt-1 text-yellow-5 text-xs'>{errors.newPassword.message}</span>
                            )
                        }
                        <span className='absolute right-3 top-[38px] z-[10] cursor-pointer'
                            onClick={() => setNewPasswordHide(!newPasswordHide)}
                        >
                            {
                                newPasswordHide ? <AiOutlineEyeInvisible fontSize={24}/> : < AiOutlineEye fontSize={24}/>
                            }
                        </span>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 justify-end'>
                <IconButton
                    text={"Cancel"}
                    active={false}
                    btnHander={() => navigate('/dashboard/my-profile')}
                />
                <IconButton
                    text={"Submit"}
                    active={true}
                    type={"submit"}
                />
            </div>
        </form>
    )
}

export default PasswordUpdate
