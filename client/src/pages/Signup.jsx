import React from 'react'
import signupImg from '../assets/Images/signup.webp';
import Template from '../components/core/Auth/Template';

const Signup = ({setIsLoggedIn}) => {
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            <Template
                title='Join the millions learing to code with studyNotion for free'
                des1='Build skill for today, tomorrow and beyond.'
                des2='Education to future profe career.'
                image={signupImg}
                formType='signup'
                setIsLoggedIn={setIsLoggedIn}
            />
        </div>
    )
}

export default Signup
