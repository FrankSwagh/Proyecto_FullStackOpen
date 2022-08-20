/*eslint linebreak-style: ["error", "windows"]*/
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
    const notification = useSelector((state) => state.notification)
    const style = {
        border: 'hidden',
        padding: 10,
        borderWidth: 1
    }
    return <div style={style}>{notification.message}</div>
}
export default Notification
