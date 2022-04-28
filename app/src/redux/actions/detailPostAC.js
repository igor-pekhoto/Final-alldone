/* eslint-disable no-underscore-dangle */
import { API_TOKEN } from '../../constants'
import { DETAIL_POST } from '../types/detailPostTypes'

// eslint-disable-next-line import/prefer-default-export
export const postDetail = (newPostDetal) => ({
  type: DETAIL_POST,
  payload: newPostDetal,
})

export const getPostDetailQuery = (postId) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/${postId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const currentPost = await response.json()
  dispatch(postDetail(currentPost))
}

export const updatePostDetailQuery = (post) => async (dispatch) => {
  const postId = JSON.parse(post)._id
  const response = await fetch(`https://api.react-learning.ru/posts/${postId}`, {
    method: 'PATCH',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(post),
    body: post,
  })
  const updatedPost = await response.json()
  dispatch(postDetail(updatedPost))
}
