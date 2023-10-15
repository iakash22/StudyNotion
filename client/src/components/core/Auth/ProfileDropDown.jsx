import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authApi';
import {BiSolidDownArrow} from 'react-icons/bi';
import {VscSignOut,VscDashboard} from 'react-icons/vsc';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

const ProfileDropDown = () => {
    const { user } = useSelector(state => state.profile);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const ref = useRef();
    
    const logoutHandler = () => {
        dispatch(logout(navigate));
        setShow(false);
    }

    useOnClickOutside(ref,() => setShow(false));

    if(!user){
        return <div>User not found</div>
    }


    return (
        <button className='relative'>
            <div className='flex gap-x-1 items-center' onClick={() => setShow(!show)}>
                <img 
                src={user.image} 
                alt="user" 
                loading={'lazy'} 
                className='aspect-square w-[30px] object-cover rounded-full'/>
                <BiSolidDownArrow />
            </div>
            {
                show 
                && 
                <div className='absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden
                                bg-richblack-800 rounded-md border-[1px] border-richblack-700'
                    ref={ref}
                    onClick={e => e.stopPropagation()}
                >
                    <Link to={'dashboard/my-profile'}>
                        <div className='flex items-center w-full gap-x-1 text-richblack-100 py-[10px] px-[12px] font-semibold 
                                        transition-all duration-200 text-sm hover:bg-richblack-700 hover:text-richblack-25'>
                            <VscDashboard className='text-lg'/>
                            Dashboard
                        </div>
                    </Link>
                    <div className='flex items-center w-full gap-x-1 text-richblack-100 py-[10px] px-[12px] font-semibold 
                                    transition-all duration-200 text-sm hover:bg-richblack-700 hover:text-richblack-25'
                            onClick={logoutHandler}
                    >
                        <VscSignOut className='text-lg'/>
                        Logout
                    </div>
                </div>
            }
        </button>
    )
}

export default ProfileDropDown;
