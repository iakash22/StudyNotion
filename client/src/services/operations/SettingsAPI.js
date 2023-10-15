import apiConnector from "../apiConnector";
import {toast} from 'react-hot-toast';
import { setUser } from "../../redux/slices/ProfileSlice";
import {setToken} from '../../redux/slices/AuthSlice';
import {settingsEndpoints} from '../Apis';

const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API,
} = settingsEndpoints

export function updateDisplayPicture(token, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API,
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorisation: `Bearer ${token}`,
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )

            if (!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export const profileDetailsUpdate = (token,data) => {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...");
        try{
            const response = await apiConnector('PUT', UPDATE_PROFILE_API, 
                data,
                {
                    Authorisation: `Bearer ${token}`,
                }
            );
            console.log(
                "UPDATE_PROFILE_API RESPONSE............",
                response
            )
            if(!response){
                throw new Error(response.data.message);
            }
            toast.success("Profile Details Updated Successfully");
            dispatch(setUser(response.data.user))
        }catch(err){
            console.log("UPDATE_PROFILE_API ERROR............", err);
            toast.error("Could Not Update Profile Details");
        }
        toast.dismiss(toastId);
    }
}

export const passwordChange = (token,data) => {
    return async(dispatch) => {
        const toastId = toast.loading('Loading...');
        try{
            const response = await apiConnector('POST', CHANGE_PASSWORD_API,
                data,
                {
                    Authorisation: `Bearer ${token}`,
                }
            );
            if(!response){
                throw new Error(response.data.message);
            }

            console.log("CHANGE_PASSWORD_API.............", response);
            toast.success("Password Change Successfull");

        }catch(err){
            console.log("CHANGE_PASSWORD_API ERROR............", err);
            toast.error("Could Not Change Password");
        }
        toast.dismiss(toastId);
    }
}

export const deleteAccount = (token,navigate) => {
    return async(dispatch) => {
        const toastId = toast.loading("Deleting...");
        try{
            const response = await apiConnector('DELETE', DELETE_PROFILE_API,
            null,
            {
                Authorisation: `Bearer ${token}`,
            }
            );

            if(!response){
                throw new Error(response.data.message);
            }

            toast.success("Delete Account Successfull");
            console.log("DELETE_PROFILE_API.............", response);
            navigate('/login');
            dispatch(setToken(null));
            dispatch(setUser(null));
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('totalItems');
        }catch(err){
            console.log("DELETE_PROFILE_API ERROR............", err);
            toast.error("Could Not Delete Account");
        }
        toast.dismiss(toastId);
    }
}