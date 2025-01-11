import React from 'react'

const InputError = ({ text, extraStyles }) => {
    return (
        <span className={`ml-2 text-xs tracking-wide text-pink-200 ${extraStyles}`}>
            {text}
        </span>
    )
}

export default InputError