const { query } = require('express');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
const { uploadImageCloudinary } = require('../utils/imageUploader');
require('dotenv').config()

exports.createSubSection = async (req, res) => {
    try {
        const { title, description, timeDuration, sectionId } = req.body;
        const video = req.files.video;


        if (!title || !description || !sectionId || !video) {
            return res.status(401).json({
                success: false,
                message: "All fields required",
            });
        }

        const uploadVideo = await uploadImageCloudinary(video, process.env.FOLDER_NAME);

        const newSubSection = await SubSection.create({ title, timeDuration, description, videoUrl: uploadVideo.secure_url });

        const updateSection = await Section.findByIdAndUpdate(sectionId,
            {
                $push: {
                    subSection: newSubSection._id
                }
            },
            { new: true }
        ).populate("subSection");
        // log updated section here, after adding populate query
        return res.status(201).json({
            success: true,
            message: "Section created successfull",
            data: updateSection,
        });
    } catch (err) {
        console.log("Error occurred while created sub-section", err);
        return res.status(404).json({
            success: false,
            message: "internal server error",
            error: err.message,
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const { title, timeDuration, description, subSectionId, sectionId, } = req.body;

        const subSection = await SubSection.findById(subSectionId);

        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }
        if (title !== undefined) {
            subSection.title = title
        }
        if (description !== undefined) {
            subSection.description = description
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video
            const uploadDetails = await uploadImageCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

        const updatedSection = await Section.findById(sectionId).populate(
            "subSection"
        );

        return res.status(201).json({
            success: true,
            message: "Sub-Section updated successfull",
            data: updatedSection,
        });

    } catch (err) {
        console.log("Error occurred while update Sub-Section", err);
        return res.status(404).json({
            success: false,
            message: "Sub-Section not updated, please try again",
            error: err.message,
        });
    }
}

exports.deleteSubSection = async (req, res) => {
    try {

        const { subSectionId, sectionId } = req.body;

        const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!deletedSubSection) {
            return res.status(400).json({
                success: false,
                message: "SubSection not found",
            })
        }

        const updateSection = await Section.findOneAndUpdate(
            { _id: sectionId },
            {
                $pull: {
                    subSection: subSectionId,
                }
            },
            { new: true }
        ).populate("subSection").exec();

        return res.status(201).json({
            success: true,
            message: "Sub-Section deleted successfull",
            data: updateSection,
        });

    } catch (err) {
        console.log("Error occurred while delete sub-section", err);
        return res.status(404).json({
            success: false,
            message: "Sub-section not deleted, try again",
            error: err.message,
        })
    }
}