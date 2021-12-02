import React from 'react'
import { useSelector } from 'react-redux'
//import { Table } from 'react-bootstrap'

const Users = () => {
  const users = useSelector(state => state.users)
  return (
    <div className='container'>
      <h2>Users</h2>

      {users.map(user => <div key={user.username}>{user.username} {user.blogs.length}</div>)}
    </div>
  )
}

export default Users