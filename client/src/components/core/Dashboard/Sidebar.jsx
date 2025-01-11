import React, { useState } from 'react'
import { sidebarLinks } from '../../../assets/data/dashboard-links';
import { logout } from '../../../services/operations/authApi';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../../common/Loading';
import SidebarLink from './SidebarLink';
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import ConfirmationModel from '../../common/ConfirmationModel';

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector(state => state.profile);
    const { loading: authLoading } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [modalData, setModalData] = useState(null);

    if (profileLoading || authLoading) {
        return <Loading />
    }
    return (
        <>
            <div className='flex min-w-[220px] flex-col border-r-[1px] border-r-richbalck-700
                        h-[calc(100vh-3rem)] bg-richblack-800 py-10 relavtive'
            >
                <div className='flex flex-col'>
                    {
                        sidebarLinks.map((link, index) => {
                            if (link.type && user?.accountType !== link.type) {
                                return null
                            }
                            return (
                                <SidebarLink link={link} key={link.id} />
                            )
                        })
                    }
                </div>
                <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700'></div>
                <div className='flex flex-col'>
                    <SidebarLink link={{ name: "Settings", path: "dashboard/settings", icon: "VscSettingsGear" }} />
                    <button
                        onClick={() => setModalData({
                            text1: "Are You sure?",
                            text2: "You will be logged out of your account.",
                            btnText1: "Logout",
                            btnText2: "Cancel",
                            btnHandler1: () => dispatch(logout(navigate)),
                            btnHandler2: () => setModalData(null),
                        })}
                        className='px-8 py-2 text-sm font-medium text-richblack-300'>
                        <div className='flex flex-row items-center gap-x-2'>
                            <VscSignOut className='text-lg' />
                            <span>Logout</span>
                        </div>
                    </button>
                </div>

            </div>
            {modalData && <ConfirmationModel modalData={modalData} />}
        </>
    )
}

export default Sidebar
