/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */
import { API_TOKEN } from '../../constants'
import {
  ADD_POST, DELETE_POST, SET_POSTS, UPDATE_POST,
} from '../types/postsTypes'

const setPosts = (newPostsArray) => ({
  type: SET_POSTS,
  payload: newPostsArray,
})

// eslint-disable-next-line import/prefer-default-export
export const setPostsQuery = (searchValue) => async (dispatch) => {
  const urlForFetch = searchValue
    ? `https://api.react-learning.ru/posts/search/?query=${searchValue}`
    : 'https://api.react-learning.ru/posts'

  const response = await fetch(urlForFetch, {
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
    },
  })

  const dataFromServer = await response.json()
  dispatch(setPosts(dataFromServer))
}

const addPost = (allPosts) => ({
  type: ADD_POST,
  payload: allPosts,
})

export const addPostQuery = (post) => async (dispatch) => {
  const response = await fetch('https://api.react-learning.ru/posts', {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: post,
  })

  const dataFromServer = await response.json()

  dispatch(addPost(dataFromServer))
}

const updatePost = (newPostObject) => ({
  type: UPDATE_POST,
  payload: newPostObject,
})

export const updatePostQuery = (post) => async (dispatch) => {
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
  dispatch(updatePost(updatedPost))
}

export const getPostQuery = (postId, controller) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/${postId}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  const currentPost = await response.json()
  dispatch(updatePost(currentPost))
  return () => { controller.current.abort() }
}

const deletePost = (id) => ({
  type: DELETE_POST,
  payload: id,
})

export const deletePostQuery = (id) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 200) {
    dispatch(deletePost(id))
    setPostsQuery()
  }
}
