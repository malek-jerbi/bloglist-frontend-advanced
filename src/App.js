import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage, removeMessage } from './reducers/notificationReducer'
import { initializeBlogs, newBlog } from './reducers/blogsReducer'
import { signUser, unSignUser } from './reducers/signedUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import {
  BrowserRouter as Router,
  Switch, Route
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
      dispatch(showMessage({ text: 'wrong username or password', reason: 'error' }))
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

  const logged = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogOut}> log out </button>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )
  return (
    <Router>
      <Switch>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <h2>blogs</h2>
          <Notification />
          {user === null && loginForm()}
          {user !== null && logged()}
        </Route>
      </Switch>
    </Router>
  )
}

export default App