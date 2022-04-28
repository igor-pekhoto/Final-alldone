import { API_TOKEN } from '../../constants'
import { ADD_COMMENT, DELETE_COMMENT } from '../types/commentsTypes'

const addComment = (allComments) => ({
  type: ADD_COMMENT,
  payload: allComments,
})

// eslint-disable-next-line import/prefer-default-export
export const addCommentQuery = (comment, postId) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/comments/${postId}`, {
    method: 'POST',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: comment,
  })

  const dataFromServer = await response.json()

  dispatch(addComment(dataFromServer))
}

const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  payload: commentId,
})

export const deleteCommentQuery = (postId, commentId) => async (dispatch) => {
  const response = await fetch(`https://api.react-learning.ru/posts/comments/${postId}/${commentId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json',
    },
  })
  if (response.status === 200) {
    dispatch(deleteComment(commentId))
  }
}
