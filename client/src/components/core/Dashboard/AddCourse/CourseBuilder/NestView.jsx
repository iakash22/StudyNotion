import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdDelete, MdEdit, MdOutlineAdd } from 'react-icons/md';
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../common/ConfirmationModel';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsApi';
import { setCourse } from '../../../../../redux/slices/CourseSlice';

const NestView = ({ handleEditSectionName }) => {
    const [addSubSection, setAddSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);

    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // console.log(course);

    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({
            sectionId,
            courseId: course?._id,
        }, token);
        
        if (result) {
            dispatch(setCourse(result));
        }
        setConfirmationModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({
            subSectionId,
            sectionId,
        }, token);
        
        if (result) {
            const updatedSection = course.courseContent.map((section) =>
                section._id === result._id ? result : section
            );
            dispatch(setCourse({...course, courseContent : updatedSection}));
        }
        setConfirmationModal(null);
    }

    return (
        <>
            <div className='rounded-lg bg-richblack-700 p-6 px-8'>
                {
                    course?.courseContent?.map((section) => (
                        <details
                            key={section?._id}
                            open

                        >
                            <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>
                                <div className='flex items-center gap-x-3'>
                                    <RxDropdownMenu className="text-2xl text-richblack-50" />
                                    <p className="font-semibold text-richblack-50">{section?.sectionName}</p>
                                </div>
                                <div className='flex gap-x-3 items-center'>
                                    <button
                                        onClick={() => handleEditSectionName(section._id, section.sectionName)}
                                    >
                                        <MdEdit className="text-xl text-richblack-300" />
                                    </button>
                                    <button
                                        onClick={() => setConfirmationModal({
                                            text1: "Delete this Section",
                                            text2: "All Lecture in this section will be deleted",
                                            btnText1: "Delete",
                                            btnText2: "Cancel",
                                            btnHandler1: () => handleDeleteSection(section._id),
                                            btnHandler2: () => setConfirmationModal(null),
                                        })}
                                    >
                                        <MdDelete className="text-xl text-richblack-300" />
                                    </button>
                                    <span className="font-medium text-richblack-300">|</span>
                                    <BiSolidDownArrow className='text-xl text-richblack-300' />
                                </div>
                            </summary>

                            <div className="px-6 pb-4">
                                {
                                    section.subSection.map((sub) => (
                                        <div
                                            className="flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2"
                                            key={sub?._id}
                                            onClick={() => setViewSubSection(sub)}
                                        >
                                            <div className='flex items-center gap-x-3 py-2'>
                                                <RxDropdownMenu className="text-2xl text-richblack-50" />
                                                <p className="font-semibold text-richblack-50">{sub?.title}</p>
                                            </div>
                                            <div
                                                className="flex items-center gap-x-3"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <button
                                                    onClick={() => setEditSubSection({ ...sub, sectionId: section?._id })}
                                                >
                                                    <MdEdit className="text-xl text-richblack-300"/>
                                                </button>
                                                <button
                                                    onClick={() => setConfirmationModal({
                                                        text1: "Delete this Sub Section",
                                                        text2: "All Lecture in this sub section will be deleted",
                                                        btnText1: "Delete",
                                                        btnText2: "Cancel",
                                                        btnHandler1: () => handleDeleteSubSection(sub?._id, section?._id),
                                                        btnHandler2: () => setConfirmationModal(null),
                                                    })}
                                                >
                                                    <MdDelete className="text-xl text-richblack-300" />
                                                </button>
                                            </div>
                                        </div>
                                    ))
                                }

                                <button
                                    onClick={() => setAddSubSection(section?._id)}
                                    className='mt-3 flex items-center gap-x-1 text-yellow-50'>
                                    <FaPlus className="text-lg" />
                                    <p>Add Lectures</p>
                                </button>
                            </div>
                        </details>
                    ))
                }
            </div>

            {
                addSubSection
                &&
                <SubSectionModal
                    add={true}
                    modalData={addSubSection}
                    setModalData={setAddSubSection}
                />
            }
            {
                viewSubSection
                &&
                <SubSectionModal
                    view={true}
                    modalData={viewSubSection}
                    setModalData={setViewSubSection}
                />
            }
            {
                editSubSection
                &&
                <SubSectionModal
                    edit={true}
                    modalData={editSubSection}
                    setModalData={setEditSubSection}
                />
            }

            {
                confirmationModal && <ConfirmationModal modalData={confirmationModal} />
            }
        </>
    )
}

export default NestView