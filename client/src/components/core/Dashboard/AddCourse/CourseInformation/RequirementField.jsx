import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import InputError from '../../../../common/InputError';

const RequirementField = ({ name, setValue, getValues, register, label, errors }) => {
    const [requirement, setRequirement] = useState("");
    const [requirementsList, setRequirementsList] = useState([]);
    const { editCourse, course } = useSelector((state) => state.course)

    useEffect(() => {
        if (editCourse) {
            setRequirementsList(course?.instructions)
        }

        register(name, {
            required: true,
            validate: (value) => value.length > 0
        });
    }, []);

    useEffect(() => {
        setValue(name, requirementsList);

    }, [requirementsList]);

    const handleAddRequirement = () => {
        if (requirement) {
            setRequirementsList([...requirementsList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (index) => {
        const updateRequirementList = [...requirementsList];
        updateRequirementList.splice(index, 1);
        setRequirementsList(updateRequirementList);
    }
    return (
        <div className='flex flex-col space-y-2'>
            <label htmlFor={name} className='text-sm text-richblack-5'>
                {label}<sup className='text-pink-200'>*</sup>
            </label>
            <div className='flex flex-col items-start space-y-2'>
                <input
                    type="text"
                    name={name}
                    id={name}
                    value={requirement}
                    className='w-full form-style'
                    onChange={(e) => setRequirement(e.target.value)}
                />
                <button
                    type='button'
                    className='font-semibold text-yellow-50'
                    onClick={handleAddRequirement}
                >
                    Add
                </button>

                {
                    requirementsList.length > 0 && (
                        requirementsList.map((requirement, index) => (
                            <ul
                                key={index}
                                className='mt-2 list-inside list-disc'
                            >
                                <li className='flex items-center text-richblack-5'>
                                    <span >
                                        {requirement}
                                    </span>
                                    <button
                                        type='button'
                                        onClick={() => handleRemoveRequirement(index)}
                                        className='ml-2 text-xs text-pure-greys-300 '
                                    >
                                        Clear
                                    </button>
                                </li>
                            </ul>
                        ))
                    )
                }
                {
                    errors[name] && <InputError text={label + "is required**"} />
                }
            </div>

        </div>
    )
}

export default RequirementField
