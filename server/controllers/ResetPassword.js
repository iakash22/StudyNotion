const User = require('../models/User');
const emailSender = require('../utils/emailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');


exports.resetPasswordToken = async(req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.status(400).json({
                success : false,
                message : "fill required field",
            })
        }

        const userExist = await User.findOne({email});

        if(!userExist){
            return res.status(401).josn({
                success : false,
                message : "User is not register",
            });
        }

        const token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate(
                                            {email},
                                            {token : token, 
                                            resetPasswordExpires : Date.now() + 5*60*1000},
                                            {new:true}
                                            )
        const url = `http://127.0.0.1:5173/update-password/${token}`;

        const sendEmail = await emailSender( email,"Password Reset Link", `Your Link for email verification is ${url}. Please click this url to reset your password.`)
        console.log("Send mail while reset password", sendEmail);
        
        return res.status(201).json({
            success : true,
            message : "Email sent Successfully, check email change password"
        });
    }catch(err){
        console.log("error occurred while reset password token", err);
        return res.status(404).json({
            success : false,
            message : "Something went wrong while sending reset password mail, try again",
        })
    }
}

exports.resetPassword = async(req,res) => {
    try{
        const {password, confirmPassword, token} = req.body;
        if(!password || !confirmPassword){
            return res.status(400).json({
                success : false,
                message : "fill required field",
            })
        }

        if(password != confirmPassword){
            return res.status(400).json({
                success : false,
                message : "Password and confirmPassword is not equal",
            });
        }

        const userDetails = await User.findOne({token});

        if(!userDetails){
            return res.status(401).json({
                success : false,
                message : "token is invalid",
            })
        }

        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success : false,
                message : "Token is expired, please generate your token",
            })
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            {token : token},
            {password : hashPassword},
            {new : true}
        )

        return res.status(201).json({
            success : true,
            message : "Password reset successful"
        })

    }catch(err){
        console.log("error occurred while reset password", err);
        return res.status(404).json({
            success: false,
            message: "Something went wrong while reset password, please try again"
        })
    }
}