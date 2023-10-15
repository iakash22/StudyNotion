const User = require('../models/User');
const Course = require('../models/Course');
const {instance} = require('../config/razorpay');
const emailSender = require('../utils/emailSender');
const {courseEnrollmentEmail} = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');

exports.capturePayment = async(req,res) => {
    const {courseId} = req.body;
    const userId = req.user.id;

    if(!courseId){
        return res.status(401).json({
            success : false,
            message : "Please provide valid course id"
        })
    }

    let course;
    try{
        course = await Course.findById(courseId);

        if(!course){
            return res.status(400).json({
                success : false,
                message : "Could not find the course",
            });
        }

        const user = new mongoose.Types.ObjectId(userId);

        if(course.studentEnrolled.includes(user)){
            return res.status(200).json({
                success : false,
                message : "Student is already enrolled",
            });
        }
    }catch(err){
        console.error("Error occurred while capture payment validation", err.message);
        return res.status(500).json({
            success : false,
            message : err.message,
        });
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
        amount : amount *100,
        currency : currency,
        receipt : Math.random(Date.now()).toString(),
        notes : {
            courseId,
            userId,
        }
    };

    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        
        return res.status(201).json({
            success : true,
            courseName : course.courseName,
            courseDescription : course.CourseDescription,
            thumnail : course.thumnail,
            orderId : paymentResponse.id,
            currency : paymentResponse.currency,
            amount : paymentResponse.amount,
        })
    }catch(err){
        return res.status(500).json({
            success : false,
            message : "Could not initiate order",
        });
    }
}

exports.verifySignature = async(req,res) => {
    const webhookSecret = "12345678";
    const signature = req.header('x-razorpay-signature');

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log('Payment is Authorized');

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try{
            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                {
                    $push: {
                        studentEnrolled : userId,
                    }
                },
                {new : true}
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success : false,
                    message : "Course not found",
                });
            }
            console.log(enrolledCourse);

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push : {
                        courses : courseId,
                    },
                },
                {new : true},
            )
            if(!enrolledStudent){
                return res.status(500).json({
                    success : false,
                    message : "User not Found",
                });
            }
            const emailResponse = await emailSender(
                    enrolledStudent.email,
                    "Congratulations for StudyNotion",
                    "Congratulations, You are onboarded into new StudyNotion Course."
                );

            return res.status(201).json({
                success : true,
                message : "Signature verified & Course added",
            });
        }catch(err){
            console.log("Error occurred while verified signature", err);
            return res.status(500).json({
                success : false,
                message : err.message,
            });
        }
    }else{
        return res.status(402).json({
            success : false,
            message : "Signature does not match, Invalid signature"
        });
    }
}