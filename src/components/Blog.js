/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'

const Blog = ({ blog }) => {
  const [showAll, setShowAll] = useState(false)
  const [likesState, setLikesState] = useState(blog.likes)
  const [blogDeleted, setBlogDeleted] = useState(false)

  let showRemove =
    (useSelector(state => state.signedUser).username === blog.user.username)


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
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id)
      setBlogDeleted(true)
    }
  }

  const removeButton = () => (
    <Button variant='danger' onClick={deleteBlog}>remove</Button>
  )

  const like = async () => {
    await blogService.update(blog.id, {
      user: blog.user.id,
      likes: likesState + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    setLikesState(likesState + 1)
  }
  if (blogDeleted) return (<div>deleted.</div>)
  if (showAll)
    return (
      <div style={blogStyle} className="block-example border border-dark">
        <div>{blog.title}
          <Button variant='info' onClick={() => setShowAll(!showAll)}>
            {showAll ? 'hide' : 'view'}
          </Button>
        </div>
        <div>{blog.url}</div>
        <div>likes {likesState} <Button variant='dark' onClick={like}>like</Button></div>
        <div>{blog.author}</div>
        {<div>{showRemove === true && removeButton()}</div>}
      </div>
    )
  else return (
    <div style={blogStyle} className="block-example border border-dark">
      <div>{blog.title} -{blog.author}
        <Button variant='info' onClick={() => setShowAll(!showAll)}>
          {showAll ? 'hide' : 'view'}
        </Button>
      </div>

    </div>
  )
}

export default Blog