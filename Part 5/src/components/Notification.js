/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'

const AlertStyle = {
    color: 'green',
    background: 'lightgray',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
}

const Notification = ({ message }) => {
    if (message === null) {
        return null
    }

    return <div style={AlertStyle} className="error">{message}</div>
}

export default Notification
