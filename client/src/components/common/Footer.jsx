import React from 'react'
import logo from '../../assets/Logo/Logo-Full-Light.png'
import LinkButton from '../core/footer/LinkButton'
import { BsFacebook, BsGoogle, BsTwitter, BsYoutube } from 'react-icons/bs'
import { FooterLink2, resourcesData} from '../../assets/data/footer-links';
import Box from '../core/footer/Box';






const Footer = () => {
    return (
        <div className='bg-richblack-800'>
            <div className='flex lg:flex-row w-11/12 max-w-maxContent mx-auto py-14 leading-6
                        relative items-center justify-between gap-8 text-richblack-400'>
                <div className='w-[100%] flex flex-col lg:flex-row pb-5 border-b border-b-richblack-700'>
                    <div className='lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r 
                                lg:border-richblack-700 pl-3 lg:pr-5 gap-3'>

                        <div className='w-[30%] lg:w-[30%] flex flex-col gap-3 mb-7 lg:pl-0'>
                            <img
                                src={logo}
                                alt="logo"
                                className='object-contain'
                            />
                            <h1 className='text-base font-semibold text-richblack-50'>Company</h1>
                            <div className='flex flex-col gap-2'>
                                <LinkButton
                                    text={"About"}
                                    toLink={"/about"}
                                />
                                <LinkButton
                                    text={"Careers"}
                                    toLink={"/careers"}
                                />
                                <LinkButton
                                    text={"Affiliates"}
                                    toLink={"/affiliates"}
                                />
                            </div>
                            <div className='flex flex-row gap-3 text-lg'>
                                <BsFacebook />
                                <BsGoogle />
                                <BsTwitter />
                                <BsYoutube />
                            </div>
                        </div>

                        <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                            <div className='text-base text-richblack-50 font-semibold'>Resources</div>
                            <div className='flex flex-col gap-2 mt-2'>
                                {
                                    resourcesData.map((data, index) => (
                                        <LinkButton
                                            key={index}
                                            text={data.title}
                                            toLink={data.path}
                                        />
                                    ))
                                }
                            </div>

                            <div className='text-base text-richblack-50 font-semibold mt-7 mb-2'>Support</div>
                            <LinkButton
                                text={"Help Center"}
                                toLink={"/help-center"}
                            />

                        </div>

                        <div className='w-[48%] lg:w-[30%] mb-7 lg:pl-0'>
                            <div className='text-base text-richblack-50 font-semibold'>Plans</div>
                            <div className='mt-2 flex flex-col gap-2'>
                                <LinkButton
                                    text={"Paid Membership"}
                                    toLink={"/"}
                                />
                                <LinkButton
                                    text={"For students"}
                                    toLink={"/"}
                                />
                                <LinkButton
                                    text={"Business solutions"}
                                    toLink={"/"}
                                />

                            </div>

                            <div className='text-base text-richblack-50 font-semibold mt-7'>Community</div>
                            <div className='mt-2 flex flex-col gap-2'>
                                <LinkButton
                                    text={"Forcums"}
                                    toLink={"/forcums"}
                                />
                                <LinkButton
                                    text={"Chapter"}
                                    toLink={"/chapter"}
                                />
                                <LinkButton
                                    text={"Events"}
                                    toLink={"/events"}
                                />
                            </div>
                        </div>

                    </div>

                    <div className='lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pr-5 gap-3'>
                        {
                            FooterLink2.map((data, index) => (
                                <Box
                                    key={index}
                                    heading={data.title}
                                    data={data.links}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>

            <div className='flex flex-row items-center justify-between w-11/12 max-w-maxContent mx-auto
                            pb-14 text-sm text-richblack-400'
            >
                <div className='flex flex-row items-center'>
                    <LinkButton
                        text={"Privacy Policy"}
                        toLink={"/privacy-policy"}
                        active={true}
                    />
                    <LinkButton
                        text={"Cookie Policy"}
                        toLink={"/cookie-policy"}
                        active={true}
                    />
                    <div className='px-3'>
                        <LinkButton
                            text={"Terms"}
                            toLink={"/terms"}
                        />
                    </div>
                </div>

                <div className='text-center'>
                    Made With ❤️ @ 2023 StudyNotion
                </div>
            </div>
        </div>
    )
}

export default Footer
