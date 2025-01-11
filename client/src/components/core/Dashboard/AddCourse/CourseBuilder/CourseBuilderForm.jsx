import React from 'react'
import { useForm } from 'react-hook-form'
import InputError from '../../../../common/InputError';

const CourseBuilderForm = () => {
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm();


    const onSubmit = async (data) => {

    }

    return (
        <div className='text-white'>
            <p>Course Builder</p>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="sectionName">
                        Section name
                        <sup>*</sup>
                    </label>
                    <input
                        id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName", { required: true })}
                        className='w-full'
                    />
                    {
                        errors.sectionName && <InputError text={"Section Name is required"} />
                    }
                </div>
            </form>
        </div>
    )
}

export default CourseBuilderForm