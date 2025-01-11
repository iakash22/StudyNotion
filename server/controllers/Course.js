const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');
const {uploadImageCloudinary} = require('../utils/imageUploader');
require('dotenv').config();

exports.createCourse = async(req,res) => {
    try {
        const{ 
                courseName,
                courseDescription,
                whatYouWillLearn,
                price, 
                tag,
                category, 
                instructions,
            } = req.body
        let {status} = req.body; 
        const thumbnail = req.files.thumbnailImage;
        
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category || !thumbnail){
            return res.status(401).json({
                success : false,
                message : "All fields are required"
            });
        }

        
        if (!status || status === undefined) {
            status = "Draft";
		}

        const userId = req.user.id;

        const instructorDetails = await User.findById(userId, {accountType: "Instructor"});

        if(!instructorDetails){
            return res.status(404).json({
                success : false,
                message : "Instructor not found",
            });
        }

        // console.log(instructorDetails);

        const categoryDetails = await Category.findById(category);

        if(!categoryDetails){
            return res.status(401).json({
                success : false,
                message : "Category not found"
            });
        }

        const thumbnailImage = await uploadImageCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
                                    courseName,
                                    courseDescription,
                                    instructor : instructorDetails._id,
                                    whatYouWillLearn,
                                    price,
                                    tag : tag,
                                    category : categoryDetails._id,
                                    thumbnail : thumbnailImage.secure_url,
                                    status : status,
                                    instructions : instructions,
                                })

        await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true}
        );

        await Category.findByIdAndUpdate(
            {_id : categoryDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
        );

        return res.status(201).json({
            success : true,
            message : "Course created successfull",
            course : newCourse,
        })

    }catch(err){
        console.log("Error occurred while create course", err);
        return res.status(404).json({
            success : false,
            message : err.message,
        });
    }
}

exports.getAllCourses = async(req,res) => {
    try{
        const allCourse = await Course.find({}, 
                                                {
                                                    courseName : true,
                                                    price : true,
                                                    thumbnail : true,
                                                    ratingAndReviews : true,
                                                    instructor : true,
                                                    studentEnrolled : true,
                                                }
                                                ).populate("instructor").exec();
        return res.status(201).json({
            success : true,
            message : "Course data fetch successfull",
            courses : allCourse,
        })
    }catch(err){
        console.log("Error occurred while fetch courses")
        return res.status(404).json({
            success : false,
            message : "Cannot not fetch courses",
            error : err.message,
        })
    }
}

exports.getCourseDetails = async(req,res) => {
    try{
        const {courseId} = req.body;

        if(!courseId){
            return res.status(500).json({
                success: false,
                message : "missing course id",
            });
        }

        const courseDetails = await Course.findById(
            {_id : courseId}
        ).populate(
            {
                path : "instructor",
                populate : {
                    path : "additionalDetails"
                },
            }
        ).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path : "courseContent",
            populate : {
                path : "subSection",
            },
        }).exec();

        if(!courseDetails){
            return res.status(402).json({
                success : false,
                message : "Course not found",
            });
        }

        return res.status(201).json({
            success : true,
            message : "Course details fetch successfull",
            data : courseDetails,
        });

    }catch(err){
        console.log("Error occurred while get course details, try again", err);
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id
        const userDetails = await User.findOne({
            _id: userId,
        })
            .populate("courses")
            .exec()
        if (!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            courses: userDetails.courses,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
};