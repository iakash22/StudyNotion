const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");
            
            if (!token) {
                return res.status(401).json({
                    success: true,
                    message: "Token is missing",
                })
            }
            
            try {
                const decode = jwt.verify(token, process.env.SECRET_KEY);
                console.log(decode);
                req.user = decode;

        } catch (err) {
            // verification issues 
            return res.status(400).json({
                success: false,
                message: "token is Invalid",
            });
        }
        next();
    } catch (err) {
        console.log("error occurred while auth middleware", err);
        return res.status(404).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}

exports.isStudent = async (req, res, next) => {
    try {
        console.log("req.user.accountType");
        if (req.user.accountType !== "Student") {
            return res.status(404).json({
                success : false,
                message : "This is a protected route for student only"
            })
        }
        next();
    }catch(err){
        return res.status(404).json({
            success : false,
            message : "User role cannot be verified, please try again",
        })
    }
}
exports.isInstructor = async (req, res, next) => {
    try {
        if (req.user.accountType !== "Instructor") {
            return res.status(404).json({
                success : false,
                message : "This is a protected route for Instructor only"
            })
        }
        next();
    }catch(err){
        return res.status(404).json({
            success : false,
            message : "User role cannot be verified, please try again",
        })
    }
}
exports.isAdmin = async (req, res, next) => {
    try {

        if (req.user.accountType !== "Admin") {
            return res.status(404).json({
                success : false,
                message : "This is a protected route for Admin only"
            })
        }
        next();
    }catch(err){
        return res.status(404).json({
            success : false,
            message : "User role cannot be verified, please try again",
        })
    }
}