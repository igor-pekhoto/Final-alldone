/* eslint-disable no-underscore-dangle */
/* eslint-disable default-param-last */
import { DETAIL_POST } from '../types/detailPostTypes'

// eslint-disable-next-line import/prefer-default-export
export const detailPostReducer = (store = {}, action) => {
  switch (action.type) {
    case DETAIL_POST:

      //   return store.filter((post) => post._id !== action.payload._id)
      return action.payload

    default:
      return store
  }
}
