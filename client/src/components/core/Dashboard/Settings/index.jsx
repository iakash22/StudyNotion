import React from "react";
import ProfilePicUpdate from './ProfilePicUpdate';
import ProfileInformationUpdate from "./ProfileInformationUpdate";
import PasswordUpdate from "./PasswordUpdate";
import DeleteAccount from "./DeleteAccount";

const Settings = () => {
    return (
        <div className="mx-auto w-11/12 max-w-[1000px] py-10">
            <h1 className="text-3xl font-medium text-richblack-5 mb-14">
                Edit Profile
            </h1>

            <ProfilePicUpdate />
            
            <ProfileInformationUpdate />

            <PasswordUpdate />

            <DeleteAccount />
        </div>
    );
}

export default Settings;