import { combineReducers } from 'redux'
import commentsReducer from './commentsReducer'
import { detailPostReducer } from './detailPostReducer'
import { personReducer } from './personReducer'
import postsReducer from './postsReducer'
import { searchReducer } from './searchReducer'

const rootReducer = combineReducers({
  posts: postsReducer,
  search: searchReducer,
  person: personReducer,
  detailPost: detailPostReducer,
  comments: commentsReducer,
})

export default rootReducer
