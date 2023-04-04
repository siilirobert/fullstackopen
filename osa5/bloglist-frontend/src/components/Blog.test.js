import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('blog title and author is rendered', () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'testing.com'
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blogBasicInfo')
  expect(div).toHaveTextContent('test blog')
  expect(div).toHaveTextContent('test author')
})

test('blog url, likes and user is shown after details view button is clicked', async () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'testing.com',
    likes: 5,
    user: {
      username: 'someuser',
      name: 'Some User'
    }
  }

  const loggedInUser = {
    username: 'someuser'
  }

  const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')

  await user.click(button)

  const div = container.querySelector('.blogDetails')
  expect(div).toHaveTextContent('testing.com')
  expect(div).toHaveTextContent('likes 5')
  expect(div).toHaveTextContent('Some User')
})

test('clicking the like button twice triggers event handler twice', async () => {
  const blog = {
    title: 'test blog',
    author: 'test author',
    url: 'testing.com',
    likes: 5,
    user: {
      username: 'someuser',
      name: 'Some User'
    }
  }

  const loggedInUser = {
    username: 'someuser'
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} loggedInUser={loggedInUser} handleLike={mockHandler} />
  )

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')

  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
