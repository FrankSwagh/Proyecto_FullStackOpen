/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
const Alert = ({ message }) => {
    if (message === null) {
        return null
    }
    const AlertStyle = {
        color: 'red',
        background: 'lightgray',
        fontSize: '20px',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    }

    return <div className='error' style={AlertStyle}>{message}</div>
}

export default Alert