import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../../common/Loading';
import { RiEditBoxLine } from 'react-icons/ri';
import IconButton from '../../common/IconButton';
import { useNavigate } from 'react-router-dom';

function MyProfile() {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const navigate = useNavigate();

    if (profileLoading || authLoading) {
        return <Loading />
    }
    const name = user?.firstName + " " + user?.lastName;
    return (
        <div className='w-11/12 max-w-[1000px] mx-auto py-10'>
            <h1 className='text-4xl font-medium mb-4 ring-richblack-5'>Edit Profile</h1>
            
            <div className='flex items-center justify-between bg-richblack-800 rounded-md border-[1px] 
                            border-richblack-700 p-8 px-12'>
                <div className='flex flex-row items-center gap-x-4'>
                    <img 
                        src={user?.image} 
                        alt={`profile-${user?.firstName}`} 
                        className='aspect-square w-[78px] rounded-full object-cover'
                    />
                    <div className='space-y-1'>
                        <p className='text-richblack-5 text-lg font-semibold'>{name}</p>
                        <p className='text-richblack-300 text-sm'>{user?.email}</p>
                    </div>
                </div>
                <IconButton 
                    text={"Edit"} 
                    icon={<RiEditBoxLine />} 
                    active={true}
                    btnHander={() => navigate('/dashboard/settings')} 
                />
            </div>

            <div className='my-10 flex flex-col gap-y-10 bg-richblack-800 rounded-md border-[1px] 
                            border-richblack-700 p-8 px-12'>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-richblack-5 text-lg font-semibold'>About</p>
                    <IconButton 
                        text={"Edit"} 
                        active={true}
                        icon={<RiEditBoxLine />} 
                        btnHander={() => navigate('/dashboard/settings')} 
                    />
                </div>

                <p className={`${user?.additionDetails?.about ? "text-richblack-5" : "text-richblack-300"} text-sm font-medium`}>
                    {user?.additionDetails?.about ? user?.additionDetails?.about : "Write something About Yourself"}
                </p>
            </div>

            <div className='my-10 flex flex-col gap-y-10 bg-richblack-800 rounded-md border-[1px] 
                            border-richblack-700 p-8 px-12'>
                <div className='flex items-center justify-between w-full '>
                    <p className='text-lg text-richblack-5 font-semibold'>Personal Details</p>
                    <IconButton 
                        text={"Edit"} 
                        icon={<RiEditBoxLine />} 
                        active={true}
                        btnHander={() => navigate('/dashboard/settings')} 
                    />
                </div>
                <div className='flex flex-row justify-between max-w-[500px]'>
                    <div className='flex flex-col gap-y-5'>
                        <div >
                            <p className='mb-2 text-sm text-richblack-600'>First Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.firstName}</p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>Email</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.email}</p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>Gender</p>
                            <p className={`text-sm font-medium ${user?.additionDetails?.gender ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.additionDetails?.gender ? user?.additionDetails?.gender : "Add your gender"}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-y-5'>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>Last Name</p>
                            <p className='text-sm font-medium text-richblack-5'>{user?.lastName}</p>
                        </div>
                        <div >
                            <p className='mb-2 text-sm text-richblack-600'>Phone Number</p>
                            <p className={`text-sm font-medium ${user?.additionDetails?.contactNumber ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.additionDetails?.contactNumber ? user?.additionDetails?.contactNumber : "Add your contact number"}
                            </p>
                        </div>
                        <div>
                            <p className='mb-2 text-sm text-richblack-600'>Date Of Birth</p>
                            <p className={`text-sm font-medium ${user?.additionDetails?.dateOfBirth ? "text-richblack-5" : "text-richblack-300"}`}>
                                {user?.additionDetails?.dateOfBirth ? user?.additionDetails?.dateOfBirth : "Add date of birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile;
