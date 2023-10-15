import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Loading = () => {
    return (
        <div>
            Loading 
            <TypeAnimation 
                sequence={[
                    '...',
                    1500,
                    '',
                ]}
                omitDeletionAnimation={true}
                style={{fontSize:"3rem"}}
            />
        </div>
    )
}

export default Loading
