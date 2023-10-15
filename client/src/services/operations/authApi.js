import toast from "react-hot-toast";
import { setLoading, setSignupData, setToken } from "../../redux/slices/AuthSlice"
import apiConnector from "../apiConnector"
import { endpoints } from '../Apis';
import { setUser } from "../../redux/slices/ProfileSlice";

export const getPasswordResetToken = (email, setEmailSent) => {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('post', endpoints.RESETPASSTOKEN_API, { email });
            console.log("Reset Password TOken response.............", response);

            if (!response) {
                throw new Error(response.data.message);
            }
            toast.dismiss(toastId);
            toast.success('Reset Email Sent');
            setEmailSent(true);

        } catch (err) {
            console.log('Error occurred while sent reset email............', err);
            toast.dismiss(toastId);
            console.log(err.code);
            if (err.code === "ERR_NETWORK") {
                toast.error("You are offline");
            }
            else {
                toast.error('Reset Sent Email Failed!');
            }
        }
        dispatch(setLoading(false));
    }
}

export const resetPassword = (data, setPasswordUpdated) => {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        dispatch(setLoading(true));
        try {
            const response = await apiConnector('post', endpoints.RESETPASSWORD_API, data);
            if (!response) {
                throw new Error(response.data.message);
            } else {
                console.log("Password reset success..................", response.data);
                setPasswordUpdated(true);
                toast.dismiss(toastId);
                toast.success('Password reset complete!');
            }
        } catch (err) {
            console.log('Error occurred reset password............', err);
            toast.dismiss(toastId);
            if (err.code === "ERR_NETWORK") {
                toast.error("You are offline");
            }else{
                toast.error(err.response.data.message);
            }
        }
        dispatch(setLoading(false));
    }
}

export const sendOtp = (email, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading("Loading...");
        try {
            const response = await apiConnector('post', endpoints.SENDOTP_API, { email, checkUserPresent: true, });
            if (!response) {
                throw new Error(response.message);
            }
            else {
                toast.dismiss(toastId);
                toast.success(response.data.message);
                navigate('/verify-email');
                console.log('otp response............', response);
                console.log("Otp send successfully.........", response.data.success);
            }
        } catch (err) {
            console.log("Otp send failed.............", err);
            toast.dismiss(toastId);
            if (err.code === "ERR_NETWORK") {
                toast.error("You are offline");
            }
            else{
                toast.error(err.response.data.message);
            }
        }
        dispatch(setLoading(false));
    }
}

export const signup = (
    firstName,
    lastName,
    accountType,
    email,
    password,
    confirmPassword,
    otp,
    navigate) => {
    return async (dispatch) => {
        console.log(otp);
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading...');
        try {
            const response = await apiConnector('POST', endpoints.SIGNUP_API, {
                accountType,
                firstName,
                lastName,
                email: email,
                password,
                confirmPassword,
                otp,
            });

            if (!response) {
                throw new Error(response.message);
            } else {
                toast.dismiss(toastId);
                toast.success(response.data.message);
                console.log("USER REGISTER SUCCESSFULL...............", response.data);
                dispatch(setSignupData(response.data));
                navigate('/login');
            }
        } catch (err) {
            console.log("User not verified", err);
            toast.dismiss(toastId);
            if (err.code === "ERR_NETWORK") {
                toast.error("You are offline");
            }
            else{
                toast.error(err.response.data.message);
            }
        }
        dispatch(setLoading(false));
    }
}

export const login = (email, password, navigate) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        const toastId = toast.loading('Loading');
        try {
            const response = await apiConnector('post', endpoints.LOGIN_API, { email, password });
            toast.dismiss(toastId)
            toast.success("Login Successful")

            console.log("User Data..........", response.data.user);

            dispatch(setToken(response.data?.user?.token));
            const userImage = response.data?.user?.image
                ? response.data?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.user?.firstName} ${response.data?.user?.lastName}`
            dispatch(setUser({ ...response.data?.user, image: userImage }));

            localStorage.setItem('token', JSON.stringify(response.data?.user?.token));
            localStorage.setItem('user', JSON.stringify({ ...response.data?.user, image: userImage }));

            navigate('/dashboard/my-profile');
        } catch (err) {
            console.log("LOGIN API ERROR............", err)
            toast.dismiss(toastId)
            if (err.code === "ERR_NETWORK") {
                toast.error("You are offline");
            }else{
                toast.error(err.response.data.message);
            }
        }
        dispatch(setLoading(false))
    }
}

export const logout = (navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading('Loading...');
        setTimeout(() => {
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            toast.dismiss(toastId);
            toast.success("Logged Out");
            navigate('/');
        }, 1000);
    }
} 