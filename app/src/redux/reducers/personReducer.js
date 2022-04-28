/* eslint-disable default-param-last */
import {
  GET_PERSON, SIGN_IN, SIGN_OUT, SIGN_UP,
} from '../types/personType'

// eslint-disable-next-line import/prefer-default-export
export const personReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        ...action.payload,
      }

    case SIGN_UP:
      return {
        ...state,
        ...action.payload,
      }

    case GET_PERSON:
      return {
        ...state,
        ...action.payload,
      }

    case SIGN_OUT:
      return {
        ...state,
        token: action.payload,
      }

    default:
      return state
  }
}
