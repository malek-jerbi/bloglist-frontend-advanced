import { useSelector } from 'react-redux'
import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (useSelector(state => state) === '') return <div></div>
  return (
    <div>
      {(notification.text &&
        <Alert variant={notification.reason}>
          {notification.text}
        </Alert>
      )}
    </div>
  )
}

export default Notification