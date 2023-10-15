import React from 'react';
import Template from '../components/core/Auth/Template'
import loginImg from '../assets/Images/login.webp';

function Login(setIsLoggedIn) {
    return (
        <div className='grid min-h-[calc(100vh-3.5rem)] place-items-center'>
            <Template 
                title={"Welcome Back"}
                des1={"Build skills for today, tomorrow, and beyond."}
                des2={"Education to future-proof your career."}
                image={loginImg}
                formType="login"
                setIsLoggedIn={setIsLoggedIn}
            />
        </div>
    )
}

export default Login
