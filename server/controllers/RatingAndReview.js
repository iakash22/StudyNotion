const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { default: mongoose } = require('mongoose');

exports.createRatingAndReview = async(req,res) => {
    try{
        const userId = req.user.id;
        const {courseId,rating,review} = req.body;

        const courseDetails = await Course.findOne(
            {_id : courseId,
                studentEnrolled : {
                    $elemMatch : {$eq : userId}
                }
            }
        );

        if(!courseDetails){
            return res.status(404).json({
                success : false,
                message : "User not enrolled in this course"
            });
        }

        const alreadyReviwed = await RatingAndReview.findOne({user : userId, course : courseId});
        if(alreadyReviwed){
            return res.status(402).json({
                success : false,
                message : "User already reviewed this course",
            });
        }

        const newReview = await RatingAndReview.create({rating,review,user : userId, course : courseId});
        console.log(newReview);

        const updateCourse = await Course.findByIdAndUpdate(
            {_id : courseId},
            {$push : {
                ratingAndReview : newReview._id,
            }},
            {new : true}
        );

        console.log(updateCourse);

        return res.status(201).json({
            success : true,
            message : "Rating and Review created successfull",
            newReview,
        });
    }catch(err){
        console.log("Error occurred while create rating and review", err);
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }
}

exports.getAverageRating = async(req,res) => {
    try{
        const courseId = req.body.courseId;
        
        const result = await RatingAndReview.aggregate([
            {
                $match :{
                    course : new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                $group :{
                    _id : null,
                    averageRating : {$avg : "$rating"},
                }
            }
        ]);

        if(result.length > 0){
            return res.status(200).json({
                success : true,
                averageRating : result[0].averageRating,
            });
        }else{
            return res.status(200).json({
                success : true,
                message : "Average Rating is 0",
                averageRating : 0,
            });
        }
    }catch(err){
        console.log("error occurred while find average rating", err);
        return res.status(402).json({
            success : false,
            message : err.message,
        });
    }
}

exports.getAllRatingAndReviews = async(req,res) => {
    try{
        const allReviewd = await RatingAndReview.find({})
        .sort({rating : "desc"})
        .populate({
            path : "user",
            select : "firstName lastName email image"
        })
        .populate({
            path : "course",
            select : "courseName",
        }).exec();

        return res.status(200).json({
            success : true,
            message : "All rating and review fetch successfull",
            data : allReviewd,
        });
    }catch(err){
        console.log("Error occurred while fetch rating and review", err);
        return res.status(402).json({
            success : false,
            message : err.message,
        });
    }
}