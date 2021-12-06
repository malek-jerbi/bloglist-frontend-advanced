import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
      <Form onSubmit={handleCreate}>
        <Form.Group>
          <div>
            <Form.Label>title:</Form.Label>
            <Form.Control type="text" value={title} name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div><Form.Label>author:</Form.Label>
            <Form.Control type="text" value={author} name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div><Form.Label>url:</Form.Label>
            <Form.Control type="text" value={url} name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <Button variant='primary' type="submit">create </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm