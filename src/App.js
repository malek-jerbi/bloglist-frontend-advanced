import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { useSelector, useDispatch } from 'react-redux'
import { showMessage, removeMessage } from './reducers/notificationReducer'

const Notification = () => {
  const notification = useSelector(state => state)
  if (useSelector(state => state) === '') return <div></div>
  return (
    <div className={notification.reason}>
      {notification.text}
    </div>
  )
}
const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  let currentUserName
  if (user) currentUserName = user.username
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userX = JSON.parse(loggedUserJSON)
      blogService.setToken(userX.token)
      setUser(userX)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userX = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userX))
      blogService.setToken(userX.token)
      setUser(userX)
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
    setUser(null)
  }
  const addBlog = async (blogObject) => {
    try {
      console.log(blogObject)
      const blogX = await blogService.create(blogObject)
      console.log('blogX', blogX)
      blogFormRef.current.toggleVisibility()
      dispatch(showMessage({ text: `a new blog ${blogX.title} by ${blogX.author} added`, reason: 'success' }))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
      setBlogs(blogs.concat(blogX))

    } catch (exception) {
      dispatch(showMessage({ text: `${exception.errorMessage}`, reason: 'error' }))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }

  }

  const logged = () => (
    <div>
      {user.name} logged in
      <button onClick={handleLogOut}> log out </button>
      <Togglable buttonLabel='create blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>
      {blogs.sort((first, second) => second.likes - first.likes).map(blog =>
        <Blog key={blog.id} blog={blog} currentUserName={currentUserName} />
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
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null && loginForm()}
      {user !== null && logged()}
    </div>
  )
}

export default App