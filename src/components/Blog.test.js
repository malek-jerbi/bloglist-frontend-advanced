import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders only blog title and author by default', () => {
  const blog = {
    title: 'the title',
    author: 'the author',
    url: 'the url',
    likes: 69
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent('the title')
  expect(component.container).toHaveTextContent('the author')
  expect(component.container).not.toHaveTextContent('the url')
  expect(component.container).not.toHaveTextContent('69')
})