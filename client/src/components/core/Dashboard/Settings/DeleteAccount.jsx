import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAccount } from '../../../../services/operations/SettingsAPI';

const DeleteAccount = () => {
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return (
        <div className='my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700
                        bg-pink-900 p-8 px-12'
        >
            <div className='w-14 h-14 flex items-center aspect-square justify-center rounded-full bg-pink-700'>
                <RiDeleteBinLine className='text-3xl text-pink-200'/>
            </div>

            <div className='flex flex-col space-y-2'>
                <h3 className='text-lg text-richblack-5 font-semibold'>Delete Account</h3>
                <div className='w-3/5 text-pink-25'>
                    <p>Would you like to delete account?</p>
                    <p>This account may contain Paid Courses. Deleting your account is
                    permanent and will remove all the contain associated with it.
                    </p>
                </div>

                <button 
                    type='button' 
                    className='w-fit cursor-pointer italic text-pink-300'
                    onClick={() => dispatch(deleteAccount(token,navigate))}
                >
                    I want to delete my account.
                </button>
            </div>
        </div>
    )
}

export default DeleteAccount
