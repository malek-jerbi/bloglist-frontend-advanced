import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, currentUserName }) => {
  const [showAll, setShowAll] = useState(false)
  const [likesState, setLikesState] = useState(blog.likes)
  const [blogDeleted, setBlogDeleted] = useState(false)

  let showRemove
  if (currentUserName) showRemove= (currentUserName===blog.user.username)

  const blogStyle = {
    paddingTop: 4,
    paddingLeft: 3,
    paddingBottom: 4,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5,
    marginTop: 5
  }
  const buttonStyle = {
    color: 'white',
    backgroundColor: 'blue',
  }
  const deleteBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {await blogService.deleteBlog(blog.id)
      setBlogDeleted(true)}
  }

  const removeButton = () => (
    <button style={buttonStyle} onClick={deleteBlog}>remove</button>
  )

  const like = async () => {
    await blogService.update(blog.id, {
      user: blog.user.id,
      likes: likesState+1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    setLikesState(likesState+1)
  }
  if(blogDeleted) return (<div>deleted.</div>)
  if (showAll)
    return (
      <div style={blogStyle} className="blog">
        <div>{blog.title}
          <button onClick={() => setShowAll(!showAll)}>
            {showAll ? 'hide' : 'view'}
          </button>
        </div>
        <div>{blog.url}</div>
        <div>likes {likesState} <button onClick={like}>like</button></div>
        <div>{blog.author}</div>
        <div>{showRemove===true && removeButton()}</div>
      </div>
    )
  else return (
    <div style={blogStyle} className="blog">
      <div>{blog.title} {blog.author}
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </button>
      </div>

    </div>
  )
}

export default Blog