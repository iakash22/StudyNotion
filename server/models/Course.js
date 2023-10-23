const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    courseName : {
        type : String,
    },
    CourseDescription : {
        type : String,
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
    },
    whatYouWillLearn : {
        type : String,
    },
    courseContent : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Section",
        }
    ],
    ratingAndReviews : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "RatingAndReview",
        }
    ],
    price : {
        type : String,
    },
    thumbnail : {
        type : String,
    },
    tag : {
        type : [String],
        required : true,
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Category",
    },
    studentEnrolled : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true,
        }
    ],
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    totalDuration : {
        type : String,
        required : true,
    }
});

module.exports = mongoose.model('Course', courseSchema);