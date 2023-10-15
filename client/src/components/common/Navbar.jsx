import React, { useEffect, useState } from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath, useLocation } from 'react-router-dom';
import { NavbarLinks } from '../../assets/data/navbar-links';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { categories } from '../../services/Apis';
import apiConnector from '../../services/apiConnector';
import ProfileDropDown from '../core/Auth/ProfileDropDown';

const Navbar = () => {
    const token = useSelector((state) => state.auth.token);
    const user = useSelector((state) => state.profile.user);
    const totalItems = useSelector((state) => state.cart.totalItems)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);
    const getSubLinks = async () => {
        try {
            const result = await apiConnector('get', categories.CATEGORIES_API)
            setSubLinks(result.data.data);
        } catch (err) {
            console.log(err);
        }
    }

    // console.log("Token.......", token);

    useEffect(() => {
        getSubLinks();
    }, [])

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };
    return (
        <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
            <div className='w-11/12 max-w-maxContent flex items-center justify-between'>

                <Link to={'/'}>
                    <img src={logo} alt="logo" width={160} height={42} loading={'lazy'} />
                </Link>

                <nav>
                    <ul className='text-richblack-25 flex flex-row gap-x-6'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}>
                                    {
                                        link.title === "Catalog" ? (
                                            <div className='relative flex items-center group cursor-pointer gap-1'>
                                                <p >{link.title}</p>
                                                <IoIosArrowDown className='text-richblack-25 text-xl' />
                                                <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] p-4
                                                                translate-y-[3em] flex-col rounded-lg bg-richblack-5 text-richblack-900 opacity-0 transition-all
                                                                duration-150 group-hover:visible group-hover:opacity-100 group-hover:translate-y-[1.63em] lg:w-[300px]'
                                                >
                                                    <div className='absolute w-6 h-6 rotate-45 bg-richblack-5 left-[50%] top-0 -z-10 translate-x-[80%] translate-y-[-40%]
                                                                    select-none rounded'
                                                    >
                                                    </div>
                                                    {
                                                        subLinks.map((subLink, index) => (
                                                            <Link to={subLink.name.toLowerCase()} key={index} className='rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50'>
                                                                {subLink.name}
                                                            </Link>
                                                        ))
                                                    }
                                                </div>
                                            </div>) : (
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }
                                </li>
                            ))
                        }
                    </ul>
                </nav>

                <div className='hidden md:flex gap-x-4 items-center'>
                    {
                        user && user.accountType != "Instructor" && (
                            <Link to={'/dashboard/cart'} className='relative'>
                                <div className='relative'>
                                    <AiOutlineShoppingCart className='text-2xl' />
                                    {
                                        totalItems > 0 && (
                                            <span className='absolute text-yellow-100 bg-richblack-600 rounded-full font-bold
                                                            text-xs top-[-10px] left-[8px] w-5 h-5 text-center animate-bounce py-[1.9px]
                                                            overflow-hidden place-items-center drop-shadow-[0_0.9px]'
                                            >
                                                {totalItems}
                                            </span>
                                        )
                                    }
                                </div>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to={'/login'} >
                                <button className='bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]
                                                    text-richblack-100 rounded-md'
                                >
                                    Log in
                                </button>
                            </Link>
                        )
                    }
                    {
                        token == null && (
                            <Link to={'/signup'} >
                                <button className='bg-richblack-800 border border-richblack-700 px-[12px] py-[8px]
                                                    text-richblack-100 rounded-md'
                                >
                                    Sign up
                                </button>
                            </Link>
                        )
                    }

                    {token != null && (
                        <ProfileDropDown />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Navbar;
