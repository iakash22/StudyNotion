import React from 'react'
import Sidebar from '../components/core/Dashboard/Sidebar'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className='relative flex min-h-[calc(100vh-3.5rem)]'>
            <Sidebar />
            <div className='h-[calc(100vh-3.5rem)] flex-1 overflow-auto'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
