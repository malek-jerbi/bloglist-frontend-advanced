import blogService from '../services/blogs'
import { showMessage, removeMessage } from './notificationReducer'

const blogsReducer = (state = [], action) => {
  if (action.type === 'INIT_BLOGS') return action.data
  if (action.type === 'NEW_BLOG') return [...state, action.data]
  return state
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const newBlog = (newBlog) => {

  return async dispatch => {
    try {
      const blog = await blogService.create(newBlog)
      dispatch({
        type: 'NEW_BLOG',
        data: blog
      })
      dispatch(showMessage({ text: `a new blog ${blog.title} by ${blog.author} added`, reason: 'success' }))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
    catch (error) {
      dispatch(showMessage({ text: `${error.response.data.error}`, reason: 'danger' }))
      setTimeout(() => {
        dispatch(removeMessage())
      }, 5000)
    }
  }


}


export default blogsReducer