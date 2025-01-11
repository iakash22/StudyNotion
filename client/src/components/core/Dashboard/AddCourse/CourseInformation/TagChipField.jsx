import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux';
import InputError from '../../../../common/InputError';

const TagChipField = ({ name, label, register, errors, setValue, getValues, placeholder }) => {
    const [tags, setTags] = useState(getValues(name) || []);
    const { editCourse } = useSelector(state => state.course);


    useEffect(() => {
        if (editCourse) {
            // console.log(course)
            setTags(course?.tag)
        }
        register(name, { required: true, validate: (value) => value.length > 0 })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        setValue(name, tags);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tags])

    const tagAddHandler = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = e.target.value.trim();
            if (newTag && !tags.includes(newTag)) {
                setTags([...tags, newTag]);
                e.target.value = "";
            }
        }
    }

    const removeTagHandlder = (index) => {
        const newTags = tags.filter((_, tagIndex) => index !== tagIndex);
        setTags(newTags);
    }



    return (
        <div className='flex flex-col space-y-2'>
            <label className='text-sm text-richblack-5' htmlFor={name}>
                {label}
                <sup className='text-pink-200'>*</sup>
            </label>
            {tags.length > 0 && <div className='flex flex-row flex-wrap gap-2 pb-1'>
                {
                    tags.map((tag, index) => (
                        <div key={index} className='m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5'>
                            {tag}
                            <button type="button" className='ml-2 focus:outline-none'
                                onClick={() => removeTagHandlder(index)}
                            >
                                <MdClose
                                    className='text-sm'
                                />
                            </button>
                        </div>
                    ))
                }
            </div>
            }
            <input
                type="text"
                id={name}
                name={name}
                className='w-full form-style'
                placeholder={placeholder}
                onKeyDown={tagAddHandler}
            />
            {errors[name] && <InputError text={"Course Tag is required**"} />}
        </div>
    )
}

export default TagChipField