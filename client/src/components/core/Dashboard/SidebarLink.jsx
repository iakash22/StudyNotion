import React from 'react'
import * as Icons from 'react-icons/vsc';
import { useDispatch } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({link}) => {
    const Icon = Icons[link.icon];
    const location = useLocation();
    const dispatch = useDispatch();
    const matchRoute = (route) => {
        return matchPath({path : route}, location.pathname);
    }
    return (
        <NavLink 
            to={link.path}
            className={`${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0"}
                        relative px-8 py-2 text-sm font-medium`}
        >
            <span className={`${matchRoute(link.path) ? 'opacity-100' : 'opacity-0'}
                                absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-200`}
            ></span>
            <div className={`${matchRoute(link.path) ? 'text-yellow-50' : "text-richblack-300" } flex flex-row items-center gap-x-2`}>
                <Icon className="text-lg"/>
                {link.name}
            </div>
        </NavLink>
    )
}

export default SidebarLink
