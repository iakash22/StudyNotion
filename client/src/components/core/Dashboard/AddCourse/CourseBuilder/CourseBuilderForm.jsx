import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import InputError from '../../../../common/InputError';
import IconButton from '../../../../common/IconButton';
import { GrAddCircle } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux';
import { MdNavigateNext } from 'react-icons/md';
import { setCourse, setEditCourse, setStep } from '../../../../../redux/slices/CourseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsApi';
import NestView from './NestView';

const CourseBuilderForm = () => {
    const [editSectionName, setEditSectionName] = useState(false);
    const [loading, setLoading] = useState(false);
    const { course } = useSelector(state => state.course);
    const { token } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const cancelEdit = () => {
        setEditSectionName(false);
        setValue("sectionName", "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course.courseContent.length === 0) {
            return toast.error("Please add aleast one section!");
        }
        if (course.courseContent.some((section) => section.subSection.length === 0)) {
            return toast.error("Please add aleast one leacture in each section!");
        }

        dispatch(setStep(3));
    }

    const onSubmit = async (data) => {
        setLoading(true);
        let result;

        if (editSectionName) {
            //we are editing the secgtion name
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                }, token
            )

            //update only section values
            if (result) {
                const updatedSection = course.courseContent.map((section) =>
                    section._id === result._id ? result : section
                );
                dispatch(setCourse({ ...course, courseContent: updatedSection }));
                setEditSectionName(null);
                setValue("sectionName", "");
            }
        }
        else {
            result = await createSection({
                sectionName: data.sectionName,
                courseId: course._id,
            }, token)

            //update values
            if (result) {
                dispatch(setCourse(result));
                setEditSectionName(null);
                setValue("sectionName", "");
            }
        }

        //loading false
        setLoading(false);
    }

    const handleEditSectionName = (sectionId, sectionName) => {
        if (editSectionName) {
            cancelEdit();
            return;
        }

        setEditSectionName(sectionId);
        setValue('sectionName', sectionName);
    }

    return (
        <div className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'>
            <p className="text-2xl font-semibold text-richblack-5">Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                <div className='flex flex-col space-y-2'>
                    <label htmlFor="sectionName" className='text-sm text-richblack-5'>
                        Section name
                        <sup className='text-pink-200'>*</sup>
                    </label>
                    <input
                        id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName", { required: true })}
                        className='w-full form-style'
                    />
                    {
                        errors.sectionName && <InputError text={"Section Name is required"} />
                    }
                </div>
                <div className='flex items-end gap-x-4'>
                    <IconButton
                        type={"submit"}
                        text={editSectionName ? "Edit Section Name" : "Create Section"}
                        outline={true}
                        icon={<GrAddCircle className='text-yellow-50' />}
                    />
                    {
                        editSectionName && (
                            <button
                                type='button'
                                className="text-sm text-richblack-300 underline"
                                onClick={cancelEdit}
                            >
                                Cancel Edit
                            </button>
                        )
                    }
                </div>
            </form>

            {
                course?.courseContent.length > 0 && (
                    <NestView handleEditSectionName={handleEditSectionName} />
                )
            }

            <div className='flex justify-end gap-x-3'>
                <button
                    type='button'
                    onClick={goBack}
                    className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                >
                    Back
                </button>
                <IconButton
                    text={"Next"}
                    active={true}
                    btnHander={goToNext}
                    icon={<MdNavigateNext />}
                />
            </div>

        </div>
    )
}

export default CourseBuilderForm