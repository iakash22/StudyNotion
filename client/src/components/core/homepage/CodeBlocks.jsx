import React from 'react'
import Button from '../../common/Button'
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({ position, headingText, paraText, btnText1, btntext2, codeBlocks,codeColor,codeblur }) => {
    return (
        <div className={`flex justify-between ${position} flex-col my-20 gap-10 lg:gap-10 `}>
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-8'>
                <div>{headingText}</div>
                <div className=' text-richblack-300 font-bold text-base w-[85%] -mt-3'>{paraText}</div>
                <div className='flex items-center gap-7 mt-7'>
                    <Button text={btnText1} active={true} toLink={"/signup"} />
                    <Button text={btntext2} active={false} toLink={"/signup"} />
                </div>
            </div>

            <div className='h-fit flex flex-row w-[100%] lg:w-[470px] py-3 text-[10px] 
                            sm:text-sm leading-[18px] sm:leading-6 relative z-10 code-border'
            >
                <div className={`absolute ${codeblur}`}
                >
                </div>
                <div className='text-center flex flex-col w-[10%] text-richblack-400 font-inter
                                font-bold select-none'
                >
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation
                        sequence={[
                            codeBlocks,
                            1000,
                            "",
                        ]}
                        repeat={Infinity}
                        omitDeletionAnimation={true}
                        style={{ whiteSpace: "pre-line", display:"block" }}
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlocks
