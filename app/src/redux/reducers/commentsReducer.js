import { ADD_COMMENT, DELETE_COMMENT } from '../types/commentsTypes'

// eslint-disable-next-line default-param-last
const commentsReducer = (store = [], action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return [
        ...store,
        action.payload,
      ]

    case DELETE_COMMENT:
      // eslint-disable-next-line no-underscore-dangle
      return store.filter((comment) => comment._id !== action.payload)

    default:
      return store
  }
}

export default commentsReducer
