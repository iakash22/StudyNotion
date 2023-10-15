import React from 'react'

const ConfirmationModel = ({ modalData }) => {
    const {
        text1,
        text2,
        btnText1,
        btnText2,
        btnHandler1,
        btnHandler2,
    } = modalData;
    return (
        <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white
                        bg-opacity-10 backdrop-blur-sm'
        >
            <div className='w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6'>
                <p className='text-2xl text-semibold text-richblack-5'>{text1}</p>
                <p className='mt-3 mb-5 text-richblack-200'>{text2}</p>
                <div className='flex items-center gap-x-4'>
                    <button className='flex items-center bg-yellow-50 cursor-pointer gap-x-2 rounded-md px-5 py-2
                                    text-richblack-900 font-semibold'
                        onClick={btnHandler1}
                    >
                        {btnText1}
                    </button>
                    <button className='flex items-center bg-richblack-200 cursor-pointer gap-x-2 rounded-md px-5 py-2
                                    text-richblack-900 font-semibold'
                        onClick={btnHandler2}>
                        {btnText2}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModel
