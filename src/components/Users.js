import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import User from '../components/User'
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const userParams = match ? users.find(u => u.id === match.params.id)
    : undefined
  return (
    <Switch>
      <Route path='/users/:userId'>
        {userParams === undefined && <div>there is no user with this id</div>}
        {userParams !== undefined && <User user={userParams}/>}
      </Route>
      <Route path='/users'>
        <div>
          <h2>Users</h2>
          <Table striped>
            <tbody>
              <tr>
                <td></td>
                <td><strong>blogs created</strong></td>
              </tr>
              {users.map(user =>
                <tr key={user.username}>
                  <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                  <td> {user.blogs.length}</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Route>
    </Switch>
  )
}

export default Users