const { default: mongoose } = require('mongoose');
const Course = require('../models/Course');
const Section = require('../models/Section');

exports.createSection = async(req,res) => {
    try{
        const {sectionName, courseId} = req.body;

        if(!sectionName || !courseId){
            return res.status(400).json({
                success : false,
                message : "Missing Properties"
            });
        }

        const newSection = await Section.create({sectionName});

        const updateCourse = await Course.findByIdAndUpdate({_id : courseId}, 
                                                            {
                                                                $push : {
                                                                    courseContent : newSection._id
                                                                }
                                                            },
                                                            {new : true}).populate({
                                                                path : "courseContent",
                                                                populate : {
                                                                    path : "subSection",
                                                                },
                                                            }).exec();
        // use populate to replace Section and subsection both in the updatedCourse

        return res.status(201).json({
            success : true,
            message : "Section Created Successfull",
            updateCourse,
        });

    }catch(err){
        console.log("error occurred while create section", err);
        return res.status(404).json({
            success : false,
            message : "Section not created, please try again"
        });
    }
}

exports.updateSection = async(req,res) => {
    try{
        const {sectionName, sectionId} = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success : false,
                message : "Missing properties"
            });
        }

        const updateSection = await Section.findByIdAndUpdate({_id : sectionId}, {sectionName}, {new : true});

        return res.status(201).json({
            success : true,
            message : "Section updated successfull",
            updateSection,
        });

    }catch(err){
        console.log("Error occurred while update section", err);
        return res.status(404).json({
            success : false,
            message : "Section not updated, please try again",
            error : err.message,
        });
    }
}

exports.deleteSection = async (req,res) => {
    try{

        const {sectionId, courseId} = req.body;
        // console.log(sectionId);

        if(!sectionId || !courseId){
            return res.status(500).json({
                success : false,
                message : "Section id missing",
            });
        }

        const deletedSection = await Section.findByIdAndDelete({_id :sectionId});

        if(!deletedSection){
            return res.status(400).json({
                success : false,
                message : "Section Id is not exist",
            })
        }
        const updateCourse = await Course.findOneAndUpdate(
                {_id : courseId}, 
                {
                    $pull : {
                        courseContent : sectionId,
                    }
                },
                {new : true}            
            ).populate("courseContent").exec();        

        return res.status(201).json({
            success : true,
            message : "Section deleted successfull",
            updateCourse,
        }); 

    }catch(err){
        console.log("Error occurred while delete section", err);
        return res.status(404).json({
            success : false,
            message : "section not deleted, try again",
            error : err.message,
        })
    }
}