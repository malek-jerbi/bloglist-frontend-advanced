import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { Form } from 'react-bootstrap'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage, removeMessage } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogsReducer'
import { signUser, unSignUser } from './reducers/signedUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route, Link,
} from 'react-router-dom'



const App = () => {
  const dispatch = useDispatch()


  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.signedUser)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userX = JSON.parse(loggedUserJSON)
      blogService.setToken(userX.token)
      dispatch(signUser(userX))
    }
  }, [])

  const padding = {
    padding: 5
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userX = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userX))
      blogService.setToken(userX.token)
      dispatch(signUser(userX))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(showMessage({ text: 'wrong username or password', reason: 'danger' }))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }
  const handleLogOut = () => {
    window.localStorage.clear()
    dispatch(unSignUser())
  }
  const addBlog = async (blogObject) => {

    dispatch(newBlog(blogObject))
    blogFormRef.current.toggleVisibility()



  }

  const loggedBlogs = () => {
    const padding = {
      paddingTop: 10
    }
    return (
      <div style={padding}>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>

        {blogs.sort((first, second) => second.likes - first.likes).map(blog =>

          <Blog key={blog.id} blog={blog} />

        )}

      </div>
    )
  }
  const logged = () => {
    const padding = {
      paddingBottom: 10
    }
    return (
      <div style={padding}>
        <div>{user.name} logged in </div>
        <div><Button variant='danger' onClick={handleLogOut}> log out </Button> </div>
      </div>
    )
  }
  const loginForm = () => (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <div>
            <Form.Label>username:</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <Form.Label>password:</Form.Label>
            <Form.Control
              type="password"
              name='Password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
  return (
    <Router>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/">home</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={padding} to="/users">users</Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
      <div className='container'>
        <h2>blogs</h2>
        {user !== null && logged()}
        <Notification />
        {user === null && loginForm()}
        <Switch>
          <Route path='/users'>
            {user !== null && <Users />}
          </Route>
          <Route path='/'>
            {user !== null && loggedBlogs()}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App