import React, { useState } from 'react'

const BlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreate = async (event) => {
    event.preventDefault()
    await props.addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={handleCreate}>
        <div>
          title:
          <input type="text" value={title} name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input type="text" value={author} name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input type="text" value={url} name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create </button>
      </form>
    </div>
  )
}

export default BlogForm