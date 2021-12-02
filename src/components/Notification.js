import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (useSelector(state => state) === '') return <div></div>
  return (
    <div className={notification.reason}>
      {notification.text}
    </div>
  )
}

export default Notification