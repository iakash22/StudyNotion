import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseCategories, addCourseDetails, editCourseDetails } from '../../../../../services/operations/courseDetailsApi';
import { HiOutlineCurrencyRupee } from 'react-icons/hi'
import RequirementField from './RequirementField';
import IconButton from '../../../../common/IconButton';
import UploadThumbnailField from '../UploadThumbnailField';
import TagChipField from './TagChipField';
import InputError from '../../../../common/InputError';
import { setCourse, setStep } from '../../../../../redux/slices/CourseSlice';
import { MdNavigateBefore } from 'react-icons/md';
import { COURSE_STATUS } from '../../../../../utils/Constants';

const CourseInformationForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const dispatch = useDispatch();
    const { token } = useSelector((state) => state.auth)
    const { course, editCourse } = useSelector(state => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const categories = await fetchCourseCategories();
            if (categories.length > 0) {
                setCourseCategories(categories);
            }
            setLoading(false);
        }

        if (editCourse) {
            setValue('courseTitle', course.courseName);
            setValue('courseShortDesc', course.courseShortDesc);
            setValue('coursePrice', course.price);
            setValue('courseTags', course.tag);
            setValue('courseBenefits', course.whatYouWillLearn);
            setValue('courseCategory', course.category);
            setValue('courseRequirement', course.instructions);
            setValue('courseImage', course.thumbnail);
        }

        getCategories();
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues()
        // console.log("changes after editing form values:", currentValues)
        if (
            currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenefits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseRequirements.toString() !==
            course.instructions.toString() ||
            currentValues.courseImage !== course.thumbnail
        ) {
            return true
        }
        return false
    }

    const onSubmit = async (data) => {
        // console.log(data)

        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                // console.log(data)
                formData.append("courseId", course._id)
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle)
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc)
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice)
                }
                if (currentValues.courseTags.toString() !== course.tag.toString()) {
                    formData.append("tag", JSON.stringify(data.courseTags))
                }
                if (currentValues.courseBenefits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory)
                }
                if (
                    currentValues.courseRequirements.toString() !==
                    course.instructions.toString()
                ) {
                    formData.append(
                        "instructions",
                        JSON.stringify(data.courseRequirements)
                    )
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }
                // console.log("Edit Form data: ", formData)
                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if (result) {
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                }
            } else {
                toast.error("No changes made to the form")
            }
            return
        }

        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("thumbnailImage", data.courseImage)
        setLoading(true)
        const result = await addCourseDetails(formData, token);
        // console.log(result);
        if (result) {
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-8 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6'
        >
            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Course Title
                    <sup className='text-pink-200'>*</sup>
                </label>
                <input
                    type="text"
                    id='courseTitle'
                    name='courseTitle'
                    placeholder='Enter Course title'
                    className='w-full form-style'
                    {...register('courseTitle', { required: true })}
                />
                {errors.courseTitle && <InputError text={"Course Title is required**"} />}
            </div>

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Course Short Description
                    <sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    name="courseShortDesc"
                    id="courseShortDesc"
                    className='w-full min-h-[130px] resize-x-none form-style'
                    placeholder='Enter Description'
                    {...register('courseShortDesc', { required: true })}
                />
                {errors.courseShortDesc && <InputError text={"Course Description is required**"} />}
            </div>

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Course Price
                    <sup className='text-pink-200'>*</sup>
                </label>
                <div className='relative'>
                    <input
                        type='text'
                        name="coursePrice"
                        id="coursePrice"
                        className='w-full form-style !pl-12 mb-2'
                        placeholder='Enter Course Price'
                        {...register('coursePrice', { required: true, valueAsNumber: true, pattern: { value: /^(0|[1-9]\d*)(\.\d+)?$/, } })}
                    />
                    <HiOutlineCurrencyRupee
                        className='absolute left-3 top-3 inline-block text-2xl 
                                    text-richblack-400'
                    />
                    {errors.coursePrice &&
                        <InputError text={"Course Price is required**"} />
                    }
                </div>
            </div>

            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Course Category
                    <sup className='text-pink-200'>*</sup>
                </label>
                <select
                    name="courseCategory"
                    id="courseCategory"
                    defaultValue=""
                    className='w-full form-style'
                    {...register('courseCategory', { required: true })}
                >
                    <option
                        value=""
                        disabled
                    >
                        Choose a category
                    </option>
                    {
                        !loading && courseCategories.map((category, index) => (
                            <option
                                key={category._id}
                                value={category._id}
                            >
                                {category?.name}
                            </option>
                        ))
                    }
                </select>
                {errors.courseCategory && <InputError text={"Course Category is required**"} />}
            </div>

            <TagChipField
                name="courseTags"
                label="Course Tags"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
                placeholder={"Enter Tags and press Enter"}
            />

            <UploadThumbnailField
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />


            <div className='flex flex-col space-y-2'>
                <label className='text-sm text-richblack-5'>
                    Benefits of the course<sup className='text-pink-200'>*</sup>
                </label>
                <textarea
                    type="text"
                    name="courseBenefits"
                    id="courseBenefits"
                    placeholder='Enter Benefits of the course'
                    {...register('courseBenefits', { required: true })}
                    className='w-full min-h-[140px] form-style'
                />
                {errors.courseBenefits && <InputError text={"Benefits of the course are required**"} />}
            </div>

            <RequirementField
                name="courseRequirements"
                label="Requirement/Instructions"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className='flex justify-end gap-x-2'>
                {
                    editCourse && (
                        <button
                            type='button'
                            onClick={() => dispatch(setStep(2))}
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Continue without saving
                        </button>
                    )
                }

                <IconButton
                    disabled={loading}
                    active={true}
                >
                    <MdNavigateBefore />
                    <span>{!editCourse ? "Next" : "Save Changes"}</span>
                </IconButton>
            </div>

        </form>
    )
}

export default CourseInformationForm
