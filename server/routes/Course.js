const express = require("express");
const router = express.Router();

// Course Controllers Import
const {
    createCourse,
    editCourse,
    getAllCourses,
    getCourseDetails,
    getEnrolledCourses,
    getInstructorCourses,
} = require("../controllers/Course");

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category");

// Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section");

// Sub-Sections Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection,
} = require("../controllers/Subsection");

// Rating Controllers Import
const {
    createRatingAndReview,
    getAverageRating,
    getAllRatingAndReviews,
} = require("../controllers/RatingAndReview");

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")

// Course routes 

// Courses can Only be Created by Instructors
router.post('/createCourse', auth, isInstructor, createCourse);

// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

// Get Enrolled Courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)

//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)

// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)

// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)

// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)

// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)

// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)

// Get all Registered Courses
router.get("/getAllCourses", getAllCourses)

// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)

// Category can Only be Created by Admin
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// Rating and Review

router.post("/createRating", auth, isStudent, createRatingAndReview)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRatingAndReviews)

module.exports = router;