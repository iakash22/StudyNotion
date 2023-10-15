const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageCloudinary} = require('../utils/imageUploader');

exports.updateProfile = async (req, res) => {
    try {
        const {firstName,lastName, dateOfBirth = "", about = "", gender, contactNumber } = req.body;
        const userId = req.user.id;
        if (!firstName || !lastName || !gender || !contactNumber || !userId) {
            return res.status(400).json({
                success: false,
                message: "missing properties"
            });
        }

        const userDetails = await User.findById(userId);

        const profileId = userDetails.additionalDetails;
        const userProfile = await Profile.findById(profileId);

        userProfile.gender = gender;
        userProfile.dateOfBirth = dateOfBirth;
        userProfile.contactNumber = contactNumber;
        userProfile.about = about;
        await userProfile.save();

        const user = await User.findByIdAndUpdate(
            {_id : userId},
            {firstName,lastName},
            {new : true}
        ).populate('additionalDetails').exec();

        user.password = null;

        return res.status(201).json({
            success: true,
            message: "Profile updated",
            user,
        });
    } catch (err) {
        console.log("Error occurred while update profile", err);
        return res.status(404).json({
            success: false,
            message: "Profile not updated, try again",
        })
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id);

        if (!userDetails) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });
        await User.findByIdAndDelete({ _id: id });

        return res.status(201).json({
            success: true,
            message: "User deleted successfull",
        });
    } catch (err) {
        console.log("error occurred while delete user", err);
        return res.status(404).json({
            success: false,
            message: "Internal Server error"
        });
    }
}

exports.getAllUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        return res.status(201).json({
            success: true,
            message: "User details find successfull",
            userDetails,
        });
    } catch (err) {
        return res.status(404).json({
            success: false,
            message: err.message,
        });
    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture
        const userId = req.user.id
        console.log("displayPicture", displayPicture);
        
        const image = await uploadImageCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            { image: image.secure_url },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};

