/* eslint-disable no-underscore-dangle */
import {
  ADD_POST, DELETE_POST, LIKE_POST, SET_POSTS, UPDATE_POST,
} from '../types/postsTypes'

// eslint-disable-next-line default-param-last
const postsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_POSTS:
      return action.payload

    case ADD_POST:
      return [
        ...state,
        action.payload,
      ]

    case UPDATE_POST:
      return state.length ? state.map((post) => {
        if (post.id === action.payload.id) {
          return action.payload
        }
        return post
      }) : [action.payload]

    case DELETE_POST:
      return state.filter((post) => post.id !== action.payload)

    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload._id) { return action.payload }
        return post
      })

    default:
      return state
  }
}

export default postsReducer
